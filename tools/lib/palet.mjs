// İznik Gecesi paleti — koyu zemin + İznik çinisi renkleri (kobalt, mercan, turkuaz, safran).
// Metin renkleri koyu zeminde WCAG AA (>= 4.5:1) geçer; kimlik renkleri renk körlüğü
// simülasyonunda (protan/deutan) komşu çiftler ayrışacak sırada dizildi: ID.

export const P = {
  bg0: '#070b16',   // başlık / durum çubuğu
  bg1: '#0b1222',   // panel zemini
  bg2: '#0f1830',   // kart
  bg3: '#15213f',   // kart vurgusu
  line: '#1c2847',
  line2: '#283a66',

  text: '#e6e9f2',  // porselen   15.4:1
  dim: '#9aa3bf',   //             7.4:1
  mute: '#7d86a7',  // yorumlar    5.2:1
  faint: '#3b4668', // sadece süs çizgileri

  co: '#7aa2ff',    // kobalt      7.5:1
  coD: '#2f50b8',   // kobalt dolgu (açık metin üstünde)
  cr: '#ff6b5b',    // İznik mercanı
  tq: '#3fd0c9',    // turkuaz
  sf: '#f5c46b',    // safran
  li: '#b9a3ff',    // lila
  sg: '#9ad48a',    // adaçayı
  am: '#ffb057',    // lamba ışığı
  dk: '#0b1222',    // dolgu üstü koyu metin
};

// Kimlik (kategori) renk sırası — sabit, döngüye sokulmaz.
export const ID = ['co', 'cr', 'tq', 'sf', 'li', 'sg'];

export const RENK_SINIFLARI = Object.fromEntries(
  ['text', 'dim', 'mute', 'faint', 'co', 'cr', 'tq', 'sf', 'li', 'sg', 'am', 'dk'].map((k) => [k, P[k]])
);
