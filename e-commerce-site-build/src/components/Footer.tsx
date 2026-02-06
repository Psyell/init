import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { t, dir } = useLanguage();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('footer.subscribed'));
    setEmail('');
  };

  return (
    <footer className="bg-black border-t border-white/10" dir={dir}>
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-16 pb-16 border-b border-white/10">
          <h3 className="text-white text-2xl md:text-3xl font-extralight tracking-[0.3em] mb-4">
            {t('footer.newsletter')}
          </h3>
          <p className="text-white/50 text-sm tracking-wider mb-8 max-w-md mx-auto">
            {t('footer.newsletterText')}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.emailPlaceholder')}
              required
              className="flex-1 bg-transparent border border-white/20 text-white px-4 py-3 text-sm tracking-wider placeholder:text-white/30 focus:outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 text-sm tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              {t('footer.subscribe')}
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Shop */}
          <div>
            <h4 className="text-white text-xs tracking-[0.3em] mb-6">{t('footer.shop')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('nav.newArrivals')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('nav.women')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('nav.men')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('nav.collections')}</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white text-xs tracking-[0.3em] mb-6">{t('footer.help')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('footer.shippingReturns')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('footer.sizeGuide')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('footer.faq')}</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white text-xs tracking-[0.3em] mb-6">{t('footer.about')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('footer.ourStory')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('footer.craftsmanship')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('footer.sustainability')}</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{t('footer.careers')}</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white text-xs tracking-[0.3em] mb-6">{t('footer.followUs')}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Pinterest</a></li>
              <li><a href="#" className="text-white/50 text-sm hover:text-white transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <div className="text-white text-xl tracking-[0.3em] font-light mb-6 md:mb-0">
            INiT
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-white/30 text-xs tracking-wider">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.cookies')}</a>
          </div>
          <div className="text-white/30 text-xs tracking-wider mt-6 md:mt-0">
            © 2024 INiT. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
