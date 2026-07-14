import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface SceneItem {
  entity: string;
  name?: string;
  icon?: string;
}

interface GlassScenesCardConfig extends LovelaceCardConfig {
  title?: string;
  columns?: number;
  scenes: (string | SceneItem)[];
}

const DEFAULT_ICON: Record<string, string> = {
  scene: 'palette',
  script: 'play_arrow',
  automation: 'bolt',
};

@customElement('glass-scenes-card')
export class GlassScenesCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassScenesCardConfig;
  private _scenes: SceneItem[] = [];

  public setConfig(config: GlassScenesCardConfig): void {
    this._scenes = (config.scenes ?? []).map((s) => (typeof s === 'string' ? { entity: s } : s));
    this._config = { columns: 4, ...config };
  }

  public getCardSize(): number {
    return Math.ceil(this._scenes.length / (this._config?.columns ?? 4)) + 1;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassScenesCardConfig, 'type'> {
    return { scenes: [] };
  }

  protected shouldUpdate(): boolean {
    return true;
  }

  private _activate(entity: string): void {
    const domain = entity.split('.')[0];
    const service = domain === 'scene' ? 'scene.turn_on' : domain === 'script' ? 'script.turn_on' : domain === 'automation' ? 'automation.trigger' : 'homeassistant.turn_on';
    const [dom, svc] = service.split('.');
    this.hass!.callService(dom, svc, { entity_id: entity });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    if (!this._scenes.length) return placeholder('Add scenes or scripts', 'auto_awesome');
    return html`
      <div class="card">
        ${this._config.title ? html`<div class="hdr"><div class="hdr-l">${icon('auto_awesome', 20, 'var(--g-amber)')}<span class="title">${this._config.title}</span></div></div>` : nothing}
        <div class="grid" style="grid-template-columns:repeat(${this._config.columns}, minmax(0, 1fr))">
          ${this._scenes.map((s) => {
            const st = this.hass!.states[s.entity];
            const name = s.name ?? (st?.attributes.friendly_name as string) ?? s.entity;
            const ico = s.icon ?? DEFAULT_ICON[s.entity.split('.')[0]] ?? 'palette';
            return html`<button class="scene" @click=${() => this._activate(s.entity)}>${icon(ico, 24, 'var(--g-text-hi)')}<span class="sn">${name}</span></button>`;
          })}
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; flex-direction: column; gap: 14px; }
      .grid { display: grid; gap: 10px; }
      .scene {
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
        padding: 16px 10px; border-radius: 16px; cursor: pointer;
        background: var(--g-inset); border: 1px solid var(--g-hair); color: var(--g-text-hi);
        transition: background 0.15s ease, transform 0.15s ease;
      }
      .scene:hover { background: rgba(255, 255, 255, 0.07); transform: translateY(-1px); }
      .scene:active { background: var(--g-amber); color: var(--g-amber-ink); }
      .sn { font-size: 13px; font-weight: 700; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-scenes-card': GlassScenesCard;
  }
}
