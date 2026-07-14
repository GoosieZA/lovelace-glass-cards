import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { fireEvent } from 'custom-card-helpers';
import { glassBase, icon, placeholder } from '../theme/tokens';

interface GlassMediaCardConfig extends LovelaceCardConfig {
  entity: string; // media_player.*
  name?: string;
}

@customElement('glass-media-card')
export class GlassMediaCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: GlassMediaCardConfig;

  public setConfig(config: GlassMediaCardConfig): void {
    this._config = config;
  }

  public getCardSize(): number {
    return 2;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('glass-config-editor');
  }

  public static getStubConfig(): Omit<GlassMediaCardConfig, 'type'> {
    return { entity: 'media_player.kitchen' };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has('_config')) return true;
    const old = changed.get('hass') as HomeAssistant | undefined;
    if (!old || !this.hass || !this._config) return true;
    return old.states[this._config.entity] !== this.hass.states[this._config.entity];
  }

  private _cmd(service: string, e: Event): void {
    e.stopPropagation();
    this.hass!.callService('media_player', service, { entity_id: this._config!.entity });
  }

  private _progress(): number {
    const st = this.hass!.states[this._config!.entity];
    const dur = Number(st.attributes.media_duration);
    let pos = Number(st.attributes.media_position);
    if (!dur || Number.isNaN(dur) || Number.isNaN(pos)) return 0;
    if (st.state === 'playing' && st.attributes.media_position_updated_at) {
      pos += (Date.now() - new Date(st.attributes.media_position_updated_at as string).getTime()) / 1000;
    }
    return Math.max(0, Math.min(100, (pos / dur) * 100));
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const st = this._config.entity ? this.hass.states[this._config.entity] : undefined;
    if (!st) return placeholder('Select a media player', 'speaker');

    const off = st.state === 'off' || st.state === 'unavailable' || st.state === 'standby';
    const playing = st.state === 'playing';
    const a = st.attributes;
    const art = a.entity_picture as string | undefined;
    const title = (a.media_title as string) || (this._config.name ?? (a.friendly_name as string) ?? 'Media');
    const sub = [a.media_artist, a.media_album_name].filter(Boolean).join(' · ') ||
      (off ? String(st.state) : (a.friendly_name as string) ?? '');

    return html`
      <div class="card" @click=${() => fireEvent(this, 'hass-more-info', { entityId: this._config!.entity })}>
        <div class="art ${art ? '' : 'ph'}">
          ${art ? html`<img src=${art} alt="" />` : icon('music_note', 34, '#fff')}
        </div>
        <div class="mid">
          <div class="title">${title}</div>
          <div class="sub">${sub}</div>
          ${!off
            ? html`<div class="bar"><span style="width:${this._progress()}%"></span></div>`
            : nothing}
        </div>
        <div class="ctl">
          <button class="ico" @click=${(e: Event) => this._cmd('media_previous_track', e)}>${icon('skip_previous', 22)}</button>
          <button class="ico play" @click=${(e: Event) => this._cmd('media_play_pause', e)}>${icon(playing ? 'pause' : 'play_arrow', 24, 'var(--g-amber-ink)')}</button>
          <button class="ico" @click=${(e: Event) => this._cmd('media_next_track', e)}>${icon('skip_next', 22)}</button>
        </div>
      </div>
    `;
  }

  static styles = [
    glassBase,
    css`
      .card { display: flex; align-items: center; gap: 18px; cursor: pointer; }
      .art { width: 76px; height: 76px; border-radius: 16px; overflow: hidden; flex: none; }
      .art img { width: 100%; height: 100%; object-fit: cover; }
      .art.ph { display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--g-purple), var(--g-purple-deep, #7d5bd6)); }
      .mid { flex: 1; min-width: 0; }
      .title { font-size: 16px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .sub { font-size: 13px; color: var(--g-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-transform: capitalize; }
      .bar { height: 4px; border-radius: 4px; background: var(--g-inset); margin-top: 10px; overflow: hidden; }
      .bar > span { display: block; height: 100%; border-radius: 4px; background: var(--g-amber); }
      .ctl { display: flex; gap: 8px; align-items: center; }
      .ico {
        width: 40px; height: 40px; border-radius: 12px; border: none; cursor: pointer;
        background: var(--g-inset); color: var(--g-text-hi);
        display: flex; align-items: center; justify-content: center;
        transition: filter 0.15s ease;
      }
      .ico:hover { filter: brightness(1.2); }
      .ico.play { width: 44px; height: 44px; background: var(--g-amber); }
      .missing { text-align: center; color: var(--g-red-text); font-size: 13px; padding: 8px; }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-media-card': GlassMediaCard;
  }
}
