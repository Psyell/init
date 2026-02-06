import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fa';

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: { en: Translations; fa: Translations } = {
  en: {
    // Navigation
    nav: {
      newArrivals: 'NEW ARRIVALS',
      women: 'WOMEN',
      men: 'MEN',
      collections: 'COLLECTIONS',
      runway: 'RUNWAY',
      stores: 'STORES',
      dashboard: 'DASHBOARD',
    },
    // Hero
    hero: {
      title: 'NOIR',
      subtitle: 'Avant-garde fashion for the bold and unconventional',
      cta: 'EXPLORE COLLECTION',
      scroll: 'SCROLL',
    },
    // Products
    products: {
      title: 'COLLECTION',
      new: 'NEW',
    },
    // Categories
    categories: {
      all: 'ALL',
      outerwear: 'OUTERWEAR',
      tops: 'TOPS',
      bottoms: 'BOTTOMS',
      footwear: 'FOOTWEAR',
      accessories: 'ACCESSORIES',
    },
    // Product Detail
    product: {
      selectSize: 'SELECT SIZE',
      sizeGuide: 'SIZE GUIDE',
      addToCart: 'ADD TO CART',
      details: 'DETAILS',
      shipping: 'SHIPPING',
      shippingInfo: 'Free shipping on orders over $500. Standard delivery 3-5 business days.',
    },
    // Cart
    cart: {
      title: 'SHOPPING BAG',
      empty: 'Your bag is empty',
      size: 'Size',
      remove: 'Remove',
      subtotal: 'Subtotal',
      checkout: 'CHECKOUT',
      continueShopping: 'CONTINUE SHOPPING',
    },
    // Auth
    auth: {
      login: 'LOGIN',
      register: 'REGISTER',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      orContinueWith: 'Or continue with',
      google: 'Google',
      sendCode: 'SEND CODE',
      verifyCode: 'VERIFY CODE',
      enterCode: 'Enter verification code',
      codeSent: 'We sent a code to',
      resendCode: 'Resend code',
      myProfile: 'My Profile',
      myOrders: 'My Orders',
      wishlist: 'Wishlist',
      dashboard: 'Admin Dashboard',
      logout: 'Logout',
    },
    // Footer
    footer: {
      newsletter: 'NEWSLETTER',
      newsletterText: 'Subscribe to receive updates, access to exclusive deals, and more.',
      emailPlaceholder: 'Enter your email',
      subscribe: 'SUBSCRIBE',
      subscribed: 'Thank you for subscribing!',
      shop: 'SHOP',
      help: 'HELP',
      about: 'ABOUT',
      followUs: 'FOLLOW US',
      contact: 'Contact Us',
      shippingReturns: 'Shipping & Returns',
      sizeGuide: 'Size Guide',
      faq: 'FAQ',
      ourStory: 'Our Story',
      craftsmanship: 'Craftsmanship',
      sustainability: 'Sustainability',
      careers: 'Careers',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      rights: 'All rights reserved.',
    },
    // Dashboard
    dashboard: {
      overview: 'Overview',
      products: 'Products',
      orders: 'Orders',
      customers: 'Customers',
      analytics: 'Analytics',
      settings: 'Settings',
      backToStore: 'Back to Store',
      totalRevenue: 'Total Revenue',
      totalOrders: 'Total Orders',
      totalProducts: 'Total Products',
      totalCustomers: 'Total Customers',
      recentOrders: 'Recent Orders',
      recentActivity: 'Recent Activity',
      addProduct: 'Add Product',
      editProduct: 'Edit Product',
      deleteProduct: 'Delete Product',
      productName: 'Product Name',
      price: 'Price',
      category: 'Category',
      status: 'Status',
      actions: 'Actions',
      search: 'Search...',
      filter: 'Filter',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
    },
  },
  fa: {
    // Navigation
    nav: {
      newArrivals: 'جدیدترین‌ها',
      women: 'زنانه',
      men: 'مردانه',
      collections: 'کالکشن‌ها',
      runway: 'رانوی',
      stores: 'فروشگاه‌ها',
      dashboard: 'داشبورد',
    },
    // Hero
    hero: {
      title: 'نوآر',
      subtitle: 'مد آوانگارد برای افراد جسور و غیرمتعارف',
      cta: 'مشاهده کالکشن',
      scroll: 'اسکرول',
    },
    // Products
    products: {
      title: 'کالکشن',
      new: 'جدید',
    },
    // Categories
    categories: {
      all: 'همه',
      outerwear: 'لباس رویی',
      tops: 'بالاتنه',
      bottoms: 'پایین‌تنه',
      footwear: 'کفش',
      accessories: 'اکسسوری',
    },
    // Product Detail
    product: {
      selectSize: 'انتخاب سایز',
      sizeGuide: 'راهنمای سایز',
      addToCart: 'افزودن به سبد',
      details: 'جزئیات',
      shipping: 'ارسال',
      shippingInfo: 'ارسال رایگان برای سفارش‌های بالای ۵۰۰ دلار. تحویل استاندارد ۳-۵ روز کاری.',
    },
    // Cart
    cart: {
      title: 'سبد خرید',
      empty: 'سبد خرید شما خالی است',
      size: 'سایز',
      remove: 'حذف',
      subtotal: 'جمع کل',
      checkout: 'تکمیل خرید',
      continueShopping: 'ادامه خرید',
    },
    // Auth
    auth: {
      login: 'ورود',
      register: 'ثبت‌نام',
      email: 'ایمیل',
      password: 'رمز عبور',
      name: 'نام کامل',
      forgotPassword: 'فراموشی رمز عبور؟',
      noAccount: 'حساب کاربری ندارید؟',
      hasAccount: 'حساب کاربری دارید؟',
      orContinueWith: 'یا ادامه با',
      google: 'گوگل',
      sendCode: 'ارسال کد',
      verifyCode: 'تأیید کد',
      enterCode: 'کد تأیید را وارد کنید',
      codeSent: 'کد ارسال شد به',
      resendCode: 'ارسال مجدد کد',
      myProfile: 'پروفایل من',
      myOrders: 'سفارش‌های من',
      wishlist: 'علاقه‌مندی‌ها',
      dashboard: 'پنل مدیریت',
      logout: 'خروج',
    },
    // Footer
    footer: {
      newsletter: 'خبرنامه',
      newsletterText: 'برای دریافت آخرین اخبار و تخفیف‌ها عضو شوید.',
      emailPlaceholder: 'ایمیل خود را وارد کنید',
      subscribe: 'عضویت',
      subscribed: 'با تشکر از عضویت شما!',
      shop: 'فروشگاه',
      help: 'راهنما',
      about: 'درباره ما',
      followUs: 'ما را دنبال کنید',
      contact: 'تماس با ما',
      shippingReturns: 'ارسال و مرجوعی',
      sizeGuide: 'راهنمای سایز',
      faq: 'سوالات متداول',
      ourStory: 'داستان ما',
      craftsmanship: 'هنر ساخت',
      sustainability: 'پایداری',
      careers: 'فرصت‌های شغلی',
      privacy: 'حریم خصوصی',
      terms: 'شرایط استفاده',
      cookies: 'سیاست کوکی',
      rights: 'تمامی حقوق محفوظ است.',
    },
    // Dashboard
    dashboard: {
      overview: 'نمای کلی',
      products: 'محصولات',
      orders: 'سفارش‌ها',
      customers: 'مشتریان',
      analytics: 'آنالیتیکس',
      settings: 'تنظیمات',
      backToStore: 'بازگشت به فروشگاه',
      totalRevenue: 'درآمد کل',
      totalOrders: 'کل سفارش‌ها',
      totalProducts: 'کل محصولات',
      totalCustomers: 'کل مشتریان',
      recentOrders: 'سفارش‌های اخیر',
      recentActivity: 'فعالیت‌های اخیر',
      addProduct: 'افزودن محصول',
      editProduct: 'ویرایش محصول',
      deleteProduct: 'حذف محصول',
      productName: 'نام محصول',
      price: 'قیمت',
      category: 'دسته‌بندی',
      status: 'وضعیت',
      actions: 'عملیات',
      search: 'جستجو...',
      filter: 'فیلتر',
      save: 'ذخیره',
      cancel: 'انصراف',
      confirm: 'تأیید',
      delete: 'حذف',
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const dir = language === 'fa' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
