# Auto-Fill Feature untuk Testing/Prototype

Fitur auto-fill telah ditambahkan ke semua form mandatory untuk memudahkan testing dan prototyping, seperti di Figma.

## Cara Kerja

Ketika user **klik atau focus** pada input/textarea yang **kosong**, field tersebut akan **otomatis terisi** dengan data yang valid.

## Form yang Sudah Di-Update

### ✅ 1. Login (`/login`)
- **Email:** `john.doe@example.com`
- **Password:** `Test1234!`

### ✅ 2. Register (`/register`)
- **Full Name:** `John Doe`
- **Email:** `john.doe@example.com`
- **Phone:** `+62 812-3456-7890`
- **Password:** `Test1234!`
- **Confirm Password:** `Test1234!`

### ✅ 3. Apply Job (`/apply-job`)
- **Full Name:** `John Doe`
- **Email:** `john.doe@example.com`
- **Phone:** `+62 812-3456-7890`
- **Address:** `Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220`
- **Cover Letter:** (Full professional cover letter)
- **LinkedIn:** `https://linkedin.com/in/johndoe`
- **Portfolio:** `https://johndoe-portfolio.com`
- **Expected Salary:** `Rp 20jt - Rp 25jt`

### ✅ 4. Profile (`/profile`)
- **Full Name:** `John Doe`
- **Email:** `john.doe@example.com`
- **Phone:** `+62 812-3456-7890`
- **Location:** `Jakarta, Indonesia`
- **LinkedIn:** `https://linkedin.com/in/johndoe`
- **Summary:** (Professional summary text)

### ✅ 5. Forgot Password (`/forgot-password`)
- **Email:** `john.doe@example.com`

## Cara Menggunakan

1. **Klik** pada input/textarea yang kosong
2. **Atau focus** (tab ke field tersebut)
3. Data akan **otomatis terisi** dengan data valid

## Data yang Tersedia

Semua data tersedia di `src/utils/autoFill.js`:

```javascript
{
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+62 812-3456-7890',
  address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220',
  linkedin: 'https://linkedin.com/in/johndoe',
  portfolio: 'https://johndoe-portfolio.com',
  summary: '...',
  coverLetter: '...',
  password: 'Test1234!',
  confirmPassword: 'Test1234!',
  expectedSalary: 'Rp 20jt - Rp 25jt',
  // ... dan lainnya
}
```

## Fitur

- ✅ **Auto-fill saat klik** - Klik pada field kosong
- ✅ **Auto-fill saat focus** - Tab ke field kosong
- ✅ **Hanya jika kosong** - Tidak akan overwrite data yang sudah ada
- ✅ **Data valid** - Semua data sudah memenuhi validasi
- ✅ **React state update** - State ter-update dengan benar

## Customization

Untuk mengubah data auto-fill, edit file:
- `src/utils/autoFill.js`

Ubah nilai di object `autoFillData` sesuai kebutuhan.

## Testing

1. Buka form apapun (Login, Register, Apply Job, Profile)
2. Klik pada input/textarea yang kosong
3. Data akan otomatis terisi
4. Form bisa langsung di-submit untuk testing

## Catatan

- Fitur ini **hanya untuk testing/prototype**
- Di production, fitur ini bisa di-disable jika diperlukan
- Data yang di-fill sudah **valid** dan memenuhi semua requirement form

## Disable Auto-Fill (Jika Diperlukan)

Untuk disable auto-fill di production, hapus atau comment handler `onClick` dan `onFocus` di semua form, atau tambahkan environment check:

```javascript
const isDevelopment = import.meta.env.DEV;
const autoFillHandler = isDevelopment ? autoFillEmail : undefined;
```

