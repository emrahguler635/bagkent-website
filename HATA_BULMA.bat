@echo off
chcp 65001 >nul
echo ========================================
echo   GitHub Actions Build Hatası Kontrolü
echo ========================================
echo.
echo Bu dosya GitHub Actions build hatasını bulmanıza yardımcı olur.
echo.
echo ADIMLAR:
echo 1. GitHub repository'nizi açın:
echo    https://github.com/emrahguler635/bagkent-website
echo.
echo 2. 'Actions' sekmesine tıklayın
echo.
echo 3. En son başarısız build'e tıklayın (kırmızı X işaretli)
echo.
echo 4. 'Build with Next.js' adımına tıklayın
echo.
echo 5. Hata mesajını okuyun ve aşağıdaki bilgileri not edin:
echo    - Hangi dosyada hata var?
echo    - Hata mesajı ne diyor?
echo    - Satır numarası nedir?
echo.
echo ========================================
echo   YAYGIN HATALAR ve ÇÖZÜMLERİ:
echo ========================================
echo.
echo 1. "Module not found" hatası:
echo    - Eksik import var
echo    - Yanlış dosya yolu
echo    - Package eksik
echo.
echo 2. "Syntax error" hatası:
echo    - Eksik parantez, tırnak işareti
echo    - TypeScript syntax hatası
echo.
echo 3. "Cannot find name" hatası:
echo    - Eksik import
echo    - Type tanımı eksik
echo.
echo 4. "Build failed" hatası:
echo    - Memory hatası olabilir
echo    - Timeout olabilir
echo.
echo ========================================
pause

