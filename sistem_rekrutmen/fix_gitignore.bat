@echo off
echo ========================================
echo Fixing .gitignore untuk node_modules
echo ========================================
echo.

echo [1/4] Memeriksa .gitignore...
if exist .gitignore (
    echo .gitignore ditemukan
) else (
    echo ERROR: .gitignore tidak ditemukan!
    pause
    exit /b 1
)

echo.
echo [2/4] Menghapus node_modules dari git tracking...
git rm -r --cached node_modules 2>nul
if %errorlevel% equ 0 (
    echo node_modules dihapus dari git tracking
) else (
    echo node_modules tidak ada di git tracking (ini normal)
)

echo.
echo [3/4] Memastikan .gitignore sudah benar...
findstr /C:"node_modules" .gitignore >nul
if %errorlevel% equ 0 (
    echo node_modules sudah ada di .gitignore
) else (
    echo ERROR: node_modules tidak ditemukan di .gitignore!
    pause
    exit /b 1
)

echo.
echo [4/4] Menghapus semua file yang di-ignore dari tracking...
git rm -r --cached . 2>nul
git add .gitignore
git add .

echo.
echo ========================================
echo Selesai!
echo ========================================
echo.
echo Sekarang jalankan:
echo   git status
echo.
echo Jika sudah yakin, commit dengan:
echo   git commit -m "Update .gitignore and remove node_modules from tracking"
echo.
pause

