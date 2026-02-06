# INiT - Avant-Garde Fashion Store

A modern, responsive e-commerce website built with React, TypeScript, Vite, and Tailwind CSS. Inspired by luxury fashion brands like Rick Owens.

![INiT Store](https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80)

## 🚀 Quick Deploy to GitHub Pages

### Method 1: GitHub Actions (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/init-store.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Click on "Pages" in the sidebar
   - Under "Source", select **"GitHub Actions"**
   - The site will auto-deploy on every push!

### Method 2: Manual Deploy

```bash
# Install dependencies
npm install

# Build the project
npm run build

# The dist/index.html contains everything!
# Copy it to your repo root and push
```

## ✨ Features

### 🛍️ Store Features
- **Product Catalog** - Beautiful product grid with category filtering
- **Product Details** - Full-screen modal with size selection
- **Shopping Cart** - Slide-out cart with quantity management
- **Responsive Design** - Works perfectly on all devices

### 🌐 Internationalization
- **Bilingual Support** - English and Persian (فارسی)
- **RTL Support** - Full right-to-left layout for Persian
- **Persistent Language** - Saves preference in localStorage

### 🔐 Authentication
- **Email/Password Login** - Traditional authentication
- **OTP Verification** - Email code verification for registration
- **Google OAuth** - Social login support
- **Role-based Access** - Admin and customer roles

### 📊 Admin Dashboard
- **Overview** - Stats, charts, and recent activity
- **Products Management** - Full CRUD with image upload
- **Orders Management** - Status updates and order details
- **Customers** - Customer list and statistics
- **Analytics** - Revenue charts and top products
- **Site Manager** - Edit hero, footer, menu, and more
- **Settings** - Store configuration

## 🔑 Demo Credentials

### Admin Access
- **Email:** `admin@noir.com`
- **Password:** `admin123`

### Customer Registration
- Enter any email to receive an OTP code
- The code will be shown in an alert (for demo purposes)

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/init-store.git
cd init-store

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
init-store/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthModal.tsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── ProductsManager.tsx
│   │   │   ├── OrdersManager.tsx
│   │   │   ├── SiteManager.tsx
│   │   │   └── ...
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   └── Footer.tsx
│   ├── context/
│   │   └── LanguageContext.tsx
│   ├── i18n/
│   │   ├── LanguageContext.tsx
│   │   └── translations.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── storage.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   ├── products.ts
│   │   └── initialData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🛠️ Technologies

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling
- **localStorage** - Data Persistence
- **vite-plugin-singlefile** - Single HTML output

## 📱 Responsive Design

The website is fully responsive:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## 🌍 Deployment Options

### GitHub Pages ✅
Uses GitHub Actions for automatic deployment.

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Any Static Host
Just upload the `dist/index.html` file - it contains everything!

## 📄 License

MIT License - feel free to use for personal or commercial purposes.

---

Made with ❤️ using React + Vite + Tailwind CSS
