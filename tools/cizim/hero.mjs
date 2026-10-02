// hero.svg — tmux düzeninde terminal:
//   sol panel  : 6 pencere döngüsü (neofetch, UYAP dosya kartı, git log, stack, kurallar, metrik)
//   sağ üst    : BüroPilot iş monitörü (canlı ilerleme çubukları)
//   sağ alt    : Hungry Bugs Studio — katman katman basılan, sonra yanan lamba + ışığa gelen buglar
//   alt        : tmux durum çubuğu (aktif pencere sekmeyle birlikte kayar)

import { Svg, len, ADV, r2, pencere } from '../lib/svg.mjs';
import { P, ID } from '../lib/palet.mjs';
import { profil, sekmeler, durumlar, isler } from '../profil.config.mjs';

const W = 900, H = 500;
const TOP = 36, BOT = 472;
const SX = 568, SY = 262;          // panel bölücüleri
const T = 30, TAB = 5;             // döngü / sekme süresi (sn)
const OFF_TAB = -2.25;             // yüklenince ilk sekme yazılmış hâlde görünsün
const OFF_JOB = -10;               // iş monitörü: biri bitmiş, biri çalışıyor
const OFF_LAMP = -18;              // lamba: yanık, buglar uçuyor
const FS = 12.5, AFS = FS * ADV;


// ── yardımcılar ─────────────────────────────────────────────────────────────
function istem(s, x, y, { u, yol = '', uFill, yFill = P.coD, size = 11.5 }) {
  const adv = size * ADV, h = 18, top = y - 12.6;
  const wA = len(u) * adv + 14;
  const xA1 = x + wA;
  let out = '';
  let end;
  if (yol) {
    const wB = len(yol) * adv + 20;
    const xB1 = xA1 + wB;
    out += `<rect x="${r2(xA1 - 2)}" y="${r2(top)}" width="${r2(wB + 2)}" height="${h}" fill="${yFill}"/>`;
    out += `<path d="M${r2(xB1)} ${r2(top)}l8 ${h / 2}-8 ${h / 2}z" fill="${yFill}"/>`;
    out += s.T(xA1 + 12, y, `[t|${yol}]`, { size });
    end = xB1 + 8;
  } else end = xA1 + 8;
  out +=
    `<path d="M${r2(x + 4)} ${r2(top)}H${r2(xA1)}V${r2(top + h)}H${r2(x + 4)}` +
    `Q${r2(x)} ${r2(top + h)} ${r2(x)} ${r2(top + h - 4)}V${r2(top + 4)}Q${r2(x)} ${r2(top)} ${r2(x + 4)} ${r2(top)}Z" fill="${uFill}"/>`;
  out += `<path d="M${r2(xA1)} ${r2(top)}l8 ${h / 2}-8 ${h / 2}z" fill="${uFill}"/>`;
  out += s.T(x + 7, y, `[dk.b|${u}]`, { size });
  return { svg: out, end: end + 8 };
}

const blink = (s) => {
  s.loop('blink', '0%,49%{opacity:1}50%,100%{opacity:0}');
  return 'animation:blink 1.1s linear infinite';
};

// ── sol panel sekme içerikleri: { rows:[{svg, dt, fx?}], endY } ─────────────
function neofetch(s, tab) {
  const grid = [
    '........T........',
    '.......SSS.......',
    '..SSSSSSSSSSSSS..',
    '..D.....S.....D..',
    '.D.D....S....D.D.',
    'D.R.D...S...D.Q.D',
    'CCCCC...S...CCCCC',
    '.CCC....S....CCC.',
    '........S........',
    '........S........',
    '........S........',
    '.......SSS.......',
    '.....BBBBBBB.....',
    '...BBBBBBBBBBB...',
  ];
  const renk = { T: P.tq, S: P.sf, D: P.dim, C: P.co, B: P.coD, R: P.cr, Q: P.tq };
  const x0 = 26, y0 = 100, c = 8;
  const rows = [];
  rows.push({ svg: `<circle cx="${x0 + 8.5 * c}" cy="${y0 + 7 * c}" r="96" fill="url(#embGlow)"/>`, dt: 0 });
  grid.forEach((line, r) => {
    let g = '';
    [...line].forEach((ch, k) => {
      if (ch !== '.') g += `<rect x="${x0 + k * c}" y="${y0 + r * c}" width="7" height="7" rx="1.4" fill="${renk[ch]}"/>`;
    });
    rows.push({ svg: g, dt: 0.02 + r * 0.03 });
  });
  const ix = 186, iy = 110, lh = 21;
  tab.satirlar.forEach((m, j) => rows.push({ svg: s.T(ix, iy + j * lh, m, { size: FS }), dt: 0.1 + j * 0.06 }));
  const by = iy + (tab.satirlar.length - 1) * lh + 15;
  const blok = ['co', 'cr', 'tq', 'sf', 'li', 'sg', 'am', 'text']
    .map((k, i) => `<rect x="${ix + i * 26}" y="${by}" width="22" height="11" rx="2.5" fill="${P[k]}"/>`)
    .join('');
  rows.push({ svg: blok, dt: 0.1 + tab.satirlar.length * 0.06 });
  return { rows, endY: by + 52 };
}

function dosya(s, tab) {
  const x = 24, y = 92, w = 520, hh = 32, h = 190;
  const rows = [];
  rows.push({
    svg:
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${P.bg2}" stroke="${P.line2}"/>` +
      `<path d="M${x + 10} ${y}H${x + w - 10}Q${x + w} ${y} ${x + w} ${y + 10}V${y + hh}H${x}V${y + 10}Q${x} ${y} ${x + 10} ${y}Z" fill="${P.co}" fill-opacity=".10"/>` +
      `<line x1="${x}" y1="${y + hh}" x2="${x + w}" y2="${y + hh}" stroke="${P.line2}"/>` +
      s.T(x + 18, y + 21, tab.baslik, { size: FS }) +
      `<rect x="${x + w - 94}" y="${y + 8}" width="80" height="17" rx="8.5" fill="${P.tq}" fill-opacity=".13" stroke="${P.tq}" stroke-opacity=".55"/>` +
      s.T(x + w - 54, y + 20.2, `[tq.b|● ${tab.durum}]`, { size: 10.5, anchor: 'middle' }),
    dt: 0,
  });
  tab.alanlar.forEach(([etiket, deger], j) => {
    const yy = y + hh + 26 + j * 22.5;
    rows.push({ svg: s.T(x + 18, yy, `[d|${etiket}]`, { size: FS }) + s.T(x + 146, yy, deger, { size: FS }), dt: 0.08 + j * 0.07 });
  });
  // mühür: TEBLİĞ EDİLDİ
  const tS = 0.08 + tab.alanlar.length * 0.07 + 0.25;
  rows.push({
    svg:
      `<g transform="translate(476 178) rotate(-11)"><g data-muhur="1">` +
      `<rect x="-66" y="-16" width="132" height="32" rx="5" stroke="${P.cr}" stroke-width="2"/>` +
      `<rect x="-62" y="-12" width="124" height="24" rx="3" stroke="${P.cr}" stroke-opacity=".55"/>` +
      s.T(0, 4.6, '[cr.b|TEBLİĞ EDİLDİ]', { size: 12.5, anchor: 'middle' }) +
      `</g></g>`,
    dt: tS,
    fx: 'muhur',
  });
  tab.notlar.forEach((m, j) => rows.push({ svg: s.T(x, y + h + 32 + j * 22, m, { size: 12 }), dt: tS + 0.2 + j * 0.08 }));
  return { rows, endY: y + h + 32 + tab.notlar.length * 22 + 22 };
}

function gitlog(s, tab) {
  const rows = [];
  const y0 = 104, lh = 25, fs = 12;
  tab.satirlar.forEach(([hash, ad, acik, d], j) => {
    const y = y0 + j * lh;
    const du = durumlar[d];
    let g = '';
    if (j === 0) g += `<rect x="16" y="${y - 16}" width="540" height="23" rx="6" fill="${P.bg3}"/>`;
    g += s.T(24, y, `[sf|${hash}]`, { size: fs });
    g += s.T(84, y, `[t${j === 0 ? '.b' : ''}|${ad}]`, { size: fs });
    g += s.T(230, y, `[d|${acik}]`, { size: fs });
    g += `<circle cx="458" cy="${y - 4}" r="3.3" fill="${P[du.renk]}"/>`;
    g += s.T(467, y, `[${du.renk}|${du.etiket}]`, { size: 11 });
    rows.push({ svg: g, dt: j * 0.07 });
  });
  const ny = y0 + tab.satirlar.length * lh + 8;
  rows.push({ svg: s.T(24, ny, tab.not, { size: 12 }), dt: tab.satirlar.length * 0.07 + 0.1 });
  return { rows, endY: ny + 40 };
}

function stack(s, tab) {
  const rows = [];
  const y0 = 106, lh = 35, cx0 = 124, cs = 11.5, ca = cs * ADV;
  tab.gruplar.forEach(([etiket, ogeler], j) => {
    const y = y0 + j * lh;
    const k = ID[j % ID.length];
    let g = s.T(24, y, `[${k}|${etiket}]`, { size: FS });
    let x = cx0;
    for (const o of ogeler) {
      const w = len(o) * ca + 16;
      g += `<rect x="${r2(x)}" y="${y - 15}" width="${r2(w)}" height="22" rx="6.5" fill="${P[k]}" fill-opacity=".10" stroke="${P[k]}" stroke-opacity=".38"/>`;
      g += s.T(x + 8, y, `[${k}|${o}]`, { size: cs });
      x += w + 7;
    }
    rows.push({ svg: g, dt: j * 0.08 });
  });
  const ny = y0 + tab.gruplar.length * lh + 2;
  rows.push({ svg: s.T(24, ny, tab.not, { size: 12 }), dt: tab.gruplar.length * 0.08 + 0.1 });
  return { rows, endY: ny + 40 };
}

function yaml(s, tab) {
  const rows = [];
  const y0 = 102, lh = 23.5, fs = 13;
  rows.push({ svg: s.T(24, y0, `[li|${tab.kok}:]`, { size: fs }), dt: 0 });
  const maxK = Math.max(...tab.satirlar.map(([k]) => len(k)));
  tab.satirlar.forEach(([k, v], j) => {
    const vv = v.replace('KAPALI', '][cr.b|KAPALI][sg|');
    const pad = ' '.repeat(maxK - len(k) + 2);
    const m = `[f|  - ][tq|${k}][m|:]${pad}[sg|"${vv}"]`;
    rows.push({ svg: s.T(24, y0 + (j + 1) * lh, m, { size: fs }), dt: 0.06 + j * 0.06 });
  });
  return { rows, endY: y0 + tab.satirlar.length * lh + 46 };
}

function metrik(s, tab) {
  const rows = [];
  const w = 164, h = 102, gx = 14, gy = 14, x0 = 24, y0 = 92;
  tab.kartlar.forEach(([sayi, a, b], i) => {
    const c = i % 3, r = Math.floor(i / 3);
    const x = x0 + c * (w + gx), y = y0 + r * (h + gy);
    const k = ID[i % ID.length];
    const g =
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${P.bg2}" stroke="${P.line2}"/>` +
      `<rect x="${x + 14}" y="${y}" width="26" height="3" rx="1.5" fill="${P[k]}"/>` +
      s.T(x + 14, y + 48, `[t.b|${sayi}]`, { size: 28 }) +
      s.T(x + 14, y + 72, `[d|${a}]`, { size: 11.5 }) +
      s.T(x + 14, y + 88, `[d|${b}]`, { size: 11.5 }) ;
    rows.push({ svg: g, dt: i * 0.09, fx: 'up' });
  });
  const ny = y0 + 2 * (h + gy) + 18;
  rows.push({ svg: s.T(24, ny, tab.not, { size: 12 }), dt: 0.65 });
  return { rows, endY: ny + 40 };
}

const BUILD = { neofetch, dosya, gitlog, stack, yaml, metrik };

// ── lamba geometrisi ─────────────────────────────────────────────────────────
function catmull(pts, t) {
  // pts: [[t, v]] artan t; Catmull-Rom
  let i = 0;
  while (i < pts.length - 2 && t > pts[i + 1][0]) i++;
  const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
  const u = (t - p1[0]) / (p2[0] - p1[0] || 1);
  const m1 = (p2[1] - p0[1]) / ((p2[0] - p0[0]) || 1) * (p2[0] - p1[0]);
  const m2 = (p3[1] - p1[1]) / ((p3[0] - p1[0]) || 1) * (p2[0] - p1[0]);
  const u2 = u * u, u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * p1[1] + (u3 - 2 * u2 + u) * m1 + (-2 * u3 + 3 * u2) * p2[1] + (u3 - u2) * m2;
}

function lamba(cx, yAlt, boy, N) {
  const prof = [[0, 15], [0.1, 23], [0.27, 38], [0.43, 44], [0.58, 41], [0.73, 31], [0.86, 18], [0.95, 8], [1, 2.5]];
  const kat = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const y = yAlt - t * boy;
    const w = Math.max(2, catmull(prof, t));
    const ry = w * 0.17;
    const pts = [];
    const S = 14;
    for (let q = 0; q <= S; q++) {
      const phi = (Math.PI * q) / S;
      pts.push([cx - w * Math.cos(phi), y + ry * Math.sin(phi)]);
    }
    if (i % 2 === 1) pts.reverse();
    let L = 0;
    for (let q = 1; q < pts.length; q++) L += Math.hypot(pts[q][0] - pts[q - 1][0], pts[q][1] - pts[q - 1][1]);
    const geri = [];
    for (let q = 0; q <= S; q++) {
      const phi = (Math.PI * q) / S;
      geri.push([cx - w * Math.cos(phi), y - ry * Math.sin(phi)]);
    }
    kat.push({ i, t, y, w, ry, pts, L, geri });
  }
  return kat;
}

const dPts = (pts) => 'M' + pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L');

// ── ana çizim ────────────────────────────────────────────────────────────────
export async function hero() {
  const s = new Svg(W, H, {
    title: `${profil.kullanici}@${profil.host} — ${profil.ad}`,
    desc:
      'tmux düzeninde animasyonlu terminal: kimlik (neofetch), UYAP dosya kartı, git log, stack, kurallar ve metrikler; ' +
      'yanında BüroPilot iş monitörü ve katman katman basılıp yanan 3D baskı lamba.',
  });

  // defs
  s.def(
    `<clipPath id="win"><rect width="${W}" height="${H}" rx="14"/></clipPath>`,
    `<clipPath id="pL"><rect x="0" y="${TOP}" width="${SX}" height="${BOT - TOP}"/></clipPath>`,
    `<clipPath id="pRT"><rect x="${SX}" y="${TOP}" width="${W - SX}" height="${SY - TOP}"/></clipPath>`,
    `<clipPath id="pRB"><rect x="${SX}" y="${SY}" width="${W - SX}" height="${BOT - SY}"/></clipPath>`,
    `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1428"/><stop offset="1" stop-color="#0a101f"/></linearGradient>`,
    `<linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.co}" stop-opacity=".6"/><stop offset=".5" stop-color="${P.tq}" stop-opacity=".16"/><stop offset="1" stop-color="${P.am}" stop-opacity=".38"/></linearGradient>`,
    `<radialGradient id="glowTL" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(150 70) scale(560 320)"><stop offset="0" stop-color="${P.co}" stop-opacity=".09"/><stop offset="1" stop-color="${P.co}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="embGlow"><stop offset="0" stop-color="${P.sf}" stop-opacity=".16"/><stop offset="1" stop-color="${P.sf}" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.tq}" stop-opacity="0"/><stop offset=".7" stop-color="${P.tq}" stop-opacity=".07"/><stop offset="1" stop-color="${P.tq}" stop-opacity="0"/></linearGradient>`,
    `<radialGradient id="bugGlow"><stop offset="0" stop-color="${P.am}" stop-opacity=".45"/><stop offset="1" stop-color="${P.am}" stop-opacity="0"/></radialGradient>`
  );

  const parts = [];
  parts.push(`<g clip-path="url(#win)">`);
  parts.push(`<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#glowTL)"/>`);

  // başlık çubuğu
  parts.push(`<rect width="${W}" height="${TOP}" fill="${P.bg0}"/><line x1="0" y1="${TOP - 0.5}" x2="${W}" y2="${TOP - 0.5}" stroke="${P.line}"/>`);
  [P.cr, P.sf, P.tq].forEach((c, i) => parts.push(`<circle cx="${20 + i * 18}" cy="18" r="5.5" fill="${c}"/>`));
  parts.push(
    s.T(W / 2, 22.5, `[sf.b|${profil.kullanici}][m|@][t|${profil.host}][m|: ][d|~/profil][m|  —  tmux]`, { size: 11.5, anchor: 'middle' })
  );

  // panel bölücüler (aktif panel kenarı turkuaz)
  parts.push(`<line x1="${SX + 0.5}" y1="${TOP}" x2="${SX + 0.5}" y2="${BOT}" stroke="${P.tq}" stroke-opacity=".38"/>`);
  parts.push(`<line x1="${SX}" y1="${SY + 0.5}" x2="${W}" y2="${SY + 0.5}" stroke="${P.line2}"/>`);

  // ── SOL PANEL ──
  parts.push(`<g clip-path="url(#pL)">`);
  // sekme geçişlerinde ekranı tarayan ince ışık
  {
    const st = [[0, 'transform:translateY(-90px)']];
    for (let k = 0; k < sekmeler.length; k++) {
      const S = k * TAB;
      st.push([S, 'transform:translateY(-90px)'], [S + 0.002, 'transform:translateY(10px)'], [S + 0.6, 'transform:translateY(470px)'], [S + 0.602, 'transform:translateY(-90px)']);
    }
    parts.push(`<rect x="0" y="0" width="${SX}" height="70" fill="url(#scan)"${s.anim(T, st, { delay: OFF_TAB, base: 'transform:translateY(-90px)' })}/>`);
  }
  sekmeler.forEach((tab, k) => {
    const S = k * TAB;
    const yP = 70;
    const ist = istem(s, 24, yP, { u: profil.kullanici, yol: '~/profil', uFill: P.sf });
    const cmdX = ist.end;
    const n = len(tab.komut);
    const td = Math.min(1.15, Math.max(0.5, n * 0.03));
    const t0 = S + 0.35, t1 = t0 + td;
    const Lw = n * AFS;
    const { rows, endY } = BUILD[tab.tur](s, tab);
    const tOut = t1 + 0.18;

    // yazma efekti: komut, SMIL ile harf harf genişleyen bir kırpma alanında görünür
    const dt = td / n;
    const kt = [0], kv = [0];
    for (let j = 1; j <= n; j++) { kt.push((t0 + j * dt) / T); kv.push(r2(j * AFS + 1)); }
    s.def(
      `<clipPath id="ty${k}"><rect x="${r2(cmdX - 0.5)}" y="${yP - 15}" height="21" width="${r2(Lw + 1)}">` +
        `<animate attributeName="width" dur="${T}s" begin="${OFF_TAB}s" repeatCount="indefinite" calcMode="discrete" ` +
        `keyTimes="${kt.map((v) => v.toFixed(5)).join(';')}" values="${kv.join(';')}"/></rect></clipPath>`
    );

    let g = `<g opacity="${k === 0 ? 1 : 0}"${s.anim(T, pencere([[S, S + TAB]], 0.25), { delay: OFF_TAB })}>`;
    g += ist.svg + `<g clip-path="url(#ty${k})">${s.T(cmdX, yP, `[t|${tab.komut}]`, { size: FS })}</g>`;
    // imleç: aynı adımlarla sağa kayar
    g += `<g${s.anim(T, [[0, 'transform:translateX(0px)'], [t0, 'transform:translateX(0px)', `steps(${n},end)`], [t1, `transform:translateX(${r2(Lw)}px)`]], { delay: OFF_TAB, base: `transform:translateX(${r2(Lw)}px)` })}>`;
    g += `<rect x="${r2(cmdX)}" y="${yP - 12}" width="${r2(AFS)}" height="15" rx="1" fill="${P.sf}" opacity="0"${s.anim(T, [[0, 'opacity:0'], [S, 'opacity:0'], [S + 0.01, 'opacity:.9'], [t1 + 0.45, 'opacity:.9'], [t1 + 0.46, 'opacity:0']], { delay: OFF_TAB })}/>`;
    g += `</g>`;
    // çıktı satırları
    let tLast = tOut;
    for (const row of rows) {
      const tj = tOut + row.dt;
      tLast = Math.max(tLast, tj);
      if (row.fx === 'up') {
        g += `<g${s.anim(T, [[0, 'opacity:0;transform:translateY(6px)'], [tj, 'opacity:0;transform:translateY(6px)', 'cubic-bezier(.2,.7,.3,1)'], [tj + 0.3, 'opacity:1;transform:translateY(0px)']], { delay: OFF_TAB })}>${row.svg}</g>`;
      } else if (row.fx === 'muhur') {
        const ic = row.svg.replace(
          '<g data-muhur="1">',
          `<g${s.anim(T, [[0, 'opacity:0;transform:scale(1.7)'], [tj, 'opacity:0;transform:scale(1.7)', 'cubic-bezier(.3,0,.4,1)'], [tj + 0.17, 'opacity:.92;transform:scale(1)']], { delay: OFF_TAB, origin: 'center', base: 'opacity:.92' })}>`
        );
        g += ic;
      } else {
        g += `<g${s.anim(T, [[0, 'opacity:0'], [tj, 'opacity:0'], [tj + 0.14, 'opacity:1']], { delay: OFF_TAB })}>${row.svg}</g>`;
      }
    }
    // yeni istem + yanıp sönen imleç
    const tEnd = tLast + 0.3;
    const ist2 = istem(s, 24, endY, { u: profil.kullanici, yol: '~/profil', uFill: P.sf });
    g += `<g${s.anim(T, [[0, 'opacity:0'], [tEnd, 'opacity:0'], [tEnd + 0.12, 'opacity:1']], { delay: OFF_TAB })}>`;
    g += ist2.svg + `<rect x="${r2(ist2.end)}" y="${endY - 12}" width="${r2(AFS)}" height="15" rx="1" fill="${P.sf}" style="${blink(s)}"/>`;
    g += `</g></g>`;
    parts.push(g);
  });
  parts.push(`</g>`);

  // ── SAĞ ÜST: iş monitörü ──
  parts.push(`<g clip-path="url(#pRT)">`);
  {
    const X = SX + 16;
    const ist = istem(s, X, 60, { u: 'buropilot', uFill: P.tq });
    parts.push(ist.svg + s.T(ist.end, 60, '[t|jobs --izle]', { size: 11.5 }));
    const cB = 712, cD = 814;
    parts.push(s.T(X, 87, '[m|İŞ]', { size: 9.5 }) + s.T(cB, 87, '[m|İLERLEME]', { size: 9.5 }) + s.T(cD, 87, '[m|DURUM]', { size: 9.5 }));
    parts.push(`<line x1="${X}" y1="94.5" x2="${W - 16}" y2="94.5" stroke="${P.line}"/>`);
    s.loop('spin', 'to{transform:rotate(360deg)}');
    isler.forEach(([ad, , r0, r1], j) => {
      const y = 114 + j * 22;
      const k = ID[j % ID.length];
      const d = r1 - r0;
      parts.push(s.T(X, y, `[t|${ad}]`, { size: 11 }));
      parts.push(`<rect x="${cB}" y="${y - 7.5}" width="88" height="5" rx="2.5" fill="#1a2747"/>`);
      const fillSt = [
        [0, 'transform:scaleX(0)'], [r0, 'transform:scaleX(0)'],
        [r0 + d * 0.35, 'transform:scaleX(.42)'], [r0 + d * 0.55, 'transform:scaleX(.5)'],
        [r0 + d * 0.8, 'transform:scaleX(.83)'], [r1, 'transform:scaleX(1)'],
        [29.2, 'transform:scaleX(1)'], [29.8, 'transform:scaleX(0)'],
      ];
      const tNow = 10; // statik kare = döngünün 10. saniyesi
      const stat = tNow <= r0 ? 0 : tNow >= r1 ? 1 : 0.42;
      parts.push(`<rect x="${cB}" y="${y - 7.5}" width="88" height="5" rx="2.5" fill="${P[k]}"${s.anim(T, fillSt, { delay: OFF_JOB, origin: 'left center', base: `transform:scaleX(${stat})` })}/>`);
      const sirada = [[0, r0]], calisiyor = [[r0, r1]], bitti = [[r1, 29.6]];
      const vis = (w, now) => (w.some(([a, b]) => now >= a && now < b) ? 1 : 0);
      const sirSt = [[0, 'opacity:1'], [Math.max(0.01, r0 - 0.15), 'opacity:1'], [r0, 'opacity:0'], [29.6, 'opacity:0'], [29.75, 'opacity:1']];
      parts.push(`<g opacity="${vis(sirada, tNow)}"${s.anim(T, sirSt, { delay: OFF_JOB })}>${s.T(cD + 10, y, '[m|sırada]', { size: 11 })}</g>`);
      parts.push(
        `<g opacity="${vis(calisiyor, tNow)}"${s.anim(T, pencere(calisiyor, 0.15), { delay: OFF_JOB })}>` +
          `<circle cx="${cD + 2}" cy="${y - 4}" r="3.6" stroke="${P.sf}" stroke-width="1.4" stroke-dasharray="14 9" stroke-linecap="round" style="animation:spin .9s linear infinite;transform-box:fill-box;transform-origin:center"/>` +
          s.T(cD + 10, y, '[sf|çalışıyor]', { size: 11 }) +
          `</g>`
      );
      parts.push(`<g opacity="${vis(bitti, tNow)}"${s.anim(T, pencere(bitti, 0.15), { delay: OFF_JOB })}>${s.T(cD + 10, y, '[sg|bitti ✓]', { size: 11 })}</g>`);
    });
    s.loop('pulse', '0%,100%{opacity:1}50%{opacity:.35}');
    const fy1 = 232, fy2 = 250, a = 10.5 * ADV;
    parts.push(`<g style="animation:pulse 2.2s ease-in-out infinite">${s.T(X, fy1, '[sg|●]', { size: 10.5 })}</g>`);
    parts.push(s.T(X + 2 * a, fy1, '[d|kalkan aktif]', { size: 10.5 }));
    parts.push(s.T(X + 18 * a, fy1, '[sg|●]', { size: 10.5 }) + s.T(X + 20 * a, fy1, '[d|çift kontrol açık]', { size: 10.5 }));
    parts.push(s.T(X, fy2, '[cr|●]', { size: 10.5 }) + s.T(X + 2 * a, fy2, '[d|canlı yazma kapalı]', { size: 10.5 }));
    parts.push(s.T(X + 23 * a, fy2, '[tq|●]', { size: 10.5 }) + s.T(X + 25 * a, fy2, '[d|log append-only]', { size: 10.5 }));
  }
  parts.push(`</g>`);

  // ── SAĞ ALT: 3D baskı lamba ──
  parts.push(`<g clip-path="url(#pRB)">`);
  {
    const X = SX + 16;
    const ist = istem(s, X, SY + 24, { u: 'hbs', uFill: P.cr });
    parts.push(ist.svg + s.T(ist.end, SY + 24, '[t|yazdır lamba.gcode]', { size: 11.5 }));

    const cx = 826, yAlt = 443, boy = 124, N = 42;
    const P0 = 1.0, P1 = 12.8, ON = 14.4, OFFL = 28.2;
    const kat = lamba(cx, yAlt, boy, N);

    // gradyanlar
    s.def(
      `<linearGradient id="lmC" gradientUnits="userSpaceOnUse" x1="${cx - 46}" y1="0" x2="${cx + 46}" y2="0"><stop offset="0" stop-color="#22345f"/><stop offset=".3" stop-color="#c5d2f3"/><stop offset=".56" stop-color="#8ea2d6"/><stop offset="1" stop-color="#1f2f57"/></linearGradient>`,
      `<linearGradient id="lmW" gradientUnits="userSpaceOnUse" x1="${cx - 46}" y1="0" x2="${cx + 46}" y2="0"><stop offset="0" stop-color="#8a3d12"/><stop offset=".3" stop-color="#fff1cc"/><stop offset=".56" stop-color="#ffbd6b"/><stop offset="1" stop-color="#7a330f"/></linearGradient>`,
      `<radialGradient id="lmIn" gradientUnits="userSpaceOnUse" cx="${cx - 6}" cy="${yAlt - boy * 0.42}" r="62"><stop offset="0" stop-color="#fff6dc"/><stop offset=".45" stop-color="#ffc06e"/><stop offset="1" stop-color="#ff8a3d" stop-opacity=".15"/></radialGradient>`,
      `<radialGradient id="pool"><stop offset="0" stop-color="${P.am}" stop-opacity=".34"/><stop offset="1" stop-color="${P.am}" stop-opacity="0"/></radialGradient>`,
      `<radialGradient id="lmOut" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${yAlt - boy * 0.45}" r="150"><stop offset="0" stop-color="${P.am}" stop-opacity=".32"/><stop offset=".55" stop-color="${P.am}" stop-opacity=".08"/><stop offset="1" stop-color="${P.am}" stop-opacity="0"/></radialGradient>`
    );

    const isik = (from = ON, to = OFFL) => [[0, 'opacity:0'], [from, 'opacity:0'], [from + 0.7, 'opacity:1'], [to, 'opacity:1'], [to + 1.2, 'opacity:0']];

    // dış hale + masaya düşen ışık
    s.loop('flicker', '0%{opacity:1}18%{opacity:.88}22%{opacity:.97}55%{opacity:.9}70%{opacity:1}100%{opacity:1}');
    parts.push(
      `<g${s.anim(T, isik(), { delay: OFF_LAMP })}>` +
        `<circle cx="${cx}" cy="${yAlt - boy * 0.45}" r="150" fill="url(#lmOut)" style="animation:flicker 4.2s linear infinite"/>` +
        `<ellipse cx="${cx}" cy="${yAlt + 15}" rx="96" ry="10" fill="url(#pool)"/>` +
        `</g>`
    );

    // sol metin bloğu
    const a11 = 11 * ADV;
    parts.push(s.T(X, SY + 56, '[d|durum]', { size: 11 }));
    const dX = X + 7 * a11;
    const durumSt = [
      ['[sf|yazdırılıyor…]', [[0, 13.2]]],
      ['[d|soğuyor…]', [[13.2, 14.6]]],
      ['[sg|ışık açık ✓]', [[14.6, 28.6]]],
      ['[m|sıradaki baskı…]', [[28.6, 30]]],
    ];
    durumSt.forEach(([m, w], i) => parts.push(`<g opacity="${i === 2 ? 1 : 0}"${s.anim(T, pencere(w, 0.2), { delay: OFF_LAMP })}>${s.T(dX, SY + 56, m, { size: 11 })}</g>`));
    parts.push(`<rect x="${X}" y="${SY + 66}" width="130" height="4" rx="2" fill="#1a2747"/>`);
    parts.push(`<rect x="${X}" y="${SY + 66}" width="130" height="4" rx="2" fill="${P.cr}"${s.anim(T, [[0, 'transform:scaleX(0)'], [P0, 'transform:scaleX(0)'], [P1, 'transform:scaleX(1)'], [28.6, 'transform:scaleX(1)'], [29.6, 'transform:scaleX(0)']], { delay: OFF_LAMP, origin: 'left center', base: 'transform:scaleX(1)' })}/>`);
    parts.push(s.T(X, SY + 90, '[m|PLA · 0.2 mm · vazo modu]', { size: 10.5 }));
    parts.push(s.T(X, SY + 134, '[m.i|// buglar ışığa gelir,]', { size: 10.5 }));
    parts.push(s.T(X, SY + 150, '[m.i|// ben de onları yakalarım.]', { size: 10.5 }));
    parts.push(s.T(X, SY + 180, `[sf.b|${profil.atolye}]`, { size: 12 }));
    parts.push(s.T(X, SY + 196, '[d|3D baskı lambalar · atölye]', { size: 10.5 }));

    // lamba gövdesi
    const yuksek = kat.map((k) => [cx - k.w, k.y]);
    const sag = kat.map((k) => [cx + k.w, k.y]).reverse();
    const silu = dPts([[cx - kat[0].w, kat[0].y + kat[0].ry], ...yuksek, ...sag, [cx + kat[0].w, kat[0].y + kat[0].ry]]) + 'Z';
    parts.push(`<path d="${silu}" fill="url(#lmIn)" opacity="1"${s.anim(T, isik(ON - 0.1), { delay: OFF_LAMP })}/>`);

    // taban + kablo
    parts.push(
      `<path d="M${cx + 24} 452C${cx + 48} 452 ${cx + 40} 466 ${W} 466" stroke="#2a3a66" stroke-width="1.5"/>` +
        `<rect x="${cx - 24}" y="446" width="48" height="11" rx="3" fill="#18223f" stroke="#2c3d6b"/>` +
        `<line x1="${cx - 20}" y1="448.5" x2="${cx + 20}" y2="448.5" stroke="#3b4f86" stroke-opacity=".7"/>`
    );

    // baskı katmanları (soğuk renk, nozul geçtikçe çizilir)
    let toplam = 0;
    const seg = [];
    kat.forEach((k, i) => {
      if (i > 0) {
        const p = kat[i - 1].pts[kat[i - 1].pts.length - 1];
        toplam += Math.hypot(k.pts[0][0] - p[0], k.pts[0][1] - p[1]);
      }
      const d0 = toplam;
      toplam += k.L;
      seg.push([d0, toplam]);
    });
    const tAt = (d) => P0 + ((P1 - P0) * d) / toplam;
    let soguk = `<g${s.anim(T, [[0, 'opacity:1'], [OFFL + 0.4, 'opacity:1'], [OFFL + 1.4, 'opacity:0']], { delay: OFF_LAMP })}>`;
    kat.forEach((k, i) => {
      const L = r2(k.L + 1);
      const [d0, d1] = seg[i];
      soguk += `<path d="${dPts(k.pts)}" stroke="url(#lmC)" stroke-width="2.3" stroke-linecap="round" stroke-dasharray="${L} ${L}"${s.anim(T, [[0, `stroke-dashoffset:${L}`], [tAt(d0), `stroke-dashoffset:${L}`], [tAt(d1), 'stroke-dashoffset:0']], { delay: OFF_LAMP, base: 'stroke-dashoffset:0' })}/>`;
    });
    soguk += `</g>`;
    parts.push(soguk);

    // ışık yanınca: sıcak katmanlar + arka yaylar + burgulu kaburgalar
    let sicak = `<g${s.anim(T, isik(ON + 0.1), { delay: OFF_LAMP })}>`;
    kat.forEach((k) => (sicak += `<path d="${dPts(k.geri)}" stroke="#ffcf8a" stroke-opacity=".16" stroke-width="1.4"/>`));
    kat.forEach((k) => (sicak += `<path d="${dPts(k.pts)}" stroke="url(#lmW)" stroke-width="2.3" stroke-linecap="round"/>`));
    const R = 9, twist = 0.055;
    for (let q = 0; q < R; q++) {
      let cur = [];
      const yollar = [];
      kat.forEach((k, i) => {
        let phi = ((q * 2 * Math.PI) / R + twist * i) % (2 * Math.PI);
        if (phi > 0.07 && phi < Math.PI - 0.07) cur.push([cx - k.w * Math.cos(phi), k.y + k.ry * Math.sin(phi)]);
        else if (cur.length) { yollar.push(cur); cur = []; }
      });
      if (cur.length) yollar.push(cur);
      for (const y of yollar) if (y.length > 1) sicak += `<path d="${dPts(y)}" stroke="#b5571b" stroke-opacity=".5" stroke-width="1.1" stroke-linecap="round"/>`;
    }
    sicak += `</g>`;
    parts.push(sicak);

    // nozul (SMIL ile katmanları takip eder)
    const yol = 'M' + kat.map((k) => k.pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L')).join('L');
    parts.push(
      `<g opacity="0"${s.anim(T, [[0, 'opacity:0'], [0.6, 'opacity:0'], [0.9, 'opacity:1'], [13.1, 'opacity:1'], [13.6, 'opacity:0']], { delay: OFF_LAMP })}>` +
        `<g><animateMotion path="${yol}" dur="${T}s" begin="${OFF_LAMP}s" repeatCount="indefinite" calcMode="linear" keyTimes="0;${r2(P0 / T * 1000) / 1000};${r2(P1 / T * 1000) / 1000};1" keyPoints="0;0;1;1"/>` +
        `<line x1="0" y1="-14" x2="0" y2="-46" stroke="#33446f" stroke-width="2"/>` +
        `<rect x="-7" y="-15" width="14" height="9" rx="2" fill="#2a3a66" stroke="#3d5288"/>` +
        `<path d="M-3.2 -6H3.2L0 -1.2Z" fill="${P.sf}"/>` +
        `<circle cx="0" cy="-0.6" r="1.6" fill="${P.am}"/>` +
        `</g></g>`
    );

    // ışığa gelen buglar
    s.loop('flap', '0%,100%{transform:scaleY(1)}50%{transform:scaleY(.25)}');
    const bug = (c) =>
      `<g transform="scale(1.4)">` +
      `<circle r="7.5" fill="url(#bugGlow)"/>` +
      `<g style="animation:flap .12s linear infinite;transform-box:fill-box;transform-origin:center">` +
      `<ellipse cx="-1.2" cy="-2.7" rx="3.8" ry="1.9" fill="#e6e9f2" fill-opacity=".6" transform="rotate(-24 -1.2 -2.7)"/>` +
      `<ellipse cx="-1.2" cy="2.7" rx="3.8" ry="1.9" fill="#e6e9f2" fill-opacity=".6" transform="rotate(24 -1.2 2.7)"/></g>` +
      `<ellipse rx="3.3" ry="2.3" fill="${c}"/>` +
      `<path d="M-2.6 0H2.1" stroke="${P.dk}" stroke-width=".7"/>` +
      `<circle cx="3.4" r="1.45" fill="${P.dk}"/>` +
      `<path d="M4.3 -.8l1.7-1.6M4.3 .8l1.7 1.6" stroke="${P.dk}" stroke-width=".55" stroke-linecap="round"/>` +
      `</g>`;
    const el = (ex, ey, rx, ry, ters) =>
      `M${ex - rx} ${ey}a${rx} ${ry} 0 1 ${ters ? 1 : 0} ${2 * rx} 0a${rx} ${ry} 0 1 ${ters ? 1 : 0} ${-2 * rx} 0`;
    const bugs = [
      [el(cx - 6, 352, 66, 28, 0), 7, P.cr, -1.2],
      [el(cx + 2, 380, 52, 44, 1), 9.5, P.sf, -4.4],
      [el(cx - 4, 334, 74, 22, 0), 12, P.tq, -7.9],
    ];
    parts.push(`<g${s.anim(T, isik(ON + 1.1, OFFL - 0.6), { delay: OFF_LAMP })}>`);
    bugs.forEach(([p, dur, c, b]) =>
      parts.push(`<g><animateMotion path="${p}" dur="${dur}s" begin="${b}s" repeatCount="indefinite" rotate="auto"/>${bug(c)}</g>`)
    );
    parts.push(`</g>`);
  }
  parts.push(`</g>`);

  // ── tmux durum çubuğu ──
  parts.push(`<rect y="${BOT}" width="${W}" height="${H - BOT}" fill="${P.bg0}"/><line x1="0" y1="${BOT + 0.5}" x2="${W}" y2="${BOT + 0.5}" stroke="${P.line}"/>`);
  {
    const yb = 490.2, a = 11 * ADV;
    parts.push(`<rect x="10" y="477" width="${r2(len(profil.host) * a + 16)}" height="18" rx="4" fill="${P.sf}"/>` + s.T(18, yb, `[dk.b|${profil.host}]`, { size: 11 }));
    let x = 10 + len(profil.host) * a + 16 + 14;
    sekmeler.forEach((tab, k) => {
      const lab = `${k + 1}:${tab.ad}`;
      const w = (len(lab) + 1) * a;
      parts.push(`<g opacity="${k === 0 ? 0 : 1}"${s.anim(T, pencere([[k * TAB, (k + 1) * TAB]], 0.2, { gor: 0, gizli: 1 }), { delay: OFF_TAB })}>${s.T(x, yb, `[d|${lab}]`, { size: 11 })}</g>`);
      parts.push(
        `<g opacity="${k === 0 ? 1 : 0}"${s.anim(T, pencere([[k * TAB, (k + 1) * TAB]], 0.2), { delay: OFF_TAB })}>` +
          `<rect x="${r2(x - 5)}" y="478" width="${r2(w + 9)}" height="16" rx="4" fill="${P.tq}"/>` +
          s.T(x, yb, `[dk.b|${lab}*]`, { size: 11 }) +
          `</g>`
      );
      x += w + 16;
    });
    const sagM = `[co|${profil.dal}][m|  ·  ][d|${profil.koordinat}][m|  ·  ][t|İstanbul]`;
    const sw = s.width(sagM, 11);
    parts.push(s.T(W - 14, yb, sagM, { size: 11, anchor: 'end' }));
    const bx = W - 14 - sw - 14;
    parts.push(
      `<g transform="translate(${r2(bx)} ${yb - 1})" stroke="${P.co}" stroke-width="1.3">` +
        `<circle cx="0" cy="-8" r="1.8"/><circle cx="0" cy="1" r="1.8"/><circle cx="6.5" cy="-5.5" r="1.8"/>` +
        `<path d="M0 -6.2V-.8M6.5 -3.7C6.5 -1 1.5 -2 0 -.8"/></g>`
    );
  }

  parts.push(`</g>`);
  parts.push(`<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="13.5" stroke="url(#edge)"/>`);

  s.add(...parts);
  return s.render();
}
