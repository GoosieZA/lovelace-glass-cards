import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassPersonCardConfig extends LovelaceCardConfig {
  title?: string;
  entities: string[];
}

@customElement('glass-person-card')
export class GlassPersonCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassPersonCardConfig;

  public setConfig(config: GlassPersonCardConfig): void {
    this._config = { title: 'Home', entities: [], ...config };
  }

  public getCardSize(): number {
    return 2;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassPersonCardConfig, 'type'> {
    return { title: 'Home', entities: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return this._config.entities.some((id) => old.states[id] !== this.hass!.states[id]);
  }

  private _statusOf(entityId: string): { label: string; home: boolean; accent: string } {
    const st = this.hass?.states[entityId];
    if (!st) return { label: 'Unknown', home: false, accent: 'var(--g-dim)' };
    if (st.state === 'home') return { label: 'Home', home: true, accent: 'var(--g-green)' };
    if (st.state === 'not_home') return { label: 'Away', home: false, accent: 'var(--g-dim)' };
    const zone = st.state.charAt(0).toUpperCase() + st.state.slice(1);
    return { label: zone, home: false, accent: 'var(--g-amber)' };
  }

  private _relTime(iso?: string): string {
    if (!iso) return '';
    const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.round(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.round(h / 24)}d ago`;
  }

  private _open(entityId: string): void {
    fireEvent(this, 'hass-more-info', { entityId });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._config.entities.length) return placeholder('Add person entities', 'group');

    const people = this._config.entities.map((id) => ({ id, st: this.hass!.states[id] }));
    const homeCount = people.filter((p) => p.st?.state === 'home').length;

    return html`
      <div class="card">
        <div class="hdr">
          <div class="hdr-l">${icon('home', 20, 'var(--g-amber)')}<span class="title">${this._config.title}</span></div>
          <span class="badge ${homeCount > 0 ? 'green' : ''}">
            <span class="dot"></span>${homeCount}/${people.length} home
          </span>
        </div>

        <div class="people">
          ${people.map((p) => {
            if (!p.st) return html`<div class="missing">${p.id} not found</div>`;
            const s = this._statusOf(p.id);
            const pic = p.st.attributes.entity_picture as string | undefined;
            const name = (p.st.attributes.friendly_name as string) ?? p.id;
            const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
            return html`
              <button class="person" @click=${() => this._open(p.id)} title=${name}>
                <div class="avatar" style="--accent:${s.accent}">
                  ${pic
                    ? html`<img src=${pic} alt=${name} />`
                    : html`<span class="mono-av">${initials}</span>`}
                  ${s.home ? html`<span class="ring"></span>` : nothing}
                </div>
                <div class="who">
                  <span class="name">${name}</span>
                  <span class="status" style="color:${s.accent}">${s.label}</span>
                </div>
                <span class="ago">${this._relTime(p.st.last_changed)}</span>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 14px; }
      .people { display: flex; flex-direction: column; gap: 8px; }
      .person {
        display: flex;
        align-items: center;
        gap: 14px;
        width: 100%;
        padding: 10px 12px;
        border-radius: var(--g-r-tile);
        background: var(--g-inset);
        border: 1px solid var(--g-hair);
        color: inherit;
        font: inherit;
        cursor: pointer;
        text-align: left;
        transition: background 0.15s ease, transform 0.15s ease;
      }
      .person:hover { background: rgba(255, 255, 255, 0.07); transform: translateY(-1px); }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
      .avatar { position: relative; width: 44px; height: 44px; flex: none; }
      .avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
      .mono-av {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--g-amber), var(--g-amber-deep));
        color: var(--g-amber-ink);
        font-family: var(--g-display);
        font-weight: 700;
        font-size: 15px;
      }
      .ring {
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        border: 2px solid var(--accent);
        box-shadow: 0 0 12px rgba(185, 246, 166, 0.35);
        pointer-events: none;
      }
      .who { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
      .name { font-family: var(--g-display); font-weight: 600; color: var(--g-text-hi); font-size: 15px; }
      .status { font-size: 12.5px; font-weight: 700; }
      .ago { font-family: var(--g-mono); font-size: 12px; color: var(--g-dim); flex: none; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-person-card': GlassPersonCard;
  }
}
