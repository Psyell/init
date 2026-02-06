import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onDashboardClick: () => void;
  isLoggedIn: boolean;
  user: { name: string; email: string; avatar?: string; role: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemsCount,
  onCartClick,
  onLogoClick,
  onDashboardClick,
  isLoggedIn,
  user,
  onLoginClick,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { t, language, setLanguage, dir } = useLanguage();

  const menuItems = [
    { name: t('nav.newArrivals'), href: '#new' },
    { name: t('nav.women'), href: '#women' },
    { name: t('nav.men'), href: '#men' },
    { name: t('nav.collections'), href: '#collections' },
    { name: t('nav.runway'), href: '#runway' },
    { name: t('nav.stores'), href: '#stores' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm" dir={dir}>
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 group"
          >
            <span className={`block w-6 h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`block w-6 h-[1px] bg-white mt-[5px] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[2px]' : ''}`} />
          </button>

          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="absolute left-1/2 -translate-x-1/2 text-white text-2xl tracking-[0.2em] font-light hover:opacity-70 transition-opacity"
          >
            INiT
          </button>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
              className="text-white text-xs tracking-widest hover:opacity-70 transition-opacity"
            >
              {language === 'en' ? 'فا' : 'EN'}
            </button>

            {/* User */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-white hover:opacity-70 transition-opacity"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setIsUserMenuOpen(false)} />
                    <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-48 bg-black border border-white/20 py-2`}>
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-white text-sm">{user.name}</p>
                        <p className="text-white/50 text-xs">{user.email}</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-white/70 text-sm hover:text-white hover:bg-white/5 transition-colors">
                        {t('auth.myProfile')}
                      </button>
                      <button className="w-full text-left px-4 py-2 text-white/70 text-sm hover:text-white hover:bg-white/5 transition-colors">
                        {t('auth.myOrders')}
                      </button>
                      <button className="w-full text-left px-4 py-2 text-white/70 text-sm hover:text-white hover:bg-white/5 transition-colors">
                        {t('auth.wishlist')}
                      </button>
                      {user.role === 'admin' && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onDashboardClick();
                          }}
                          className="w-full text-left px-4 py-2 text-white/70 text-sm hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {t('auth.dashboard')}
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-red-400 text-sm hover:text-red-300 hover:bg-white/5 transition-colors"
                      >
                        {t('auth.logout')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-white hover:opacity-70 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}

            {/* Search */}
            <button className="text-white hover:opacity-70 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="text-white hover:opacity-70 transition-opacity relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ top: '80px' }}
      >
        <div className="h-full flex flex-col justify-center items-center">
          <nav className="text-center">
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white text-4xl md:text-6xl font-light tracking-[0.2em] py-4 hover:opacity-50 transition-opacity"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {user?.role === 'admin' && (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onDashboardClick();
                }}
                className="block text-white text-4xl md:text-6xl font-light tracking-[0.2em] py-4 hover:opacity-50 transition-opacity mx-auto mt-8 border-t border-white/20 pt-8"
              >
                {t('nav.dashboard')}
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
