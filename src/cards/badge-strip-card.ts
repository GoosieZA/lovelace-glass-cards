import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface Badge {
  entity: string;
  icon?: string;
  label?: string;
  color?: string;
}

interface GlassBadgeStripCardConfig extends LovelaceCardConfig {
  variant?: 'strip' | 'circular';
  badges: (string | Badge)[];
}

const DOMAIN_ICON: Record<string, string> = {
  weather: 'partly_cloudy_day',
  alarm_control_panel: 'verified_user',
  light: 'lightbulb',
  lock: 'lock',
  climate: 'thermostat',
  binary_sensor: 'sensors',
  person: 'person',
};

const ACCENTS: Record<string, string> = {
  amber: 'var(--g-amber)',
  green: 'var(--g-green)',
  cyan: 'var(--g-cyan)',
  purple: 'var(--g-purple)',
  red: 'var(--g-red-text)',
  dim: 'var(--g-dim)',
};

@customElement('glass-badge-strip-card')
export class GlassBadgeStripCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassBadgeStripCardConfig;
  private _badges: Badge[] = [];

  public setConfig(config: GlassBadgeStripCardConfig): void {
    this._badges = (config.badges ?? []).map((b) => (typeof b === 'string' ? { entity: b } : b));
    this._config = { variant: 'strip', ...config };
  }

  public getCardSize(): number {
    return 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassBadgeStripCardConfig, 'type'> {
    return { variant: 'strip', badges: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    return this._badges.some((b) => old.states[b.entity] !== this.hass!.states[b.entity]);
  }

  private _value(entity: string): string {
    const st = this.hass!.states[entity];
    if (!st) return '—';
    const domain = entity.split('.')[0];
    const dc = st.attributes.device_class as string | undefined;
    if (domain === 'weather') {
      const t = st.attributes.temperature;
      return t != null ? `${Math.round(Number(t))}°` : st.state;
    }
    if (domain === 'alarm_control_panel') return st.state === 'disarmed' ? 'Disarmed' : 'Armed';
    if (domain === 'binary_sensor' || domain === 'switch' || domain === 'light' || domain === 'input_boolean') {
      if (dc === 'door' || dc === 'window' || dc === 'opening') return st.state === 'on' ? 'Open' : 'Closed';
      return st.state === 'on' ? 'On' : 'Off';
    }
    const unit = st.attributes.unit_of_measurement as string | undefined;
    const n = Number(st.state);
    const v = Number.isNaN(n) ? st.state.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()) : Math.abs(n) >= 100 ? Math.round(n) : n;
    return unit ? `${v}${unit.startsWith('°') ? '' : ' '}${unit}` : String(v);
  }

  private _sublabel(b: Badge): string {
    const st = this.hass!.states[b.entity];
    return b.label ?? (st?.attributes.friendly_name as string) ?? b.entity;
  }

  private _iconFor(b: Badge): string {
    if (b.icon) return b.icon;
    const st = this.hass!.states[b.entity];
    const dc = st?.attributes.device_class as string | undefined;
    if (dc === 'temperature') return 'thermostat';
    if (dc === 'humidity') return 'water_drop';
    if (dc === 'battery') return 'battery_full';
    if (dc === 'power' || dc === 'energy') return 'bolt';
    return DOMAIN_ICON[b.entity.split('.')[0]] ?? 'info';
  }

  private _color(b: Badge): string {
    if (b.color) return ACCENTS[b.color] ?? b.color;
    const st = this.hass!.states[b.entity];
    const on = st && (st.state === 'on' || st.state === 'home' || st.state?.startsWith('armed'));
    return on ? 'var(--g-green)' : 'var(--g-amber)';
  }

  private _open(entity: string): void {
    fireEvent(this, 'hass-more-info', { entityId: entity });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._badges.length) return placeholder('Add status badges', 'badge');
    const circular = this._config.variant === 'circular';

    if (circular) {
      return html`
        <div class="circ-wrap">
          ${this._badges.map(
            (b) => html`
              <button class="circ" @click=${() => this._open(b.entity)}>
                <div class="circ-ic">${icon(this._iconFor(b), 26, this._color(b))}</div>
                <span class="circ-l">${this._value(b.entity)}</span>
              </button>
            `
          )}
        </div>
      `;
    }

    return html`
      <div class="strip">
        ${this._badges.map(
          (b) => html`
            <button class="badge" @click=${() => this._open(b.entity)}>
              ${icon(this._iconFor(b), 20, this._color(b))}
              <div class="txt"><div class="v">${this._value(b.entity)}</div><div class="s">${this._sublabel(b)}</div></div>
            </button>
          `
        )}
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .strip { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; background: var(--g-panel); border: 1px solid var(--g-border); border-radius: 22px; padding: 16px 18px; }
      .badge { display: flex; align-items: center; gap: 8px; padding: 9px 15px; border-radius: 14px; border: none; cursor: pointer; background: var(--g-inset); color: var(--g-text-hi); text-align: left; }
      .badge:hover { filter: brightness(1.12); }
      .v { font-size: 14px; font-weight: 700; line-height: 1; }
      .s { font-size: 10.5px; color: var(--g-dim); margin-top: 2px; }

      .circ-wrap { display: flex; gap: 14px; flex-wrap: wrap; align-items: flex-start; }
      .circ { display: flex; flex-direction: column; align-items: center; gap: 6px; background: none; border: none; cursor: pointer; padding: 0; }
      .circ-ic { width: 56px; height: 56px; border-radius: 50%; background: var(--g-card); border: 1px solid var(--g-border); display: flex; align-items: center; justify-content: center; }
      .circ:hover .circ-ic { border-color: var(--g-border-hi); }
      .circ-l { font-size: 11px; color: var(--g-dim); font-weight: 600; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-badge-strip-card': GlassBadgeStripCard;
  }
}
