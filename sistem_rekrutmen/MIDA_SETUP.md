# Mida A/B Testing Setup

Script Mida untuk A/B Testing sudah diintegrasikan ke dalam aplikasi.

## Status

✅ **Script sudah ditambahkan di `index.html`**  
✅ **Project Key:** `34MV9Wnqd0wl6BXrGNLpJw`  
✅ **Location:** Di dalam tag `<head>` untuk performa optimal (speed & no flicker)

## Lokasi Script

**File:** `index.html`

```html
<!-- Mida A/B Testing Script (Place in <HEAD> for speed & no flicker) -->
<script type="text/javascript" async src="https://cdn.mida.so/js/optimize.js?key=34MV9Wnqd0wl6BXrGNLpJw"></script>
```

## Mengapa di `<HEAD>`?

Script ditempatkan di `<head>` karena:
- ✅ **Speed:** Load lebih cepat sebelum konten render
- ✅ **No Flicker:** Variasi A/B test diterapkan sebelum halaman terlihat
- ✅ **Best Practice:** Rekomendasi dari Mida untuk hasil optimal

## Verifikasi

Setelah aplikasi running:

1. Buka browser DevTools (F12)
2. Check **Network tab**:
   - Cari request ke `cdn.mida.so/js/optimize.js`
   - Status harus **200 OK**
3. Check **Console**:
   - Tidak ada error terkait Mida
4. Verifikasi di **Mida Dashboard**:
   - Masukkan URL aplikasi
   - Click "Verify Installation"
   - Status harus "Connected"

## Testing

### Development
```bash
npm run dev
```
URL: `http://localhost:5173`

### Production
Setelah deploy, masukkan URL production di Mida Dashboard.

## Fitur A/B Testing

Dengan script ini, Anda bisa:
- ✅ Setup A/B test experiments di Mida Dashboard
- ✅ Test berbagai variasi UI/UX
- ✅ Track conversion metrics
- ✅ Analyze results dan implement winning variation

## Komponen Alternatif

Jika di kemudian hari ingin menggunakan komponen React (bukan script tag), file tersedia di:
- `src/components/Mida/MidaScript.jsx`

Tapi untuk performa optimal, tetap gunakan script tag di `index.html`.

## Support

Untuk setup A/B test experiment:
1. Login ke Mida Dashboard
2. Buat experiment baru
3. Tentukan variasi yang ingin di-test
4. Set metrics dan goals
5. Publish experiment

## Referensi

- [Mida Documentation](https://docs.mida.so)
- [A/B Testing Best Practices](https://docs.mida.so/guides/ab-testing)

