// istanbul.svg — kapanış sahnesi: gece İstanbul silüeti (piksel), Boğaz'dan geçen vapur,
// köprüde akan farlar, göz kırpan yıldızlar ve "exit" diyen terminal satırı.

import { Svg, r2, mlen } from '../lib/svg.mjs';
import { P } from '../lib/palet.mjs';
import { profil } from '../profil.config.mjs';

const W = 900, H = 270, UF = 188; // ufuk çizgisi

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const G = 3; // piksel ızgarası
const snap = (v) => Math.round(v / G) * G;
const R = (x, y, w, h, fill, extra = '') => `<rect x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" fill="${fill}"${extra}/>`;

function kubbe(cx, taban, r, fill) {
  let g = '';
  for (let y = taban - r; y < taban; y += G) {
    const dy = taban - (y + G / 2);
    const hw = snap(Math.sqrt(Math.max(0, r * r - dy * dy)));
    if (hw > 0) g += R(cx - hw, y, hw * 2, G, fill);
  }
  g += R(cx - 1, taban - r - 9, 2, 9, fill); // alem
  return g;
}

function minare(cx, ust, taban, fill) {
  let g = R(cx - 1.5, ust + 12, 3, taban - ust - 12, fill); // gövde
  g += R(cx - 3, ust + 22, 6, 2, fill) + R(cx - 3, ust + 40, 6, 2, fill); // şerefeler
  for (let i = 0; i < 4; i++) g += R(cx - 1.5 + i * 0.4, ust + i * 3, 3 - i * 0.8, 3, fill); // külah
  return g;
}

export async function istanbulSvg() {
  const s = new Svg(W, H, {
    title: 'Gece İstanbul',
    desc: "Piksel İstanbul silüeti: Galata, camiler, Boğaz köprüsü, Kız Kulesi; Boğaz'dan geçen vapur ve 'exit' yazan terminal satırı.",
  });
  const rnd = rng(1453);
  const NEAR = '#060b19', MID = '#0b1430', FAR = '#152250';
  const ISIK = ['#ffcf7a', '#ffd98f', '#ffbf63', '#ffe7b0'];

  s.def(
    `<clipPath id="cardI"><rect width="${W}" height="${H}" rx="14"/></clipPath>`,
    `<linearGradient id="gok" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060b1c"/><stop offset=".55" stop-color="#0d1838"/><stop offset=".86" stop-color="#1a2b5c"/><stop offset="1" stop-color="#25407a"/></linearGradient>`,
    `<linearGradient id="deniz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1d42"/><stop offset=".4" stop-color="#0a1430"/><stop offset="1" stop-color="#050915"/></linearGradient>`,
    `<radialGradient id="ay"><stop offset="0" stop-color="#fff6dc" stop-opacity=".35"/><stop offset=".35" stop-color="#cfe0ff" stop-opacity=".10"/><stop offset="1" stop-color="#cfe0ff" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="duman"><stop offset="0" stop-color="#9aa6c4" stop-opacity=".45"/><stop offset="1" stop-color="#9aa6c4" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="pus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.tq}" stop-opacity="0"/><stop offset="1" stop-color="${P.tq}" stop-opacity=".12"/></linearGradient>`,
    `<linearGradient id="edgeI" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.co}" stop-opacity=".5"/><stop offset=".5" stop-color="${P.tq}" stop-opacity=".12"/><stop offset="1" stop-color="${P.am}" stop-opacity=".35"/></linearGradient>`
  );
  s.loop('tw1', '0%,100%{opacity:1}50%{opacity:.25}');
  s.loop('tw2', '0%,100%{opacity:.35}40%{opacity:1}70%{opacity:.6}');
  s.loop('parilti', '0%,100%{opacity:.85}50%{opacity:.3}');
  s.loop('blink', '0%,49%{opacity:1}50%,100%{opacity:0}');

  const o = [`<g clip-path="url(#cardI)">`];
  o.push(R(0, 0, W, UF, 'url(#gok)'));
  o.push(R(0, UF - 40, W, 40, 'url(#pus)'));

  // yıldızlar
  for (let i = 0; i < 90; i++) {
    const x = snap(rnd() * W), y = snap(6 + rnd() * 120);
    if (x < 360 && y < 64) continue; // terminal metninin altını boş bırak
    if (Math.hypot(x - 772, y - 58) < 34) continue; // ay
    const z = rnd() < 0.15 ? 2 : 1.4;
    const tw = rnd() < 0.5 ? 'tw1' : 'tw2';
    const d = (2.5 + rnd() * 4).toFixed(2), dl = (-rnd() * 6).toFixed(2);
    o.push(R(x, y, z, z, '#dfe7ff', ` opacity="${(0.45 + rnd() * 0.5).toFixed(2)}" style="animation:${tw} ${d}s ease-in-out ${dl}s infinite"`));
  }
  // ay
  o.push(`<circle cx="772" cy="58" r="70" fill="url(#ay)"/><circle cx="772" cy="58" r="15" fill="#f1ecdc"/>`);
  o.push(`<circle cx="767" cy="54" r="3.2" fill="#ded6bf"/><circle cx="777" cy="63" r="2.2" fill="#ded6bf"/><circle cx="776" cy="51" r="1.4" fill="#ded6bf"/>`);

  // martılar
  s.loop('kanat', '0%,100%{transform:scaleY(1)}50%{transform:scaleY(-.6)}');
  s.loop('suzul', `from{transform:translateX(-60px)}to{transform:translateX(${W + 60}px)}`);
  [[92, 70, 0, 470], [104, 55, -14, 300], [80, 64, -31, 640]].forEach(([y, dur, dl, sx], i) => {
    o.push(
      `<g style="transform:translateX(${sx}px);animation:suzul ${dur}s linear ${dl}s infinite"><g transform="translate(0 ${y})">` +
        `<path d="M-6 0Q-3 -3 0 0Q3 -3 6 0" stroke="#c9d4f0" stroke-opacity=".7" stroke-width="1.3" stroke-linecap="round" style="animation:kanat ${0.7 + i * 0.15}s ease-in-out infinite;transform-box:fill-box;transform-origin:center"/>` +
        `</g></g>`
    );
  });

  // uzak tepe (Anadolu yakası) + küçük ışıklar
  {
    let d = `M520 ${UF}`;
    for (let x = 520; x <= W; x += G) {
      const y = 160 + 6 * Math.sin(x / 37) + 4 * Math.sin(x / 13);
      d += `L${x} ${snap(y)}`;
    }
    d += `L${W} ${UF}Z`;
    o.push(`<path d="${d}" fill="${FAR}"/>`);
    for (let i = 0; i < 26; i++) {
      const x = snap(530 + rnd() * 360), y = snap(166 + rnd() * 18);
      o.push(R(x, y, 1.6, 1.6, ISIK[i % 4], ` opacity="${(0.5 + rnd() * 0.4).toFixed(2)}"`));
    }
    o.push(kubbe(690, 166, 9, FAR) + minare(676, 140, 166, FAR) + minare(704, 140, 166, FAR));
  }

  // köprü
  {
    const t1 = 618, t2 = 858, top = 96, deck = 150;
    let g = '';
    // kule çiftleri
    [t1, t2].forEach((tx) => {
      g += R(tx - 5, top, 3, UF - top, MID) + R(tx + 2, top, 3, UF - top, MID);
      g += R(tx - 5, top + 10, 10, 2, MID) + R(tx - 5, top + 30, 10, 2, MID) + R(tx - 5, deck - 6, 10, 3, MID);
      g += R(tx - 1, top + 3, 2, 2, P.cr, ` style="animation:parilti 1.6s ease-in-out infinite"`);
    });
    // tabliye
    g += R(560, deck, W - 560, 4, MID);
    // ana kablo (parabol) + askılar
    const kablo = [];
    for (let x = t1; x <= t2; x += 2) {
      const u = (x - t1) / (t2 - t1);
      kablo.push([x, top + 2 + 4 * (deck - 12 - top) * u * (1 - u)]);
    }
    g += `<path d="M${kablo.map(([x, y]) => `${x} ${r2(y)}`).join('L')}" stroke="${MID}" stroke-width="1.6"/>`;
    g += `<path d="M560 ${deck}Q${t1 - 30} ${deck - 20} ${t1} ${top + 2}M${t2} ${top + 2}Q${t2 + 20} ${deck - 30} ${W + 10} ${deck - 8}" stroke="${MID}" stroke-width="1.6"/>`;
    for (let x = t1 + 10; x < t2; x += 10) {
      const u = (x - t1) / (t2 - t1);
      const y = top + 2 + 4 * (deck - 12 - top) * u * (1 - u);
      g += `<line x1="${x}" y1="${r2(y)}" x2="${x}" y2="${deck}" stroke="${MID}" stroke-opacity=".9"/>`;
    }
    // kablo ışıkları
    kablo.forEach(([x, y], i) => {
      if (i % 6 === 0) g += R(x - 0.8, y - 0.8, 1.6, 1.6, '#d8e4ff', ` opacity=".75"`);
    });
    // akan farlar
    s.loop('saga', `from{transform:translateX(0)}to{transform:translateX(${W - 560}px)}`);
    s.loop('sola', `from{transform:translateX(0)}to{transform:translateX(${-(W - 560)}px)}`);
    for (let i = 0; i < 6; i++) {
      const dur = (5 + rnd() * 4).toFixed(2), dl = (-rnd() * 8).toFixed(2);
      g += i % 2
        ? `<rect x="556" y="${deck - 2}" width="4" height="1.8" rx=".9" fill="#ffe7b0" style="animation:saga ${dur}s linear ${dl}s infinite"/>`
        : `<rect x="${W}" y="${deck + 0.6}" width="4" height="1.8" rx=".9" fill="${P.cr}" style="animation:sola ${dur}s linear ${dl}s infinite"/>`;
    }
    o.push(g);
  }

  // Galata yamacı + kule
  {
    let d = `M0 ${UF}L0 ${snap(170)}`;
    for (let x = 0; x <= 330; x += G) {
      const y = 182 - 30 * Math.exp(-((x - 205) ** 2) / 9000) - 6 * Math.exp(-((x - 70) ** 2) / 1500);
      d += `L${x} ${snap(y)}`;
    }
    d += `L330 ${UF}Z`;
    o.push(`<path d="${d}" fill="${NEAR}"/>`);
    // evler
    let g = '';
    for (let x = 0; x < 330; x += 0) {
      const w = snap(12 + rnd() * 15), h = snap(9 + rnd() * 18);
      const base = 182 - 30 * Math.exp(-((x + w / 2 - 205) ** 2) / 9000) - 6 * Math.exp(-((x + w / 2 - 70) ** 2) / 1500);
      if (Math.abs(x + w / 2 - 205) > 14) {
        g += R(x, snap(base - h), w, h + 6, NEAR);
        if (rnd() < 0.5) g += R(x + w / 2 - 3, snap(base - h) - 3, 6, 3, NEAR); // çatı
        for (let wy = snap(base - h) + 3; wy < base - 1; wy += 6)
          for (let wx = x + 3; wx < x + w - 3; wx += 6)
            if (rnd() < 0.3) g += R(wx, wy, 2, 2, ISIK[Math.floor(rnd() * 4)], ` opacity="${(0.55 + rnd() * 0.45).toFixed(2)}"`);
      }
      x += w + (rnd() < 0.3 ? 3 : 0);
    }
    o.push(g);
    // Galata Kulesi
    const kx = 205, kt = 64;
    let k = R(kx - 10, kt + 30, 20, 152 - (kt + 30), NEAR); // gövde
    k += R(kx - 12, kt + 24, 24, 9, NEAR); // seyir terası
    k += R(kx - 13, kt + 21, 26, 3, NEAR);
    for (let i = 0; i < 7; i++) k += R(kx - 1.5 - i * 1.5, kt + 3 + i * 3, 3 + i * 3, 3, NEAR); // külah (sivri tepe, geniş taban)
    k += R(kx - 0.75, kt - 6, 1.5, 9, NEAR);
    [[kx - 6, kt + 27], [kx - 1, kt + 27], [kx + 4, kt + 27]].forEach(([x, y]) => (k += R(x, y, 2.4, 3, '#ffd98f', ' opacity=".9"')));
    [[kx - 3, kt + 48], [kx + 1, kt + 64], [kx - 3, kt + 80]].forEach(([x, y]) => (k += R(x, y, 2, 3, '#ffcf7a', ' opacity=".7"')));
    o.push(k);
  }

  // tarihi yarımada: camiler + evler
  {
    let g = `<path d="M300 ${UF}L300 172L560 174L560 ${UF}Z" fill="${NEAR}"/>`;
    // küçük cami
    g += kubbe(318, 158, 13, NEAR) + R(300, 158, 36, 16, NEAR) + minare(298, 108, 158, NEAR) + minare(338, 108, 158, NEAR);
    // büyük külliye
    const cx = 440;
    g += R(382, 140, 116, 34, NEAR);
    g += kubbe(cx, 140, 30, NEAR);
    g += kubbe(cx - 33, 147, 17, NEAR) + kubbe(cx + 33, 147, 17, NEAR);
    g += kubbe(cx - 54, 153, 9, NEAR) + kubbe(cx + 54, 153, 9, NEAR);
    g += minare(372, 70, 174, NEAR) + minare(386, 82, 174, NEAR) + minare(494, 82, 174, NEAR) + minare(508, 70, 174, NEAR);
    // kubbe aydınlatması
    for (let i = 0; i < 9; i++) g += R(cx - 24 + i * 6, 143, 2, 2, '#ffd98f', ' opacity=".8"');
    for (let i = 0; i < 14; i++) g += R(388 + i * 8, 163, 2, 3, '#ffcf7a', ` opacity="${(0.5 + rnd() * 0.4).toFixed(2)}"`);
    // kıyı evleri
    for (let x = 520; x < 600; x += 15) {
      const h = snap(9 + rnd() * 12);
      g += R(x, 176 - h, 12, h + 12, NEAR);
      if (rnd() < 0.8) g += R(x + 4, 179 - h + 3, 2, 2, ISIK[Math.floor(rnd() * 4)]);
    }
    o.push(g);
  }

  // deniz
  o.push(R(0, UF, W, H - UF, 'url(#deniz)'));
  o.push(`<line x1="0" y1="${UF + 0.5}" x2="${W}" y2="${UF + 0.5}" stroke="#2c4a86" stroke-opacity=".5"/>`);
  // ay yansıması
  for (let i = 0; i < 12; i++) {
    const y = UF + 6 + i * 6.5, w = 26 - i * 1.2 + (i % 2) * 6;
    o.push(R(772 - w / 2 + (i % 3) * 2 - 2, y, w, 1.6, '#e8ecff', ` opacity="${r2(0.55 - i * 0.035)}" style="animation:parilti ${(1.6 + (i % 4) * 0.5).toFixed(1)}s ease-in-out ${(-i * 0.3).toFixed(1)}s infinite"`));
  }
  // kıyı ışıklarının yansıması
  for (let i = 0; i < 40; i++) {
    const x = snap(rnd() * W);
    if (Math.abs(x - 772) < 30) continue;
    const y = UF + 4 + rnd() * 20;
    o.push(R(x, y, 2, 4 + rnd() * 8, ISIK[i % 4], ` opacity="${(0.12 + rnd() * 0.22).toFixed(2)}" style="animation:parilti ${(2 + rnd() * 3).toFixed(1)}s ease-in-out ${(-rnd() * 4).toFixed(1)}s infinite"`));
  }
  // dalgacıklar
  s.loop('dalga', '0%,100%{transform:translateX(-3px)}50%{transform:translateX(3px)}');
  for (let i = 0; i < 34; i++) {
    const x = rnd() * W, y = UF + 26 + rnd() * (H - UF - 30), w = 8 + rnd() * 18;
    o.push(R(x, y, w, 1, '#7aa2ff', ` opacity="${(0.08 + rnd() * 0.12).toFixed(2)}" style="animation:dalga ${(3 + rnd() * 3).toFixed(1)}s ease-in-out ${(-rnd() * 5).toFixed(1)}s infinite"`));
  }

  // Kız Kulesi
  {
    const x = 578, y = 207;
    let g = R(x - 18, y - 4, 36, 6, NEAR) + R(x - 12, y - 9, 24, 5, NEAR) + R(x + 6, y - 15, 8, 6, NEAR);
    g += R(x - 5, y - 28, 10, 19, NEAR) + R(x - 7, y - 30, 14, 3, NEAR);
    for (let i = 0; i < 3; i++) g += R(x - 4 + i * 1.3, y - 36 + i * 2, 8 - i * 2.6, 2, NEAR);
    g += R(x - 0.5, y - 42, 1, 6, NEAR);
    g += R(x - 2, y - 22, 2, 3, '#ffd98f') + R(x + 1, y - 16, 2, 3, '#ffcf7a', ' opacity=".7"');
    g += R(x - 0.8, y - 43, 1.6, 1.6, P.cr, ' style="animation:parilti 2.4s ease-in-out infinite"');
    // yansıma
    g += R(x - 12, y + 3, 24, 2, '#0e1a3a') + R(x - 2, y + 7, 2, 7, '#ffd98f', ' opacity=".25"');
    o.push(g);
  }

  // vapur
  {
    const harita = [
      '..................FFF.............',
      '..................WWW.............',
      '..................FFF.............',
      '..........UUUUUUUUUUUUUUUUU.......',
      '..........UyUyUyUyUyUyUyUyU.......',
      '....DDDDDDDDDDDDDDDDDDDDDDDDDDD...',
      '....DyyDyyDyyDyyDyyDyyDyyDyyDDD...',
      '....DDDDDDDDDDDDDDDDDDDDDDDDDDD...',
      'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',
      'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS.',
      '.HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH..',
      '..HHHHHHHHHHHHHHHHHHHHHHHHHHHHH...',
    ];
    const renk = { F: '#04070d', W: '#e6e9f2', U: '#22305a', D: '#1a2650', y: '#ffd27d', H: '#070b18', S: '#c9d2e6' };
    const c = 2.6;
    let v = '';
    harita.forEach((row, r) => [...row].forEach((ch, k) => {
      if (ch !== '.') v += R(k * c, r * c, c, c, renk[ch]);
    }));
    const vh = harita.length * c;
    // duman
    s.loop('duman', '0%{transform:translate(0,0) scale(.8);opacity:0}15%{opacity:.8}100%{transform:translate(-30px,-24px) scale(3);opacity:0}');
    let duman = '';
    for (let i = 0; i < 3; i++) duman += `<circle cx="${19 * c}" cy="-2" r="3.2" fill="url(#duman)" style="animation:duman 3.6s ease-out ${(-i * 1.2).toFixed(1)}s infinite;transform-box:fill-box;transform-origin:center"/>`;
    // dümen suyu
    v += R(29 * c, 3 * c - 7, 1.2, 7, '#3a4a78') + R(29 * c - 0.8, 3 * c - 9, 2.8, 2.8, '#ffe7b0', ' style="animation:parilti 1.8s ease-in-out infinite"');
    let iz = '';
    for (let i = 0; i < 6; i++) iz += R(-8 - i * 9, vh - 3 + (i % 2), 6 - i * 0.6, 1.4, '#cfd8ee', ` opacity="${r2(0.5 - i * 0.07)}"`);
    s.loop('vapur', `from{transform:translateX(-120px)}to{transform:translateX(${W + 60}px)}`);
    const yV = 214;
    o.push(
      `<g style="transform:translateX(250px);animation:vapur 46s linear -17s infinite">` +
        `<g transform="translate(0 ${yV - vh})">${duman}${v}${iz}</g>` +
        `<g transform="translate(0 ${yV + vh + 2}) scale(1 -1)" opacity=".18">${v}</g>` +
        `</g>`
    );
  }

  // terminal satırı
  o.push(s.T(24, 32, `[sf.b|${profil.kullanici}][m|@][t|${profil.host}] [co.b|❯] [t|exit]`, { size: 12.5 }));
  const veda = `[d|logout · İstanbul'dan iyi geceler.]`;
  o.push(s.T(24, 54, veda, { size: 12.5 }));
  o.push(`<rect x="${r2(24 + (mlen(veda) + 1) * 12.5 * 0.6)}" y="43" width="7.5" height="14" rx="1" fill="${P.sf}" style="animation:blink 1.1s linear infinite"/>`);

  o.push(`</g>`);
  o.push(`<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="13.5" stroke="url(#edgeI)"/>`);
  s.add(...o);
  return s.render();
}
