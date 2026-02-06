import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, translations, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'noir_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'fa' || saved === 'en') {
        return saved;
      }
    }
    return 'en';
  });

  const isRTL = language === 'fa';
  const dir = isRTL ? 'rtl' : 'ltr';
  const t = translations[language];

  // Update document direction and language
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.style.fontFamily = isRTL 
      ? "'Vazirmatn', 'Segoe UI', Tahoma, sans-serif"
      : "'Inter', 'Segoe UI', Tahoma, sans-serif";
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, language);
  }, [language, dir, isRTL]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'fa' : 'en');
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        t,
        setLanguage,
        toggleLanguage,
        isRTL,
        dir,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Language Switcher Component
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors ${className}`}
      title={t.common.language}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="text-sm tracking-wider">
        {language === 'en' ? 'فارسی' : 'English'}
      </span>
    </button>
  );
}
