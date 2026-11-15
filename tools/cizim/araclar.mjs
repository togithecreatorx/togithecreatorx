// araclar.svg — atölye: daha küçük araçlar ve yan projeler. 4 sütunluk ızgara,
// her kartta küçük animasyonlu bir ikon; bir kart 2 sütun kaplayabilir.

import { Svg, len, ADV, r2 } from '../lib/svg.mjs';
import { P, ID } from '../lib/palet.mjs';
import { araclar } from '../profil.config.mjs';

const W = 900;
const HEAD = 38, M = 12, G = 12, COLS = 4;
const TW = (W - 2 * M - (COLS - 1) * G) / COLS, TH = 132;

// ikonlar: (s, cx, cy, renk) → svg   (≈ 30 × 30)
const IKON = {
  pilot(s, x, y, c) {
    s.loop('ucak', '0%,100%{transform:translate(0,0)}50%{transform:translate(2px,-2px)}');
    return `<g style="animation:ucak 2.4s ease-in-out infinite"><path d="M${x - 11} ${y + 1}L${x + 11} ${y - 9}L${x + 4} ${y + 11}L${x} ${y + 3}Z" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-width="1.6" stroke-linejoin="round"/>` +
      `<path d="M${x} ${y + 3}L${x + 11} ${y - 9}" stroke="${c}" stroke-width="1.3"/></g>` +
      `<path d="M${x - 14} ${y + 9}h6M${x - 12} ${y + 13}h4" stroke="${c}" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round"/>`;
  },
  makbuz(s, x, y, c) {
    const L = 4;
    let g = `<path d="M${x - 9} ${y - 12}h18v24l-3-2-3 2-3-2-3 2-3-2-3 2z" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>`;
    g += `<path d="M${x - 5} ${y - 6}h10M${x - 5} ${y - 1}h7M${x - 5} ${y + 4}h9" stroke="${c}" stroke-opacity=".7" stroke-width="1.4" stroke-linecap="round"/>`;
    g += `<g${s.anim(L, [[0, 'opacity:0;transform:translateX(-4px)'], [1.2, 'opacity:0;transform:translateX(-4px)'], [1.6, 'opacity:1;transform:translateX(0)'], [3.5, 'opacity:1;transform:translateX(0)'], [3.9, 'opacity:0;transform:translateX(0)']], { base: 'opacity:1' })}>` +
      `<rect x="${x + 7}" y="${y + 3}" width="14" height="9" rx="2" fill="${P.cr}"/>` + s.T(x + 14, y + 10, '[dk.b|PDF]', { size: 6.5, anchor: 'middle' }) + `</g>`;
    return g;
  },
  liste(s, x, y, c) {
    const L = 4.5;
    let g = '';
    for (let i = 0; i < 3; i++) {
      const yy = y - 9 + i * 9;
      g += `<rect x="${x - 12}" y="${yy - 3}" width="24" height="6" rx="2" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-opacity=".5"/>`;
      const t = 0.4 + i * 0.7;
      g += `<path d="M${x + 14} ${yy}l2.4 2.4l4.4-4.4" stroke="${P.sg}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"${s.anim(L, [[0, 'opacity:0'], [t, 'opacity:0'], [t + 0.15, 'opacity:1'], [3.9, 'opacity:1'], [4.3, 'opacity:0']], { base: 'opacity:1' })}/>`;
    }
    return g;
  },
  cip(s, x, y, c) {
    let g = '';
    for (let i = -1; i <= 1; i++) {
      g += `<path d="M${x + i * 6} ${y - 13}v-4M${x + i * 6} ${y + 13}v4M${x - 13} ${y + i * 6}h-4M${x + 13} ${y + i * 6}h4" stroke="${c}" stroke-opacity=".7" stroke-width="1.5" stroke-linecap="round"/>`;
    }
    g += `<rect x="${x - 12}" y="${y - 12}" width="24" height="24" rx="4" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-width="1.5"/>`;
    s.loop('led', '0%,45%{opacity:1}50%,95%{opacity:.15}100%{opacity:1}');
    g += `<circle cx="${x + 5}" cy="${y - 5}" r="2.6" fill="${P.sg}" style="animation:led 1.4s steps(1) infinite"/>`;
    s.loop('wifi', '0%{opacity:0;transform:scale(.6)}30%{opacity:1}100%{opacity:0;transform:scale(1.25)}');
    g += `<path d="M${x - 6} ${y + 6}a8 8 0 0 1 8 -8" stroke="${c}" stroke-width="1.4" stroke-linecap="round" style="animation:wifi 1.8s ease-out infinite;transform-box:fill-box;transform-origin:left bottom"/>`;
    return g;
  },
  lamba(s, x, y, c) {
    s.loop('isikL', '0%,100%{opacity:.55}50%{opacity:1}');
    return `<circle cx="${x}" cy="${y - 2}" r="16" fill="${c}" fill-opacity=".18" style="animation:isikL 2.6s ease-in-out infinite"/>` +
      `<path d="M${x - 8} ${y + 6}C${x - 11} ${y - 2} ${x - 6} ${y - 12} ${x} ${y - 14}C${x + 6} ${y - 12} ${x + 11} ${y - 2} ${x + 8} ${y + 6}Z" fill="${c}" fill-opacity=".85"/>` +
      `<path d="M${x - 8} ${y - 1}H${x + 8}M${x - 9} ${y + 2.5}H${x + 9}M${x - 6} ${y - 6}H${x + 6}" stroke="#7a330f" stroke-opacity=".5"/>` +
      `<rect x="${x - 6}" y="${y + 7}" width="12" height="4" rx="1.5" fill="${P.faint}"/>`;
  },
  kurulum(s, x, y, c) {
    const L = 4;
    let g = `<path d="M${x} ${y - 13}v12m-5-5l5 5l5-5" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
    g += `<rect x="${x - 13}" y="${y + 6}" width="26" height="6" rx="3" fill="${P.line2}"/>`;
    g += `<rect x="${x - 13}" y="${y + 6}" width="26" height="6" rx="3" fill="${c}"${s.anim(L, [[0, 'transform:scaleX(0)'], [0.3, 'transform:scaleX(0)'], [2.8, 'transform:scaleX(1)'], [3.6, 'transform:scaleX(1)'], [3.9, 'transform:scaleX(0)']], { origin: 'left center', base: 'transform:scaleX(1)' })}/>`;
    return g;
  },
  kod(s, x, y, c) {
    s.loop('blinkK', '0%,49%{opacity:1}50%,100%{opacity:0}');
    return `<path d="M${x - 6} ${y - 9}l-8 9l8 9M${x + 6} ${y - 9}l8 9l-8 9" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="M${x + 3} ${y - 11}l-6 22" stroke="${c}" stroke-opacity=".6" stroke-width="1.6" stroke-linecap="round"/>` +
      `<rect x="${x + 16}" y="${y + 4}" width="5" height="8" fill="${c}" style="animation:blinkK 1.1s linear infinite"/>`;
  },
};

export async function araclarSvg() {
  // yerleşim: soldan sağa doldur, genişliği 2 olan kart satıra sığmazsa alta iner
  const yer = [];
  let col = 0, row = 0;
  for (const a of araclar) {
    const span = a[4] || 1;
    if (col + span > COLS) { col = 0; row++; }
    yer.push({ a, col, row, span });
    col += span;
    if (col >= COLS) { col = 0; row++; }
  }
  const rows = Math.max(...yer.map((y) => y.row)) + 1;
  const H = HEAD + M + rows * TH + (rows - 1) * G + M;

  const s = new Svg(W, H, {
    title: 'Atölye: araçlar ve yan projeler',
    desc: araclar.map(([ad, ac]) => `${ad}: ${ac.join(' ')}`).join(' — '),
  });
  s.def(
    `<clipPath id="pen"><rect width="${W}" height="${H}" rx="14"/></clipPath>`,
    `<linearGradient id="kenarA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.brand}" stop-opacity=".55"/><stop offset="1" stop-color="${P.am}" stop-opacity=".25"/></linearGradient>`
  );
  const parts = [`<g clip-path="url(#pen)">`, `<rect width="${W}" height="${H}" fill="${P.bg1}"/>`];
  parts.push(`<rect width="${W}" height="${HEAD}" fill="${P.bg0}"/><line x1="0" y1="${HEAD - 0.5}" x2="${W}" y2="${HEAD - 0.5}" stroke="${P.line}"/>`);
  [P.cr, P.sf, P.sg].forEach((c, i) => parts.push(`<circle cx="${20 + i * 18}" cy="${HEAD / 2}" r="5.5" fill="${c}"/>`));
  parts.push(s.T(W / 2, HEAD / 2 + 4, '[d|~/atolye][m|  —  ][t|araçlar ve yan projeler]', { size: 11.5, anchor: 'middle' }));

  yer.forEach(({ a: [ad, aciklama, etiketler, ikon], col: c, row: r, span }, i) => {
    const x = M + c * (TW + G), y = HEAD + M + r * (TH + G);
    const w = TW * span + G * (span - 1);
    const k = ikon === 'lamba' ? 'am' : ID[i % ID.length];
    let g = `<rect x="${r2(x)}" y="${y}" width="${r2(w)}" height="${TH}" rx="12" fill="${P.bg2}" stroke="${P.line2}"/>`;
    g += `<rect x="${r2(x + 16)}" y="${y + 14}" width="38" height="38" rx="10" fill="${P[k]}" fill-opacity=".08"/>`;
    g += IKON[ikon](s, x + 35, y + 33, P[k]);
    g += s.T(x + 66, y + 30, `[t.b|${ad}]`, { size: 12.5 });
    g += s.T(x + 66, y + 46, `[m|${etiketler.join(' · ')}]`, { size: 10 });
    aciklama.forEach((sat, j) => (g += s.D(x + 16, y + 78 + j * 17, sat, { size: 12, weight: 420, fill: P.dim })));
    g += `<rect x="${r2(x + 16)}" y="${y + TH - 12}" width="${r2(w - 32)}" height="1" fill="${P[k]}" fill-opacity=".25"/>`;
    parts.push(g);
  });

  parts.push(`</g>`, `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="13.5" stroke="url(#kenarA)"/>`);
  s.add(...parts);
  return s.render();
}
