# Panduan Deployment Frontend Sistem Rekrutmen

Dokumentasi ini menjelaskan langkah-langkah untuk melakukan deployment aplikasi frontend Sistem Rekrutmen ke production.

## Prasyarat

Sebelum melakukan deployment, pastikan Anda telah menginstal:

- **Node.js** (versi 18 atau lebih tinggi)
- **npm** atau **yarn** atau **pnpm**
- **Git** (untuk version control)

## Persiapan Deployment

### 1. Build Aplikasi

Sebelum deployment, build aplikasi untuk production:

```bash
# Install dependencies (jika belum)
npm install

# Build aplikasi untuk production
npm run build
```

Setelah build selesai, folder `dist/` akan dibuat yang berisi file-file yang siap untuk deployment.

### 2. Konfigurasi Environment Variables

Buat file `.env.production` di root project untuk konfigurasi production:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Job Portal
VITE_APP_VERSION=1.0.0
```

## Metode Deployment

### 1. Deployment ke Vercel

Vercel adalah platform yang sangat cocok untuk deployment aplikasi React/Vite.

#### Langkah-langkah:

1. **Install Vercel CLI** (opsional, bisa juga via web dashboard):

```bash
npm install -g vercel
```

2. **Login ke Vercel**:

```bash
vercel login
```

3. **Deploy aplikasi**:

```bash
# Deploy ke preview/staging
vercel

# Deploy ke production
vercel --prod
```

#### Atau via Web Dashboard:

1. Kunjungi [vercel.com](https://vercel.com)
2. Login dengan GitHub/GitLab/Bitbucket
3. Import project Anda
4. Konfigurasi build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Klik Deploy

#### File `vercel.json` (Opsional):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 2. Deployment ke Netlify

Netlify juga mudah digunakan untuk deployment aplikasi React.

#### Langkah-langkah:

1. **Install Netlify CLI** (opsional):

```bash
npm install -g netlify-cli
```

2. **Build aplikasi**:

```bash
npm run build
```

3. **Deploy via CLI**:

```bash
# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Atau via Web Dashboard:

1. Kunjungi [netlify.com](https://netlify.com)
2. Login dan pilih "Add new site" > "Import an existing project"
3. Connect dengan Git repository
4. Konfigurasi build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Klik Deploy

#### File `netlify.toml` (Opsional):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Deployment ke GitHub Pages

Untuk deployment gratis menggunakan GitHub Pages:

#### Langkah-langkah:

1. **Install gh-pages**:

```bash
npm install --save-dev gh-pages
```

2. **Update `package.json`**:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/sistem-rekrutmen"
}
```

3. **Update `vite.config.js`**:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sistem-rekrutmen/' // Ganti dengan nama repository Anda
})
```

4. **Deploy**:

```bash
npm run deploy
```

### 4. Deployment ke Firebase Hosting

#### Langkah-langkah:

1. **Install Firebase CLI**:

```bash
npm install -g firebase-tools
```

2. **Login ke Firebase**:

```bash
firebase login
```

3. **Initialize Firebase**:

```bash
firebase init hosting
```

Pilih:
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub auto-deploy: `No` (atau `Yes` jika ingin)

4. **Build dan Deploy**:

```bash
npm run build
firebase deploy
```

### 5. Deployment ke Docker

Buat `Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Buat `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Build dan run:

```bash
# Build image
docker build -t sistem-rekrutmen .

# Run container
docker run -p 80:80 sistem-rekrutmen
```

### 6. Deployment ke Server VPS/Dedicated

#### Menggunakan Nginx:

1. **Build aplikasi**:

```bash
npm run build
```

2. **Upload ke server**:

```bash
# Menggunakan SCP
scp -r dist/* user@your-server:/var/www/html/

# Atau menggunakan rsync
rsync -avz dist/ user@your-server:/var/www/html/
```

3. **Konfigurasi Nginx** (`/etc/nginx/sites-available/sistem-rekrutmen`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

4. **Enable site dan restart Nginx**:

```bash
sudo ln -s /etc/nginx/sites-available/sistem-rekrutmen /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Menggunakan PM2 (untuk dev server):

1. **Install PM2**:

```bash
npm install -g pm2
```

2. **Serve static files dengan serve**:

```bash
npm install -g serve
pm2 serve dist 80 --spa --name sistem-rekrutmen
pm2 save
pm2 startup
```

## Konfigurasi HTTPS (SSL)

### Menggunakan Let's Encrypt (Certbot):

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Environment Variables di Production

Pastikan environment variables di-set dengan benar:

- **Vercel/Netlify**: Set via dashboard di Settings > Environment Variables
- **Docker**: Gunakan `-e` flag atau `.env` file
- **VPS**: Set di system environment atau `.env` file

## Optimasi Performance

### 1. Enable Compression

Pastikan gzip atau brotli compression diaktifkan di server.

### 2. CDN

Gunakan CDN (Content Delivery Network) seperti Cloudflare untuk meningkatkan kecepatan loading.

### 3. Caching

Konfigurasi caching headers yang sesuai untuk static assets.

## Monitoring dan Analytics

### 1. Error Tracking

Integrasikan dengan Sentry atau similar untuk error tracking:

```bash
npm install @sentry/react
```

### 2. Analytics

Tambahkan Google Analytics atau similar untuk tracking user behavior.

## Checklist Pre-Deployment

- [ ] Build aplikasi berhasil tanpa error
- [ ] Semua environment variables sudah dikonfigurasi
- [ ] API endpoints sudah di-update untuk production
- [ ] Testing dilakukan dan semua fitur berfungsi
- [ ] SEO meta tags sudah di-set
- [ ] Favicon dan manifest sudah di-update
- [ ] Error boundaries sudah di-implement
- [ ] Loading states sudah di-handle
- [ ] Mobile responsiveness sudah di-test
- [ ] Browser compatibility sudah di-test

## Troubleshooting

### Problem: 404 Error saat refresh halaman

**Solution**: Pastikan server dikonfigurasi untuk redirect semua route ke `index.html` (SPA routing).

### Problem: Asset tidak ter-load

**Solution**: 
- Check base path di `vite.config.js`
- Pastikan asset path sudah benar di production

### Problem: Environment variables tidak ter-load

**Solution**: 
- Pastikan prefix `VITE_` digunakan untuk environment variables
- Restart build setelah mengubah environment variables

## Support

Untuk pertanyaan atau masalah deployment, silakan buat issue di repository GitHub project ini.

## Referensi

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

