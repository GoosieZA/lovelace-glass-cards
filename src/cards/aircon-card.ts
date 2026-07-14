import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassAirconCardConfig extends LovelaceCardConfig {
  entity: string; // climate.*
  name?: string;
  subtitle?: string;
}

const MODE_META: Record<string, { icon: string; color: string }> = {
  off: { icon: 'power_settings_new', color: 'var(--g-dim)' },
  cool: { icon: 'ac_unit', color: 'var(--g-cyan)' },
  heat: { icon: 'local_fire_department', color: 'var(--g-amber)' },
  dry: { icon: 'water_drop', color: 'var(--g-purple)' },
  fan_only: { icon: 'mode_fan', color: 'var(--g-cyan)' },
  auto: { icon: 'autorenew', color: 'var(--g-green)' },
  heat_cool: { icon: 'device_thermostat', color: 'var(--g-green)' },
};

@customElement('glass-aircon-card')
export class GlassAirconCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassAirconCardConfig;

  public setConfig(config: GlassAirconCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassAirconCardConfig, 'type'> {
    return { entity: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private get _st() {
    return this.hass!.states[this._config!.entity];
  }

  private _setTemp(dir: 1 | -1, e: Event): void {
    e.stopPropagation();
    const a = this._st.attributes;
    const step = Number(a.target_temp_step ?? 0.5);
    const cur = Number(a.temperature);
    if (Number.isNaN(cur)) return;
    const min = Number(a.min_temp ?? 7);
    const max = Number(a.max_temp ?? 35);
    const next = Math.min(max, Math.max(min, cur + dir * step));
    this.hass!.callService('climate', 'set_temperature', { entity_id: this._config!.entity, temperature: next });
  }

  private _setMode(mode: string): void {
    this.hass!.callService('climate', 'set_hvac_mode', { entity_id: this._config!.entity, hvac_mode: mode });
  }

  private _setFan(mode: string): void {
    this.hass!.callService('climate', 'set_fan_mode', { entity_id: this._config!.entity, fan_mode: mode });
  }

  private _toggle(e: Event): void {
    e.stopPropagation();
    const on = this._st.state !== 'off';
    if (on) {
      this._setMode('off');
    } else {
      const modes = (this._st.attributes.hvac_modes as string[]) ?? [];
      this._setMode(modes.find((m) => m !== 'off') ?? 'cool');
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._st) return placeholder('Select a climate entity', 'mode_fan');
    const a = this._st.attributes;
    const mode = this._st.state;
    const on = mode !== 'off';
    const meta = MODE_META[mode] ?? MODE_META.off;
    const name = this._config.name ?? (a.friendly_name as string) ?? 'Aircon';
    const cur = a.current_temperature;
    const target = a.temperature != null ? Number(a.temperature) : null;
    const action = (a.hvac_action as string) ?? mode;
    const hvacModes = ((a.hvac_modes as string[]) ?? []).filter((m) => m !== 'off');
    const fanModes = (a.fan_modes as string[]) ?? [];

    return html`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${meta.color} 14%, transparent)">${icon(meta.icon, 26, meta.color)}</div>
          <div class="who"><div class="title">${name}</div><div class="sub">${this._config.subtitle ?? 'Climate'}${cur != null ? ` · ${cur}° now` : ''}</div></div>
          <div class="toggle ${on ? 'on' : ''}" @click=${this._toggle}><div class="knob"></div></div>
        </div>

        <div class="body">
          <div class="airflow">
            <svg viewBox="0 0 96 96" width="96" height="96">
              <rect x="16" y="20" width="64" height="18" rx="6" fill="var(--g-inset)" stroke="#2a2e36" stroke-width="1.5"></rect>
              <g fill="none" stroke="${meta.color}" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 9" style=${on ? 'animation:g-air 1.1s linear infinite' : 'opacity:0.25'}>
                <path d="M28 44 Q 24 62 30 80"></path>
                <path d="M48 44 L 48 82"></path>
                <path d="M68 44 Q 72 62 66 80"></path>
              </g>
            </svg>
          </div>
          <div class="right">
            <span class="pill" style="color:${meta.color}"><span class="dot" style="background:${meta.color}"></span>${action.replace(/_/g, ' ')}</span>
            <div class="stepper">
              <button class="step" @click=${(e: Event) => this._setTemp(-1, e)}>${icon('remove', 20)}</button>
              <div class="tgt"><span class="t-num tv">${target ?? '—'}</span><span class="deg">°C</span><div class="tcap">Set point</div></div>
              <button class="step" @click=${(e: Event) => this._setTemp(1, e)}>${icon('add', 20)}</button>
            </div>
          </div>
        </div>

        ${hvacModes.length
          ? html`<div class="seg">
              ${hvacModes.map((m) => {
                const mm = MODE_META[m] ?? { icon: 'circle', color: 'var(--g-text)' };
                return html`<button class="sg ${mode === m ? 'on' : ''}" title=${m} @click=${() => this._setMode(m)}>${icon(mm.icon, 19)}</button>`;
              })}
            </div>`
          : nothing}

        ${fanModes.length
          ? html`<div class="fan-row">
              ${icon('air', 18, 'var(--g-dim)')}
              <div class="seg fan">
                ${fanModes.map((fm) => html`<button class="sg txt ${a.fan_mode === fm ? 'on' : ''}" @click=${() => this._setFan(fm)}>${fm}</button>`)}
              </div>
            </div>`
          : nothing}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      @keyframes g-air { to { stroke-dashoffset: -26; } }
      .card { display: flex; flex-direction: column; gap: 16px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .body { display: flex; align-items: center; gap: 18px; }
      .airflow { width: 96px; height: 96px; border-radius: 18px; background: var(--g-panel); flex: none; display: flex; align-items: center; justify-content: center; }
      .right { flex: 1; display: flex; flex-direction: column; gap: 12px; }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); text-transform: capitalize; align-self: flex-start; }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
      .stepper { display: flex; align-items: center; gap: 14px; }
      .step { width: 40px; height: 40px; border-radius: 12px; border: none; cursor: pointer; background: var(--g-inset); color: var(--g-text-hi); display: flex; align-items: center; justify-content: center; }
      .step:hover { filter: brightness(1.3); }
      .tgt { text-align: center; flex: 1; }
      .tv { font-size: 34px; }
      .deg { font-size: 15px; color: var(--g-dim); }
      .tcap { font-size: 10.5px; color: var(--g-dim); margin-top: 2px; }
      .seg { display: flex; gap: 6px; background: var(--g-inset); padding: 5px; border-radius: 14px; }
      .sg { flex: 1; display: flex; align-items: center; justify-content: center; padding: 9px; border: none; border-radius: 10px; background: transparent; color: var(--g-text); cursor: pointer; }
      .sg.txt { font-family: var(--g-font); font-size: 12px; font-weight: 700; text-transform: capitalize; }
      .sg.on { background: var(--g-amber); color: var(--g-amber-ink); }
      .fan-row { display: flex; align-items: center; gap: 10px; }
      .fan { flex: 1; padding: 4px; border-radius: 11px; }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-aircon-card': GlassAirconCard;
  }
}
