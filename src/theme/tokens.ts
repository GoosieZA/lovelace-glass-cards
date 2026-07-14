import { css, html, svg, type TemplateResult } from 'lit';

/**
 * Design tokens for the "Midnight (amber)" component kit.
 * Palette, type scale and surface treatments are lifted verbatim from
 * HA Component Kit.dc.html so every Glass card reads as one system.
 */
export const GLASS = {
  // Surfaces (page -> raised)
  page: '#050506',
  pageGlow: '#0c0d10',
  panel: '#0f1013',
  card: '#16181d',
  inset: '#1c1f26',
  // Text
  textHi: '#e7e9ee',
  text: '#c8ccd3',
  dim: '#8b9099',
  faint: '#6b7078',
  disabled: '#4b5058',
  // Accents
  amber: '#f3d06a',
  amberHi: '#f7dc8a',
  amberDeep: '#e0b24a',
  amberInk: '#221a02',
  green: '#b9f6a6',
  greenInk: '#0f1a0d',
  red: '#ff5c5c',
  redText: '#ff8080',
  redInk: '#2a0808',
  cyan: '#87dde1',
  purple: '#c9a6ff',
  purpleDeep: '#7d5bd6',
} as const;

/** A Material Symbols Rounded glyph, matching the kit's `.ms` treatment. */
export function icon(name: string, size = 22, color?: string): TemplateResult {
  const style = `font-size:${size}px${color ? `;color:${color}` : ''}`;
  return html`<span class="ms" style=${style}>${name}</span>`;
}

/**
 * Neutral, non-error placeholder shown when a card has no entity configured yet
 * (or the configured entity is missing). Keeps the dashboard editor clean instead
 * of a red "entity not found" box.
 */
export function placeholder(text: string, iconName = 'add_box'): TemplateResult {
  return html`<div class="g-ph">${icon(iconName, 26, 'var(--g-faint)')}<span>${text}</span></div>`;
}

/** Shared base: CSS custom properties, typography, icon font and primitives. */
export const glassBase = css`
  :host {
    --g-page: #050506;
    --g-panel: #0f1013;
    --g-card: #16181d;
    --g-inset: #1c1f26;

    --g-text-hi: #e7e9ee;
    --g-text: #c8ccd3;
    --g-dim: #8b9099;
    --g-faint: #6b7078;
    --g-disabled: #4b5058;

    --g-amber: #f3d06a;
    --g-amber-hi: #f7dc8a;
    --g-amber-deep: #e0b24a;
    --g-amber-ink: #221a02;
    --g-green: #b9f6a6;
    --g-green-ink: #0f1a0d;
    --g-red: #ff5c5c;
    --g-red-text: #ff8080;
    --g-cyan: #87dde1;
    --g-purple: #c9a6ff;

    --g-border: rgba(255, 255, 255, 0.06);
    --g-border-hi: rgba(255, 255, 255, 0.14);
    --g-hair: rgba(255, 255, 255, 0.05);

    --g-r-card: 24px;
    --g-r-tile: 20px;
    --g-r-ctl: 14px;
    --g-r-sm: 12px;

    --g-font: 'Manrope', system-ui, -apple-system, sans-serif;
    --g-display: 'Space Grotesk', var(--g-font);
    --g-mono: 'IBM Plex Mono', ui-monospace, monospace;

    display: block;
    font-family: var(--g-font);
    color: var(--g-text-hi);
    -webkit-font-smoothing: antialiased;
  }

  /* Material Symbols Rounded glyph */
  .ms {
    font-family: 'Material Symbols Rounded';
    line-height: 1;
    font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
    -webkit-font-smoothing: antialiased;
    user-select: none;
  }

  /* Card shell */
  .card {
    background: var(--g-card);
    border-radius: var(--g-r-card);
    padding: 22px;
    border: 1px solid var(--g-hair);
    box-sizing: border-box;
  }

  /* Card header: icon + title on the left, meta on the right */
  .hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .hdr-l {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .title {
    font-size: 17px;
    font-weight: 700;
    color: var(--g-text-hi);
  }
  .meta {
    font-size: 12.5px;
    color: var(--g-dim);
  }

  /* Type scale */
  .t-display {
    font-family: var(--g-display);
    font-size: 46px;
    font-weight: 600;
    letter-spacing: -1.5px;
    line-height: 1;
  }
  .t-num {
    font-family: var(--g-display);
    font-weight: 600;
    line-height: 1;
  }
  .t-label {
    font-size: 12px;
    color: var(--g-dim);
  }
  .t-mono {
    font-family: var(--g-mono);
    font-size: 13px;
    color: var(--g-text);
  }

  /* LIVE tag */
  .live {
    background: rgba(243, 208, 106, 0.15);
    color: var(--g-amber);
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 6px;
    letter-spacing: 0.5px;
    font-weight: 700;
  }

  /* Badge / chip / pill */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    font-weight: 700;
    padding: 6px 13px;
    border-radius: 999px;
    background: var(--g-inset);
    color: var(--g-dim);
  }
  .badge .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    flex: none;
  }
  .badge.green { background: rgba(185, 246, 166, 0.14); color: var(--g-green); }
  .badge.amber { background: rgba(243, 208, 106, 0.16); color: var(--g-amber); }
  .badge.red { background: rgba(255, 92, 92, 0.14); color: var(--g-red-text); }
  .badge.cyan { background: rgba(135, 221, 225, 0.14); color: var(--g-cyan); }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: var(--g-font);
    font-weight: 700;
    font-size: 14px;
    padding: 12px 20px;
    border-radius: var(--g-r-ctl);
    border: 1px solid transparent;
    cursor: pointer;
    color: var(--g-text);
    background: var(--g-inset);
    transition: filter 0.15s ease, background 0.15s ease;
  }
  .btn:hover { filter: brightness(1.12); }
  .btn.primary { background: var(--g-amber); color: var(--g-amber-ink); }
  .btn.secondary { background: var(--g-inset); color: var(--g-text-hi); border-color: var(--g-border); }
  .btn.ghost { background: transparent; color: var(--g-dim); }
  .btn.success { background: var(--g-green); color: var(--g-green-ink); }
  .btn.danger { background: var(--g-red); color: var(--g-red-ink, #2a0808); }
  .btn.tonal { background: rgba(243, 208, 106, 0.12); color: var(--g-amber); border-color: rgba(243, 208, 106, 0.4); }
  .btn.soft { background: rgba(255, 255, 255, 0.06); color: var(--g-text); }

  /* Toggle */
  .toggle {
    width: 46px;
    height: 26px;
    border-radius: 26px;
    background: rgba(255, 255, 255, 0.08);
    position: relative;
    cursor: pointer;
    flex: none;
    transition: background 0.2s ease;
  }
  .toggle.on { background: var(--g-amber); }
  .toggle .knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.2s ease;
  }
  .toggle.on .knob { transform: translateX(20px); }

  /* Neutral placeholder (unconfigured / missing entity) */
  .g-ph {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 88px;
    padding: 22px;
    border: 1px dashed var(--g-border-hi);
    border-radius: var(--g-r-card);
    background: var(--g-card);
    color: var(--g-dim);
    font-size: 13px;
    text-align: center;
  }

  /* Meter bar */
  .meter {
    height: 10px;
    border-radius: 10px;
    background: var(--g-inset);
    position: relative;
    overflow: hidden;
  }
  .meter > span {
    position: absolute;
    inset: 0;
    transform-origin: left;
    border-radius: 10px;
    background: var(--g-amber);
  }
`;

/** SVG re-export so cards can build inline diagrams without another import. */
export { svg };
