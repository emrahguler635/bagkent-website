@echo off
echo ========================================
echo Yeni BağKent Logosu Ekleme
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo Logo dosyasını public klasörüne eklemek için:
echo 1. Logo dosyanızı bagkent_website\nextjs_space\public\ klasörüne kopyalayın
echo 2. Dosya adını bagkent-logo.png yapın
echo 3. Mevcut dosyanın üzerine yazın
echo.
echo Dosyayı ekledikten sonra bu batch dosyasını tekrar çalıştırın.
echo.
pause

echo.
echo [1/3] Logo dosyası kontrol ediliyor...
if exist "public\bagkent-logo.png" (
    echo Logo dosyası bulundu!
    echo.
    echo [2/3] Değişiklikler ekleniyor...
    call git add public/bagkent-logo.png
    
    echo [3/3] Commit yapılıyor...
    call git commit -m "Yeni BağKent logosu eklendi"
    
    echo.
    echo GitHub'a gönderiliyor...
    call git push
    
    echo.
    echo ========================================
    echo Tamamlandı!
    echo GitHub Actions otomatik deploy başlatacak...
    echo ========================================
) else (
    echo.
    echo HATA: Logo dosyası bulunamadı!
    echo.
    echo Lütfen logo dosyasını şu klasöre kopyalayın:
    echo %~dp0public\bagkent-logo.png
    echo.
    echo Sonra bu batch dosyasını tekrar çalıştırın.
)

pause

