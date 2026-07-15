import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassSprinklerCardConfig extends LovelaceCardConfig {
  entity: string; // switch / valve / input_boolean — watering on/off
  name?: string;
  subtitle?: string;
  variant?: 'hero' | 'compact';
}

@customElement('glass-sprinkler-card')
export class GlassSprinklerCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassSprinklerCardConfig;

  public setConfig(config: GlassSprinklerCardConfig): void {
    this._config = { variant: 'hero', ...config };
  }

  public getCardSize(): number {
    return this._config?.variant === 'compact' ? 1 : 4;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassSprinklerCardConfig, 'type'> {
    return { entity: '', name: 'Front Lawn', subtitle: 'Sprinkler zone', variant: 'hero' };
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

  private _on(): boolean {
    const s = this._st?.state;
    return s === 'on' || s === 'open';
  }

  private _toggle(e: Event): void {
    e.stopPropagation();
    this.hass!.callService('homeassistant', 'toggle', { entity_id: this._config!.entity });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._st) return placeholder('Select a sprinkler switch/valve', 'sprinkler');
    const on = this._on();
    const color = on ? 'var(--g-cyan)' : 'var(--g-dim)';
    const name = this._config.name ?? (this._st.attributes.friendly_name as string) ?? 'Sprinkler';

    if (this._config.variant === 'compact') {
      return html`
        <button class="tile ${on ? 'on' : ''}" @click=${this._toggle} title=${name}>
          <div class="top">${icon('sprinkler', 30, color)}<span class="dot" style="background:${on ? 'var(--g-cyan)' : 'var(--g-dim)'}"></span></div>
          <div><div class="tn">${name}</div><div class="ts" style="color:${color}">${on ? 'Watering' : 'Idle'}</div></div>
        </button>
      `;
    }

    return html`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:rgba(135,221,225,0.14)">${icon('sprinkler', 26, color)}</div>
          <div class="who"><div class="title">${name}</div><div class="sub">${this._config.subtitle ?? 'Sprinkler zone'}</div></div>
          <span class="pill" style="color:${color}"><span class="pdot" style="background:${color}"></span>${on ? 'Watering' : 'Idle'}</span>
        </div>

        <div class="scene">
          <div class="spray" style="opacity:${on ? 1 : 0}">
            ${[8, 24, 42, 58, 74, 90].map((l, i) => html`<span class="drop" style="left:${l}%;top:${[34, 18, 8, 8, 18, 34][i]}px;animation-delay:${[0, 0.2, 0.45, 0.3, 0.15, 0.5][i]}s"></span>`)}
          </div>
          <div class="arm" style=${on ? 'animation:g-arm 1.6s ease-in-out infinite' : ''}><div class="arm-bar" style="background:${on ? 'var(--g-cyan)' : '#3a4048'}"></div></div>
          <div class="headpiece" style="background:${on ? 'var(--g-cyan)' : '#3a4048'}"></div>
          <div class="grass"></div>
          <div class="blades">
            ${[16, 22, 14, 20, 17].map((h, i) => html`<span style="height:${h}px;background:${i % 2 ? '#256e3d' : '#1f6b38'};${on ? `animation:g-sway 1.4s ease-in-out infinite;animation-delay:${i * 0.15}s` : ''}"></span>`)}
          </div>
        </div>

        <button class="toggle-row" @click=${this._toggle}>
          <div><div class="tr-t">Watering</div><div class="tr-s">Tap to toggle</div></div>
          <div class="toggle ${on ? 'on' : ''}"><div class="knob"></div></div>
        </button>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      @keyframes g-drop { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 100% { transform: translateY(72px); opacity: 0; } }
      @keyframes g-arm { 0%, 100% { transform: rotate(-42deg); } 50% { transform: rotate(42deg); } }
      @keyframes g-sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pdot { width: 7px; height: 7px; border-radius: 50%; flex: none; }

      .scene { height: 180px; border-radius: 18px; background: linear-gradient(180deg, #0d1b22 0%, #0c1418 60%, #0a1a10 100%); position: relative; overflow: hidden; }
      .spray { position: absolute; left: 50%; bottom: 52px; transform: translateX(-50%); width: 140px; height: 110px; transition: opacity 0.3s; }
      .drop { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: #9fe8ec; animation: g-drop 1.3s ease-in infinite; }
      .arm { position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); width: 6px; height: 56px; transform-origin: bottom center; }
      .arm-bar { width: 4px; height: 56px; margin: 0 auto; border-radius: 4px; transition: background 0.3s; }
      .headpiece { position: absolute; left: 50%; bottom: 30px; transform: translateX(-50%); width: 26px; height: 16px; border-radius: 5px 5px 3px 3px; transition: background 0.3s; }
      .grass { position: absolute; left: 0; right: 0; bottom: 0; height: 34px; background: linear-gradient(180deg, #123a1e, #0a2412); }
      .blades { position: absolute; left: 0; right: 0; bottom: 22px; display: flex; justify-content: space-around; align-items: flex-end; padding: 0 10px; }
      .blades span { width: 4px; border-radius: 3px; transform-origin: bottom center; }

      .toggle-row { display: flex; align-items: center; justify-content: space-between; background: none; border: none; cursor: pointer; padding: 0; color: inherit; text-align: left; }
      .tr-t { font-size: 14px; font-weight: 700; }
      .tr-s { font-size: 11.5px; color: var(--g-dim); }

      .tile { width: 100%; aspect-ratio: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 14px; border-radius: 20px; cursor: pointer; text-align: left; background: var(--g-inset); border: 1px solid var(--g-hair); color: var(--g-text-hi); }
      .tile.on { background: rgba(135, 221, 225, 0.12); border-color: rgba(135, 221, 225, 0.3); }
      .top { display: flex; align-items: flex-start; justify-content: space-between; }
      .dot { width: 9px; height: 9px; border-radius: 50%; }
      .tn { font-size: 13.5px; font-weight: 700; line-height: 1.1; }
      .ts { font-size: 11.5px; font-weight: 600; margin-top: 2px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-sprinkler-card': GlassSprinklerCard;
  }
}
