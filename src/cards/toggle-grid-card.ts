import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface TileItem {
  entity: string;
  name?: string;
  icon?: string;
}

interface GlassToggleGridCardConfig extends LovelaceCardConfig {
  title?: string;
  columns?: number;
  entities: (string | TileItem)[];
}

const DOMAIN_ICON: Record<string, string> = {
  light: 'lightbulb',
  switch: 'toggle_on',
  fan: 'mode_fan',
  input_boolean: 'toggle_on',
  script: 'play_arrow',
  automation: 'bolt',
  scene: 'palette',
};

@customElement('glass-toggle-grid-card')
export class GlassToggleGridCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassToggleGridCardConfig;
  private _items: TileItem[] = [];

  public setConfig(config: GlassToggleGridCardConfig): void {
    this._items = (config.entities ?? []).map((e) => (typeof e === 'string' ? { entity: e } : e));
    this._config = { columns: 4, ...config };
  }

  public getCardSize(): number {
    return Math.ceil(this._items.length / (this._config?.columns ?? 4)) + 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassToggleGridCardConfig, 'type'> {
    return { entities: [] };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    return this._items.some((i) => old.states[i.entity] !== this.hass!.states[i.entity]);
  }

  private _toggle(entity: string): void {
    this.hass!.callService('homeassistant', 'toggle', { entity_id: entity });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._items.length) return placeholder('Add entities to toggle', 'grid_view');

    return html`
      <div class="card">
        ${this._config.title ? html`<div class="hdr"><div class="hdr-l">${icon('grid_view', 20, 'var(--g-amber)')}<span class="title">${this._config.title}</span></div></div>` : nothing}
        <div class="grid" style="grid-template-columns:repeat(${this._config.columns}, 1fr)">
          ${this._items.map((it) => {
            const st = this.hass!.states[it.entity];
            const on = st && (st.state === 'on' || st.state === 'open' || st.state === 'home' || st.state === 'playing');
            const domain = it.entity.split('.')[0];
            const ico = it.icon ?? DOMAIN_ICON[domain] ?? 'circle';
            const name = it.name ?? (st?.attributes.friendly_name as string) ?? it.entity;
            const stateTxt = !st ? 'n/a' : on ? 'On' : st.state === 'off' ? 'Off' : st.state;
            return html`
              <button class="q ${on ? 'on' : ''}" @click=${() => this._toggle(it.entity)} title=${name}>
                ${icon(ico, 22, on ? 'var(--g-amber-ink)' : 'var(--g-dim)')}
                <div class="qt"><div class="qn">${name}</div><div class="qs">${stateTxt}</div></div>
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
      .grid { display: grid; gap: 12px; }
      .q {
        aspect-ratio: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
        padding: 13px;
        border-radius: 16px;
        cursor: pointer;
        text-align: left;
        background: var(--g-inset);
        border: 1px solid var(--g-hair);
        color: var(--g-text-hi);
        transition: background 0.18s ease, color 0.18s ease;
      }
      .q.on { background: var(--g-amber); color: var(--g-amber-ink); border-color: transparent; }
      .q:hover { border-color: var(--g-border-hi); }
      .qn { font-size: 13px; font-weight: 700; line-height: 1.15; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .qs { font-size: 11.5px; margin-top: 2px; opacity: 0.75; text-transform: capitalize; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-toggle-grid-card': GlassToggleGridCard;
  }
}
