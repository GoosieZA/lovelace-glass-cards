import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassCameraCardConfig extends LovelaceCardConfig {
  entity: string; // camera.*
  name?: string;
  icon?: string;
}

@customElement('glass-camera-card')
export class GlassCameraCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassCameraCardConfig;

  public setConfig(config: GlassCameraCardConfig): void {
    this._config = { icon: 'videocam', ...config };
  }

  public getCardSize(): number {
    return 3;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassCameraCardConfig, 'type'> {
    return { entity: 'camera.garage', icon: 'garage' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private _stamp(iso?: string): string {
    const d = iso ? new Date(iso) : new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} · ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const st = this._config.entity ? this.hass.states[this._config.entity] : undefined;
    if (!st) return placeholder('Select a camera entity', 'videocam');

    const pic = st.attributes.entity_picture as string | undefined;
    const name = this._config.name ?? (st.attributes.friendly_name as string) ?? this._config.entity;
    const live = st.state === 'streaming' || st.state === 'recording' || st.state === 'idle';

    return html`
      <div class="cam" @click=${() => fireEvent(this, 'hass-more-info', { entityId: this._config!.entity })}>
        ${pic ? html`<img src=${pic} alt=${name} />` : nothing}
        <div class="scan"></div>
        <div class="ts">${this._stamp(st.last_changed)}</div>
        ${live
          ? html`<div class="live-badge"><span class="rec"></span>LIVE</div>`
          : html`<div class="live-badge off">OFFLINE</div>`}
        ${!pic ? html`<div class="ph">${icon('videocam', 52)}</div>` : nothing}
        <div class="label">${icon(this._config.icon!, 20, '#fff')}<span>${name}</span></div>
        <div class="expand">${icon('open_in_full', 20, '#fff')}</div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .cam {
        position: relative;
        width: 100%;
        aspect-ratio: 452 / 262;
        border-radius: var(--g-r-card);
        overflow: hidden;
        cursor: pointer;
        background: radial-gradient(130% 100% at 50% 35%, #2b2f33 0%, #14161a 55%, #0c0e11 100%);
      }
      .cam img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .scan {
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 3px);
        pointer-events: none;
      }
      .ts {
        position: absolute;
        top: 14px;
        left: 16px;
        font-family: var(--g-mono);
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      }
      .live-badge {
        position: absolute;
        top: 12px;
        right: 14px;
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(0, 0, 0, 0.35);
        padding: 5px 10px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #fff;
      }
      .live-badge.off { color: var(--g-dim); }
      .rec { width: 8px; height: 8px; border-radius: 50%; background: var(--g-red); }
      .ph { position: absolute; left: 50%; top: 44%; transform: translate(-50%, -50%); color: rgba(255, 255, 255, 0.18); }
      .label {
        position: absolute;
        left: 16px;
        bottom: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
      }
      .expand {
        position: absolute;
        right: 14px;
        bottom: 14px;
        width: 36px;
        height: 36px;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .missing { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--g-red-text); font-size: 13px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-camera-card': GlassCameraCard;
  }
}
