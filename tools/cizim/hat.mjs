// hat.svg — otomasyon hattı: kaynaklar → çekirdek → çıktılar.
// Paketler kenarlar boyunca akar; UYAP çıkışındaki kalkan, mükerrer (mercan) paketi durdurur.
// Altta backend sahipliğindeki iş yaşam döngüsü döner.

import { Svg, len, ADV, r2, pencere } from '../lib/svg.mjs';
import { P, ID } from '../lib/palet.mjs';
import { hat } from '../profil.config.mjs';

const W = 900, H = 404;

export async function hatSvg() {
  const s = new Svg(W, H, {
    title: 'Otomasyon hattı',
    desc:
      'UYAP, Leganova, banka portalları ve Excel/XML girdileri çekirdekte (oturum havuzu, iş kuyruğu, kalkan, mutabakat, ' +
      'çift kontrol, append-only log) işlenir; UYAP işlemleri, Leganova kayıtları, Excel raporları ve ödeme listeleri çıkar. ' +
      'Kalkan mükerrer ödemeyi durdurur.',
  });

  s.def(
    `<clipPath id="card"><rect width="${W}" height="${H}" rx="14"/></clipPath>`,
    `<linearGradient id="bgH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1428"/><stop offset="1" stop-color="#0a101f"/></linearGradient>`,
    `<linearGradient id="edgeH" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.co}" stop-opacity=".55"/><stop offset=".5" stop-color="${P.tq}" stop-opacity=".14"/><stop offset="1" stop-color="${P.cr}" stop-opacity=".32"/></linearGradient>`,
    `<linearGradient id="coreStroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.co}" stop-opacity=".9"/><stop offset="1" stop-color="${P.tq}" stop-opacity=".7"/></linearGradient>`,
    `<radialGradient id="coreGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${P.co}" stop-opacity=".16"/><stop offset="1" stop-color="${P.co}" stop-opacity="0"/></radialGradient>`,
    `<pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="${P.co}" fill-opacity=".09"/></pattern>`,
    `<radialGradient id="pk"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`
  );

  const o = [];
  o.push(`<g clip-path="url(#card)">`);
  o.push(`<rect width="${W}" height="${H}" fill="url(#bgH)"/><rect y="40" width="${W}" height="${H - 40}" fill="url(#dots)"/>`);

  // başlık
  o.push(`<rect width="${W}" height="40" fill="${P.bg0}"/><line x1="0" y1="39.5" x2="${W}" y2="39.5" stroke="${P.line}"/>`);
  o.push(`<rect x="22" y="15" width="10" height="10" rx="2" fill="${P.tq}" transform="rotate(45 27 20)"/>`);
  o.push(s.T(42, 25, '[t.b|otomasyon hattı][m|   kaynak → çekirdek → çıktı]', { size: 12.5 }));
  o.push(s.T(W - 22, 25, '[t|●][d| veri paketi    ][cr|●][d| mükerrer → kalkan]', { size: 11, anchor: 'end' }));

  // geometri
  const nx0 = 20, nw = 188, nh = 54, ny = (i) => 64 + i * 68;
  const ox0 = W - 20 - nw;
  const cx0 = 294, cw = 312, cy0 = 58, ch = 278;
  const yIn = (i) => cy0 + 66 + i * 52;
  const yc = (i) => ny(i) + nh / 2;

  // kenarlar (önce, düğümlerin altında kalsın)
  const T = 2.6; // paket turu
  const kenar = [];
  hat.kaynaklar.forEach((_, i) => kenar.push({ id: `ek${i}`, d: `M${nx0 + nw} ${yc(i)}C${nx0 + nw + 46} ${yc(i)} ${cx0 - 46} ${yIn(i)} ${cx0} ${yIn(i)}`, k: ID[i] }));
  hat.ciktilar.forEach((_, i) => kenar.push({ id: `ec${i}`, d: `M${cx0 + cw} ${yIn(i)}C${cx0 + cw + 46} ${yIn(i)} ${ox0 - 46} ${yc(i)} ${ox0} ${yc(i)}`, k: ID[i] }));
  s.loop('akis', 'to{stroke-dashoffset:-24}');
  kenar.forEach((e) => {
    s.def(`<path id="${e.id}" d="${e.d}"/>`);
    o.push(`<path d="${e.d}" stroke="${P[e.k]}" stroke-opacity=".28" stroke-width="1.6"/>`);
    o.push(`<path d="${e.d}" stroke="${P[e.k]}" stroke-opacity=".75" stroke-width="1.6" stroke-dasharray="2 10" stroke-linecap="round" style="animation:akis 1.1s linear infinite"/>`);
  });
  // paketler
  kenar.forEach((e, i) => {
    for (let q = 0; q < 2; q++) {
      const b = -((i * 0.37 + q * (T / 2)) % T);
      o.push(
        `<g><animateMotion dur="${T}s" begin="${r2(b)}s" repeatCount="indefinite"><mpath href="#${e.id}" xlink:href="#${e.id}"/></animateMotion>` +
          `<circle r="7" fill="url(#pk)" opacity=".55"/><circle r="2.6" fill="${P[e.k]}"/><circle r="1.1" fill="#fff"/></g>`
      );
    }
  });

  // kaynak & çıktı düğümleri
  const dugum = (x, y, k, ad, alt, sag) => {
    let g = `<rect x="${x}" y="${y}" width="${nw}" height="${nh}" rx="10" fill="${P.bg2}" stroke="${P.line2}"/>`;
    g += sag
      ? `<rect x="${x + nw - 3}" y="${y + 12}" width="3" height="${nh - 24}" rx="1.5" fill="${P[k]}"/>`
      : `<rect x="${x}" y="${y + 12}" width="3" height="${nh - 24}" rx="1.5" fill="${P[k]}"/>`;
    g += s.T(x + 16, y + 23, `[t.b|${ad}]`, { size: 13 });
    g += s.T(x + 16, y + 41, `[d|${alt}]`, { size: 11 });
    const px = sag ? x : x + nw;
    g += `<circle cx="${px}" cy="${y + nh / 2}" r="3.4" fill="${P.bg1}" stroke="${P[k]}" stroke-width="1.6"/>`;
    return g;
  };
  o.push(s.T(nx0, 56, '[m|KAYNAKLAR]', { size: 9.5 }));
  o.push(s.T(ox0, 56, '[m|ÇIKTILAR]', { size: 9.5 }));
  hat.kaynaklar.forEach(([a, b], i) => o.push(dugum(nx0, ny(i), ID[i], a, b, false)));
  hat.ciktilar.forEach(([a, b], i) => o.push(dugum(ox0, ny(i), ID[i], a, b, true)));

  // çekirdek
  o.push(`<rect x="${cx0 - 30}" y="${cy0 - 20}" width="${cw + 60}" height="${ch + 40}" fill="url(#coreGlow)"/>`);
  o.push(`<rect x="${cx0}" y="${cy0}" width="${cw}" height="${ch}" rx="14" fill="#0e1731" stroke="url(#coreStroke)" stroke-width="1.4"/>`);
  o.push(s.T(cx0 + 18, cy0 + 27, '[t.b|çekirdek]', { size: 13 }));
  o.push(s.T(cx0 + cw - 18, cy0 + 27, '[m|Node.js · Electron]', { size: 11, anchor: 'end' }));
  o.push(`<line x1="${cx0 + 16}" y1="${cy0 + 40.5}" x2="${cx0 + cw - 16}" y2="${cy0 + 40.5}" stroke="${P.line2}"/>`);
  hat.kaynaklar.forEach((_, i) => o.push(`<circle cx="${cx0}" cy="${yIn(i)}" r="3" fill="${P[ID[i]]}"/>`));
  hat.ciktilar.forEach((_, i) => o.push(`<circle cx="${cx0 + cw}" cy="${yIn(i)}" r="3" fill="${P[ID[i]]}"/>`));

  const mw = 136, mh = 62, mgx = 8, mgy = 10;
  hat.cekirdek.forEach(([ad, alt], i) => {
    const c = i % 2, r = Math.floor(i / 2);
    const x = cx0 + 16 + c * (mw + mgx), y = cy0 + 52 + r * (mh + mgy);
    const k = ID[(i + 2) % ID.length];
    let g = `<rect x="${x}" y="${y}" width="${mw}" height="${mh}" rx="9" fill="${P.bg3}" stroke="${P.line2}"/>`;
    g += `<rect x="${x + 12}" y="${y + 11}" width="14" height="3" rx="1.5" fill="${P[k]}"/>`;
    g += s.T(x + 12, y + 33, `[t.b|${ad}]`, { size: 11.5 });
    g += s.T(x + 12, y + 50, `[d|${alt}]`, { size: 10.5 });
    o.push(g);
    // mikro animasyonlar
    if (ad === 'çift kontrol') {
      const L = 4;
      [0, 1].forEach((q) => {
        const st = [[0, 'opacity:.18'], [0.6 + q * 0.7, 'opacity:.18'], [0.75 + q * 0.7, 'opacity:1'], [3.4, 'opacity:1'], [3.7, 'opacity:.18']];
        o.push(`<circle cx="${x + mw - 30 + q * 12}" cy="${y + 13}" r="3.6" fill="${P.sg}"${s.anim(L, st)}/>`);
      });
    }
    if (ad === 'mutabakat') {
      for (let q = 0; q < 8; q++) {
        const L = 4.8, a = q * 0.6;
        const st = [[0, 'opacity:.25'], [a, 'opacity:.25'], [a + 0.05, 'opacity:1'], [a + 0.6, 'opacity:1'], [a + 0.65, 'opacity:.25']];
        o.push(`<rect x="${x + mw - 66 + q * 7}" y="${y + 9}" width="5" height="5" rx="1" fill="${P[ID[q % 6]]}"${s.anim(L, st, { base: 'opacity:.6' })}/>`);
      }
    }
    if (ad === 'iş kuyruğu') {
      s.loop('kuyruk', '0%{transform:translateX(0)}100%{transform:translateX(-10px)}');
      let d = '';
      for (let q = 0; q < 5; q++) d += `<rect x="${x + mw - 66 + q * 10}" y="${y + 9}" width="7" height="5" rx="1.2" fill="${P.tq}" fill-opacity="${0.25 + q * 0.17}"/>`;
      o.push(`<g style="animation:kuyruk .8s linear infinite">${d}</g>`);
    }
  });

  // kalkan: UYAP çıkış kenarında, mükerrer paketi durdurur
  {
    const e = kenar[hat.kaynaklar.length]; // ec0
    const x1 = cx0 + cw, y1 = yIn(0), x2 = ox0, y2 = yc(0);
    // bezier orta nokta (t=.5)
    // de Casteljau: eğrinin ilk yarısı (t=0..0.5) — mükerrer paket kalkana kadar bu yolu izler
    const p0 = [x1, y1], p1 = [x1 + 46, y1], p2 = [x2 - 46, y2], p3 = [x2, y2];
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const q1 = mid(p0, p1), m12 = mid(p1, p2), q2 = mid(q1, m12), q3 = mid(q2, mid(m12, mid(p2, p3)));
    const bx = q3[0], by = q3[1];
    const yarim = `M${x1} ${y1}C${r2(q1[0])} ${r2(q1[1])} ${r2(q2[0])} ${r2(q2[1])} ${r2(bx)} ${r2(by)}`;
    s.def(`<path id="mkr" d="${yarim}"/>`);
    const L = 6.5;
    o.push(
      `<g><animateMotion dur="${L}s" repeatCount="indefinite" calcMode="linear" keyTimes="0;.2;1" keyPoints="0;1;1"><mpath href="#mkr" xlink:href="#mkr"/></animateMotion>` +
        `<g opacity="0"${s.anim(L, [[0, 'opacity:0'], [0.1, 'opacity:1'], [1.3, 'opacity:1'], [1.75, 'opacity:0']])}>` +
        `<circle r="8" fill="${P.cr}" fill-opacity=".25"/><circle r="3.2" fill="${P.cr}"/>` +
        s.T(0, -9, '[cr.b|×2]', { size: 9.5, anchor: 'middle' }) +
        `</g></g>`
    );
    const kalkan = `M0 -11L8.5 -7.5V-1.2C8.5 4.6 4.8 8.6 0 10.6C-4.8 8.6 -8.5 4.6 -8.5 -1.2V-7.5Z`;
    o.push(
      `<g transform="translate(${r2(bx)} ${r2(by)})">` +
        `<circle r="16" fill="${P.sg}" fill-opacity=".10"${s.anim(L, [[0, 'opacity:.4;transform:scale(1)'], [1.25, 'opacity:.4;transform:scale(1)'], [1.4, 'opacity:1;transform:scale(1.35)'], [2.2, 'opacity:.4;transform:scale(1)']], { origin: 'center' })}/>` +
        `<path d="${kalkan}" fill="${P.bg1}" stroke="${P.sg}" stroke-width="1.6"/>` +
        `<path d="M-3.4 -.6L-.8 2.2L3.8 -3.2" stroke="${P.sg}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>` +
        `</g>`
    );
    o.push(
      `<g opacity="0"${s.anim(L, [[0, 'opacity:0'], [1.3, 'opacity:0'], [1.45, 'opacity:1'], [3.2, 'opacity:1'], [3.6, 'opacity:0']])}>` +
        `<rect x="${r2(bx - 39)}" y="${r2(by - 39)}" width="78" height="19" rx="9.5" fill="${P.bg0}" stroke="${P.cr}" stroke-opacity=".7"/>` +
        s.T(bx, by - 25.5, '[cr.b|✗ mükerrer]', { size: 10.5, anchor: 'middle' }) +
        `</g>`
    );
  }

  // alt şerit: iş yaşam döngüsü
  {
    const y = 370;
    o.push(`<line x1="20" y1="${y - 22.5}" x2="${W - 20}" y2="${y - 22.5}" stroke="${P.line}"/>`);
    o.push(s.T(22, y + 4, '[m|iş yaşam döngüsü]', { size: 11 }));
    const states = [['running', 'sf'], ['stopping', 'cr'], ['close', 'li'], ['stopped', 'dim']];
    let x = 160;
    const L = 6;
    states.forEach(([ad, k], i) => {
      const w = len(ad) * 11 * ADV + 22;
      const a = i * 1.5;
      o.push(`<rect x="${r2(x)}" y="${y - 11}" width="${r2(w)}" height="22" rx="11" fill="${P[k]}" fill-opacity=".08" stroke="${P[k]}" stroke-opacity=".35"/>`);
      o.push(`<rect x="${r2(x)}" y="${y - 11}" width="${r2(w)}" height="22" rx="11" fill="${P[k]}" fill-opacity=".22" stroke="${P[k]}" stroke-width="1.4" opacity="${i === 0 ? 1 : 0}"${s.anim(L, pencere([[a, a + 1.5]], 0.15))}/>`);
      o.push(s.T(x + 11, y + 4, `[${k}|${ad}]`, { size: 11 }));
      x += w;
      if (i < states.length - 1) {
        o.push(s.T(x + 7, y + 4, '[m|→]', { size: 11 }));
        x += 26;
      }
    });
    o.push(s.T(W - 22, y + 4, '[d|sahibi: backend  ·  renderer pasif]', { size: 11, anchor: 'end' }));
  }

  o.push(`</g>`);
  o.push(`<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="13.5" stroke="url(#edgeH)"/>`);
  s.add(...o);
  return s.render();
}
