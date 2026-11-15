// Profilin bütün metni burada. Değiştir → `node build.mjs` → assets/*.svg yeniden üretilir.
// İşaretleme: [sınıf|metin]  sınıflar: t d m f co cr tq sf li sg am dk  + b (kalın) i (italik)
// Not: bir satıra sığmayan metin kesilmez, taşar — uzun metin girersen ilgili SVG'yi tarayıcıda kontrol et.

export const profil = {
  github: 'togithecreatorx',         // GitHub kullanıcı adın (profil reposu: <ad>/<ad>)
  marka: 'TOGI',
  ad: 'Tolgahan Türker',
  slogan: ['BUILD', 'CREATE', 'INSPIRE'],
  eposta: 'togiturker@gmail.com',
  kullanici: 'togi',                 // terminal istemi: togi@creator
  host: 'creator',
  konum: 'İstanbul, TR',
  koordinat: '41.01°K 28.97°D',
  dal: 'main',
  atolye: 'Hungry Bugs Studio',
  alanlar: 'otomasyon · güvenlik · 3D tasarım',
};

// ── HERO: sol panel sekmeleri (tmux pencereleri) ─────────────────────────────
export const sekmeler = [
  {
    ad: 'kimlik',
    komut: 'neofetch --togi',
    tur: 'neofetch',
    satirlar: [
      '[co.b|togi][m|@][t.b|creator]',
      '[f|─────────────────]',
      '[co|Ad         ][t|Tolgahan Türker ][d|(TOGI)]',
      '[co|Rol        ][t|yazılım geliştirici · maker]',
      '[co|Konum      ][t|İstanbul, TR]',
      '[co|Çekirdek   ][t|Node.js · Electron · C#]',
      '[co|Web        ][t|Next.js · TypeScript]',
      '[co|Donanım    ][t|ESP32 · 3D baskı]',
      '[co|Şu an      ][t|Spendify · CCP2]',
      '[co|Slogan     ][li.b|BUILD • CREATE • INSPIRE]',
    ],
  },
  {
    ad: 'projeler',
    komut: 'git log --oneline -n 7',
    tur: 'gitlog',
    // [hash, ad, açıklama, teknoloji]
    satirlar: [
      ['5be1d1f', 'spendify', '12 modül · tek masaüstü', 'Electron'],
      ['cc2a0b2', 'ccp2', 'call center platform · v2', 'platform'],
      ['5e47a1c', 'sentrix-dlp', '180+ uç nokta · on-prem DLP', 'C# · FastAPI'],
      ['519a0e1', 'signum', 'merkezi e-imza ağ geçidi', 'Node · C#'],
      ['ac1d907', 'haciz-pilot', 'toplu talep · önizle → gönder', 'Electron'],
      ['b065fed', 'hungry-bugs-studio', '3D baskı lamba · e-ticaret', 'Next.js'],
      ['e5932ab', 'esp32-lab', 'gömülü sistem denemeleri', 'ESP32'],
    ],
    not: '[m.i|# + garanti-masraf · masraf-qnb · yon-kurulum · bu profil]',
  },
  {
    ad: 'stack',
    komut: 'cat stack.lock',
    tur: 'stack',
    gruplar: [
      ['dil', ['JavaScript', 'TypeScript', 'C#', 'Python', 'PowerShell']],
      ['masaüstü', ['Electron', 'Node worker', '.NET']],
      ['web', ['Next.js', 'Tailwind', 'FastAPI', 'Prisma']],
      ['veri', ['PostgreSQL', 'Redis', 'Excel / xlsx']],
      ['donanım', ['ESP32', '3D baskı', 'PLA']],
      ['araç', ['Git', 'Docker', 'Claude Code', 'VS Code']],
    ],
    not: '[m.i|# çalışan sisteme rota dışı refactor yok.]',
  },
  {
    ad: 'metrik',
    komut: 'togi metrik --ozet',
    tur: 'metrik',
    kartlar: [
      ['180+', 'uç nokta', 'Sentrix DLP'],
      ['12', 'modül tek', 'uygulamada'],
      ['0 TL', 'aylık altyapı', 'Hungry Bugs'],
      ['24/24', 'eşleştirme', 'testi yeşil'],
      ['3', 'rollü yetki', 'Signum RBAC'],
      ['v2', 'call center', 'platformu'],
    ],
    not: '[m.i|# hepsi gerçek sayı; uydurma metrik yok.]',
  },
  {
    ad: 'yol',
    komut: 'cat yol-haritasi.yaml',
    tur: 'yaml',
    kok: 'spendify',
    satirlar: [
      ['bugun', '12 modül · tek masaüstü uygulama'],
      ['yolda', 'mutabakat-motoru → modül'],
      ['yolda', 'vintage-cli → analiz modülü'],
      ['yolda', 'yts-asistan → rapor modülü'],
      ['hedef', 'tek kurulum, tek arayüz'],
    ],
  },
];

// Durum etiketleri (proje kartları)
export const durumlar = {
  kul: { etiket: 'kullanımda', renk: 'sg' },
  gel: { etiket: 'geliştirmede', renk: 'sf' },
  haz: { etiket: 'hazır', renk: 'li' },
};

// ── HERO sağ üst: derleme monitörü ───────────────────────────────────────────
// [ad, kuyrukta-başla, çalış-başla, bitiş]  (30 sn döngü içinde saniye)
export const isler = [
  ['spendify.dist', 0, 0.5, 9],
  ['sentrix.agent', 0, 2.5, 8.5],
  ['signum.gateway', 0, 7, 19],
  ['ccp2.test', 0, 12.5, 22],
  ['hbs.deploy', 0, 18.5, 27],
];

// ── ÖNE ÇIKAN PROJELER (projeler.svg) ────────────────────────────────────────
// { ad, baslik, aciklama:[satır, satır], etiketler, alt, gorsel }
export const projeler = [
  {
    ad: 'spendify',
    baslik: 'Spendify',
    aciklama: ['Operasyon süreçlerini tek masaüstü', 'uygulamada toplayan otomasyon platformu.'],
    etiketler: ['Electron', 'Node worker', '12 modül'],
    alt: '[m|yolda:][d| mutabakat · vintage analizi · rapor]',
    gorsel: 'moduller',
  },
  {
    ad: 'sentrix-dlp',
    baslik: 'Sentrix DLP',
    aciklama: ['180+ uç nokta için şirket içi veri kaybı', 'önleme ve uç nokta yönetimi.'],
    etiketler: ['C# ajan', 'FastAPI', 'PostgreSQL'],
    alt: '[m|USB denetimi · egress engeli · sıfır bulut]',
    gorsel: 'radar',
  },
  {
    ad: 'signum',
    baslik: 'Signum',
    aciklama: ['Ofis ağında tek akıllı kart üzerinden', 'merkezi e-imza ağ geçidi.'],
    etiketler: ['CAdES-BES', 'RBAC', 'denetim izi'],
    alt: '[m|PKCS#11 · oturum eşitleme · on-prem]',
    gorsel: 'imza',
  },
  {
    ad: 'ccp2',
    baslik: 'CCP2',
    aciklama: ['Call Center Platform — çağrı merkezi', 'platformunun ikinci nesli.'],
    etiketler: ['v2', 'çağrı merkezi', 'platform'],
    alt: '[m|CCP\'nin baştan yazılan yeni sürümü]',
    gorsel: 'cagri',
  },
];

// ── ATÖLYE (araclar.svg): küçük kartlar, 4 sütun ─────────────────────────────
// [ad, açıklama satırları, etiketler, ikon, genişlik(sütun)]
export const araclar = [
  ['haciz-pilot', ['Listeden toplu talep;', 'önce önizle, sonra gönder.'], ['Electron', 'CSV/XLSX'], 'pilot', 1],
  ['garanti-masraf', ['Makbuz → PDF → kayıt;', 'tutar tutmazsa durur.'], ['Node.js', 'PDF'], 'makbuz', 1],
  ['masraf-qnb', ['Excel listesinden evrak,', 'makbuz ve tutar kontrolü.'], ['Electron', 'Playwright'], 'liste', 1],
  ['esp32-lab', ['ESP32 ile gömülü sistem', 've IoT denemeleri.'], ['ESP32', 'IoT'], 'cip', 1],
  ['hungry-bugs-studio', ['3D yazıcıda basılan lambalar ve onları satan e-ticaret sitesi.', 'Next.js · Prisma · iyzico — aylık altyapı gideri 0 TL.'], ['Next.js', 'TypeScript', '3D baskı'], 'lamba', 2],
  ['yon-kurulum', ['Windows 11 sonrası', 'tek tıkla ofis kurulumu.'], ['PowerShell', 'winget'], 'kurulum', 1],
  ['profil-uretici', ['Bu profil: tek config,', 'animasyonlu SVG çıktısı.'], ['Node.js', 'SVG'], 'kod', 1],
];
