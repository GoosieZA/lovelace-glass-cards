import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassClimateTileCardConfig extends LovelaceCardConfig {
  entity: string; // climate.* / water_heater.* / sensor.*
  name?: string;
  icon?: string;
  color?: 'amber' | 'cyan' | 'purple' | 'green' | 'red' | 'orange';
}

const ACCENTS: Record<string, string> = {
  amber: 'var(--g-amber)',
  cyan: 'var(--g-cyan)',
  purple: 'var(--g-purple)',
  green: 'var(--g-green)',
  red: 'var(--g-red-text)',
  orange: '#ff8c42',
};

@customElement('glass-climate-tile-card')
export class GlassClimateTileCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassClimateTileCardConfig;

  public setConfig(config: GlassClimateTileCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassClimateTileCardConfig, 'type'> {
    return { entity: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  // Current temperature: the climate/water_heater attribute, else the raw state.
  private _temp(): string {
    const st = this.hass!.states[this._config!.entity];
    if (!st) return '—';
    const attr = st.attributes.current_temperature;
    const raw = attr != null ? Number(attr) : Number(st.state);
    return Number.isNaN(raw) ? '—' : String(Math.round(raw * 10) / 10);
  }

  private _defaultIcon(domain: string): string {
    if (domain === 'water_heater') return 'water_heater';
    if (domain === 'climate') return 'mode_fan';
    return 'device_thermostat';
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._config.entity) return placeholder('Select a climate entity', 'device_thermostat');
    const st = this.hass.states[this._config.entity];
    if (!st) return placeholder('Entity not found', 'device_thermostat');

    const domain = this._config.entity.split('.')[0];
    const color = ACCENTS[this._config.color ?? (domain === 'water_heater' ? 'orange' : 'cyan')] ?? 'var(--g-cyan)';
    const ico = this._config.icon ?? this._defaultIcon(domain);
    const label = this._config.name ?? (st.attributes.friendly_name as string) ?? this._config.entity;

    return html`
      <div class="card" @click=${() => fireEvent(this, 'hass-more-info', { entityId: this._config!.entity })}>
        ${icon(ico, 22, color)}
        <div class="txt">
          <div class="temp">${this._temp()}°</div>
          <div class="lbl">${label}</div>
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; align-items: center; gap: 11px; padding: 14px; cursor: pointer; }
      .txt { min-width: 0; }
      .temp { font-family: var(--g-display); font-size: 17px; font-weight: 600; line-height: 1; }
      .lbl { font-size: 10.5px; color: var(--g-dim); margin-top: 2px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-climate-tile-card': GlassClimateTileCard;
  }
}
