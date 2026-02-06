// ============ Translation Files ============

export type Language = 'en' | 'fa';

export interface Translations {
  // Navigation
  nav: {
    collections: string;
    women: string;
    men: string;
    accessories: string;
    about: string;
    dashboard: string;
    login: string;
    register: string;
    logout: string;
    myProfile: string;
    myOrders: string;
    wishlist: string;
    adminPanel: string;
  };
  
  // Hero Section
  hero: {
    season: string;
    tagline: string;
    cta: string;
    scroll: string;
  };
  
  // Products
  products: {
    collection: string;
    all: string;
    outerwear: string;
    knitwear: string;
    tops: string;
    bottoms: string;
    footwear: string;
    quickView: string;
    addToBag: string;
    size: string;
    sizeGuide: string;
    selectSize: string;
    detailsAndCare: string;
    shippingAndReturns: string;
    madeInItaly: string;
    careInstructions: string;
    shippingInfo: string;
    stock: string;
    outOfStock: string;
    category: string;
    price: string;
    description: string;
    sizes: string;
    status: string;
    active: string;
    draft: string;
    archived: string;
  };
  
  // Cart
  cart: {
    title: string;
    empty: string;
    remove: string;
    subtotal: string;
    shippingNote: string;
    checkout: string;
    continueShopping: string;
    quantity: string;
  };
  
  // Auth
  auth: {
    loginTitle: string;
    registerTitle: string;
    verifyTitle: string;
    forgotTitle: string;
    email: string;
    password: string;
    fullName: string;
    loginButton: string;
    registerButton: string;
    sendOtp: string;
    verifyOtp: string;
    resendOtp: string;
    changeEmail: string;
    forgotPassword: string;
    noAccount: string;
    haveAccount: string;
    orContinueWith: string;
    loginWithGoogle: string;
    otpSent: string;
    otpInstructions: string;
    enterOtp: string;
    invalidCredentials: string;
    invalidOtp: string;
    enterEmail: string;
    connecting: string;
    pleaseWait: string;
    sending: string;
    verifying: string;
  };
  
  // Footer
  footer: {
    newsletter: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    subscribe: string;
    shop: string;
    newArrivals: string;
    sale: string;
    help: string;
    contactUs: string;
    shipping: string;
    returns: string;
    faq: string;
    aboutUs: string;
    ourStory: string;
    stores: string;
    careers: string;
    press: string;
    sustainability: string;
    follow: string;
    rights: string;
    privacy: string;
    terms: string;
    enamad: string;
  };
  
  // Craftsmanship Section
  craftsmanship: {
    title: string;
    madeIn: string;
    description: string;
    cta: string;
  };
  
  // Lookbook
  lookbook: {
    title: string;
    view: string;
  };
  
  // Dashboard
  dashboard: {
    overview: string;
    products: string;
    orders: string;
    customers: string;
    analytics: string;
    settings: string;
    backToStore: string;
    search: string;
    notifications: string;
    totalRevenue: string;
    totalOrders: string;
    totalProducts: string;
    totalCustomers: string;
    revenueOverview: string;
    salesByCategory: string;
    recentOrders: string;
    viewAll: string;
    recentActivity: string;
    addProduct: string;
    editProduct: string;
    deleteProduct: string;
    confirmDelete: string;
    productName: string;
    save: string;
    cancel: string;
    create: string;
    update: string;
    loading: string;
    orderId: string;
    customer: string;
    date: string;
    total: string;
    actions: string;
    view: string;
    pending: string;
    processing: string;
    shipped: string;
    delivered: string;
    cancelled: string;
    refunded: string;
    orderDetails: string;
    shippingAddress: string;
    items: string;
    close: string;
    searchProducts: string;
    searchOrders: string;
    searchCustomers: string;
    allStatus: string;
    storeSettings: string;
    storeName: string;
    storeEmail: string;
    currency: string;
    notificationsSettings: string;
    orderNotifications: string;
    stockNotifications: string;
    customerNotifications: string;
    marketingNotifications: string;
    shippingSettings: string;
    freeShippingThreshold: string;
    standardShipping: string;
    expressShipping: string;
    account: string;
    changePassword: string;
    dangerZone: string;
    deleteStore: string;
    deleteStoreWarning: string;
    saveChanges: string;
    storeLogo: string;
    lastMonths: string;
    monthlyRevenue: string;
    categoryDistribution: string;
    topSellingProducts: string;
    sales: string;
    conversionRate: string;
    avgOrderValue: string;
    vsLastMonth: string;
    vsLastYear: string;
    basedOnMonths: string;
    justNow: string;
    minAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };
  
  // Image Uploader
  imageUploader: {
    dropHere: string;
    clickToSelect: string;
    orUseLink: string;
    edit: string;
    uploadNew: string;
    delete: string;
    imageLink: string;
    preview: string;
    uploadFromDevice: string;
  };
  
  // Common
  common: {
    or: string;
    and: string;
    yes: string;
    no: string;
    ok: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    confirm: string;
    language: string;
    english: string;
    persian: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      collections: 'COLLECTIONS',
      women: 'WOMEN',
      men: 'MEN',
      accessories: 'ACCESSORIES',
      about: 'ABOUT',
      dashboard: 'DASHBOARD',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      myProfile: 'My Profile',
      myOrders: 'My Orders',
      wishlist: 'Wishlist',
      adminPanel: 'Admin Panel',
    },
    hero: {
      season: 'AUTUMN/WINTER 2024',
      tagline: 'AVANT-GARDE LUXURY',
      cta: 'EXPLORE COLLECTION',
      scroll: 'SCROLL',
    },
    products: {
      collection: 'COLLECTION',
      all: 'ALL',
      outerwear: 'OUTERWEAR',
      knitwear: 'KNITWEAR',
      tops: 'TOPS',
      bottoms: 'BOTTOMS',
      footwear: 'FOOTWEAR',
      quickView: 'QUICK VIEW',
      addToBag: 'ADD TO BAG',
      size: 'SIZE',
      sizeGuide: 'SIZE GUIDE',
      selectSize: 'PLEASE SELECT A SIZE',
      detailsAndCare: 'DETAILS & CARE',
      shippingAndReturns: 'SHIPPING & RETURNS',
      madeInItaly: 'Made in Italy',
      careInstructions: 'Professional dry clean only. Do not bleach. Iron on low heat if necessary.',
      shippingInfo: 'Complimentary shipping on all orders. Free returns within 14 days of delivery.',
      stock: 'Stock',
      outOfStock: 'Out of Stock',
      category: 'Category',
      price: 'Price',
      description: 'Description',
      sizes: 'Sizes',
      status: 'Status',
      active: 'Active',
      draft: 'Draft',
      archived: 'Archived',
    },
    cart: {
      title: 'SHOPPING BAG',
      empty: 'YOUR BAG IS EMPTY',
      remove: 'REMOVE',
      subtotal: 'SUBTOTAL',
      shippingNote: 'Shipping calculated at checkout',
      checkout: 'CHECKOUT',
      continueShopping: 'CONTINUE SHOPPING',
      quantity: 'Qty',
    },
    auth: {
      loginTitle: 'Login to your account',
      registerTitle: 'Create an account',
      verifyTitle: 'Verify code',
      forgotTitle: 'Reset password',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      loginButton: 'Login',
      registerButton: 'Register',
      sendOtp: 'Send verification code',
      verifyOtp: 'Verify & Register',
      resendOtp: 'Resend code',
      changeEmail: 'Change email',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      orContinueWith: 'or',
      loginWithGoogle: 'Continue with Google',
      otpSent: 'Verification code sent to',
      otpInstructions: 'Enter the 6-digit code sent to',
      enterOtp: 'Please enter the 6-digit code',
      invalidCredentials: 'Invalid email or password',
      invalidOtp: 'Invalid verification code',
      enterEmail: 'Please enter your email',
      connecting: 'Connecting...',
      pleaseWait: 'Please wait...',
      sending: 'Sending...',
      verifying: 'Verifying...',
    },
    footer: {
      newsletter: 'SUBSCRIBE TO OUR NEWSLETTER',
      newsletterDesc: 'Be the first to know about new collections and exclusive offers.',
      emailPlaceholder: 'Email address',
      subscribe: 'SUBSCRIBE',
      shop: 'SHOP',
      newArrivals: 'New Arrivals',
      sale: 'Sale',
      help: 'HELP',
      contactUs: 'Contact Us',
      shipping: 'Shipping',
      returns: 'Returns',
      faq: 'FAQs',
      aboutUs: 'ABOUT',
      ourStory: 'Our Story',
      stores: 'Stores',
      careers: 'Careers',
      press: 'Press',
      sustainability: 'Sustainability',
      follow: 'FOLLOW',
      rights: '© 2024 INiT. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      enamad: 'Trust Badge',
    },
    craftsmanship: {
      title: 'MADE IN ITALY',
      madeIn: 'CRAFTSMANSHIP',
      description: 'Each piece is meticulously crafted in our Italian ateliers, where generations of artisanal expertise meet avant-garde design. We use only the finest materials, sourced sustainably from trusted partners around the world.',
      cta: 'OUR STORY',
    },
    lookbook: {
      title: 'LOOKBOOK',
      view: 'VIEW',
    },
    dashboard: {
      overview: 'OVERVIEW',
      products: 'PRODUCTS',
      orders: 'ORDERS',
      customers: 'CUSTOMERS',
      analytics: 'ANALYTICS',
      settings: 'SETTINGS',
      backToStore: 'BACK TO STORE',
      search: 'Search...',
      notifications: 'Notifications',
      totalRevenue: 'TOTAL REVENUE',
      totalOrders: 'TOTAL ORDERS',
      totalProducts: 'PRODUCTS',
      totalCustomers: 'CUSTOMERS',
      revenueOverview: 'REVENUE OVERVIEW',
      salesByCategory: 'SALES BY CATEGORY',
      recentOrders: 'RECENT ORDERS',
      viewAll: 'VIEW ALL',
      recentActivity: 'RECENT ACTIVITY',
      addProduct: 'ADD PRODUCT',
      editProduct: 'EDIT PRODUCT',
      deleteProduct: 'Delete',
      confirmDelete: 'Are you sure you want to delete this product?',
      productName: 'Name',
      save: 'Save',
      cancel: 'Cancel',
      create: 'CREATE',
      update: 'UPDATE',
      loading: 'LOADING...',
      orderId: 'ORDER ID',
      customer: 'CUSTOMER',
      date: 'DATE',
      total: 'TOTAL',
      actions: 'ACTIONS',
      view: 'VIEW',
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
      refunded: 'Refunded',
      orderDetails: 'ORDER',
      shippingAddress: 'SHIPPING ADDRESS',
      items: 'ITEMS',
      close: 'CLOSE',
      searchProducts: 'Search products...',
      searchOrders: 'Search orders...',
      searchCustomers: 'Search customers...',
      allStatus: 'All Status',
      storeSettings: 'STORE SETTINGS',
      storeName: 'STORE NAME',
      storeEmail: 'STORE EMAIL',
      currency: 'CURRENCY',
      notificationsSettings: 'NOTIFICATIONS',
      orderNotifications: 'Order Notifications',
      stockNotifications: 'Stock Notifications',
      customerNotifications: 'Customer Notifications',
      marketingNotifications: 'Marketing Notifications',
      shippingSettings: 'SHIPPING',
      freeShippingThreshold: 'Free Shipping Threshold',
      standardShipping: 'Standard Shipping',
      expressShipping: 'Express Shipping',
      account: 'ACCOUNT',
      changePassword: 'CHANGE PASSWORD',
      dangerZone: 'DANGER ZONE',
      deleteStore: 'DELETE STORE',
      deleteStoreWarning: 'Once you delete your store, there is no going back. Please be certain.',
      saveChanges: 'SAVE CHANGES',
      storeLogo: 'Store Logo',
      lastMonths: 'Last 12 months',
      monthlyRevenue: 'MONTHLY REVENUE',
      categoryDistribution: 'CATEGORY DISTRIBUTION',
      topSellingProducts: 'TOP SELLING PRODUCTS',
      sales: 'sales',
      conversionRate: 'CONVERSION RATE',
      avgOrderValue: 'AVG ORDER VALUE',
      vsLastMonth: 'vs last month',
      vsLastYear: 'vs last year',
      basedOnMonths: 'Based on 12 months',
      justNow: 'Just now',
      minAgo: 'min ago',
      hoursAgo: 'hour(s) ago',
      daysAgo: 'day(s) ago',
    },
    imageUploader: {
      dropHere: 'Drop image here',
      clickToSelect: 'or click to select',
      orUseLink: 'or use image URL',
      edit: 'Edit',
      uploadNew: 'Upload new',
      delete: 'Delete',
      imageLink: 'Image URL',
      preview: 'Preview',
      uploadFromDevice: 'Upload from device',
    },
    common: {
      or: 'or',
      and: 'and',
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      confirm: 'Confirm',
      language: 'Language',
      english: 'English',
      persian: 'فارسی',
    },
  },
  
  fa: {
    nav: {
      collections: 'کالکشن‌ها',
      women: 'زنانه',
      men: 'مردانه',
      accessories: 'اکسسوری',
      about: 'درباره ما',
      dashboard: 'داشبورد',
      login: 'ورود',
      register: 'ثبت‌نام',
      logout: 'خروج',
      myProfile: 'پروفایل من',
      myOrders: 'سفارش‌های من',
      wishlist: 'علاقه‌مندی‌ها',
      adminPanel: 'پنل مدیریت',
    },
    hero: {
      season: 'پاییز/زمستان ۲۰۲۴',
      tagline: 'لوکس آوانگارد',
      cta: 'مشاهده کالکشن',
      scroll: 'اسکرول کنید',
    },
    products: {
      collection: 'کالکشن',
      all: 'همه',
      outerwear: 'پوشاک بیرونی',
      knitwear: 'بافت',
      tops: 'بالاتنه',
      bottoms: 'پایین‌تنه',
      footwear: 'کفش',
      quickView: 'مشاهده سریع',
      addToBag: 'افزودن به سبد',
      size: 'سایز',
      sizeGuide: 'راهنمای سایز',
      selectSize: 'لطفاً سایز را انتخاب کنید',
      detailsAndCare: 'جزئیات و مراقبت',
      shippingAndReturns: 'ارسال و بازگشت',
      madeInItaly: 'ساخت ایتالیا',
      careInstructions: 'فقط خشکشویی حرفه‌ای. سفید نکنید. در صورت نیاز با حرارت کم اتو بزنید.',
      shippingInfo: 'ارسال رایگان برای همه سفارش‌ها. بازگشت رایگان تا ۱۴ روز پس از تحویل.',
      stock: 'موجودی',
      outOfStock: 'ناموجود',
      category: 'دسته‌بندی',
      price: 'قیمت',
      description: 'توضیحات',
      sizes: 'سایزها',
      status: 'وضعیت',
      active: 'فعال',
      draft: 'پیش‌نویس',
      archived: 'آرشیو شده',
    },
    cart: {
      title: 'سبد خرید',
      empty: 'سبد خرید شما خالی است',
      remove: 'حذف',
      subtotal: 'جمع کل',
      shippingNote: 'هزینه ارسال در پرداخت نهایی محاسبه می‌شود',
      checkout: 'پرداخت',
      continueShopping: 'ادامه خرید',
      quantity: 'تعداد',
    },
    auth: {
      loginTitle: 'ورود به حساب کاربری',
      registerTitle: 'ایجاد حساب کاربری',
      verifyTitle: 'تأیید کد',
      forgotTitle: 'بازیابی رمز عبور',
      email: 'ایمیل',
      password: 'رمز عبور',
      fullName: 'نام کامل',
      loginButton: 'ورود',
      registerButton: 'ثبت‌نام',
      sendOtp: 'ارسال کد تأیید',
      verifyOtp: 'تأیید و ثبت‌نام',
      resendOtp: 'ارسال مجدد کد',
      changeEmail: 'تغییر ایمیل',
      forgotPassword: 'رمز عبور را فراموش کرده‌اید؟',
      noAccount: 'حساب کاربری ندارید؟',
      haveAccount: 'حساب کاربری دارید؟',
      orContinueWith: 'یا',
      loginWithGoogle: 'ورود با گوگل',
      otpSent: 'کد تأیید به ایمیل شما ارسال شد',
      otpInstructions: 'کد ۶ رقمی ارسال شده را وارد کنید',
      enterOtp: 'لطفاً کد ۶ رقمی را کامل وارد کنید',
      invalidCredentials: 'ایمیل یا رمز عبور نادرست است',
      invalidOtp: 'کد وارد شده نادرست است',
      enterEmail: 'لطفاً ایمیل خود را وارد کنید',
      connecting: 'در حال اتصال...',
      pleaseWait: 'لطفاً صبر کنید...',
      sending: 'در حال ارسال...',
      verifying: 'در حال تأیید...',
    },
    footer: {
      newsletter: 'عضویت در خبرنامه',
      newsletterDesc: 'اولین نفری باشید که از کالکشن‌های جدید و پیشنهادات ویژه مطلع می‌شوید.',
      emailPlaceholder: 'آدرس ایمیل',
      subscribe: 'عضویت',
      shop: 'فروشگاه',
      newArrivals: 'جدیدترین‌ها',
      sale: 'حراج',
      help: 'راهنما',
      contactUs: 'تماس با ما',
      shipping: 'ارسال',
      returns: 'بازگشت کالا',
      faq: 'سوالات متداول',
      aboutUs: 'درباره ما',
      ourStory: 'داستان ما',
      stores: 'فروشگاه‌ها',
      careers: 'فرصت‌های شغلی',
      press: 'رسانه',
      sustainability: 'پایداری',
      follow: 'شبکه‌های اجتماعی',
      rights: '© ۲۰۲۴ INiT. تمامی حقوق محفوظ است.',
      privacy: 'حریم خصوصی',
      terms: 'شرایط استفاده',
      enamad: 'نماد اعتماد',
    },
    craftsmanship: {
      title: 'ساخت ایتالیا',
      madeIn: 'هنر صنعتگری',
      description: 'هر قطعه با دقت در کارگاه‌های ایتالیایی ما ساخته می‌شود، جایی که نسل‌ها تخصص صنعتگری با طراحی آوانگارد ترکیب می‌شود. ما فقط از بهترین مواد استفاده می‌کنیم که به صورت پایدار از شرکای مورد اعتماد در سراسر جهان تهیه می‌شوند.',
      cta: 'داستان ما',
    },
    lookbook: {
      title: 'لوک‌بوک',
      view: 'مشاهده',
    },
    dashboard: {
      overview: 'نمای کلی',
      products: 'محصولات',
      orders: 'سفارش‌ها',
      customers: 'مشتریان',
      analytics: 'آنالیتیکس',
      settings: 'تنظیمات',
      backToStore: 'بازگشت به فروشگاه',
      search: 'جستجو...',
      notifications: 'اعلان‌ها',
      totalRevenue: 'درآمد کل',
      totalOrders: 'کل سفارش‌ها',
      totalProducts: 'محصولات',
      totalCustomers: 'مشتریان',
      revenueOverview: 'نمای کلی درآمد',
      salesByCategory: 'فروش بر اساس دسته',
      recentOrders: 'سفارش‌های اخیر',
      viewAll: 'مشاهده همه',
      recentActivity: 'فعالیت‌های اخیر',
      addProduct: 'افزودن محصول',
      editProduct: 'ویرایش محصول',
      deleteProduct: 'حذف',
      confirmDelete: 'آیا از حذف این محصول مطمئن هستید؟',
      productName: 'نام',
      save: 'ذخیره',
      cancel: 'انصراف',
      create: 'ایجاد',
      update: 'به‌روزرسانی',
      loading: 'در حال بارگذاری...',
      orderId: 'شناسه سفارش',
      customer: 'مشتری',
      date: 'تاریخ',
      total: 'مجموع',
      actions: 'عملیات',
      view: 'مشاهده',
      pending: 'در انتظار',
      processing: 'در حال پردازش',
      shipped: 'ارسال شده',
      delivered: 'تحویل داده شده',
      cancelled: 'لغو شده',
      refunded: 'برگشت داده شده',
      orderDetails: 'سفارش',
      shippingAddress: 'آدرس ارسال',
      items: 'اقلام',
      close: 'بستن',
      searchProducts: 'جستجوی محصولات...',
      searchOrders: 'جستجوی سفارش‌ها...',
      searchCustomers: 'جستجوی مشتریان...',
      allStatus: 'همه وضعیت‌ها',
      storeSettings: 'تنظیمات فروشگاه',
      storeName: 'نام فروشگاه',
      storeEmail: 'ایمیل فروشگاه',
      currency: 'واحد پول',
      notificationsSettings: 'اعلان‌ها',
      orderNotifications: 'اعلان سفارش‌ها',
      stockNotifications: 'اعلان موجودی',
      customerNotifications: 'اعلان مشتریان',
      marketingNotifications: 'اعلان بازاریابی',
      shippingSettings: 'ارسال',
      freeShippingThreshold: 'حداقل برای ارسال رایگان',
      standardShipping: 'ارسال عادی',
      expressShipping: 'ارسال سریع',
      account: 'حساب کاربری',
      changePassword: 'تغییر رمز عبور',
      dangerZone: 'منطقه خطر',
      deleteStore: 'حذف فروشگاه',
      deleteStoreWarning: 'پس از حذف فروشگاه، امکان بازگشت وجود ندارد. مطمئن باشید.',
      saveChanges: 'ذخیره تغییرات',
      storeLogo: 'لوگوی فروشگاه',
      lastMonths: '۱۲ ماه اخیر',
      monthlyRevenue: 'درآمد ماهانه',
      categoryDistribution: 'توزیع دسته‌بندی',
      topSellingProducts: 'پرفروش‌ترین محصولات',
      sales: 'فروش',
      conversionRate: 'نرخ تبدیل',
      avgOrderValue: 'میانگین ارزش سفارش',
      vsLastMonth: 'نسبت به ماه قبل',
      vsLastYear: 'نسبت به سال قبل',
      basedOnMonths: 'بر اساس ۱۲ ماه',
      justNow: 'همین الان',
      minAgo: 'دقیقه پیش',
      hoursAgo: 'ساعت پیش',
      daysAgo: 'روز پیش',
    },
    imageUploader: {
      dropHere: 'تصویر را اینجا رها کنید',
      clickToSelect: 'یا کلیک کنید برای انتخاب',
      orUseLink: 'یا از لینک تصویر استفاده کنید',
      edit: 'ویرایش',
      uploadNew: 'آپلود جدید',
      delete: 'حذف',
      imageLink: 'لینک تصویر',
      preview: 'پیش‌نمایش',
      uploadFromDevice: 'آپلود از دستگاه',
    },
    common: {
      or: 'یا',
      and: 'و',
      yes: 'بله',
      no: 'خیر',
      ok: 'باشه',
      error: 'خطا',
      success: 'موفقیت',
      warning: 'هشدار',
      info: 'اطلاعات',
      confirm: 'تأیید',
      language: 'زبان',
      english: 'English',
      persian: 'فارسی',
    },
  },
};
