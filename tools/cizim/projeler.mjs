// projeler.svg — 2 × 4 proje kartı; her kartın sağında projeyi anlatan küçük, canlı bir mini görsel.

import { Svg, len, ADV, r2, pencere } from '../lib/svg.mjs';
import { P, ID } from '../lib/palet.mjs';
import { projeler, durumlar } from '../profil.config.mjs';

const W = 900;
const CW = 430, CH = 110, GX = 16, GY = 14, TOPH = 46, MX = 12;

// ── mini görseller: (s, x, y) → svg   (alan: 104 × 78) ─────────────────────
const MINI = {
  takip(s, x, y) {
    const adim = ['tevzi', 'dosyalar', 'evrak', 'harç', 'ödeme'];
    const L = 5;
    let g = `<line x1="${x + 6}" y1="${y + 8}" x2="${x + 6}" y2="${y + 8 + 4 * 15}" stroke="${P.line2}" stroke-width="1.5"/>`;
    adim.forEach((a, i) => {
      const yy = y + 8 + i * 15;
      const t0 = 0.3 + i * 0.75;
      g += `<circle cx="${x + 6}" cy="${yy}" r="4" fill="${P.bg1}" stroke="${P.co}" stroke-opacity=".5" stroke-width="1.4"/>`;
      g += `<circle cx="${x + 6}" cy="${yy}" r="2.6" fill="${P.co}" opacity="1"${s.anim(L, [[0, 'opacity:0'], [t0, 'opacity:0'], [t0 + 0.15, 'opacity:1'], [4.5, 'opacity:1'], [4.85, 'opacity:0']], { base: 'opacity:1' })}/>`;
      g += s.T(x + 17, yy + 3.5, `[${i === 4 ? 'm' : 'd'}|${a}]`, { size: 9.5 });
    });
    // son adım: kuru çalışma kilidi
    const ly = y + 8 + 4 * 15;
    g += `<g transform="translate(${x + 68} ${ly - 5})"><rect x="0" y="3" width="9" height="7" rx="1.5" fill="${P.cr}"/><path d="M2 3.2V1.8a2.5 2.5 0 0 1 5 0v1.4" stroke="${P.cr}" stroke-width="1.3"/></g>`;
    g += s.T(x + 80, ly + 3.5, '[cr|kuru]', { size: 9 });
    return g;
  },

  birlesme(s, x, y) {
    const my = y + 40, mx = x + 52;
    const ys = [y + 10, y + 30, y + 50, y + 70];
    let g = '';
    s.loop('akisP', 'to{stroke-dashoffset:-16}');
    ys.forEach((yy, i) => {
      const d = `M${x + 4} ${yy}C${x + 30} ${yy} ${mx - 24} ${my} ${mx} ${my}`;
      g += `<path d="${d}" stroke="${P[ID[i]]}" stroke-opacity=".35" stroke-width="2"/>`;
      g += `<path d="${d}" stroke="${P[ID[i]]}" stroke-width="2" stroke-dasharray="3 5" stroke-linecap="round" style="animation:akisP 1s linear infinite"/>`;
      g += `<circle cx="${x + 4}" cy="${yy}" r="3.2" fill="${P.bg2}" stroke="${P[ID[i]]}" stroke-width="1.5"/>`;
    });
    g += `<line x1="${mx}" y1="${my}" x2="${x + 100}" y2="${my}" stroke="${P.text}" stroke-opacity=".7" stroke-width="2.4"/>`;
    s.loop('nabiz', '0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.6);opacity:0}');
    g += `<circle cx="${mx}" cy="${my}" r="7" fill="${P.text}" style="animation:nabiz 2s ease-out infinite;transform-box:fill-box;transform-origin:center"/>`;
    g += `<circle cx="${mx}" cy="${my}" r="5.5" fill="${P.text}"/>`;
    g += s.T(x + 64, my - 8, '[t.b|4→1]', { size: 10 });
    return g;
  },

  durumlar(s, x, y) {
    let g = '';
    const L = 4;
    for (let i = 0; i < 8; i++) {
      const c = i % 4, r = Math.floor(i / 4);
      const xx = x + 2 + c * 25, yy = y + 6 + r * 25;
      const k = ID[i % 6];
      g += `<rect x="${xx}" y="${yy}" width="20" height="20" rx="5" fill="${P[k]}" fill-opacity=".16" stroke="${P[k]}" stroke-opacity=".4"/>`;
      const a = i * 0.5;
      g += `<rect x="${xx}" y="${yy}" width="20" height="20" rx="5" fill="${P[k]}" opacity="0"${s.anim(L, [[0, 'opacity:0'], [a, 'opacity:0'], [a + 0.1, 'opacity:.85'], [a + 0.5, 'opacity:.85'], [a + 0.6, 'opacity:0']])}/>`;
    }
    g += s.T(x + 2, y + 72, '[sg.b|24/24 ✓][m| test]', { size: 10 });
    return g;
  },

  cubuk(s, x, y) {
    const hs = [0.45, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5];
    let g = `<line x1="${x}" y1="${y + 62.5}" x2="${x + 104}" y2="${y + 62.5}" stroke="${P.line2}"/>`;
    s.loop('soluk', '0%,100%{transform:scaleY(1)}50%{transform:scaleY(.72)}');
    hs.forEach((h, i) => {
      const bh = h * 54;
      g += `<rect x="${x + 4 + i * 14.5}" y="${r2(y + 62 - bh)}" width="9" height="${r2(bh)}" rx="2" fill="${P.tq}" fill-opacity="${0.45 + h * 0.5}" style="animation:soluk ${2.4 + i * 0.3}s ease-in-out ${-i * 0.4}s infinite;transform-box:fill-box;transform-origin:bottom"/>`;
    });
    g += s.T(x, y + 76, '[m|sabah · aylık]', { size: 9.5 });
    return g;
  },

  vintage(s, x, y) {
    let g = '';
    const n = 5, cw = 15, chh = 10;
    const renk = (v) => (v > 0.66 ? P.tq : v > 0.4 ? P.co : P.li);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n - r; c++) {
        const v = Math.min(1, 0.25 + c * 0.13 + (n - r) * 0.035);
        g += `<rect x="${x + 4 + c * (cw + 2)}" y="${y + 4 + r * (chh + 2)}" width="${cw}" height="${chh}" rx="2" fill="${renk(v)}" fill-opacity="${r2(0.2 + v * 0.65)}"/>`;
      }
    }
    // kohort tarayıcı
    g += `<rect x="${x + 2}" y="${y + 2}" width="${n * (cw + 2) + 2}" height="${chh + 4}" rx="3" stroke="${P.sf}" stroke-width="1.2" fill="none"${s.anim(6, [[0, 'transform:translateY(0px)'], [1, 'transform:translateY(0px)'], [1.2, 'transform:translateY(12px)'], [2.2, 'transform:translateY(12px)'], [2.4, 'transform:translateY(24px)'], [3.4, 'transform:translateY(24px)'], [3.6, 'transform:translateY(36px)'], [4.6, 'transform:translateY(36px)'], [4.8, 'transform:translateY(48px)'], [5.8, 'transform:translateY(48px)'], [6, 'transform:translateY(0px)']])}/>`;
    g += s.T(x + 4, y + 77, '[m|kohort × ay]', { size: 9.5 });
    return g;
  },

  liste(s, x, y) {
    let g = '';
    const L = 5;
    for (let i = 0; i < 5; i++) {
      const yy = y + 8 + i * 14;
      const dup = i === 3;
      g += `<rect x="${x}" y="${yy - 4}" width="${42 + (i % 2) * 10}" height="6" rx="3" fill="${P.dim}" fill-opacity=".35"/>`;
      g += `<rect x="${x + 58}" y="${yy - 4}" width="22" height="6" rx="3" fill="${P.sf}" fill-opacity=".55"/>`;
      if (dup) {
        g += s.T(x + 86, yy + 3.2, '[cr.b|×2]', { size: 9.5 });
        g += `<line x1="${x - 2}" y1="${yy - 1}" x2="${x + 82}" y2="${yy - 1}" stroke="${P.cr}" stroke-width="1.4"${s.anim(L, [[0, 'transform:scaleX(0)'], [1.2, 'transform:scaleX(0)'], [1.6, 'transform:scaleX(1)'], [4.4, 'transform:scaleX(1)'], [4.8, 'transform:scaleX(0)']], { origin: 'left center', base: 'transform:scaleX(1)' })}/>`;
      } else g += s.T(x + 86, yy + 3.2, '[sg|✓]', { size: 10 });
    }
    return g;
  },

  kurulum(s, x, y) {
    const ad = ['Chrome', 'Acrobat', 'Java', 'VPN', 'e-imza'];
    const L = 6;
    let g = '';
    ad.forEach((a, i) => {
      const yy = y + 10 + i * 13.5;
      const t0 = 0.4 + i * 0.8;
      g += s.T(x, yy + 3, `[d|${a}]`, { size: 9.5 });
      g += `<g opacity="1"${s.anim(L, [[0, 'opacity:0'], [t0, 'opacity:0'], [t0 + 0.12, 'opacity:1'], [5.4, 'opacity:1'], [5.7, 'opacity:0']], { base: 'opacity:1' })}>${s.T(x + 54, yy + 3, '[sg|✓]', { size: 10 })}</g>`;
    });
    g += `<rect x="${x + 70}" y="${y + 6}" width="6" height="58" rx="3" fill="#1a2747"/>`;
    g += `<rect x="${x + 70}" y="${y + 6}" width="6" height="58" rx="3" fill="${P.li}"${s.anim(L, [[0, 'transform:scaleY(0)'], [0.4, 'transform:scaleY(0)'], [4.4, 'transform:scaleY(1)'], [5.4, 'transform:scaleY(1)'], [5.7, 'transform:scaleY(0)']], { origin: 'top', base: 'transform:scaleY(1)' })}/>`;
    g += s.T(x + 82, y + 66, '[li|KUR]', { size: 9 });
    return g;
  },

  lamba(s, x, y) {
    const cx = x + 56, alt = y + 66, boy = 56, N = 16;
    const prof = (t) => 6 + 18 * Math.sin(Math.PI * Math.min(1, t * 0.98)) ** 0.85 * (1 - 0.55 * t) + (1 - t) * 4;
    let g = `<circle cx="${cx}" cy="${alt - 30}" r="46" fill="url(#mLamp)"/>`;
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const yy = alt - t * boy;
      const w = Math.max(1.5, prof(t));
      g += `<path d="M${r2(cx - w)} ${r2(yy)}A${r2(w)} ${r2(w * 0.18)} 0 0 0 ${r2(cx + w)} ${r2(yy)}" stroke="url(#mLampW)" stroke-width="2.4" stroke-linecap="round"/>`;
    }
    g += `<rect x="${cx - 12}" y="${alt + 2}" width="24" height="6" rx="2" fill="#18223f" stroke="#2c3d6b"/>`;
    s.loop('flapM', '0%,100%{transform:scaleY(1)}50%{transform:scaleY(.25)}');
    g +=
      `<g><animateMotion path="M${cx - 34} ${alt - 34}a34 14 0 1 0 68 0a34 14 0 1 0 -68 0" dur="5s" repeatCount="indefinite" rotate="auto"/>` +
      `<g style="animation:flapM .12s linear infinite;transform-box:fill-box;transform-origin:center">` +
      `<ellipse cx="-1" cy="-2.4" rx="3.2" ry="1.6" fill="#e6e9f2" fill-opacity=".6"/><ellipse cx="-1" cy="2.4" rx="3.2" ry="1.6" fill="#e6e9f2" fill-opacity=".6"/></g>` +
      `<ellipse rx="3" ry="2" fill="${P.cr}"/><circle cx="3" r="1.3" fill="${P.dk}"/></g>`;
    return g;
  },
};

export async function projelerSvg() {
  const rows = Math.ceil(projeler.length / 2);
  const H = TOPH + rows * CH + (rows - 1) * GY + 22;
  const s = new Svg(W, H, {
    title: 'Projeler',
    desc: projeler.map(([ad, acik, , d]) => `${ad}: ${acik} (${durumlar[d].etiket})`).join('; '),
  });
  s.def(
    `<clipPath id="cardP"><rect width="${W}" height="${H}" rx="14"/></clipPath>`,
    `<linearGradient id="bgP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1428"/><stop offset="1" stop-color="#0a101f"/></linearGradient>`,
    `<linearGradient id="edgeP" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.co}" stop-opacity=".55"/><stop offset=".5" stop-color="${P.tq}" stop-opacity=".14"/><stop offset="1" stop-color="${P.sf}" stop-opacity=".32"/></linearGradient>`,
    `<radialGradient id="mLamp"><stop offset="0" stop-color="${P.am}" stop-opacity=".35"/><stop offset="1" stop-color="${P.am}" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="mLampW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a3d12"/><stop offset=".32" stop-color="#fff1cc"/><stop offset=".6" stop-color="#ffbd6b"/><stop offset="1" stop-color="#7a330f"/></linearGradient>`
  );
  const o = [`<g clip-path="url(#cardP)">`, `<rect width="${W}" height="${H}" fill="url(#bgP)"/>`];

  // başlık
  o.push(`<rect width="${W}" height="40" fill="${P.bg0}"/><line x1="0" y1="39.5" x2="${W}" y2="39.5" stroke="${P.line}"/>`);
  o.push(`<rect x="22" y="15" width="10" height="10" rx="2" fill="${P.sf}" transform="rotate(45 27 20)"/>`);
  o.push(s.T(42, 25, `[t.b|~/projeler][m|   ${projeler.length} proje · öne çıkanlar]`, { size: 12.5 }));
  const leg = Object.entries(durumlar)
    .filter(([k]) => projeler.some((p) => p[3] === k))
    .map(([, d]) => `[${d.renk}|●][d| ${d.etiket}]`)
    .join('[d|   ]');
  o.push(s.T(W - 22, 25, leg, { size: 11, anchor: 'end' }));

  projeler.forEach(([ad, acik, etiketler, d, mini], i) => {
    const c = i % 2, r = Math.floor(i / 2);
    const x = MX + c * (CW + GX), y = TOPH + 8 + r * (CH + GY);
    const du = durumlar[d];
    let g = `<rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="12" fill="${P.bg2}" stroke="${P.line2}"/>`;
    g += s.T(x + 18, y + 30, `[t.b|${ad}]`, { size: 13.5 });
    const px = x + 18 + len(ad) * 13.5 * ADV + 12;
    const pw = len(du.etiket) * 10.5 * ADV + 24;
    g += `<rect x="${r2(px)}" y="${y + 17}" width="${r2(pw)}" height="18" rx="9" fill="${P[du.renk]}" fill-opacity=".12" stroke="${P[du.renk]}" stroke-opacity=".45"/>`;
    g += `<circle cx="${r2(px + 10)}" cy="${y + 26}" r="3" fill="${P[du.renk]}"/>`;
    g += s.T(px + 17, y + 29.8, `[${du.renk}|${du.etiket}]`, { size: 10.5 });
    g += s.T(x + 18, y + 56, `[d|${acik}]`, { size: 11.5 });
    let tx = x + 18;
    for (const e of etiketler) {
      const w = len(e) * 10 * ADV + 14;
      g += `<rect x="${r2(tx)}" y="${y + 72}" width="${r2(w)}" height="18" rx="5" fill="${P.bg1}" stroke="${P.line2}"/>`;
      g += s.T(tx + 7, y + 84.5, `[dim|${e}]`, { size: 10 });
      tx += w + 6;
    }
    g += `<line x1="${x + CW - 124.5}" y1="${y + 16}" x2="${x + CW - 124.5}" y2="${y + CH - 16}" stroke="${P.line2}"/>`;
    g += MINI[mini](s, x + CW - 113, y + 16);
    o.push(g);
  });

  o.push(`</g>`);
  o.push(`<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="13.5" stroke="url(#edgeP)"/>`);
  s.add(...o);
  return s.render();
}
