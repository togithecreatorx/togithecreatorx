// Küçük SVG yazma çekirdeği:
//  - [sınıf|metin] işaretlemesiyle tek aralıklı (monospace) satırlar; her parça kolon hesabıyla
//    kesin x konumuna yerleşir (font gömülü olduğu için hizalama her platformda birebir aynı).
//  - Kullanılan karakterler toplanır; JetBrains Mono yalnızca bu karakterlere indirgenip base64 gömülür.
//  - Anahtar kare (keyframes) kayıt defteri: aynı zamanlama tek kez yazılır.
//  - prefers-reduced-motion: tüm animasyonlar kapanır, statik "en güzel kare" görünür.

import subsetFont from 'subset-font';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { RENK_SINIFLARI } from './palet.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const FONT_DIR = path.join(here, '..', 'font');
const FONTLAR = {
  r: { dosya: 'JBM-Regular.woff2', weight: 400, style: 'normal' },
  b: { dosya: 'JBM-Bold.woff2', weight: 700, style: 'normal' },
  i: { dosya: 'JBM-Italic.woff2', weight: 400, style: 'italic' },
};

export const ADV = 0.6; // JetBrains Mono: her glif 600/1000 em
export const r2 = (n) => Math.round(n * 100) / 100;
export const len = (s) => [...s].length;
export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ALIAS = { t: 'text', d: 'dim', m: 'mute', f: 'faint' };
const MARK = /\[([a-zA-Z0-9.]+)\|([^\]]*)\]/g;

export function parse(markup) {
  const out = [];
  let last = 0;
  let m;
  MARK.lastIndex = 0;
  while ((m = MARK.exec(markup))) {
    if (m.index > last) out.push({ t: markup.slice(last, m.index), cls: [] });
    out.push({ t: m[2], cls: m[1].split('.') });
    last = MARK.lastIndex;
  }
  if (last < markup.length) out.push({ t: markup.slice(last), cls: [] });
  return out;
}

export const plain = (markup) => parse(markup).map((s) => s.t).join('');
export const mlen = (markup) => len(plain(markup));

// Bir segmenti, 2+ boşlukla ayrılmış parçalara böler (SVG çoklu boşluğu yutar).
function pieces(t) {
  const out = [];
  const ch = [...t];
  let i = 0;
  while (i < ch.length) {
    while (i < ch.length && ch[i] === ' ') i++;
    if (i >= ch.length) break;
    const start = i;
    let j = i;
    while (j < ch.length) {
      if (ch[j] !== ' ') { j++; continue; }
      if (j + 1 < ch.length && ch[j + 1] !== ' ') { j++; continue; }
      break;
    }
    out.push({ col: start, s: ch.slice(start, j).join('') });
    i = j;
  }
  return out;
}

const pct = (x) => {
  const v = Math.min(100, Math.max(0, x * 100));
  return `${+v.toFixed(3)}%`;
};

export class Svg {
  constructor(w, h, { title = '', desc = '' } = {}) {
    this.w = w;
    this.h = h;
    this.title = title;
    this.desc = desc;
    this.used = { r: new Set(), b: new Set(), i: new Set() };
    this.kf = new Map();
    this.css = [];
    this.defs = [];
    this.body = [];
    this.uid = 0;
  }

  id(p = 'g') { return `${p}${(this.uid++).toString(36)}`; }
  add(...parts) { this.body.push(...parts); return this; }
  def(...parts) { this.defs.push(...parts); return this; }
  style(...rules) { this.css.push(...rules); return this; }

  track(text, cls) {
    const k = cls.includes('b') ? 'b' : cls.includes('i') ? 'i' : 'r';
    for (const c of text) this.used[k].add(c);
  }

  // Tek satır metin. markup: "[sf.b|togi][m|@]buro" ; opts.size px ; opts.anchor start|middle|end
  T(x, y, markup, { size = 12.5, cls = '', anchor = 'start', attrs = '' } = {}) {
    const segs = typeof markup === 'string' ? parse(markup) : markup;
    const total = segs.reduce((a, s) => a + len(s.t), 0);
    const adv = size * ADV;
    const x0 = anchor === 'end' ? x - total * adv : anchor === 'middle' ? x - (total * adv) / 2 : x;
    const base = cls ? cls.split('.') : [];
    let col = 0;
    let spans = '';
    for (const s of segs) {
      const c = [...base, ...s.cls].map((k) => ALIAS[k] || k);
      this.track(s.t, c);
      for (const p of pieces(s.t)) {
        const klass = c.length ? ` class="${c.join(' ')}"` : '';
        spans += `<tspan x="${r2(x0 + (col + p.col) * adv)}"${klass}>${esc(p.s)}</tspan>`;
      }
      col += len(s.t);
    }
    return `<text y="${r2(y)}" font-size="${size}"${attrs}>${spans}</text>`;
  }

  width(markup, size = 12.5) { return mlen(markup) * size * ADV; }

  // Anahtar kareler: stops = [[saniye, 'css', 'zamanlama?'], ...]
  keyframes(T, stops) {
    const s = [...stops].sort((a, b) => a[0] - b[0]);
    if (s[0][0] > 0) s.unshift([0, s[0][1]]);
    if (s[s.length - 1][0] < T) s.push([T, s[s.length - 1][1]]);
    const body = s
      .map(([t, decl, tf]) => `${pct(t / T)}{${decl}${tf ? `;animation-timing-function:${tf}` : ''}}`)
      .join('');
    let name = this.kf.get(body);
    if (!name) {
      name = `k${this.kf.size.toString(36)}`;
      this.kf.set(body, name);
    }
    return name;
  }

  // style="animation:..." döndürür
  // base: animasyon kapalıyken (reduced-motion) geçerli olacak statik CSS
  anim(T, stops, { delay = 0, ease = 'linear', origin = '', base = '' } = {}) {
    const n = this.keyframes(T, stops);
    const o = origin ? `;transform-box:fill-box;transform-origin:${origin}` : '';
    const b = base ? `${base};` : '';
    return ` style="${b}animation:${n} ${T}s ${ease} ${r2(delay)}s infinite${o}"`;
  }

  // Basit sonsuz animasyon (ör. yanıp sönen imleç): name + css gövdesi
  loop(name, body) {
    if (!this.kf.has(`__${name}`)) { this.kf.set(`__${name}`, name); this.css.push(`@keyframes ${name}{${body}}`); }
    return name;
  }

  async fontFaces() {
    const out = [];
    for (const [k, f] of Object.entries(FONTLAR)) {
      const chars = [...this.used[k]].join('');
      if (!chars.trim()) continue;
      const buf = await subsetFont(readFileSync(path.join(FONT_DIR, f.dosya)), `${chars} `, { targetFormat: 'woff2' });
      out.push(
        `@font-face{font-family:JBM;font-weight:${f.weight};font-style:${f.style};` +
          `src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2')}`
      );
    }
    return out.join('');
  }

  async render() {
    const renk = Object.entries(RENK_SINIFLARI).map(([k, v]) => `.${k}{fill:${v}}`).join('');
    const kfs = [...this.kf.entries()]
      .filter(([body]) => !body.startsWith('__'))
      .map(([body, name]) => `@keyframes ${name}{${body}}`)
      .join('');
    const css =
      (await this.fontFaces()) +
      `text{font-family:JBM,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;fill:#e6e9f2;` +
      `font-variant-ligatures:none;font-kerning:none}` +
      `.b{font-weight:700}.i{font-style:italic}` +
      renk +
      this.css.join('') +
      kfs +
      `@media (prefers-reduced-motion:reduce){*{animation:none!important}}`;
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${this.w} ${this.h}" width="${this.w}" height="${this.h}" ` +
      `role="img" aria-labelledby="ttl dsc" fill="none">` +
      `<title id="ttl">${esc(this.title)}</title><desc id="dsc">${esc(this.desc)}</desc>` +
      `<style>${css}</style>` +
      `<defs>${this.defs.join('')}</defs>` +
      this.body.join('') +
      `</svg>`
    );
  }
}

// Görünürlük penceresi: [[a,b], ...] aralıklarında opaklık 1, kenarlarda fade sn geçiş.
export function pencere(araliklar, fade = 0.25, { gor = 1, gizli = 0 } = {}) {
  const st = [];
  for (const [a, b] of araliklar) {
    st.push([Math.max(0, a), `opacity:${gizli}`]);
    st.push([a + fade, `opacity:${gor}`]);
    st.push([b - fade, `opacity:${gor}`]);
    st.push([b, `opacity:${gizli}`]);
  }
  return st;
}
