# Quick Start Deployment Guide

Panduan cepat untuk deployment aplikasi Sistem Rekrutmen.

## ⚡ Quick Deploy Options

### 1. Vercel (Recommended - Paling Mudah)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Atau langsung via [vercel.com](https://vercel.com):
1. Import GitHub repository
2. Auto-deploy ✓

### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build & Deploy
npm run build
netlify deploy --prod --dir=dist
```

Atau via [netlify.com](https://netlify.com):
1. Drag & drop folder `dist/`
2. Deploy ✓

### 3. Docker

```bash
# Build image
docker build -t sistem-rekrutmen .

# Run container
docker run -p 80:80 sistem-rekrutmen
```

### 4. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Update vite.config.js base path
# Then deploy
npm run deploy
```

## 📝 Pre-Deployment Checklist

- [ ] `npm run build` berhasil
- [ ] Test di `npm run preview`
- [ ] Environment variables sudah di-set
- [ ] API endpoints sudah di-update

## 🚀 Build Command

```bash
npm install
npm run build
```

Output akan berada di folder `dist/`

## 📖 Full Documentation

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk dokumentasi lengkap.

