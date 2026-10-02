<div align="center">

<img src="./assets/hero.svg" width="100%" alt="togi@buro — tmux oturumu: neofetch kimlik kartı, UYAP dosya kartı, git log, stack, kurallar ve metrikler; yanında BüroPilot iş monitörü ve katman katman basılıp yanan 3D baskı lamba." />

<br /><br />

<a href="mailto:togiturker@gmail.com"><img src="./assets/rozet-eposta.svg" height="34" alt="E-posta: togiturker@gmail.com" /></a>&nbsp;
<img src="./assets/rozet-konum.svg" height="34" alt="Konum: İstanbul, TR" />&nbsp;
<img src="./assets/rozet-atolye.svg" height="34" alt="Hungry Bugs Studio — 3D baskı lambalar" />

</div>

<br />

```bash
togi@buro ❯ cat hakkimda.md
```

> Hukuk bürosunun tekrar eden işlerini — UYAP işlemleri, masraf ödemeleri, mutabakat, banka portföy raporları — **çalışan masaüstü otomasyonlarına** çeviriyorum.
> Electron ve Node.js ile yazıyor; Excel, VBA ve PowerShell'i sonuna kadar kullanıyorum. Canlıya giden her şey önce doğrulanır.
> Bir de **Hungry Bugs Studio** var: 3D yazıcıda bastığım lambalar.

<br />

```bash
togi@buro ❯ buropilot hat --ciz
```

<img src="./assets/hat.svg" width="100%" alt="Otomasyon hattı: UYAP, Leganova, banka portalları ve Excel/XML girdileri çekirdekte (oturum havuzu, iş kuyruğu, kalkan, mutabakat, çift kontrol, append-only log) işlenir; UYAP işlemleri, Leganova kayıtları, Excel raporları ve ödeme listeleri çıkar. Kalkan mükerrer paketi durdurur." />

<br />

```bash
togi@buro ❯ ls ~/projeler --kart
```

<img src="./assets/projeler.svg" width="100%" alt="Projeler: takip-acilis, buropilot, mutabakat-motoru, yts-asistan, vintage-cli, odeme-listesi, yon-kurulum, hungry-bugs-studio — her biri durumu ve küçük bir canlı görseliyle." />

<br />

```bash
togi@buro ❯ cat kurallar.yaml
```

```yaml
# Canlı sisteme dokunan her otomasyonda geçerli
kurallar:
  cift_kontrol:   "Bir partiyi yükleyen kişi onu onaylayamaz."
  yazma_kapali:   "Canlıya yazma bayrağı varsayılan olarak KAPALI."
  kisisel_veri:   "Gerçek TCKN, ad, adres, tutar ve dosya no; repoya, commit'e, rapora girmez."
  canli_para:     "Gerçek para harcayan komut yalnızca açık talimatla çalışır."
  yasam_dongusu:  "İşin sahibi backend: running → stopping → close → stopped."
  loglar:         "Append-only; geçmiş yeniden yazılmaz."
  eslestirme:     "Hibrit eşleştirmenin her katmanında tarih zorunlu."
  kimlik_bilgisi: "Kullanıcı girer; global .env dosyasına konmaz."
  teslim:         "Diff görülmeden hiçbir ajan raporu kabul edilmez."
dogrulama: [node --check, self-test, UAT, Excel readback, log marker, yasak kalıp taraması]
```

<br />

<img src="./assets/istanbul.svg" width="100%" alt="Gece İstanbul silüeti: Galata Kulesi, camiler, Boğaz köprüsü, Kız Kulesi ve Boğaz'dan geçen vapur; terminalde 'exit' satırı." />

<div align="center">
<sub>© 2026 Tolgahan Türker · İstanbul · <i>İznik Gecesi</i> teması · görseller <code>tools/</code> içindeki üreticiyle çizildi</sub>
</div>
