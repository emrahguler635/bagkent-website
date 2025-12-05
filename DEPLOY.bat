@echo off
echo ========================================
echo GitHub Pages Deploy
echo ========================================
echo.

REM Proje klasörüne git
cd /d "%~dp0"

echo [1/4] Tüm değişiklikler kontrol ediliyor...
call git status

echo.
echo [2/4] Tüm değişiklikler ekleniyor...
call git add -A

echo.
echo [3/4] Commit yapılıyor...
set /p commit_msg="Commit mesajı girin (Enter'a basarsanız otomatik mesaj kullanılır): "
if "%commit_msg%"=="" (
    call git commit -m "Site güncellemesi - %date% %time%"
) else (
    call git commit -m "%commit_msg%"
)

echo.
echo [4/4] GitHub'a gönderiliyor...
call git push

echo.
echo ========================================
echo Tamamlandı!
echo.
echo GitHub Actions otomatik olarak deploy edecek.
echo Deploy'un tamamlanması 2-3 dakika sürebilir.
echo.
echo Kontrol etmek için:
echo https://github.com/emrahguler635/bagkent-website/actions
echo ========================================
pause

