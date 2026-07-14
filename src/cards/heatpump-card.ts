import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassHeatpumpCardConfig extends LovelaceCardConfig {
  entity: string; // climate.*
  name?: string;
  subtitle?: string;
}

const MODE_META: Record<string, { icon: string; color: string; label: string }> = {
  heat: { icon: 'local_fire_department', color: 'var(--g-amber)', label: 'Heat' },
  cool: { icon: 'ac_unit', color: 'var(--g-cyan)', label: 'Cool' },
  auto: { icon: 'autorenew', color: 'var(--g-green)', label: 'Auto' },
  heat_cool: { icon: 'device_thermostat', color: 'var(--g-green)', label: 'Auto' },
  off: { icon: 'power_settings_new', color: 'var(--g-dim)', label: 'Off' },
};

@customElement('glass-heatpump-card')
export class GlassHeatpumpCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassHeatpumpCardConfig;

  public setConfig(config: GlassHeatpumpCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassHeatpumpCardConfig, 'type'> {
    return { entity: '', name: 'Heat Pump', subtitle: 'Pool heater' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private get _st() {
    return this._config!.entity ? this.hass!.states[this._config!.entity] : undefined;
  }

  private _step(dir: 1 | -1, e: Event): void {
    e.stopPropagation();
    const a = this._st!.attributes;
    const step = Number(a.target_temp_step ?? 0.5);
    const cur = Number(a.temperature);
    if (Number.isNaN(cur)) return;
    const min = Number(a.min_temp ?? 15);
    const max = Number(a.max_temp ?? 40);
    this.hass!.callService('climate', 'set_temperature', { entity_id: this._config!.entity, temperature: Math.min(max, Math.max(min, cur + dir * step)) });
  }

  private _setMode(mode: string): void {
    this.hass!.callService('climate', 'set_hvac_mode', { entity_id: this._config!.entity, hvac_mode: mode });
  }

  private _toggle(e: Event): void {
    e.stopPropagation();
    const on = this._st!.state !== 'off';
    if (on) this._setMode('off');
    else {
      const modes = (this._st!.attributes.hvac_modes as string[]) ?? [];
      this._setMode(modes.find((m) => m !== 'off') ?? 'heat');
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const st = this._st;
    if (!st) return placeholder('Select a heat-pump (climate) entity', 'heat_pump');
    const a = st.attributes;
    const mode = st.state;
    const on = mode !== 'off';
    const meta = MODE_META[mode] ?? MODE_META.off;
    const name = this._config.name ?? (a.friendly_name as string) ?? 'Heat Pump';
    const target = a.temperature != null ? Number(a.temperature) : null;
    const min = Number(a.min_temp ?? 15);
    const max = Number(a.max_temp ?? 40);
    const pct = target != null ? Math.max(0, Math.min(100, ((target - min) / (max - min)) * 100)) : 0;
    const action = ((a.hvac_action as string) ?? mode).replace(/_/g, ' ');
    const modes = ((a.hvac_modes as string[]) ?? []).filter((m) => ['heat', 'cool', 'auto', 'heat_cool'].includes(m));

    return html`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${meta.color} 14%, transparent)">${icon('heat_pump', 26, meta.color)}</div>
          <div class="who"><div class="title">${name}</div><div class="sub">${this._config.subtitle ?? 'Heater'}</div></div>
          <div class="toggle ${on ? 'on' : ''}" @click=${this._toggle}><div class="knob"></div></div>
        </div>

        <div class="dial">
          <button class="step" @click=${(e: Event) => this._step(-1, e)}>${icon('remove', 22)}</button>
          <div class="ring" style="background:conic-gradient(${meta.color} 0 ${pct}%, rgba(255,255,255,0.07) ${pct}% 100%)">
            <div class="ring-in">
              <div class="t-num tv">${target ?? '—'}<span class="deg">°</span></div>
              <span class="pill" style="color:${meta.color}"><span class="dot" style="background:${meta.color}"></span>${action}</span>
            </div>
          </div>
          <button class="step" @click=${(e: Event) => this._step(1, e)}>${icon('add', 22)}</button>
        </div>

        ${modes.length
          ? html`<div class="seg">
              ${modes.map((m) => {
                const mm = MODE_META[m] ?? MODE_META.off;
                return html`<button class="sg ${mode === m ? 'on' : ''}" @click=${() => this._setMode(m)}>${icon(mm.icon, 17)}${mm.label}</button>`;
              })}
            </div>`
          : nothing}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .dial { display: flex; align-items: center; justify-content: center; gap: 18px; }
      .step { width: 44px; height: 44px; border-radius: 13px; border: none; cursor: pointer; background: var(--g-inset); color: var(--g-text-hi); display: flex; align-items: center; justify-content: center; flex: none; }
      .step:hover { filter: brightness(1.3); }
      .ring { width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none; transition: background 0.3s; }
      .ring-in { width: 98px; height: 98px; border-radius: 50%; background: var(--g-card); display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .tv { font-size: 34px; font-weight: 600; }
      .deg { font-size: 15px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; background: var(--g-inset); margin-top: 5px; text-transform: capitalize; }
      .pill .dot { width: 6px; height: 6px; border-radius: 50%; flex: none; }
      .seg { display: flex; gap: 6px; background: var(--g-inset); padding: 5px; border-radius: 14px; }
      .sg { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px; border: none; border-radius: 10px; background: transparent; color: var(--g-text); cursor: pointer; font-family: var(--g-font); font-size: 12.5px; font-weight: 700; }
      .sg.on { background: var(--g-amber); color: var(--g-amber-ink); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-heatpump-card': GlassHeatpumpCard;
  }
}
