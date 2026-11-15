// TOGI paleti — marka kitinden: elektrik moru, neredeyse siyah, platin beyaz.
// Metin renkleri koyu zeminde WCAG AA (>= 4.5:1) geçer. Mor tonları marka; diğer
// vurgular (pembe, camgöbeği, altın, nane) yalnızca kategori/durum ayrımı için az kullanılır.

export const P = {
  bg0: '#050508',   // başlık / durum çubuğu
  bg1: '#08080d',   // marka zemini (near-black)
  bg2: '#0f0d18',   // kart
  bg3: '#18142b',   // kart vurgusu
  line: '#1c1830',
  line2: '#2c2547',

  text: '#f7f7fa',  // platin     18.9:1
  dim: '#a9a6bd',   //             8.1:1
  mute: '#8a86a3',  // yorumlar    5.6:1
  faint: '#3a3354', // sadece süs çizgileri

  mark: '#6301fb',  // logodaki mor (dolgu / grafik)
  brand: '#792bff', // marka kiti "electric purple" (dolgu, açık metin üstünde 5.4:1)
  co: '#a57dff',    // açık mor — metin vurgusu  6.7:1
  coD: '#792bff',   // mor dolgu
  cr: '#ff6aa8',    // pembe
  tq: '#5ad7f2',    // camgöbeği
  sf: '#ffc66b',    // altın (geliştirmede)
  li: '#d6c8ff',    // lila-platin
  sg: '#7ee2b0',    // nane (tamam)
  am: '#ffb45e',    // lamba ışığı
  dk: '#0a0812',    // dolgu üstü koyu metin
};

// Kimlik (kategori) renk sırası — sabit, döngüye sokulmaz.
export const ID = ['co', 'tq', 'cr', 'sf', 'li', 'sg'];

export const RENK_SINIFLARI = Object.fromEntries(
  ['text', 'dim', 'mute', 'faint', 'co', 'cr', 'tq', 'sf', 'li', 'sg', 'am', 'dk', 'brand'].map((k) => [k, P[k]])
);
