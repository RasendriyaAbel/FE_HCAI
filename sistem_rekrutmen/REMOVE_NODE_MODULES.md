# Cara Menghapus node_modules dari Git

Jika `node_modules` sudah ter-track oleh Git dan muncul 9000+ changes, ikuti langkah berikut:

## Langkah 1: Pastikan .gitignore sudah benar

File `.gitignore` sudah diupdate dan sudah termasuk `node_modules/`. Pastikan baris berikut ada:

```
node_modules/
node_modules
```

## Langkah 2: Hapus node_modules dari Git Tracking

Jalankan perintah berikut di terminal:

```bash
# Hapus node_modules dari git tracking (tapi tetap di local)
git rm -r --cached node_modules

# Atau jika ada di subdirectory
git rm -r --cached "**/node_modules"
```

## Langkah 3: Commit perubahan

```bash
git add .gitignore
git commit -m "Update .gitignore to exclude node_modules"
```

## Langkah 4: Push ke GitHub

```bash
git push origin main
# atau
git push origin master
```

## Alternatif: Jika masih banyak file yang ter-track

Jika masih ada ribuan file yang ter-track, gunakan perintah ini:

```bash
# Hapus semua file yang di-ignore dari git tracking
git rm -r --cached .
git add .
git commit -m "Remove ignored files from git tracking"
git push
```

## Catatan Penting

- Perintah `git rm -r --cached` hanya menghapus dari git tracking, **tidak menghapus file di local**
- File `node_modules` akan tetap ada di komputer Anda
- Setelah di-commit, file-file tersebut tidak akan di-push ke GitHub
- Orang lain yang clone repository harus menjalankan `npm install` untuk mendapatkan `node_modules`

