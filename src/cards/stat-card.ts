import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassStatCardConfig extends LovelaceCardConfig {
  entity: string;
  name?: string; // the small label under the value
  icon?: string;
  color?: 'amber' | 'green' | 'cyan' | 'purple' | 'red' | 'dim';
}

const ACCENTS: Record<string, string> = {
  amber: 'var(--g-amber)',
  green: 'var(--g-green)',
  cyan: 'var(--g-cyan)',
  purple: 'var(--g-purple)',
  red: 'var(--g-red-text)',
  dim: 'var(--g-dim)',
};

@customElement('glass-stat-card')
export class GlassStatCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassStatCardConfig;

  public setConfig(config: GlassStatCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassStatCardConfig, 'type'> {
    return { entity: '' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private _value(): string {
    const st = this.hass!.states[this._config!.entity];
    if (!st) return '—';
    const domain = this._config!.entity.split('.')[0];
    if (domain === 'binary_sensor' || domain === 'switch' || domain === 'input_boolean' || domain === 'light') {
      return st.state === 'on' ? 'On' : 'Off';
    }
    const unit = st.attributes.unit_of_measurement as string | undefined;
    const n = Number(st.state);
    const v = Number.isNaN(n) ? st.state.replace(/_/g, ' ').replace(/^\w/, (x) => x.toUpperCase()) : Math.abs(n) >= 100 ? Math.round(n) : n;
    return unit ? `${v}${unit.startsWith('°') ? '' : ' '}${unit}` : String(v);
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._config.entity) return placeholder('Select an entity', 'insights');
    const st = this.hass.states[this._config.entity];
    const on = st && (st.state === 'on' || st.state === 'home' || st.state === 'open');
    const color = ACCENTS[this._config.color ?? (on ? 'green' : 'dim')] ?? 'var(--g-dim)';
    const label = this._config.name ?? (st?.attributes.friendly_name as string) ?? this._config.entity;
    const ico = this._config.icon ?? 'insights';

    return html`
      <div class="card" @click=${() => fireEvent(this, 'hass-more-info', { entityId: this._config!.entity })}>
        ${icon(ico, 24, color)}
        <div class="txt">
          <div class="val">${this._value()}</div>
          <div class="lbl">${label}</div>
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-radius: var(--g-r-tile); background: var(--g-card); border: 1px solid var(--g-hair); cursor: pointer; }
      .card:hover { border-color: var(--g-border-hi); }
      .txt { min-width: 0; }
      .val { font-size: 16px; font-weight: 700; line-height: 1.1; }
      .lbl { font-size: 12px; color: var(--g-dim); margin-top: 1px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-stat-card': GlassStatCard;
  }
}
