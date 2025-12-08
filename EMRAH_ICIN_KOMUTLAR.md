# 🚀 Emrah için Hazır Komutlar

GitHub kullanıcı adınız: **emrahguler635**

## ⚠️ ÖNEMLİ: Önce GitHub'da Repository Oluşturun

1. Tarayıcınızda [github.com](https://github.com) açın
2. Sağ üstte **"+"** → **"New repository"** tıklayın
3. **Repository name:** `bagkent-website` (veya istediğiniz isim)
4. **Public** seçin (ücretsiz)
5. **"Create repository"** butonuna tıklayın
6. Repository oluşturulduktan sonra aşağıdaki komutları çalıştırın

---

## 📝 Adım 1: Git Repository Başlatma

PowerShell veya Command Prompt'u açın:

```powershell
cd "C:\Users\11273907392\Downloads\Web_Sitesi_Tasar_m___ste_i\bagkent_website\nextjs_space"

git init
git add .
git commit -m "İlk commit - BağKent A.Ş. Web Sitesi"
git branch -M main
```

---

## 📝 Adım 2: GitHub'a Bağlama

**ÖNEMLİ:** Repository adını `bagkent-website` yerine GitHub'da oluşturduğunuz gerçek repository adıyla değiştirin!

```powershell
git remote add origin https://github.com/emrahguler635/bagkent-website.git
git push -u origin main
```

**Şifre girerken:** `Ahmet528.` yazın (tarayıcıda GitHub giriş yapmanız istenebilir)

---

## 📝 Adım 3: GitHub Pages'i Aktifleştirin

1. GitHub'da repository sayfanıza gidin: `https://github.com/emrahguler635/bagkent-website`
2. **Settings** sekmesine tıklayın
3. Sol menüden **Pages** seçin
4. **Source** bölümünde: **"GitHub Actions"** seçin
5. Kaydedin

---

## 📝 Adım 4: İlk Deploy'u Başlatın

1. Repository sayfasında **Actions** sekmesine tıklayın
2. **"Deploy to GitHub Pages"** workflow'unu göreceksiniz
3. Sağ tarafta **"Run workflow"** → **"Run workflow"** tıklayın
4. 5-10 dakika bekleyin

---

## 🌐 Site URL'iniz

Deploy tamamlandıktan sonra site şu adreste olacak:
`https://emrahguler635.github.io/bagkent-website/`

(Repository adınız farklıysa, URL'deki `bagkent-website` kısmı değişecektir)

---

## 🔄 Sonraki Güncellemeler

Kod değişikliği yaptıktan sonra:

```powershell
cd "C:\Users\11273907392\Downloads\Web_Sitesi_Tasar_m___ste_i\bagkent_website\nextjs_space"

git add .
git commit -m "Değişiklik açıklaması"
git push
```

---

## ⚠️ Güvenlik Notu

- Şifreniz hiçbir dosyaya kaydedilmedi
- GitHub'a push yaparken şifre istenirse, `Ahmet528.` girin
- Veya GitHub'da Personal Access Token kullanabilirsiniz (daha güvenli)


