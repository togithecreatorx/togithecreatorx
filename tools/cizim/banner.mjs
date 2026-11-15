// banner.svg — TOGI marka başlığı: yörüngeli monogram, büyük wordmark, slogan.
//   açılış : beyaz T soldan, mor T sağdan gelir; yörünge belirir, yıldız parlar (bir kez)
//   döngü  : yıldız göz kırpar, yörüngede ışık süzülür, slogan kelimeleri sırayla yanar,
//            sağdaki yörünge halkaları yavaşça akar.

import { Svg, r2, len, ADV } from '../lib/svg.mjs';
import { P } from '../lib/palet.mjs';
import { VIEW, MOR, beyazT, morT, yorungeUst, yorungeAlt, yildiz, YILDIZ_MERKEZ } from '../lib/logo.mjs';
import { profil } from '../profil.config.mjs';

const W = 900, H = 300;

export async function banner() {
  const s = new Svg(W, H, {
    title: `${profil.marka} — ${profil.ad}`,
    desc: `${profil.marka} monogramı, ${profil.ad} adı ve "${profil.slogan.join(' • ')}" sloganı; @${profil.github}.`,
  });

  // logo yerleşimi
  const [vx, vy, vw, vh] = VIEW;
  const k = 0.37;
  const lw = vw * k, lh = vh * k;
  const lx = 46, ly = (H - lh) / 2 + 4;
  const tx = lx - vx * k, ty = ly - vy * k;
  const lcx = lx + lw / 2, lcy = ly + lh / 2;

  s.def(
    `<clipPath id="kart"><rect width="${W}" height="${H}" rx="18"/></clipPath>`,
    `<radialGradient id="g1" cx="${r2(lcx)}" cy="${r2(lcy)}" r="250" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${MOR}" stop-opacity=".34"/><stop offset=".55" stop-color="${MOR}" stop-opacity=".08"/><stop offset="1" stop-color="${MOR}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="g2" cx="820" cy="330" r="360" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${P.brand}" stop-opacity=".16"/><stop offset="1" stop-color="${P.brand}" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="kenar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.brand}" stop-opacity=".75"/><stop offset=".45" stop-color="${P.co}" stop-opacity=".12"/><stop offset="1" stop-color="${P.brand}" stop-opacity=".45"/></linearGradient>`,
    `<linearGradient id="kelime" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="${P.li}"/></linearGradient>`,
    `<linearGradient id="ayrac" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${P.brand}"/><stop offset=".6" stop-color="${P.brand}" stop-opacity=".35"/><stop offset="1" stop-color="${P.brand}" stop-opacity="0"/></linearGradient>`,
    `<pattern id="nokta" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="${P.li}" fill-opacity=".09"/></pattern>`,
    `<radialGradient id="maskeG" cx="${r2(lcx + 60)}" cy="${r2(lcy)}" r="420" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`,
    `<mask id="noktaMaske"><rect width="${W}" height="${H}" fill="url(#maskeG)"/></mask>`,
    // yörüngede süzülen ışık (logo koordinatlarında)
    `<linearGradient id="isilti" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="220" y2="-90">` +
      `<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>` +
      `<animateTransform attributeName="gradientTransform" type="translate" values="-300 120;1100 -60;1100 -60" keyTimes="0;.55;1" dur="5.5s" begin="1.6s" repeatCount="indefinite"/></linearGradient>`,
    `<radialGradient id="yildizHale"><stop offset="0" stop-color="${P.li}" stop-opacity=".75"/><stop offset=".35" stop-color="${P.brand}" stop-opacity=".35"/><stop offset="1" stop-color="${P.brand}" stop-opacity="0"/></radialGradient>`
  );

  const parts = [];
  parts.push(`<g clip-path="url(#kart)">`);
  parts.push(`<rect width="${W}" height="${H}" fill="${P.bg1}"/>`);
  parts.push(`<rect width="${W}" height="${H}" fill="url(#nokta)" mask="url(#noktaMaske)"/>`);
  parts.push(`<rect width="${W}" height="${H}" fill="url(#g2)"/><rect width="${W}" height="${H}" fill="url(#g1)"/>`);

  // sağ alttan yükselen yörünge halkaları (sosyal önizlemedeki motif)
  s.loop('akHalka', 'to{stroke-dashoffset:-240}');
  for (let i = 0; i < 7; i++) {
    const rx = 150 + i * 34, ry = 118 + i * 26;
    const op = (0.2 - i * 0.022).toFixed(3);
    const dash = i % 2 ? '' : ` stroke-dasharray="4 8" style="animation:akHalka ${18 + i * 4}s linear infinite"`;
    parts.push(`<ellipse cx="840" cy="332" rx="${rx}" ry="${ry}" stroke="${P.brand}" stroke-opacity="${op}" stroke-width="1.2"${dash}/>`);
  }

  // uzak yıldızlar
  s.loop('goz', '0%,100%{opacity:.15}50%{opacity:.9}');
  const yildizlar = [[610, 40, 1.1, 0], [700, 70, 0.8, 1.3], [786, 34, 1.3, 2.1], [858, 92, 0.9, 0.6], [560, 96, 0.7, 2.7], [835, 150, 1.0, 1.8], [662, 22, 0.8, 3.2], [890, 40, 0.9, 2.4]];
  for (const [x, y, r, d] of yildizlar) {
    parts.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${P.li}" style="animation:goz ${3 + (d % 1.5)}s ease-in-out ${d}s infinite"/>`);
  }

  // ── logo ──
  const giris = (ad, govde) => { s.loop(ad, govde); return ad; };
  const gT1 = giris('gBeyaz', 'from{opacity:0;transform:translate(-26px,8px)}to{opacity:1;transform:translate(0,0)}');
  const gT2 = giris('gMor', 'from{opacity:0;transform:translate(26px,-8px)}to{opacity:1;transform:translate(0,0)}');
  const gOr = giris('gYorunge', 'from{opacity:0;transform:scale(.86) rotate(-6deg)}to{opacity:1;transform:scale(1) rotate(0)}');
  const gYi = giris('gYildiz', 'from{opacity:0;transform:scale(0) rotate(-90deg)}to{opacity:1;transform:scale(1) rotate(0)}');
  s.loop('parilti', '0%,100%{transform:scale(1) rotate(0)}45%{transform:scale(1)}50%{transform:scale(.72) rotate(22deg)}58%{transform:scale(1.12) rotate(0)}66%{transform:scale(1)}');
  s.loop('hale', '0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.25)}');

  const [scx, scy] = YILDIZ_MERKEZ;
  parts.push(`<g transform="translate(${r2(tx)} ${r2(ty)}) scale(${k})">`);
  parts.push(
    `<g style="animation:${gOr} 1s cubic-bezier(.2,.7,.2,1) .35s both;transform-box:fill-box;transform-origin:center">` +
      `<path d="${yorungeUst}" fill="${MOR}"/><path d="${yorungeAlt}" fill="${MOR}"/>` +
      `<path d="${yorungeUst}" fill="url(#isilti)"/><path d="${yorungeAlt}" fill="url(#isilti)"/>` +
      `</g>`
  );
  parts.push(`<path d="${beyazT}" fill="${P.text}" style="animation:${gT1} .8s cubic-bezier(.2,.7,.2,1) .05s both"/>`);
  parts.push(
    `<g style="animation:${gT2} .8s cubic-bezier(.2,.7,.2,1) .2s both">` +
      `<path d="${morT}" fill="${MOR}"/><path d="${morT}" fill="url(#isilti)"/></g>`
  );
  parts.push(
    `<g style="animation:${gYi} .6s cubic-bezier(.3,1.6,.5,1) 1s both;transform-box:fill-box;transform-origin:center">` +
      `<circle cx="${scx}" cy="${scy}" r="120" fill="url(#yildizHale)" style="animation:hale 3.2s ease-in-out 1.6s infinite;transform-box:fill-box;transform-origin:center"/>` +
      `<g style="animation:parilti 3.2s ease-in-out 1.6s infinite;transform-box:fill-box;transform-origin:center"><path d="${yildiz}" fill="${MOR}"/><path d="${yildiz}" fill="${P.li}" fill-opacity=".35"/></g>` +
      `</g>`
  );
  parts.push(`</g>`);

  // ── metin bloğu ──
  const X = 396;
  s.loop('gMetin', 'from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}');
  const mt = (d) => ` style="animation:gMetin .7s cubic-bezier(.2,.7,.2,1) ${d}s both"`;

  parts.push(`<g${mt(0.25)}>` + s.D(X - 4, 148, profil.marka, { size: 112, weight: 800, ls: 6, fill: 'url(#kelime)' }) + `</g>`);
  parts.push(`<g${mt(0.4)}>` + s.D(X, 184, profil.ad.toLocaleUpperCase('tr-TR'), { size: 18, weight: 500, ls: 5.5, fill: P.dim }) + `</g>`);

  // slogan: kelimeler sırayla yanar
  const T = 6;
  const kel = profil.slogan;
  let sp = '';
  kel.forEach((w, i) => {
    const a = (i * 2) / T * 100, b = ((i * 2 + 1.6) / T) * 100;
    const ad = s.loop(`yan${i}`, `0%,100%{fill:${P.co}}${a.toFixed(1)}%{fill:${P.co}}${(a + 6).toFixed(1)}%{fill:#ffffff}${b.toFixed(1)}%{fill:#ffffff}${Math.min(100, b + 6).toFixed(1)}%{fill:${P.co}}`);
    s.regD(650, w);
    sp += `<tspan style="animation:${ad} ${T}s ease-in-out 1.4s infinite" fill="${P.co}">${w}</tspan>`;
    if (i < kel.length - 1) { s.regD(650, ' • '); sp += `<tspan fill="${P.brand}">  •  </tspan>`; }
  });
  parts.push(`<g${mt(0.55)}><text x="${X}" y="222" class="dsp w650" font-size="17" letter-spacing="3" xml:space="preserve">${sp}</text></g>`);

  // ayraç + üzerinde kayan ışık
  s.loop('kay', '0%{transform:translateX(0);opacity:0}10%{opacity:1}80%{opacity:1}100%{transform:translateX(440px);opacity:0}');
  parts.push(
    `<g${mt(0.7)}><rect x="${X}" y="242" width="464" height="1.5" fill="url(#ayrac)"/>` +
      `<circle cx="${X}" cy="242.75" r="2.2" fill="#fff" style="animation:kay 4.5s cubic-bezier(.4,0,.2,1) 2s infinite"/></g>`
  );

  // alt satır (terminal tonu)
  const alt = `[co.b|❯][t|  @${profil.github}][m|  ·  ][d|${profil.alanlar}]`;
  const altW = s.width(alt, 12.5);
  s.loop('blink', '0%,49%{opacity:1}50%,100%{opacity:0}');
  parts.push(
    `<g${mt(0.85)}>` + s.T(X, 272, alt, { size: 12.5 }) +
      `<rect x="${r2(X + altW + 6)}" y="262" width="${r2(12.5 * ADV)}" height="13" rx="1" fill="${P.co}" style="animation:blink 1.1s linear infinite"/></g>`
  );

  // sağ üst künye
  parts.push(s.T(W - 22, 32, `[m|İSTANBUL][f|  ·  ][m|${new Date().getFullYear()}]`, { size: 10.5, anchor: 'end' }));

  parts.push(`</g>`);
  parts.push(`<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="17.25" stroke="url(#kenar)" stroke-width="1.5"/>`);
  s.add(...parts);
  return s.render();
}
