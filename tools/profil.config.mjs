// Profilin bütün metni burada. Değiştir → `node build.mjs` → assets/*.svg yeniden üretilir.
// İşaretleme: [sınıf|metin]  sınıflar: t d m f co cr tq sf li sg am dk  + b (kalın) i (italik)
// Not: bir satıra sığmayan metin kesilmez, taşar — uzunlukları build çıktısındaki uyarılardan kontrol et.

export const profil = {
  github: 'togiturker',              // GitHub kullanıcı adın (profil reposu: <ad>/<ad>)
  ad: 'Tolgahan Türker',
  takma: 'Togi',
  eposta: 'togiturker@gmail.com',
  kullanici: 'togi',                 // terminal istemi: togi@buro
  host: 'buro',
  konum: 'İstanbul, TR',
  koordinat: '41.01°K 28.97°D',
  dal: 'takip',                      // durum çubuğundaki git dalı
  atolye: 'Hungry Bugs Studio',
};

// ── HERO: sol panel sekmeleri (tmux pencereleri) ─────────────────────────────
export const sekmeler = [
  {
    ad: 'kimlik',
    komut: 'neofetch --kimlik',
    tur: 'neofetch',
    satirlar: [
      '[sf.b|togi][m|@][t.b|buro]',
      '[f|─────────────────]',
      '[tq|Ad         ][t|Tolgahan Türker ][d|(Togi)]',
      '[tq|Rol        ][t|legal-tech otomasyon geliştiricisi]',
      '[tq|Konum      ][t|İstanbul, TR]',
      '[tq|Çekirdek   ][t|Node.js · Electron]',
      '[tq|Kabuk      ][t|PowerShell · VBA]',
      '[tq|Hedefler   ][t|UYAP · Leganova · banka portalları]',
      '[tq|Şu an      ][t|BüroPilot · Takip Açılış Modülü]',
      '[tq|Atölye     ][sf|Hungry Bugs Studio][d| · 3D lamba]',
    ],
  },
  {
    ad: 'dosya',
    komut: 'uyap sorgula --taraf "Tolgahan Türker"',
    tur: 'dosya',
    baslik: '[co.b|UYAP][m| · ][t|DOSYA BİLGİSİ]',
    durum: 'DERDEST',
    alanlar: [
      ['Dosya No', '[sf.b|2026/TOGI-001]'],
      ['Birim', '[t|İstanbul Otomasyon Dairesi]'],
      ['Alacaklı', '[sg|Verimlilik]'],
      ['Borçlu', '[cr|Manuel İş][d|  ·  tekrar eden tıklamalar]'],
      ['Takip Yolu', '[t|ilamsız][m|  →  ][tq|tam otomatik]'],
      ['Son İşlem', '[t|masraf ödendi ][sg|✓][t|  mutabakat ][sg|✓][t|  rapor ][sg|✓]'],
    ],
    notlar: [
      '[m.i|# ödeme emri tebliğ edildi — borçlu otomasyona geçmeli.]',
      '[m.i|# itiraz süresi 7 gün. sonrası: cron devreye girer.]',
    ],
  },
  {
    ad: 'projeler',
    komut: 'git log --oneline -n 7',
    tur: 'gitlog',
    satirlar: [
      ['f11ed01', 'takip-acilis', 'UYAP icra takibi · XML → 5 uç', 'gel'],
      ['ba5e1c0', 'buropilot', '4 uygulama → tek platform', 'gel'],
      ['5e771ed', 'mutabakat-motoru', '8 durum · tarih şart · 24/24', 'test'],
      ['da7a5e7', 'yts-asistan', 'rapor · ödeme listesi · SMS', 'kul'],
      ['7a111ed', 'vintage-cli', 'tahsilat vintage analizi', 'kul'],
      ['1157ed0', 'odeme-listesi', 'hesap hareketi → icra listesi', 'gel'],
      ['b065fed', 'hungry-bugs-studio', '3D baskı lamba · e-ticaret', 'gel'],
    ],
    not: '[m.i|# + makbuz-indirici · kalkan · icra-veri-hattı · yon-kurulum]',
  },
  {
    ad: 'stack',
    komut: 'cat stack.lock',
    tur: 'stack',
    gruplar: [
      ['dil', ['JavaScript', 'Node.js', 'PowerShell', 'VBA']],
      ['masaüstü', ['Electron', 'Node.js backend', 'append-only log']],
      ['otomasyon', ['UYAP oturumu', 'HAR analizi', 'Leganova API', 'imza.co']],
      ['veri', ['Excel / xlsx', 'PostgreSQL', 'Redis kuyruğu', 'XML']],
      ['doğrulama', ['node --check', 'self-test', 'UAT', 'Excel readback']],
      ['araç', ['Git · PR', 'VS Code · Remote SSH', 'Claude Code', 'winget']],
    ],
    not: '[m.i|# sürüm kilidi: çalışan sisteme rota dışı refactor yok.]',
  },
  {
    ad: 'kurallar',
    komut: 'cat kurallar.yaml',
    tur: 'yaml',
    kok: 'kurallar',
    satirlar: [
      ['cift_kontrol', 'yükleyen, kendi işini onaylayamaz'],
      ['yazma_kapali', 'canlıya yazma bayrağı varsayılan KAPALI'],
      ['kisisel_veri', 'gerçek TCKN, ad, tutar repoya girmez'],
      ['canli_para', 'para harcayan komut = açık talimat'],
      ['yasam_dongusu', 'running → stopping → close → stopped'],
      ['loglar', 'append-only; geçmiş yeniden yazılmaz'],
      ['eslestirme', 'tarih, her eşleştirme katmanında şart'],
      ['teslim', 'diff görülmeden rapor kabul edilmez'],
    ],
  },
  {
    ad: 'metrik',
    komut: 'buropilot metrik --ozet',
    tur: 'metrik',
    kartlar: [
      ['4→1', 'uygulama tek', 'platformda'],
      ['5', 'UYAP ucu', 'tek akışta'],
      ['8', 'durumlu', 'mutabakat'],
      ['24/24', 'mutabakat', 'testi yeşil'],
      ['3', 'katmanlı', 'doğrulama'],
      ['6/8', 'açık tek', 'sprintte kapandı'],
    ],
    not: '[m.i|# hepsi gerçek sayı; uydurma metrik yok.]',
  },
];

// Durum etiketleri (proje kartları ve git log)
export const durumlar = {
  kul: { etiket: 'kullanımda', renk: 'sg' },
  gel: { etiket: 'geliştirmede', renk: 'sf' },
  test: { etiket: 'test ✓', renk: 'tq' },
  haz: { etiket: 'hazır', renk: 'li' },
  tas: { etiket: 'tasarım', renk: 'li' },
};

// ── HERO sağ üst: iş monitörü ────────────────────────────────────────────────
// [ad, kuyrukta-başla, çalış-başla, bitiş]  (30 sn döngü içinde saniye)
export const isler = [
  ['uyap.masraf-ode', 0, 0.5, 9],
  ['leganova.esitle', 0, 2.5, 8.5],
  ['mutabakat.calistir', 0, 7, 19],
  ['kesinlesme.sorgu', 0, 12.5, 22],
  ['takip.ac --kuru', 0, 18.5, 27],
];

// ── HAT (otomasyon hattı) ────────────────────────────────────────────────────
export const hat = {
  kaynaklar: [
    ['UYAP', 'e-icra · evrak · harç'],
    ['Leganova', 'dava ve masraf kayıtları'],
    ['Banka portalları', 'portföy raporları'],
    ['Excel / XML', 'talep ve liste girdileri'],
  ],
  cekirdek: [
    ['oturum havuzu', 'tek oturum, çok iş'],
    ['iş kuyruğu', 'yaşam döngüsü'],
    ['kalkan', 'mükerrer engeli'],
    ['mutabakat', '8 durumlu eşleşme'],
    ['çift kontrol', 'yükleyen onaylamaz'],
    ['append-only log', 'geçmiş silinmez'],
  ],
  ciktilar: [
    ['UYAP işlemleri', 'masraf · takip açılış'],
    ['Leganova kayıtları', 'otomatik giriş'],
    ['Excel raporları', 'sabah · aylık · vintage'],
    ['Ödeme listeleri', 'icra ödemesi · SMS'],
  ],
};

// ── PROJE KARTLARI ───────────────────────────────────────────────────────────
// [ad, açıklama, etiketler, durum, mini-görsel]
export const projeler = [
  ['takip-acilis', 'XML talebinden UYAP\'ta icra takibi açar', ['UYAP', 'Node.js', 'Redis'], 'gel', 'takip'],
  ['buropilot', '4 aracı tek Electron platformunda toplar', ['Electron', 'Node.js', 'Leganova'], 'gel', 'birlesme'],
  ['mutabakat-motoru', 'UYAP ↔ Leganova masraf mutabakatı', ['Node.js', 'test 24/24'], 'test', 'durumlar'],
  ['yts-asistan', 'raporlardan ödeme listesi, özet ve SMS', ['masaüstü', 'Excel'], 'kul', 'cubuk'],
  ['vintage-cli', 'tahsilat vintage analizi, 5 segment', ['Node.js', 'CLI'], 'kul', 'vintage'],
  ['odeme-listesi', 'hesap hareketlerinden icra ödeme listesi', ['Excel', 'mükerrer kontrol'], 'gel', 'liste'],
  ['yon-kurulum', 'Win 11 sonrası tek tıkla ofis kurulumu', ['PowerShell', 'winget', 'JSON'], 'haz', 'kurulum'],
  ['hungry-bugs-studio', '3D baskı lambalar için e-ticaret sitesi', ['web', 'e-ticaret'], 'gel', 'lamba'],
];
