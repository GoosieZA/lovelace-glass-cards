import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { glassBase, icon } from '../theme/tokens';

interface NavItem {
  icon: string;
  label?: string;
  path: string;
}

interface GlassNavCardConfig extends LovelaceCardConfig {
  variant?: 'dock' | 'pill';
  fixed?: boolean; // stick to the bottom of the viewport (default true)
  max_width?: number;
  items: NavItem[];
}

@customElement('glass-nav-card')
export class GlassNavCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassNavCardConfig;
  private _onLocation = () => this.requestUpdate();

  public setConfig(config: GlassNavCardConfig): void {
    this._config = { variant: 'dock', fixed: true, max_width: 900, items: [], ...config };
  }

  public getCardSize(): number {
    return 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassNavCardConfig, 'type'> {
    return {
      variant: 'dock',
      fixed: true,
      items: [
        { icon: 'home', label: 'Home', path: '/lovelace/0' },
        { icon: 'lightbulb', label: 'Lights', path: '/lovelace/lights' },
        { icon: 'thermostat', label: 'Climate', path: '/lovelace/climate' },
        { icon: 'bolt', label: 'Energy', path: '/lovelace/energy' },
        { icon: 'security', label: 'Security', path: '/lovelace/security' },
      ],
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('location-changed', this._onLocation);
    window.addEventListener('popstate', this._onLocation);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('location-changed', this._onLocation);
    window.removeEventListener('popstate', this._onLocation);
  }

  private _navigate(path: string): void {
    if (!path) return;
    history.pushState(null, '', path);
    window.dispatchEvent(new Event('location-changed'));
  }

  private _active(path: string): boolean {
    const cur = window.location.pathname;
    return !!path && (cur === path || cur.startsWith(path + '/'));
  }

  protected render() {
    if (!this._config) return nothing;
    const c = this._config;
    const pill = c.variant === 'pill';
    const wrapStyle = c.fixed
      ? `position:fixed;left:0;right:0;bottom:0;z-index:6;display:flex;justify-content:center;padding:12px 16px calc(12px + env(safe-area-inset-bottom));`
      : 'display:flex;justify-content:center;';

    const items = c.items.map((n) => {
      const active = this._active(n.path);
      return html`
        <button class="item ${pill ? 'pill' : ''} ${active ? 'active' : ''}" @click=${() => this._navigate(n.path)} title=${n.label ?? ''}>
          ${icon(n.icon, pill ? 22 : 24, active ? 'var(--g-amber-ink)' : 'var(--g-dim)')}
          ${n.label ? html`<span class="lbl">${n.label}</span>` : nothing}
        </button>
      `;
    });

    return html`
      <div class="wrap" style=${wrapStyle}>
        <div class="bar ${pill ? 'pill' : 'dock'}" style="max-width:${c.max_width}px">${items}</div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      :host { display: block; }
      .bar { width: 100%; box-sizing: border-box; }
      .dock {
        background: var(--g-card);
        border: 1px solid var(--g-border);
        border-radius: 24px;
        padding: 10px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
      }
      .bar.pill {
        width: auto;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: rgba(20, 22, 26, 0.9);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid var(--g-border-hi);
        border-radius: 999px;
        padding: 8px;
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.5);
        margin: 0 auto;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 8px 14px;
        border: none;
        background: transparent;
        border-radius: 14px;
        cursor: pointer;
        color: var(--g-dim);
        font-family: var(--g-font);
        transition: background 0.15s ease, color 0.15s ease;
      }
      .item.pill { flex-direction: row; gap: 8px; padding: 10px 16px; border-radius: 999px; }
      .item:hover { color: var(--g-text-hi); }
      .item.active { background: var(--g-amber); color: var(--g-amber-ink); }
      .lbl { font-size: 12px; font-weight: 700; }
      .item.pill .lbl { font-size: 13px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-nav-card': GlassNavCard;
  }
}
