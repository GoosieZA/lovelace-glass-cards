import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase } from '../theme/tokens';

interface TileItem {
  entity: string;
  name?: string;
  icon?: string;
}

interface Config extends LovelaceCardConfig {
  title?: string;
  columns?: number;
  entities?: (string | TileItem)[];
}

const TOGGLE_DOMAINS = ['light', 'switch', 'fan', 'input_boolean', 'script', 'scene', 'automation', 'cover'];

const HEAD_SCHEMA = [
  { name: 'title', selector: { text: {} } },
  { name: 'columns', selector: { number: { min: 1, max: 12, mode: 'box' } } },
];

/**
 * Dedicated editor for glass-toggle-grid-card: title + columns via ha-form, then
 * one row per tile with an entity picker, an (optional) Material Symbols icon,
 * and an optional name — with add / remove. Ships per-item icon customisation
 * that a flat ha-form entity list can't do.
 */
@customElement('glass-toggle-grid-editor')
export class GlassToggleGridEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: Config;

  public setConfig(config: Config): void {
    this._config = config;
  }

  private get _items(): TileItem[] {
    return (this._config?.entities ?? []).map((e) => (typeof e === 'string' ? { entity: e } : { ...e }));
  }

  private _emit(patch: Partial<Config>): void {
    fireEvent(this, 'config-changed', { config: { ...this._config, ...patch } });
  }

  private _headLabel = (s: { name: string }) => (s.name === 'columns' ? 'Columns' : 'Title');

  private _headChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this._emit(ev.detail.value);
  }

  private _setItems(items: TileItem[]): void {
    // Drop empty rows' undefined keys for a clean config.
    const clean = items.map((it) => {
      const o: TileItem = { entity: it.entity };
      if (it.name) o.name = it.name;
      if (it.icon) o.icon = it.icon;
      return o;
    });
    this._emit({ entities: clean });
  }

  private _update(i: number, patch: Partial<TileItem>): void {
    const items = this._items;
    items[i] = { ...items[i], ...patch };
    this._setItems(items);
  }

  private _remove(i: number): void {
    const items = this._items;
    items.splice(i, 1);
    this._setItems(items);
  }

  private _add(): void {
    this._setItems([...this._items, { entity: '' }]);
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    const items = this._items;

    return html`
      <div class="wrap">
        <ha-form
          .hass=${this.hass}
          .data=${{ title: this._config.title, columns: this._config.columns ?? 4 }}
          .schema=${HEAD_SCHEMA}
          .computeLabel=${this._headLabel}
          @value-changed=${this._headChanged}
        ></ha-form>

        <div class="items-h">Tiles</div>
        ${items.map(
          (it, i) => html`
            <div class="item">
              <div class="item-top">
                <ha-selector
                  class="grow"
                  .hass=${this.hass}
                  .selector=${{ entity: { domain: TOGGLE_DOMAINS } }}
                  .value=${it.entity}
                  @value-changed=${(e: CustomEvent) => this._update(i, { entity: e.detail.value ?? '' })}
                ></ha-selector>
                <ha-icon-button class="del" .path=${'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'} @click=${() => this._remove(i)}></ha-icon-button>
              </div>
              <div class="item-bot">
                <ha-textfield
                  class="grow"
                  label="Icon (Material Symbols name)"
                  .value=${it.icon ?? ''}
                  @input=${(e: Event) => this._update(i, { icon: (e.target as HTMLInputElement).value })}
                ></ha-textfield>
                <span class="prev">${it.icon ? html`<span class="ms">${it.icon}</span>` : '—'}</span>
                <ha-textfield
                  class="grow"
                  label="Name (optional)"
                  .value=${it.name ?? ''}
                  @input=${(e: Event) => this._update(i, { name: (e.target as HTMLInputElement).value })}
                ></ha-textfield>
              </div>
            </div>
          `
        )}
        <ha-button @click=${this._add}>
          <ha-icon icon="mdi:plus" slot="icon"></ha-icon>
          Add tile
        </ha-button>
        <div class="hint">Icon names come from Google <a href="https://fonts.google.com/icons" target="_blank" rel="noopener">Material Symbols</a> — e.g. <code>lightbulb</code>, <code>power</code>, <code>tv</code>. Leave blank for the default.</div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .wrap { display: flex; flex-direction: column; gap: 12px; }
      .items-h { font-size: 13px; font-weight: 700; color: var(--secondary-text-color, #8b9099); margin-top: 4px; }
      .item { border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12)); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 8px; }
      .item-top, .item-bot { display: flex; align-items: center; gap: 8px; }
      .grow { flex: 1; min-width: 0; }
      ha-textfield.grow { width: 100%; }
      .del { color: var(--error-color, #ff5c5c); --mdc-icon-button-size: 40px; flex: none; }
      .prev { width: 30px; text-align: center; color: var(--g-amber); flex: none; }
      .prev .ms { font-size: 22px; }
      .hint { font-size: 12px; color: var(--secondary-text-color, #8b9099); }
      .hint code { font-family: var(--g-mono); }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-toggle-grid-editor': GlassToggleGridEditor;
  }
}
