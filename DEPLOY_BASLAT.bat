@echo off
echo ========================================
echo BağKent A.Ş. - GitHub Deploy Başlatıcı
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/5] Git repository başlatılıyor...
call git init

echo [2/5] Dosyalar ekleniyor...
call git add .

echo [3/5] Commit yapılıyor...
call git commit -m "İlk commit - BağKent A.Ş. Web Sitesi"

echo [4/5] Main branch ayarlanıyor...
call git branch -M main

echo [5/5] GitHub'a bağlanıyor...
echo.
echo NOT: Repository adınızı girin (örnek: bagkent-website)
set /p REPO_NAME="Repository adı: "

call git remote add origin https://github.com/emrahguler635/%REPO_NAME%.git

echo.
echo ========================================
echo GitHub'a push yapılıyor...
echo Şifre istenirse: Ahmet528.
echo ========================================
echo.

call git push -u origin main

echo.
echo ========================================
echo Tamamlandı!
echo.
echo Şimdi yapmanız gerekenler:
echo 1. GitHub'da repository'nize gidin
echo 2. Settings -^> Pages -^> Source: "GitHub Actions"
echo 3. Actions sekmesinden deploy'u başlatın
echo ========================================
pause


