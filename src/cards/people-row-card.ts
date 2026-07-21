import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, placeholder } from '../theme/tokens';

interface GlassPeopleRowCardConfig extends LovelaceCardConfig {
  entities: string[]; // person.* / device_tracker.*
}

// Deterministic avatar gradient per index — mirrors the design kit's palette.
const GRADS = [
  ['#F3D06A', '#e0b24a', '#221a02'],
  ['#c9a6ff', '#a97ff0', '#1c1030'],
  ['#87dde1', '#4fb9bf', '#052423'],
  ['#B9F6A6', '#7fd98a', '#0f1a0d'],
  ['#ff8080', '#e05a5a', '#2a0808'],
];

@customElement('glass-people-row-card')
export class GlassPeopleRowCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassPeopleRowCardConfig;

  public setConfig(config: GlassPeopleRowCardConfig): void {
    this._config = { entities: [], ...config };
  }

  public getCardSize(): number {
    return 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassPeopleRowCardConfig, 'type'> {
    return { entities: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return this._config.entities.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._config.entities.length) return placeholder('Add person entities', 'group');

    const people = this._config.entities.map((id) => ({ id, st: this.hass!.states[id] }));
    const homeCount = people.filter((p) => p.st?.state === 'home').length;
    const allHome = homeCount === people.length;
    const label =
      homeCount === 0 ? 'Everyone away' : homeCount === 1 ? '1 person home' : `${homeCount} people home`;

    return html`
      <div class="card">
        <div class="avatars">
          ${people.map((p, i) => {
            const [g1, g2, fg] = GRADS[i % GRADS.length];
            const pic = p.st?.attributes.entity_picture as string | undefined;
            const name = (p.st?.attributes.friendly_name as string) ?? p.id;
            const initial = name.charAt(0).toUpperCase();
            const home = p.st?.state === 'home';
            return html`<button
              class="av"
              title=${name}
              @click=${() => fireEvent(this, 'hass-more-info', { entityId: p.id })}
              style="--g1:${g1};--g2:${g2};--fg:${fg};z-index:${people.length - i};margin-left:${i ? '-8px' : '0'};opacity:${home ? 1 : 0.55}"
            >
              ${pic ? html`<img src=${pic} alt=${name} />` : html`<span>${initial}</span>`}
            </button>`;
          })}
        </div>
        <span class="label">${label}</span>
        <span class="badge ${allHome ? 'green' : homeCount ? 'amber' : ''}">
          <span class="dot"></span>${homeCount ? 'Home' : 'Away'}
        </span>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; align-items: center; gap: 10px; }
      .avatars { display: flex; align-items: center; flex: 0 0 auto; }
      .av {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 2px solid var(--g-card);
        background: linear-gradient(135deg, var(--g1), var(--g2));
        color: var(--fg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--g-display);
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        padding: 0;
        flex: 0 0 auto;
      }
      .av img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
      .label { flex: 1; min-width: 0; font-size: 13px; font-weight: 600; color: var(--g-text); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-people-row-card': GlassPeopleRowCard;
  }
}
