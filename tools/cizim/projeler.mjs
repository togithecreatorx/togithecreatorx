// projeler.svg — öne çıkan 4 proje, 2 × 2 büyük kart. Her kartın sağında projeyi
// anlatan küçük, canlı bir görsel var (modül ızgarası, radar, imza, çağrı dalgası).

import { Svg, len, ADV, r2 } from '../lib/svg.mjs';
import { P, ID } from '../lib/palet.mjs';
import { projeler } from '../profil.config.mjs';

const W = 900;
const HEAD = 38, M = 12, GX = 14, GY = 14;
const CW = (W - 2 * M - GX) / 2, CH = 184;
const H = HEAD + M + 2 * CH + GY + M;

// ── mini görseller: (s, x, y, renk) → svg   (alan ≈ 112 × 112) ───────────────
const MINI = {
  // 12 modül sırayla yanar, sonra hepsi birlikte nabız atar: "12 → 1"
  moduller(s, x, y) {
    const L = 6;
    let g = '';
    for (let i = 0; i < 12; i++) {
      const c = i % 4, r = Math.floor(i / 4);
      const xx = x + c * 27, yy = y + 8 + r * 27;
      const k = P[ID[i % ID.length]];
      const a = 0.15 + i * 0.22;
      g += `<rect x="${xx}" y="${yy}" width="21" height="21" rx="5.5" fill="${k}" fill-opacity=".1" stroke="${k}" stroke-opacity=".35"/>`;
      g += `<rect x="${xx}" y="${yy}" width="21" height="21" rx="5.5" fill="${k}" opacity=".85"${s.anim(L, [[0, 'opacity:0'], [a, 'opacity:0'], [a + 0.15, 'opacity:.85'], [5.2, 'opacity:.85'], [5.7, 'opacity:0']], { base: 'opacity:.85' })}/>`;
    }
    s.loop('birlik', '0%,100%{opacity:0}50%{opacity:.9}');
    g += `<rect x="${x - 4}" y="${y + 4}" width="${3 * 27 + 29}" height="${2 * 27 + 29}" rx="10" stroke="${P.text}" stroke-width="1.4" opacity="0"${s.anim(L, [[0, 'opacity:0'], [2.9, 'opacity:0'], [3.2, 'opacity:.9'], [5.2, 'opacity:.9'], [5.7, 'opacity:0']])}/>`;
    g += s.T(x, y + 112, '[t.b|12][m| modül → ][co.b|1][m| uygulama]', { size: 10 });
    return g;
  },

  // radar taraması: uç noktalar taranınca yanar; ortada kalkan
  radar(s, x, y) {
    const cx = x + 54, cy = y + 52, R = 48;
    let g = '';
    for (const r of [R, R * 0.66, R * 0.33]) g += `<circle cx="${cx}" cy="${cy}" r="${r2(r)}" stroke="${P.tq}" stroke-opacity=".22"/>`;
    g += `<path d="M${cx - R} ${cy}H${cx + R}M${cx} ${cy - R}V${cy + R}" stroke="${P.tq}" stroke-opacity=".12"/>`;
    s.def(`<linearGradient id="tarama" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${P.tq}" stop-opacity="0"/><stop offset="1" stop-color="${P.tq}" stop-opacity=".45"/></linearGradient>`);
    s.loop('don', 'to{transform:rotate(360deg)}');
    const a = (-38 * Math.PI) / 180;
    g += `<g style="animation:don 4s linear infinite;transform-origin:${cx}px ${cy}px">` +
      `<path d="M${cx} ${cy}L${r2(cx + R * Math.cos(a))} ${r2(cy + R * Math.sin(a))}A${R} ${R} 0 0 1 ${cx + R} ${cy}Z" fill="url(#tarama)"/>` +
      `<line x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="${P.tq}" stroke-width="1.4"/></g>`;
    const uc = [[0.7, 30], [0.45, 110], [0.85, 160], [0.6, 215], [0.9, 290], [0.35, 330], [0.75, 250]];
    uc.forEach(([rr, deg], i) => {
      const t = (deg / 360) * 4;
      const px = cx + R * rr * Math.cos((deg * Math.PI) / 180), py = cy + R * rr * Math.sin((deg * Math.PI) / 180);
      const k = i === 2 ? P.cr : P.tq;
      g += `<circle cx="${r2(px)}" cy="${r2(py)}" r="2.6" fill="${k}" opacity=".35"${s.anim(4, [[0, 'opacity:.35'], [t, 'opacity:.35'], [t + 0.05, 'opacity:1'], [t + 1.6, 'opacity:.35']], { base: 'opacity:.8' })}/>`;
    });
    g += `<path d="M${cx} ${cy - 11}l9 3.6v5.4c0 5.6-3.8 9.6-9 11.4c-5.2-1.8-9-5.8-9-11.4v-5.4z" fill="${P.bg2}" stroke="${P.text}" stroke-width="1.5" stroke-linejoin="round"/>`;
    g += `<path d="M${cx - 3.8} ${cy + 0.6}l2.6 2.6l5-5" stroke="${P.sg}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    g += s.T(x + 54, y + 118, '[tq.b|180+][m| uç nokta]', { size: 10, anchor: 'middle' });
    return g;
  },

  // akıllı kart → imza çizgisi çizilir → CAdES ✓
  imza(s, x, y) {
    const L = 5;
    let g = '';
    g += `<rect x="${x + 4}" y="${y + 6}" width="70" height="46" rx="7" fill="${P.bg3}" stroke="${P.co}" stroke-opacity=".6"/>`;
    g += `<rect x="${x + 14}" y="${y + 20}" width="18" height="14" rx="3" fill="${P.sf}" fill-opacity=".85"/>`;
    g += `<path d="M${x + 14} ${y + 27}h18M${x + 23} ${y + 20}v14" stroke="${P.bg2}" stroke-width="1"/>`;
    g += `<path d="M${x + 42} ${y + 22}h22M${x + 42} ${y + 30}h16M${x + 42} ${y + 38}h20" stroke="${P.co}" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/>`;
    // ağ geçidi düğümleri
    s.loop('akisI', 'to{stroke-dashoffset:-14}');
    g += `<path d="M${x + 78} ${y + 29}H${x + 104}" stroke="${P.co}" stroke-width="1.6" stroke-dasharray="3 4" style="animation:akisI .8s linear infinite"/>`;
    g += `<circle cx="${x + 106}" cy="${y + 29}" r="4" fill="${P.co}"/>`;
    // imza
    const d = `M${x + 6} ${y + 84}c8-14 14-14 12-2s4 10 10-4s8-10 9 0s6 8 12-2s9-6 10 2c2 6 8 5 14-3s10-4 12 2`;
    const Lp = 150;
    g += `<path d="${d}" stroke="${P.text}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${Lp} ${Lp}"${s.anim(L, [[0, `stroke-dashoffset:${Lp}`], [0.4, `stroke-dashoffset:${Lp}`, 'cubic-bezier(.4,0,.2,1)'], [2.2, 'stroke-dashoffset:0'], [4.4, 'stroke-dashoffset:0'], [4.8, `stroke-dashoffset:${Lp}`]], { base: 'stroke-dashoffset:0' })}/>`;
    g += `<line x1="${x + 4}" y1="${y + 94}" x2="${x + 104}" y2="${y + 94}" stroke="${P.faint}"/>`;
    g += `<g opacity="1"${s.anim(L, [[0, 'opacity:0'], [2.3, 'opacity:0'], [2.5, 'opacity:1'], [4.4, 'opacity:1'], [4.7, 'opacity:0']], { base: 'opacity:1' })}>` + s.T(x + 4, y + 114, '[sg.b|CAdES-BES ✓]', { size: 10 }) + `</g>`;
    return g;
  },

  // çağrı dalgası + sıradaki çağrılar
  cagri(s, x, y) {
    let g = '';
    const n = 15, bw = 4, gap = 3.2, base = y + 44;
    for (let i = 0; i < n; i++) {
      const h = 10 + Math.round(26 * Math.abs(Math.sin(i * 1.7 + 0.4)));
      const xx = x + 2 + i * (bw + gap);
      const dur = (0.9 + (i % 5) * 0.17).toFixed(2);
      const ad = s.loop(`dalga${i % 5}`, `0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}`);
      g += `<rect x="${r2(xx)}" y="${base - h / 2}" width="${bw}" height="${h}" rx="2" fill="${i % 4 === 0 ? P.cr : P.co}" style="animation:${ad} ${dur}s ease-in-out ${(i * 0.07).toFixed(2)}s infinite;transform-box:fill-box;transform-origin:center"/>`;
    }
    // kuyruk
    const sat = [['#1042', 'bağlandı', 'sg'], ['#1043', 'çalıyor', 'sf'], ['#1044', 'sırada', 'mute']];
    s.loop('nabizC', '0%,100%{opacity:1}50%{opacity:.3}');
    sat.forEach(([no, du, k], i) => {
      const yy = y + 80 + i * 15;
      g += `<circle cx="${x + 6}" cy="${yy - 3.5}" r="3" fill="${P[k]}"${i === 1 ? ' style="animation:nabizC 1s ease-in-out infinite"' : ''}/>`;
      g += s.T(x + 14, yy, `[d|${no}][m|  ${du}]`, { size: 9.5 });
    });
    return g;
  },
};

export async function projelerSvg() {
  const s = new Svg(W, H, {
    title: 'Öne çıkan projeler',
    desc: projeler.map((p) => `${p.baslik}: ${p.aciklama.join(' ')}`).join(' — '),
  });
  s.def(
    `<clipPath id="pen"><rect width="${W}" height="${H}" rx="14"/></clipPath>`,
    `<linearGradient id="kenarP" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.brand}" stop-opacity=".6"/><stop offset="1" stop-color="${P.brand}" stop-opacity=".15"/></linearGradient>`,
    `<radialGradient id="kartIsik" cx="0" cy="0" r="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="${P.brand}" stop-opacity=".16"/><stop offset="1" stop-color="${P.brand}" stop-opacity="0"/></radialGradient>`
  );
  const parts = [`<g clip-path="url(#pen)">`, `<rect width="${W}" height="${H}" fill="${P.bg1}"/>`];

  // pencere başlığı
  parts.push(`<rect width="${W}" height="${HEAD}" fill="${P.bg0}"/><line x1="0" y1="${HEAD - 0.5}" x2="${W}" y2="${HEAD - 0.5}" stroke="${P.line}"/>`);
  [P.cr, P.sf, P.sg].forEach((c, i) => parts.push(`<circle cx="${20 + i * 18}" cy="${HEAD / 2}" r="5.5" fill="${c}"/>`));
  parts.push(s.T(W / 2, HEAD / 2 + 4, '[d|~/projeler][m|  —  ][t|öne çıkanlar]', { size: 11.5, anchor: 'middle' }));

  projeler.forEach((p, i) => {
    const c = i % 2, r = Math.floor(i / 2);
    const x = M + c * (CW + GX), y = HEAD + M + r * (CH + GY);
    const k = ID[i % ID.length];
    let g = '';
    g += `<rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="14" fill="${P.bg2}" stroke="${P.line2}"/>`;
    s.def(`<clipPath id="kc${i}"><rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="14"/></clipPath>`);
    g += `<g clip-path="url(#kc${i})"><ellipse cx="${x + CW - 70}" cy="${y + 70}" rx="150" ry="110" fill="url(#kartIsik)"/></g>`;
    g += `<rect x="${x + 22}" y="${y}" width="34" height="3" rx="1.5" fill="${P[k]}"/>`;
    // başlık
    g += s.D(x + 22, y + 46, p.baslik, { size: 25, weight: 750, ls: 0.2, fill: P.text });
    g += s.T(x + 22, y + 66, `[m|~/${p.ad}]`, { size: 10.5 });
    // açıklama
    p.aciklama.forEach((sat, j) => (g += s.D(x + 22, y + 92 + j * 18, sat, { size: 13, weight: 420, fill: P.dim })));
    // etiketler
    let tx = x + 22;
    const ty = y + 142, cs = 10.5;
    for (const e of p.etiketler) {
      const w = len(e) * cs * ADV + 16;
      g += `<rect x="${r2(tx)}" y="${ty - 14}" width="${r2(w)}" height="20" rx="6" fill="${P[k]}" fill-opacity=".1" stroke="${P[k]}" stroke-opacity=".4"/>`;
      g += s.T(tx + 8, ty, `[${k}|${e}]`, { size: cs });
      tx += w + 6;
    }
    g += s.T(x + 22, y + CH - 14, p.alt, { size: 10.5 });
    // mini görsel
    g += MINI[p.gorsel](s, x + CW - 132, y + 26, k);
    parts.push(g);
  });

  parts.push(`</g>`, `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="13.5" stroke="url(#kenarP)"/>`);
  s.add(...parts);
  return s.render();
}
