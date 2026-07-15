import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

type AlarmVariant = 'shield' | 'radial' | 'bar' | 'keypad' | 'triggered';

interface ButtonDef {
  label: string;
  icon: string;
  service: string;
  activeState?: string;
}

// A button in config is either a preset key (string) or a custom object.
type ButtonConfig = string | { label: string; service: string; icon?: string; state?: string };

interface GlassAlarmCardConfig extends LovelaceCardConfig {
  entity: string; // alarm_control_panel.*
  name?: string;
  subtitle?: string;
  code?: string; // optional fixed code
  code_length?: number; // keypad auto-submit length
  buttons?: ButtonConfig[];
  variant?: AlarmVariant;
}

const BUTTON_DEFS: Record<string, ButtonDef> = {
  disarm: { label: 'Disarm', icon: 'lock_open', service: 'alarm_disarm' },
  arm: { label: 'Arm', icon: 'lock', service: 'alarm_arm_away', activeState: 'armed_away' },
  arm_home: { label: 'Home', icon: 'home', service: 'alarm_arm_home', activeState: 'armed_home' },
  arm_away: { label: 'Away', icon: 'lock', service: 'alarm_arm_away', activeState: 'armed_away' },
  arm_night: { label: 'Night', icon: 'bedtime', service: 'alarm_arm_night', activeState: 'armed_night' },
  arm_vacation: { label: 'Vacation', icon: 'luggage', service: 'alarm_arm_vacation', activeState: 'armed_vacation' },
};

const DEFAULT_BUTTONS = ['disarm', 'arm_home', 'arm_away'];

interface Look {
  accent: string;
  glyph: string;
  label: string;
  border: string;
  blink: boolean;
}

@customElement('glass-alarm-card')
export class GlassAlarmCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassAlarmCardConfig;
  @state() private _code = '';

  public setConfig(config: GlassAlarmCardConfig): void {
    this._config = { variant: 'shield', ...config };
  }

  public getCardSize(): number {
    return this._config?.variant === 'bar' || this._config?.variant === 'triggered' ? 1 : 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassAlarmCardConfig, 'type'> {
    return { entity: '', variant: 'shield' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config') || changed.has('_code')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private _look(stateStr: string): Look {
    switch (stateStr) {
      case 'armed_away':
        return { accent: 'var(--g-green)', glyph: 'verified_user', label: 'Armed · Away', border: 'rgba(185,246,166,0.25)', blink: false };
      case 'armed_home':
      case 'armed_night':
      case 'armed_custom_bypass':
        return { accent: 'var(--g-green)', glyph: 'security', label: 'Armed · ' + stateStr.replace('armed_', '').replace('_', ' '), border: 'rgba(185,246,166,0.25)', blink: false };
      case 'arming':
      case 'pending':
        return { accent: 'var(--g-amber)', glyph: 'shield_moon', label: stateStr === 'arming' ? 'Arming…' : 'Entry delay', border: 'rgba(243,208,106,0.3)', blink: true };
      case 'triggered':
        return { accent: 'var(--g-red-text)', glyph: 'crisis_alert', label: 'Triggered', border: 'rgba(255,92,92,0.4)', blink: true };
      default:
        return { accent: 'var(--g-dim)', glyph: 'gpp_maybe', label: 'Disarmed', border: 'var(--g-hair)', blink: false };
    }
  }

  private get _st() {
    return this.hass!.states[this._config!.entity];
  }

  private _call(service: string, code?: string): void {
    const data: Record<string, unknown> = { entity_id: this._config!.entity };
    const c = code ?? this._config!.code;
    if (c) data.code = c;
    this.hass!.callService('alarm_control_panel', service, data);
  }

  private _more(): void {
    fireEvent(this, 'hass-more-info', { entityId: this._config!.entity });
  }

  private _time(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  // ---- keypad ----
  private _key(k: string): void {
    const len = this._config!.code_length ?? 4;
    if (k === 'back') {
      this._code = this._code.slice(0, -1);
      return;
    }
    if (k === 'ok') {
      this._submitCode();
      return;
    }
    if (this._code.length >= len) return;
    this._code += k;
    if (this._code.length === len) this._submitCode();
  }

  private _submitCode(): void {
    if (!this._code) return;
    const armed = this._st.state.startsWith('armed') || this._st.state === 'triggered';
    this._call(armed ? 'alarm_disarm' : 'alarm_arm_away', this._code);
    this._code = '';
  }

  private _resolveButton(b: ButtonConfig): ButtonDef | undefined {
    if (typeof b === 'string') return BUTTON_DEFS[b];
    if (!b || !b.service) return undefined;
    return { label: b.label, icon: b.icon ?? 'lock', service: b.service, activeState: b.state };
  }

  private _actionButtons() {
    return (this._config!.buttons ?? DEFAULT_BUTTONS)
      .map((b) => this._resolveButton(b))
      .filter((b): b is ButtonDef => !!b)
      .map(
        (b) => html`
          <button class="btn ${b.activeState && this._st.state === b.activeState ? 'success' : 'soft'}" @click=${() => this._call(b.service)}>
            ${icon(b.icon, 18)}${b.label}
          </button>
        `
      );
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._st) return placeholder('Select an alarm panel', 'security');
    switch (this._config.variant) {
      case 'radial':
        return this._renderRadial();
      case 'bar':
        return this._renderBar();
      case 'keypad':
        return this._renderKeypad();
      case 'triggered':
        return this._renderTriggered();
      default:
        return this._renderShield();
    }
  }

  private _header(look: Look, name: string) {
    return html`
      <div class="row">
        <div class="badge-box ${look.blink ? 'blink' : ''}" style="--a:${look.accent}">${icon(look.glyph, 26, look.accent)}</div>
        <div class="who">
          <div class="title">${name}</div>
          <div class="sub" style="color:${look.accent}">${look.label}</div>
        </div>
        <button class="more" @click=${this._more}>${icon('more_horiz', 20, 'var(--g-dim)')}</button>
      </div>
    `;
  }

  private _renderShield() {
    const look = this._look(this._st.state);
    const name = this._config!.name ?? (this._st.attributes.friendly_name as string) ?? 'Security';
    return html`<div class="card" style="border-color:${look.border}">
      ${this._header(look, name)}
      <div class="actions">${this._actionButtons()}</div>
    </div>`;
  }

  private _renderRadial() {
    const look = this._look(this._st.state);
    const name = this._config!.name ?? (this._st.attributes.friendly_name as string) ?? 'Security';
    return html`<div class="card center" style="border-color:${look.border}">
      <div class="ring ${look.blink ? 'blink' : ''}" style="background:color-mix(in srgb, ${look.accent} 20%, transparent)">
        <div class="ring-in">
          ${icon(look.glyph, 44, look.accent)}
          <div class="ring-label" style="color:${look.accent}">${look.label}</div>
        </div>
      </div>
      <div class="name-c">${name}</div>
      <div class="actions">${this._actionButtons()}</div>
    </div>`;
  }

  private _renderBar() {
    const look = this._look(this._st.state);
    const name = this._config!.name ?? (this._st.attributes.friendly_name as string) ?? 'Security';
    const armed = this._st.state.startsWith('armed') || this._st.state === 'triggered';
    return html`<div class="bar" style="border-color:${look.border}">
      <div class="badge-box sm ${look.blink ? 'blink' : ''}" style="--a:${look.accent}">${icon(look.glyph, 24, look.accent)}</div>
      <div class="who"><div class="title sm">${look.label}</div><div class="sub2">${this._config!.subtitle ?? name}</div></div>
      <button class="btn soft" @click=${() => this._call(armed ? 'alarm_disarm' : 'alarm_arm_away')}>
        ${icon(armed ? 'lock_open' : 'lock', 17)}${armed ? 'Disarm' : 'Arm'}
      </button>
    </div>`;
  }

  private _renderKeypad() {
    const len = this._config!.code_length ?? 4;
    const dots = Array.from({ length: len }, (_, i) => (i < this._code.length ? '●' : '○')).join(' ');
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0', 'ok'];
    const look = this._look(this._st.state);
    return html`<div class="card">
      <div class="disp"><span class="ms" style="font-size:22px;color:${look.accent}">${look.glyph}</span><div class="dots">${dots}</div></div>
      <div class="pad">
        ${keys.map((k) =>
          k === 'back'
            ? html`<button class="k" @click=${() => this._key('back')}>${icon('backspace', 20, 'var(--g-dim)')}</button>`
            : k === 'ok'
              ? html`<button class="k ok" @click=${() => this._key('ok')}>${icon('check', 20, 'var(--g-amber-ink)')}</button>`
              : html`<button class="k" @click=${() => this._key(k)}>${k}</button>`
        )}
      </div>
    </div>`;
  }

  private _renderTriggered() {
    const triggered = this._st.state === 'triggered';
    if (triggered) {
      return html`<div class="alert red">
        <div class="badge-box sm blink" style="--a:var(--g-red-text)">${icon('crisis_alert', 24, 'var(--g-red-text)')}</div>
        <div class="who"><div class="title sm" style="color:var(--g-red-text)">Alarm triggered</div>
          <div class="sub2">${(this._st.attributes.changed_by as string) ?? 'Sensor'} · ${this._time(this._st.last_changed)}</div></div>
        <button class="btn danger" @click=${() => this._call('alarm_disarm')}>Dismiss</button>
      </div>`;
    }
    const look = this._look(this._st.state);
    return html`<div class="alert" style="border-color:${look.border}">
      <div class="badge-box sm" style="--a:${look.accent}">${icon('verified_user', 24, look.accent)}</div>
      <div class="who"><div class="title sm">All secure</div><div class="sub2" style="color:${look.accent}">${look.label}</div></div>
    </div>`;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 16px; border: 1px solid var(--g-hair); }
      .card.center { align-items: center; }
      .row { display: flex; align-items: center; gap: 14px; }
      .badge-box { width: 50px; height: 50px; border-radius: 15px; background: color-mix(in srgb, var(--a) 14%, transparent); display: flex; align-items: center; justify-content: center; flex: none; }
      .badge-box.sm { width: 42px; height: 42px; border-radius: 12px; }
      .blink { animation: g-blink 1.2s ease-in-out infinite; }
      @keyframes g-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 13px; font-weight: 600; margin-top: 1px; text-transform: capitalize; }
      .sub2 { font-size: 12px; color: var(--g-dim); }
      .title.sm { font-size: 15px; }
      .more { background: none; border: none; cursor: pointer; padding: 4px; }
      .actions { display: flex; gap: 10px; width: 100%; }
      .actions .btn { flex: 1; padding: 11px; border-radius: var(--g-r-ctl); }

      .ring { width: 150px; height: 150px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
      .ring-in { width: 122px; height: 122px; border-radius: 50%; background: var(--g-card); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; }
      .ring-label { font-size: 13px; font-weight: 700; text-transform: capitalize; }
      .name-c { font-size: 14px; font-weight: 700; }

      .bar, .alert { display: flex; align-items: center; gap: 14px; background: var(--g-card); border: 1px solid var(--g-hair); border-radius: 18px; padding: 14px 18px; }
      .alert.red { background: rgba(255, 92, 92, 0.1); border-color: rgba(255, 92, 92, 0.4); }

      .disp { display: flex; align-items: center; gap: 10px; background: var(--g-inset); border-radius: var(--g-r-ctl); padding: 12px 16px; }
      .dots { flex: 1; font-family: var(--g-mono); font-size: 22px; letter-spacing: 4px; color: var(--g-text-hi); }
      .pad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
      .k { aspect-ratio: 1.6; display: flex; align-items: center; justify-content: center; background: var(--g-inset); border: none; border-radius: 12px; font-family: var(--g-display); font-size: 20px; font-weight: 600; cursor: pointer; color: var(--g-text-hi); }
      .k:hover { filter: brightness(1.25); }
      .k.ok { background: var(--g-amber); }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-alarm-card': GlassAlarmCard;
  }
}
