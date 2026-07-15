import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon } from '../theme/tokens';

interface ModeButton {
  entity: string;
  name?: string;
  icon?: string;
}

interface GlassGeyserCardConfig extends LovelaceCardConfig {
  name?: string;
  subtitle?: string;
  power?: string; // switch / input_boolean / water_heater — main on/off
  current?: string; // sensor — tank temp
  target?: string; // number / water_heater / climate — target temp stepper
  min_temp?: number;
  max_temp?: number;
  solar?: string; // sensor — solar collector temp (tile)
  power_sensor?: string; // sensor — kW draw (tile)
  solar_mode?: string; // switch / input_boolean — TOGGLEABLE solar mode
  modes?: (string | ModeButton)[]; // extra toggle buttons (boost / element / timer)
}

@customElement('glass-geyser-card')
export class GlassGeyserCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassGeyserCardConfig;
  private _modes: ModeButton[] = [];

  // Optimistic state: flipped immediately on click, cleared once HA confirms.
  // null means "use live HA state"; true/false overrides for instant UI feedback.
  @state() private _optimisticOn: boolean | null = null;
  private _optimisticTimer: ReturnType<typeof setTimeout> | null = null;

  public setConfig(config: GlassGeyserCardConfig): void {
    this._modes = (config.modes ?? []).map((m) => (typeof m === 'string' ? { entity: m } : m));
    this._config = { name: 'Geyser', subtitle: 'Water heater', min_temp: 20, max_temp: 70, ...config };
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassGeyserCardConfig, 'type'> {
    return { name: 'Geyser', subtitle: 'Bathroom', power: '', current: '', target: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    const c = this._config;
    const ids = [c.power, c.current, c.target, c.solar, c.power_sensor, c.solar_mode, ...this._modes.map((m) => m.entity)].filter(Boolean) as string[];
    return ids.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  protected updated(changed: PropertyValues): void {
    // Round-trip complete: HA delivered a new entity object for the power entity.
    // Revert to HA ground truth and cancel the safety timeout.
    if (changed.has('hass') && this._optimisticOn !== null && this._config?.power) {
      const id = this._config.power;
      const prev = (changed.get('hass') as HomeAssistant | undefined)?.states[id];
      const next = this.hass?.states[id];
      if (prev !== next) {
        if (this._optimisticTimer !== null) {
          clearTimeout(this._optimisticTimer);
          this._optimisticTimer = null;
        }
        this._optimisticOn = null;
      }
    }
  }

  private _num(id?: string): number | null {
    const n = id ? Number(this.hass!.states[id]?.state) : NaN;
    return Number.isNaN(n) ? null : n;
  }

  private _isOn(id?: string): boolean {
    if (!id) return false;
    const st = this.hass!.states[id];
    if (!st) return false;
    return st.state === 'on' || (id.startsWith('water_heater.') && st.state !== 'off');
  }

  private _toggle(id: string | undefined, e: Event): void {
    e.stopPropagation();
    if (!id) return;

    const currentlyOn = this._isOn(id);

    // Only apply optimistic state for the main power entity so we get instant
    // visual feedback on the richest state change (pill, glow, bubbles, icon).
    if (id === this._config?.power) {
      this._optimisticOn = !currentlyOn;
      // Safety fallback: revert after 5 s if HA never confirms (e.g. service failed).
      if (this._optimisticTimer !== null) clearTimeout(this._optimisticTimer);
      this._optimisticTimer = setTimeout(() => {
        this._optimisticOn = null;
        this._optimisticTimer = null;
      }, 5000);
    }

    // water_heater domain has no 'toggle' service — use turn_on / turn_off explicitly.
    if (id.startsWith('water_heater.')) {
      this.hass!.callService('water_heater', currentlyOn ? 'turn_off' : 'turn_on', { entity_id: id });
    } else {
      this.hass!.callService('homeassistant', 'toggle', { entity_id: id });
    }
  }

  private _step(dir: 1 | -1, e: Event): void {
    e.stopPropagation();
    const id = this._config!.target;
    if (!id) return;
    const st = this.hass!.states[id];
    if (!st) return;
    const domain = id.split('.')[0];
    if (domain === 'number') {
      const v = Number(st.state);
      if (Number.isNaN(v)) return;
      const min = Number(st.attributes.min ?? this._config!.min_temp ?? 20);
      const max = Number(st.attributes.max ?? this._config!.max_temp ?? 70);
      const step = Number(st.attributes.step ?? 1);
      this.hass!.callService('number', 'set_value', { entity_id: id, value: Math.min(max, Math.max(min, v + dir * step)) });
    } else {
      const cur = Number(st.attributes.temperature);
      if (Number.isNaN(cur)) return;
      const step = Number(st.attributes.target_temp_step ?? 1);
      this.hass!.callService(domain, 'set_temperature', { entity_id: id, temperature: cur + dir * step });
    }
  }

  private _target(): number | null {
    const id = this._config!.target;
    if (!id) return null;
    const st = this.hass!.states[id];
    if (!st) return null;
    return id.startsWith('number.') ? this._num(id) : Number(st.attributes.temperature) || null;
  }

  private _fillColor(fill: number): string {
    const hue = Math.round(200 - fill * 170); // cyan(cold) -> orange(hot)
    return `hsl(${hue}, 72%, 52%)`;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const powerOn = this._optimisticOn !== null ? this._optimisticOn : this._isOn(c.power);
    const current = this._num(c.current);
    const target = this._target();
    const min = c.min_temp ?? 20;
    const max = c.max_temp ?? 70;
    const fill = current != null ? Math.max(0.05, Math.min(1, (current - min) / (max - min))) : 0.5;
    const heating = powerOn && current != null && target != null ? current < target - 0.5 : powerOn;
    const statusColor = !powerOn ? 'var(--g-dim)' : heating ? '#ff8c42' : 'var(--g-green)';
    const statusLabel = !powerOn ? 'Off' : heating ? 'Heating' : 'Ready';
    const elementGlow = heating ? '#ff8c42' : 'rgba(255,140,66,0.2)';
    const solarOn = this._isOn(c.solar_mode);

    return html`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:rgba(255,140,66,0.14)">${icon('water_heater', 26, statusColor)}</div>
          <div class="who"><div class="title">${c.name}</div><div class="sub">${c.subtitle}</div></div>
          ${c.power ? html`<div class="toggle ${powerOn ? 'on' : ''}" @click=${(e: Event) => this._toggle(c.power, e)}><div class="knob"></div></div>` : nothing}
        </div>

        <div class="body">
          <div class="tank">
            <div class="water" style="height:${fill * 100}%;background:linear-gradient(180deg, ${this._fillColor(fill)}, ${this._fillColor(Math.min(1, fill + 0.25))})">
              <div class="shimmer"></div>
            </div>
            <div class="element" style="background:${elementGlow};box-shadow:0 0 12px ${elementGlow}"></div>
            ${heating
              ? html`<span class="rise" style="left:24px"></span><span class="rise" style="left:44px;animation-delay:.5s"></span><span class="rise" style="left:62px;animation-delay:1s"></span>`
              : nothing}
            <div class="cur">${current != null ? Math.round(current) : '—'}°</div>
          </div>

          <div class="right">
            <span class="pill" style="color:${statusColor}"><span class="dot" style="background:${statusColor}"></span>${statusLabel}</span>
            <div class="stepper">
              <button class="step" @click=${(e: Event) => this._step(-1, e)}>${icon('remove', 20)}</button>
              <div class="tgt"><span class="t-num tv">${target ?? '—'}<span class="deg">°C</span></span><div class="tcap">Target temp</div></div>
              <button class="step" @click=${(e: Event) => this._step(1, e)}>${icon('add', 20)}</button>
            </div>
            ${c.solar || c.power_sensor
              ? html`<div class="tiles">
                  ${c.solar ? html`<div class="tile"><div class="th">${icon('wb_sunny', 14, 'var(--g-amber)')}Solar</div><div class="t-num tvv">${this._num(c.solar) ?? '—'}°</div></div>` : nothing}
                  ${c.power_sensor ? html`<div class="tile"><div class="th">${icon('bolt', 14, 'var(--g-purple)')}Power</div><div class="t-num tvv">${this._num(c.power_sensor) ?? '—'} <span class="u">kW</span></div></div>` : nothing}
                </div>`
              : nothing}
          </div>
        </div>

        ${c.solar_mode || this._modes.length
          ? html`<div class="modes">
              ${c.solar_mode
                ? html`<button class="mode ${solarOn ? 'on' : ''}" @click=${(e: Event) => this._toggle(c.solar_mode, e)}>${icon('wb_sunny', 18, solarOn ? 'var(--g-amber-ink)' : 'var(--g-amber)')}Solar</button>`
                : nothing}
              ${this._modes.map((m) => {
                const on = this._isOn(m.entity);
                const label = m.name ?? (this.hass!.states[m.entity]?.attributes.friendly_name as string) ?? m.entity;
                return html`<button class="mode ${on ? 'on' : ''}" @click=${(e: Event) => this._toggle(m.entity, e)}>${icon(m.icon ?? 'bolt', 18, on ? 'var(--g-amber-ink)' : 'var(--g-dim)')}${label}</button>`;
              })}
            </div>`
          : nothing}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      @keyframes g-rise { 0% { transform: translateY(6px); opacity: 0; } 30% { opacity: 0.9; } 100% { transform: translateY(-22px); opacity: 0; } }
      @keyframes g-shim { 0%, 100% { transform: translateX(-3px); } 50% { transform: translateX(3px); } }
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .body { display: flex; align-items: center; gap: 20px; }
      .tank { width: 88px; height: 132px; border-radius: 16px; background: var(--g-panel); border: 2px solid #2a2e36; position: relative; overflow: hidden; flex: none; }
      .water { position: absolute; left: 0; right: 0; bottom: 0; transition: height 0.4s, background 0.4s; }
      .shimmer { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent); animation: g-shim 3s ease-in-out infinite; }
      .element { position: absolute; left: 14px; right: 14px; bottom: 20px; height: 5px; border-radius: 5px; transition: all 0.3s; }
      .rise { position: absolute; bottom: 26px; width: 5px; height: 16px; border-radius: 5px; background: rgba(255, 180, 120, 0.7); animation: g-rise 1.6s ease-out infinite; }
      .cur { position: absolute; top: 8px; left: 0; right: 0; text-align: center; font-family: var(--g-display); font-size: 24px; font-weight: 600; color: #fff; text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6); }
      .right { flex: 1; display: flex; flex-direction: column; gap: 12px; }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); align-self: flex-start; }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
      .stepper { display: flex; align-items: center; gap: 14px; }
      .step { width: 38px; height: 38px; border-radius: 11px; border: none; cursor: pointer; background: var(--g-inset); color: var(--g-text-hi); display: flex; align-items: center; justify-content: center; }
      .step:hover { filter: brightness(1.3); }
      .tgt { text-align: center; flex: 1; }
      .tv { font-size: 30px; font-weight: 600; }
      .deg { font-size: 15px; color: var(--g-dim); }
      .tcap { font-size: 10.5px; color: var(--g-dim); margin-top: 2px; }
      .tiles { display: flex; gap: 10px; }
      .tile { flex: 1; background: var(--g-inset); border-radius: 12px; padding: 10px 12px; }
      .th { display: flex; align-items: center; gap: 5px; color: var(--g-dim); font-size: 10.5px; }
      .tvv { font-size: 16px; margin-top: 2px; }
      .u { font-size: 10px; color: var(--g-dim); }
      .modes { display: flex; gap: 8px; }
      .mode { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; border: none; border-radius: 12px; cursor: pointer; font-family: var(--g-font); font-size: 12.5px; font-weight: 700; background: var(--g-inset); color: var(--g-text); }
      .mode.on { background: var(--g-amber); color: var(--g-amber-ink); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-geyser-card': GlassGeyserCard;
  }
}
