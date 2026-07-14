/**
 * Loads the Midnight kit's typefaces once, at the document level. Fonts declared
 * in <head> resolve inside shadow DOM too (font lookup is not scoped by the
 * shadow boundary), so every card gets them for free.
 *
 * Text fonts (Manrope / Space Grotesk / IBM Plex Mono) are SELF-HOSTED from
 * `/local/glass-fonts/` — same-origin, so no CDN, CSP or offline issues. Ship
 * the woff2 files + glass-fonts.css alongside the card (see repo `fonts/`).
 * Material Symbols Rounded is still pulled from the Google CDN (huge file; the
 * icons render fine from it or from another installed card).
 */
let loaded = false;

const LOCAL_FONTS = '/local/glass-fonts/glass-fonts.css';
const MATERIAL_SYMBOLS =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400,0..1,0&display=swap';

export function ensureFonts(): void {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;

  const links: Array<Partial<HTMLLinkElement>> = [
    { rel: 'stylesheet', href: LOCAL_FONTS },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'stylesheet', href: MATERIAL_SYMBOLS },
  ];

  for (const attrs of links) {
    if (attrs.href && document.head.querySelector(`link[href="${attrs.href}"]`)) continue;
    const el = document.createElement('link');
    Object.assign(el, attrs);
    document.head.appendChild(el);
  }
}
