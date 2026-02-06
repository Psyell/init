import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=80"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.2em] mb-6">
          INiT
        </h1>
        <p className="text-white/80 text-lg md:text-xl tracking-[0.2em] font-light mb-12 max-w-2xl">
          {t('hero.subtitle')}
        </p>
        <a
          href="#collection"
          className="group inline-flex items-center gap-4 text-white text-sm tracking-[0.3em] hover:opacity-70 transition-opacity"
        >
          <span>{t('hero.cta')}</span>
          <span className="w-12 h-[1px] bg-white group-hover:w-20 transition-all duration-300" />
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-white/50 text-xs tracking-[0.3em]">{t('hero.scroll')}</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
