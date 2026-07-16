import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassPersonBadgeCardConfig extends LovelaceCardConfig {
  entity: string; // person.* / device_tracker.*
  name?: string;
  battery?: string; // battery-level sensor (optional)
}

@customElement('glass-person-badge-card')
export class GlassPersonBadgeCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassPersonBadgeCardConfig;

  public setConfig(config: GlassPersonBadgeCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassPersonBadgeCardConfig, 'type'> {
    return { entity: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return [this._config.entity, this._config.battery].filter(Boolean).some((id) => old.states[id as string] !== this.hass!.states[id as string]);
  }

  private _batteryIcon(pct: number): string {
    if (pct >= 95) return 'battery_full';
    if (pct >= 60) return 'battery_5_bar';
    if (pct >= 40) return 'battery_3_bar';
    if (pct >= 15) return 'battery_2_bar';
    return 'battery_alert';
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const st = this._config.entity ? this.hass.states[this._config.entity] : undefined;
    if (!st) return placeholder('Select a person entity', 'person');

    const home = st.state === 'home';
    const zone = home ? 'Home' : st.state === 'not_home' ? 'Away' : st.state.charAt(0).toUpperCase() + st.state.slice(1);
    const zoneColor = home ? 'var(--g-green)' : st.state === 'not_home' ? 'var(--g-dim)' : 'var(--g-amber)';
    const name = this._config.name ?? (st.attributes.friendly_name as string) ?? this._config.entity;
    const pic = st.attributes.entity_picture as string | undefined;
    const initial = name.charAt(0).toUpperCase();
    const activity = home ? 'home' : st.state === 'not_home' ? 'directions_walk' : 'location_on';

    const batt = this._config.battery ? Number(this.hass.states[this._config.battery]?.state) : NaN;
    const hasBatt = !Number.isNaN(batt);

    return html`
      <button class="card" @click=${() => fireEvent(this, 'hass-more-info', { entityId: this._config!.entity })}>
        <div class="av-wrap">
          ${pic
            ? html`<img class="av" src=${pic} alt=${name} />`
            : html`<div class="av mono">${initial}</div>`}
          <span class="dot" style="background:${home ? 'var(--g-green)' : 'var(--g-dim)'}"></span>
        </div>
        <div class="mid">
          <div class="name">${name}</div>
          <div class="zone" style="color:${zoneColor}">${icon('location_on', 15, zoneColor)}${zone}</div>
        </div>
        <div class="right">
          ${hasBatt ? html`<div class="batt">${icon(this._batteryIcon(batt), 16, 'var(--g-text)')}${Math.round(batt)}</div>` : nothing}
          ${icon(activity, 17, home ? 'var(--g-green)' : 'var(--g-dim)')}
        </div>
      </button>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card {
        display: flex; align-items: center; gap: 14px; width: 100%;
        background: var(--g-card); border: 1px solid var(--g-hair); border-radius: 20px;
        padding: 16px 18px; cursor: pointer; text-align: left; color: var(--g-text-hi);
      }
      .av-wrap { position: relative; flex: none; }
      .av { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; display: block; }
      .av.mono { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--g-amber), var(--g-amber-deep)); color: var(--g-amber-ink); font-family: var(--g-display); font-weight: 700; font-size: 22px; }
      .dot { position: absolute; right: -1px; bottom: -1px; width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid var(--g-card); }
      .mid { flex: 1; min-width: 0; }
      .name { font-size: 16px; font-weight: 700; line-height: 1; }
      .zone { display: flex; align-items: center; gap: 6px; margin-top: 5px; font-size: 12.5px; font-weight: 600; }
      .right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex: none; }
      .batt { display: flex; align-items: center; gap: 4px; color: var(--g-text); font-size: 12.5px; font-weight: 700; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-person-badge-card': GlassPersonBadgeCard;
  }
}
