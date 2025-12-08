# Maze User Testing Setup

Script Maze untuk User Testing sudah diintegrasikan ke dalam aplikasi.

## Status

✅ **Script sudah ditambahkan di `index.html`**  
✅ **API Key:** `accbd2a5-715c-4ec3-b470-f278943ff4b9`  
✅ **Location:** Di dalam tag `<head>` setelah Mida script

## Lokasi Script

**File:** `index.html`

Script Maze Universal Snippet sudah ditambahkan dengan semua fungsionalitas:
- Session storage tracking
- Nonce support untuk security
- Async loading
- Automatic script injection

## API Key

**Maze API Key:** `accbd2a5-715c-4ec3-b470-f278943ff4b9`

Script menggunakan API key ini untuk mengidentifikasi project di Maze dashboard.

## Fitur

Dengan script ini, Anda bisa:
- ✅ Track user sessions
- ✅ Record user interactions
- ✅ Collect user feedback
- ✅ Analyze user behavior
- ✅ Create user testing sessions

## Verifikasi

Setelah aplikasi running:

1. Buka browser DevTools (F12)
2. Check **Network tab**:
   - Cari request ke `snippet.maze.co/maze-universal-loader.js`
   - Status harus **200 OK**
3. Check **Console**:
   - Tidak ada error terkait Maze
   - Check `window.mazeUniversalSnippetApiKey` (harus ada)
4. Check **Session Storage**:
   - Key: `maze-us` (berisi timestamp)
5. Verifikasi di **Maze Dashboard**:
   - Login ke Maze dashboard
   - Check apakah aplikasi terdeteksi

## Testing

### Development
```bash
npm run dev
```
URL: `http://localhost:5173`

### Production
Setelah deploy, pastikan URL production juga ter-track di Maze dashboard.

## Komponen Alternatif

Jika di kemudian hari ingin menggunakan komponen React, file tersedia di:
- `src/components/Maze/MazeScript.jsx`

Tapi untuk performa optimal, script langsung di `index.html` lebih disarankan.

## Script Details

Script yang ditambahkan:
- Menggunakan IIFE (Immediately Invoked Function Expression)
- Auto-detect current script untuk nonce support
- Session storage untuk tracking user sessions
- Async loading untuk performa optimal

## Integration dengan Mida

Script Maze dan Mida bisa bekerja bersamaan:
- **Mida**: Untuk A/B Testing
- **Maze**: Untuk User Testing & Session Recording

Kedua script sudah terintegrasi dan tidak akan saling mengganggu.

## Support

Untuk setup user testing:
1. Login ke Maze Dashboard
2. Buat test session baru
3. Share URL dengan testers
4. Analyze results di dashboard

## Referensi

- [Maze Documentation](https://maze.co/docs)
- [Maze Universal Snippet](https://maze.co/docs/universal-snippet)

