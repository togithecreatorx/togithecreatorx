// Rozetler — README başlığının altındaki küçük, tıklanabilir hap'lar.

import { Svg, mlen, r2 } from '../lib/svg.mjs';
import { P } from '../lib/palet.mjs';
import { profil } from '../profil.config.mjs';

const H = 34, FS = 12.5;

const IKON = {
  eposta: (c) =>
    `<rect x="-7.5" y="-5.5" width="15" height="11" rx="2" stroke="${c}" stroke-width="1.5"/>` +
    `<path d="M-6.5 -4.2L0 1L6.5 -4.2" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>`,
  konum: (c) =>
    `<path d="M0 7.5C-4.8 2.6 -6.2 -0.4 -6.2 -2.6A6.2 6.2 0 0 1 6.2 -2.6C6.2 -0.4 4.8 2.6 0 7.5Z" stroke="${c}" stroke-width="1.5"/>` +
    `<circle cy="-2.6" r="2.1" fill="${c}"/>`,
  atolye: (c) =>
    `<path d="M-5.2 2.8C-6.4 -1.2 -3.6 -6.4 0 -7.6C3.6 -6.4 6.4 -1.2 5.2 2.8Z" stroke="${c}" stroke-width="1.5" stroke-linejoin="round"/>` +
    `<path d="M-5 -1H5M-5.6 1.2H5.6M-3.6 -3.6H3.6" stroke="${c}" stroke-opacity=".6" stroke-width="1"/>` +
    `<rect x="-3.6" y="4.2" width="7.2" height="2.6" rx="1" fill="${c}"/>`,
};

async function rozet(ikon, renk, metin, baslik) {
  const tw = mlen(metin) * FS * 0.6;
  const W = Math.ceil(44 + tw + 16);
  const s = new Svg(W, H, { title: baslik, desc: baslik });
  s.def(
    `<linearGradient id="rz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P[renk]}" stop-opacity=".75"/><stop offset="1" stop-color="${P.co}" stop-opacity=".25"/></linearGradient>`
  );
  s.add(
    `<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="${(H - 1.5) / 2}" fill="${P.bg1}" stroke="url(#rz)" stroke-width="1.5"/>`,
    `<circle cx="18" cy="17" r="12" fill="${P[renk]}" fill-opacity=".14"/>`,
    `<g transform="translate(18 17)">${IKON[ikon](P[renk])}</g>`,
    s.T(38, 21.4, metin, { size: FS })
  );
  return s.render();
}

export const rozetEposta = () => rozet('eposta', 'sf', `[t|${profil.eposta}]`, `E-posta: ${profil.eposta}`);
export const rozetKonum = () => rozet('konum', 'tq', `[t|İstanbul][m| · ][d|TR]`, 'Konum: İstanbul, Türkiye');
export const rozetAtolye = () => rozet('atolye', 'am', `[t|${profil.atolye}][m| · ][d|3D lamba]`, `${profil.atolye} — 3D baskı lambalar`);
