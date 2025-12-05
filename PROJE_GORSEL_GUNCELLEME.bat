@echo off
chcp 65001 >nul
cls
echo ========================================
echo Proje Görselleri Güncelleme
echo ========================================
echo.
echo Eklenecek görseller:
echo 1. kultur-tesis.jpg - Kültür ve Sosyal Tesis Projeleri
echo 2. saglik-tesis.jpg - Sağlık ve Eğitim Tesisleri
echo 3. enerji-verimliligi.jpg - Enerji Verimliliği ve Akıllı Şehir
echo.
echo Lütfen bu görselleri public klasörüne ekleyin:
echo %~dp0public\
echo.
echo Dosya adları:
echo - kultur-tesis.jpg
echo - saglik-tesis.jpg
echo - enerji-verimliligi.jpg
echo.
pause

REM Proje klasörüne git
cd /d "%~dp0"

echo.
echo Görseller kontrol ediliyor...

if exist "public\kultur-tesis.jpg" (
    echo [OK] kultur-tesis.jpg bulundu
) else (
    echo [EKSIK] kultur-tesis.jpg bulunamadı - Lütfen ekleyin
)

if exist "public\saglik-tesis.jpg" (
    echo [OK] saglik-tesis.jpg bulundu
) else (
    echo [EKSIK] saglik-tesis.jpg bulunamadı - Lütfen ekleyin
)

if exist "public\enerji-verimliligi.jpg" (
    echo [OK] enerji-verimliligi.jpg bulundu
) else (
    echo [EKSIK] enerji-verimliligi.jpg bulunamadı - Lütfen ekleyin
)

echo.
echo Tüm görseller eklendiyse, şimdi GitHub'a gönderilecek...
pause

echo.
echo [1/3] Değişiklikler ekleniyor...
call git add -A

echo [2/3] Commit yapılıyor...
call git commit -m "Proje görselleri güncellendi - Bağcılar Belediyesi projeleri"

echo [3/3] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo ========================================
pause

