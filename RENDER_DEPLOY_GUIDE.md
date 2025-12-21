# Render.com'a Deploy Etme Rehberi

Bu rehber seni adım adım Render.com'a deploy etmeni sağlayacak. Tamamen ücretsiz!

---

## ADIM 1: GitHub Hesabı Oluştur (Yoksa)

1. https://github.com adresine git
2. "Sign up" butonuna tıkla
3. Email, şifre ve kullanıcı adı gir
4. Hesabı doğrula

---

## ADIM 2: GitHub'da Yeni Repo Oluştur

1. GitHub'a giriş yap
2. Sağ üst köşede "+" butonuna tıkla → "New repository"
3. Repository name: `marzban-proxy` yaz
4. "Public" seç
5. "Create repository" butonuna tıkla
6. **DURMA!** Sonraki sayfada gösterilen komutları KOPYALAMA, bir sonraki adıma geç

---

## ADIM 3: Replit'ten Kodu İndir

1. Replit projesinde sol tarafta dosyaları gör
2. En üstte 3 nokta menüsüne tıkla → "Download as zip"
3. ZIP dosyasını bilgisayarına kaydet
4. ZIP'i bir klasöre çıkart

---

## ADIM 4: Kodu GitHub'a Yükle

**Kolay Yol (Tarayıcıdan):**
1. GitHub'daki yeni repo sayfasına git
2. "uploading an existing file" linkine tıkla
3. ZIP'ten çıkarttığın TÜM dosyaları sürükle-bırak
4. "Commit changes" butonuna tıkla

---

## ADIM 5: Render.com Hesabı Oluştur

1. https://render.com adresine git
2. "Get Started" butonuna tıkla
3. "GitHub" ile giriş yap (en kolay yol)
4. GitHub hesabını bağla

---

## ADIM 6: Render'da Yeni Web Service Oluştur

1. Render Dashboard'a git: https://dashboard.render.com
2. "New +" butonuna tıkla → "Web Service"
3. "Build and deploy from a Git repository" seç
4. GitHub repo'nu bul ve seç: `marzban-proxy`
5. Ayarları şöyle yap:
   - **Name**: `marzban-proxy`
   - **Region**: Frankfurt (EU Central) veya en yakın
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (ücretsiz)

6. "Create Web Service" butonuna tıkla

---

## ADIM 7: Environment Variables Ekle

1. Render'da service sayfasına git
2. Sol menüden "Environment" seç
3. "Add Environment Variable" tıkla:
   - **Key**: `MARZBAN_BASE_URL`
   - **Value**: `https://mary.marylytm.uk`
4. "Save Changes" tıkla

---

## ADIM 8: Deploy'u Bekle

1. Render otomatik olarak deploy edecek
2. "Deploy" sekmesinden ilerlemeyi takip et
3. 2-5 dakika içinde tamamlanacak
4. "Live" yazısını gördüğünde hazır!

---

## ADIM 9: Yeni URL'yi Al

1. Render dashboard'da servis sayfasına git
2. Üstte URL'yi gör: `https://marzban-proxy-xxxx.onrender.com`
3. Bu URL'yi kopyala

---

## ADIM 10: UptimeRobot'u Güncelle

1. https://uptimerobot.com adresine git
2. Eski monitor'u sil veya düzenle
3. Yeni URL'yi ekle: `https://marzban-proxy-xxxx.onrender.com`
4. 5 dakika interval ayarla

---

## ADIM 11: Marzban Panel'ini Güncelle

Eski URL:
```
https://merhaba-nasilsin-chatgptplusucin.replit.app/api/exec?url=https://mary.marylytm.uk/sub/{USER_TOKEN}?format={FORMAT}
```

Yeni URL (xxxx kısmını kendi URL'inle değiştir):
```
https://marzban-proxy-xxxx.onrender.com/api/exec?url=https://mary.marylytm.uk/sub/{USER_TOKEN}?format={FORMAT}
```

---

## TAMAMLANDI! 🎉

Artık Render.com'da tamamen ücretsiz çalışıyorsun!
- UptimeRobot 5 dakikada bir ping atacak
- Uygulama 24/7 aktif kalacak
- Marzban kullanıcıların otomatik güncelleme alacak

---

## Sorun Giderme

**Deploy başarısız olursa:**
- "Logs" sekmesine bak
- Hata mesajını bana gönder

**URL çalışmıyorsa:**
- 5 dakika bekle, ilk deploy biraz yavaş olabilir
- Render dashboard'da "Live" yazıyor mu kontrol et
