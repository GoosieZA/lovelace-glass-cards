import { LitElement, html, css, nothing, svg, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassGarageCardConfig extends LovelaceCardConfig {
  entity: string; // cover.*
  name?: string;
  subtitle?: string;
  variant?: 'full' | 'compact';
}

@customElement('glass-garage-card')
export class GlassGarageCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassGarageCardConfig;

  public setConfig(config: GlassGarageCardConfig): void {
    this._config = { variant: 'full', ...config };
  }

  public getCardSize(): number {
    return this._config?.variant === 'compact' ? 1 : 4;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassGarageCardConfig, 'type'> {
    return { entity: '', variant: 'full' };
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

  /** 0 = closed (door down), 100 = fully open (door up). */
  private _openPct(): number {
    const st = this._st!;
    const pos = st.attributes.current_position;
    if (pos != null && !Number.isNaN(Number(pos))) return Number(pos);
    if (st.state === 'open') return 100;
    if (st.state === 'opening') return 60;
    if (st.state === 'closing') return 40;
    return 0;
  }

  private _look() {
    const s = this._st!.state;
    if (s === 'open') return { color: 'var(--g-amber)', label: 'Open', icon: 'garage_home' };
    if (s === 'opening' || s === 'closing') return { color: 'var(--g-amber)', label: s === 'opening' ? 'Opening…' : 'Closing…', icon: 'garage_home', moving: true };
    return { color: 'var(--g-green)', label: 'Closed', icon: 'garage' };
  }

  private _toggle(e: Event): void {
    e.stopPropagation();
    const s = this._st!.state;
    const service = s === 'open' || s === 'opening' ? 'close_cover' : 'open_cover';
    this.hass!.callService('cover', service, { entity_id: this._config!.entity });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._st) return placeholder('Select a garage door (cover) entity', 'garage');
    const look = this._look();
    const pct = this._openPct();
    const name = this._config.name ?? (this._st.attributes.friendly_name as string) ?? 'Garage';

    if (this._config.variant === 'compact') {
      return html`
        <button class="tile" @click=${this._toggle} title=${name}>
          <div class="top">
            <div class="mini">
              <div class="mini-door" style="transform:translateY(-${pct}%)"></div>
            </div>
            <span class="dot" style="background:${look.color}"></span>
          </div>
          <div><div class="tn">${name}</div><div class="ts" style="color:${look.color}">${look.label}</div></div>
        </button>
      `;
    }

    const open = pct > 5;
    return html`
      <div class="card">
        <div class="head">
          <div class="ibox" style="background:color-mix(in srgb, ${look.color} 14%, transparent)">${icon(look.icon, 26, look.color)}</div>
          <div class="who"><div class="title">${name}</div><div class="sub">${this._config.subtitle ?? this._config.entity}</div></div>
          <span class="pill" style="color:${look.color}"><span class="dot" style="background:${look.color}"></span>${look.label}</span>
        </div>

        <div class="stage">
          <div class="interior"></div>
          <div class="car" style="opacity:${open ? 0.9 : 0}">
            <svg viewBox="0 0 180 70" width="200" height="78">
              ${svg`
                <path d="M8 56 L26 34 Q30 28 40 27 L116 27 Q128 27 138 36 L166 48 Q174 51 174 58 L174 60 Q174 64 168 64 L14 64 Q8 64 8 58 Z" fill="#2a2e36"></path>
                <path d="M40 30 L112 30 Q122 30 130 38 L142 48 L44 48 Z" fill="#3a4250"></path>
                <circle cx="48" cy="62" r="11" fill="#14161a" stroke="#3a4250" stroke-width="3"></circle>
                <circle cx="140" cy="62" r="11" fill="#14161a" stroke="#3a4250" stroke-width="3"></circle>
              `}
            </svg>
          </div>
          <div class="frame">
            <div class="opening"></div>
            <div class="door" style="transform:translateY(-${pct}%)">
              <div class="handles"><span></span><span></span></div>
            </div>
          </div>
          <div class="floor"></div>
        </div>

        <button class="btn ${look.color === 'var(--g-amber)' ? 'primary' : 'soft'}" @click=${this._toggle}>
          ${icon(look.moving ? 'autorenew' : open ? 'arrow_downward' : 'arrow_upward', 20)}${open ? 'Close' : 'Open'}
        </button>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      @keyframes g-spin { to { transform: rotate(360deg); } }
      .card { display: flex; flex-direction: column; gap: 18px; }
      .head { display: flex; align-items: center; gap: 14px; }
      .ibox { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex: none; transition: background 0.3s; }
      .who { flex: 1; min-width: 0; }
      .sub { font-size: 12px; color: var(--g-dim); }
      .pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 6px 13px; border-radius: 999px; background: var(--g-inset); }
      .pill .dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }

      .stage { height: 240px; border-radius: 18px; background: linear-gradient(180deg, #0c0e11, #090a0c); position: relative; overflow: hidden; }
      .interior { position: absolute; inset: 0; background: radial-gradient(120% 80% at 50% 100%, #1a1d22 0%, #0c0e11 70%); }
      .car { position: absolute; left: 50%; bottom: 34px; transform: translateX(-50%); transition: opacity 0.5s; }
      .frame { position: absolute; inset: 14px; border-radius: 12px; overflow: hidden; }
      .opening { position: absolute; inset: 0; background: linear-gradient(180deg, #070809, #101318); }
      .door {
        position: absolute; inset: 0;
        background: repeating-linear-gradient(180deg, #3a4048 0 3px, #4a515b 3px 34px, #3a4048 34px 37px);
        border-bottom: 3px solid #2a2e36;
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.5);
        transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .handles { position: absolute; left: 0; right: 0; bottom: 52px; display: flex; justify-content: center; gap: 38px; }
      .handles span { width: 26px; height: 12px; border-radius: 4px; background: #20242b; }
      .floor { position: absolute; left: 14px; right: 14px; bottom: 14px; height: 4px; background: var(--g-amber); opacity: 0.5; }
      .btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px; border-radius: var(--g-r-ctl); border: none; cursor: pointer; font-family: var(--g-font); font-weight: 700; font-size: 14px; }
      .btn .ms { }
      .btn.primary .ms[style*='autorenew'] { animation: g-spin 1s linear infinite; }

      /* compact */
      .tile { width: 100%; aspect-ratio: 1; display: flex; flex-direction: column; justify-content: space-between; gap: 8px; padding: 13px; border-radius: 16px; cursor: pointer; text-align: left; background: var(--g-inset); border: 1px solid var(--g-hair); color: var(--g-text-hi); }
      .tile:hover { border-color: var(--g-border-hi); }
      .top { display: flex; align-items: flex-start; justify-content: space-between; }
      .mini { width: 40px; height: 36px; border-radius: 6px 6px 3px 3px; background: #0c0e11; position: relative; overflow: hidden; border: 1.5px solid #2a2e36; flex: none; }
      .mini-door { position: absolute; inset: 0; background: repeating-linear-gradient(180deg, #3a4048 0 2px, #4a515b 2px 9px); transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
      .tn { font-size: 13.5px; font-weight: 700; line-height: 1.1; }
      .ts { font-size: 11.5px; font-weight: 600; margin-top: 2px; }
      .dot { width: 9px; height: 9px; border-radius: 50%; flex: none; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-garage-card': GlassGarageCard;
  }
}
