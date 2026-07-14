import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon } from '../theme/tokens';

interface ToggleRow {
  entity: string;
  name?: string;
  icon?: string;
}

interface GlassFridgeCardConfig extends LovelaceCardConfig {
  name?: string;
  subtitle?: string;
  door?: string; // binary_sensor
  wifi?: string; // binary_sensor connectivity
  fridge_temp?: string; // number
  freezer_temp?: string; // number
  toggles?: (string | ToggleRow)[]; // express cool / mode switches
}

@customElement('glass-fridge-card')
export class GlassFridgeCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassFridgeCardConfig;
  private _toggles: ToggleRow[] = [];

  public setConfig(config: GlassFridgeCardConfig): void {
    this._toggles = (config.toggles ?? []).map((t) => (typeof t === 'string' ? { entity: t } : t));
    this._config = { name: 'Refrigerator', subtitle: 'Kitchen', ...config };
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassFridgeCardConfig, 'type'> {
    return { name: 'Refrigerator', subtitle: 'Kitchen', door: '', fridge_temp: '', freezer_temp: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    const ids = [this._config.door, this._config.wifi, this._config.fridge_temp, this._config.freezer_temp, ...this._toggles.map((t) => t.entity)].filter(Boolean) as string[];
    return ids.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  private _num(id?: string) {
    const st = id ? this.hass!.states[id] : undefined;
    if (!st) return null;
    const v = Number(st.state);
    return {
      value: Number.isNaN(v) ? null : v,
      min: Number(st.attributes.min ?? -30),
      max: Number(st.attributes.max ?? 30),
      step: Number(st.attributes.step ?? 1),
    };
  }

  private _step(id: string | undefined, dir: 1 | -1, e: Event): void {
    e.stopPropagation();
    const n = this._num(id);
    if (!id || !n || n.value == null) return;
    const next = Math.min(n.max, Math.max(n.min, n.value + dir * n.step));
    this.hass!.callService('number', 'set_value', { entity_id: id, value: next });
  }

  private _toggle(id: string, e: Event): void {
    e.stopPropagation();
    this.hass!.callService('homeassistant', 'toggle', { entity_id: id });
  }

  private _tempTile(label: string, ico: string, color: string, id?: string) {
    const n = this._num(id);
    return html`
      <div class="tt">
        <div class="tt-h" style="color:${color}">${icon(ico, 18, color)}${label}</div>
        <div class="stepper">
          <button class="step" @click=${(e: Event) => this._step(id, -1, e)}>${icon('remove', 20)}</button>
          <div class="temp"><span class="t-num tv">${n?.value ?? '—'}</span><span class="deg">°C</span></div>
          <button class="step" @click=${(e: Event) => this._step(id, 1, e)}>${icon('add', 20)}</button>
        </div>
        ${n ? html`<div class="range">range ${n.min}…${n.max} °C</div>` : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const doorOpen = c.door ? this.hass.states[c.door]?.state === 'on' : false;
    const online = c.wifi ? this.hass.states[c.wifi]?.state === 'on' : null;

    return html`
      <div class="card">
        <div class="head">
          <div class="ibox">${icon('kitchen', 26, 'var(--g-cyan)')}</div>
          <div class="who">
            <div class="title">${c.name}</div>
            <div class="sub">
              ${c.subtitle}${online != null
                ? html` · ${icon('wifi', 14, online ? 'var(--g-green)' : 'var(--g-dim)')}${online ? 'Connected' : 'Offline'}`
                : nothing}
            </div>
          </div>
          ${c.door
            ? html`<button class="pill ${doorOpen ? 'open' : 'closed'}" @click=${() => fireEvent(this, 'hass-more-info', { entityId: c.door! })}>
                <span class="dot"></span>Door ${doorOpen ? 'Open' : 'Closed'}
              </button>`
            : nothing}
        </div>

        <div class="grid">
          ${this._tempTile('Fridge', 'ac_unit', 'var(--g-cyan)', c.fridge_temp)}
          ${this._tempTile('Freezer', 'severe_cold', 'var(--g-purple)', c.freezer_temp)}
        </div>

        ${this._toggles.length
          ? html`<div class="rows">
              ${this._toggles.map((t) => {
                const st = this.hass!.states[t.entity];
                const on = st?.state === 'on';
                let n = t.name ?? (st?.attributes.friendly_name as string) ?? t.entity;
                if (c.name && n.toLowerCase().startsWith(c.name.toLowerCase() + ' ')) n = n.slice(c.name.length + 1);
                const ico = t.icon ?? (/cool/i.test(n) ? 'mode_cool' : 'bolt');
                return html`
                  <div class="row">
                    ${icon(ico, 22, on ? 'var(--g-cyan)' : 'var(--g-dim)')}
                    <div class="row-t"><div class="rn">${n}</div></div>
                    <div class="toggle ${on ? 'on' : ''}" @click=${(e: Event) => this._toggle(t.entity, e)}><div class="knob"></div></div>
                  </div>
                `;
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
      .ibox { width: 48px; height: 48px; border-radius: 14px; background: rgba(135, 221, 225, 0.14); display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; border: none; cursor: pointer; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; flex: none; }
      .pill.open { background: rgba(243, 208, 106, 0.16); color: var(--g-amber); }
      .pill.closed { background: rgba(185, 246, 166, 0.14); color: var(--g-green); }

      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .tt { background: var(--g-inset); border-radius: var(--g-r-sm); padding: 16px; display: flex; flex-direction: column; gap: 14px; }
      .tt-h { display: flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 700; }
      .stepper { display: flex; align-items: center; justify-content: space-between; }
      .step { width: 34px; height: 34px; border-radius: 10px; border: none; cursor: pointer; background: rgba(255, 255, 255, 0.06); color: var(--g-text-hi); display: flex; align-items: center; justify-content: center; }
      .step:hover { filter: brightness(1.3); }
      .temp { text-align: center; }
      .tv { font-size: 32px; }
      .deg { font-size: 15px; color: var(--g-dim); }
      .range { font-size: 10.5px; color: var(--g-faint); font-family: var(--g-mono); text-align: center; }

      .rows { display: flex; flex-direction: column; }
      .row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--g-hair); }
      .row:last-child { border-bottom: none; }
      .row-t { flex: 1; min-width: 0; }
      .rn { font-size: 14px; font-weight: 700; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-fridge-card': GlassFridgeCard;
  }
}
