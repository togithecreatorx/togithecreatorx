# Profil görsellerini yeniden üretmek

Bütün metin `profil.config.mjs` içinde. Değiştir, sonra:

```powershell
cd tools
npm install
node build.mjs            # hepsi
node build.mjs hero.svg   # sadece biri
```

Çıktı: `../assets/*.svg`. Commit + push → profil güncellenir.

## Notlar

- Font: JetBrains Mono (OFL 1.1, `font/OFL.txt`). Her SVG'ye yalnızca kullandığı karakterler gömülür (~4–6 KB). Font yüklenmezse sistem monospace fontuna düşer.
- İşaretleme: `[sınıf|metin]` → `t` metin, `d` soluk, `m` yorum, `co` kobalt, `cr` mercan, `tq` turkuaz, `sf` safran, `li` lila, `sg` adaçayı, `am` amber; `.b` kalın, `.i` italik. Örnek: `[sf.b|togi][m|@]buro`.
- Satırlar kesilmez, taşar. Uzun metin girersen ilgili SVG'yi tarayıcıda açıp kontrol et.
- `prefers-reduced-motion` açık olan ziyaretçide animasyonlar durur, en dolu kare görünür.
- Animasyon döngüsü 30 sn: sol panel 6 sekme × 5 sn; iş monitörü ve lamba kendi zaman çizelgelerinde.
