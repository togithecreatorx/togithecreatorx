# Profil görsellerini yeniden üretmek

Bütün metin `profil.config.mjs` içinde. Değiştir, sonra:

```powershell
cd tools
npm install
node build.mjs              # hepsi
node build.mjs banner.svg   # sadece biri
```

Çıktı: `../assets/*.svg`. Commit + push → profil güncellenir.

## Görseller

| Dosya | Ne |
|---|---|
| `banner.svg` | TOGI marka başlığı: monogram, wordmark, slogan |
| `hero.svg` | tmux terminali: kimlik, projeler, stack, metrik, yol haritası + derleme monitörü + lamba |
| `projeler.svg` | Öne çıkan 4 proje (büyük kartlar) |
| `araclar.svg` | Atölye: küçük araçlar ve yan projeler |
| `istanbul.svg` | Kapanış: mor gece İstanbul silüeti |
| `rozet-*.svg` | Başlık altındaki e-posta / konum / atölye hapları |

## Marka

- Palet (`lib/palet.mjs`): elektrik moru `#792BFF`, logo moru `#6301FB`, neredeyse siyah `#08080D`, platin `#F7F7FA`.
- Monogram (`lib/logo.mjs`): marka kitindeki PNG master'dan vektörleştirildi; beyaz T, mor T, yörünge ve yıldız ayrı yollar olduğu için ayrı ayrı canlandırılabilir.
- `../assets/brand/`: avatar (`togi-mark-512.png`) ve repo sosyal önizlemesi (`togi-github-social-preview-1280x640.png`).

## Notlar

- Fontlar: JetBrains Mono (terminal metni) ve Inter (başlıklar), ikisi de OFL 1.1 (`font/`). Her SVG'ye yalnızca kullandığı karakterler gömülür; Inter her ağırlık için ayrı örneklenir.
- İşaretleme: `[sınıf|metin]` → `t` metin, `d` soluk, `m` yorum, `co` açık mor, `cr` pembe, `tq` camgöbeği, `sf` altın, `li` lila, `sg` nane, `am` amber; `.b` kalın, `.i` italik. Örnek: `[co.b|togi][m|@]creator`.
- Satırlar kesilmez, taşar. Uzun metin girersen ilgili SVG'yi tarayıcıda açıp kontrol et.
- `prefers-reduced-motion` açık olan ziyaretçide animasyonlar durur, en dolu kare görünür.
- Terminal döngüsü 30 sn: sol panel 5 sekme × 6 sn; derleme monitörü ve lamba kendi zaman çizelgelerinde.
