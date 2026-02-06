import { useState, useEffect } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { useLanguage } from '@/i18n/LanguageContext';
import { storage } from '@/services/storage';

// Storage keys for site content
const SITE_CONTENT_KEY = 'noir_site_content';

// Site content types
interface HeroContent {
  backgroundImage: string;
  title: string;
  titleFa: string;
  subtitle: string;
  subtitleFa: string;
  ctaText: string;
  ctaTextFa: string;
  ctaLink: string;
}

interface CraftsmanshipContent {
  image: string;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
}

interface LookbookImage {
  id: number;
  url: string;
  alt: string;
}

interface FooterContent {
  newsletterTitle: string;
  newsletterTitleFa: string;
  newsletterDescription: string;
  newsletterDescriptionFa: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
    pinterest: string;
  };
  contactEmail: string;
  contactPhone: string;
  address: string;
}

interface MenuItem {
  id: number;
  label: string;
  labelFa: string;
  href: string;
  isActive: boolean;
}

interface SiteContent {
  hero: HeroContent;
  craftsmanship: CraftsmanshipContent;
  lookbook: LookbookImage[];
  footer: FooterContent;
  menuItems: MenuItem[];
  general: {
    siteName: string;
    siteNameFa: string;
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

const defaultContent: SiteContent = {
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=80',
    title: 'INiT',
    titleFa: 'اینیت',
    subtitle: 'Avant-garde fashion for the bold and unconventional',
    subtitleFa: 'مد آوانگارد برای افراد جسور و غیرمتعارف',
    ctaText: 'EXPLORE COLLECTION',
    ctaTextFa: 'مشاهده کالکشن',
    ctaLink: '#collection',
  },
  craftsmanship: {
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1000&q=80',
    title: 'CRAFTSMANSHIP',
    titleFa: 'هنر صنعتگری',
    description: 'Each piece is meticulously crafted in our ateliers using traditional techniques passed down through generations, combined with innovative approaches to design and construction.',
    descriptionFa: 'هر قطعه با دقت در کارگاه‌های ما با استفاده از تکنیک‌های سنتی که نسل به نسل منتقل شده، همراه با رویکردهای نوآورانه در طراحی و ساخت، تولید می‌شود.',
  },
  lookbook: [
    { id: 1, url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', alt: 'Lookbook 1' },
    { id: 2, url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', alt: 'Lookbook 2' },
    { id: 3, url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80', alt: 'Lookbook 3' },
    { id: 4, url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', alt: 'Lookbook 4' },
  ],
  footer: {
    newsletterTitle: 'NEWSLETTER',
    newsletterTitleFa: 'خبرنامه',
    newsletterDescription: 'Subscribe to receive updates, access to exclusive deals, and more.',
    newsletterDescriptionFa: 'برای دریافت آخرین اخبار و تخفیف‌ها عضو شوید.',
    socialLinks: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
      pinterest: 'https://pinterest.com',
    },
    contactEmail: 'contact@init.com',
    contactPhone: '+1 555-0100',
    address: '100 Fashion Ave, New York, NY 10001',
  },
  menuItems: [
    { id: 1, label: 'NEW ARRIVALS', labelFa: 'جدیدترین‌ها', href: '#new', isActive: true },
    { id: 2, label: 'WOMEN', labelFa: 'زنانه', href: '#women', isActive: true },
    { id: 3, label: 'MEN', labelFa: 'مردانه', href: '#men', isActive: true },
    { id: 4, label: 'COLLECTIONS', labelFa: 'کالکشن‌ها', href: '#collections', isActive: true },
    { id: 5, label: 'RUNWAY', labelFa: 'رانوی', href: '#runway', isActive: true },
    { id: 6, label: 'STORES', labelFa: 'فروشگاه‌ها', href: '#stores', isActive: true },
  ],
  general: {
    siteName: 'INiT',
    siteNameFa: 'اینیت',
    logo: '',
    favicon: '',
    primaryColor: '#000000',
    secondaryColor: '#ffffff',
  },
};

type SiteSection = 'hero' | 'craftsmanship' | 'lookbook' | 'footer' | 'menu' | 'general';

export function SiteManager() {
  const { isRTL } = useLanguage();
  const [activeSection, setActiveSection] = useState<SiteSection>('hero');
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load saved content on mount
  useEffect(() => {
    const saved = storage.get<SiteContent>(SITE_CONTENT_KEY, defaultContent);
    setContent(saved);
  }, []);

  // Save content
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    storage.set(SITE_CONTENT_KEY, content);
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const sections: { id: SiteSection; label: string; icon: string }[] = [
    { id: 'hero', label: 'Hero Section', icon: '🎬' },
    { id: 'craftsmanship', label: 'Craftsmanship', icon: '✨' },
    { id: 'lookbook', label: 'Lookbook', icon: '📸' },
    { id: 'footer', label: 'Footer', icon: '📝' },
    { id: 'menu', label: 'Menu Items', icon: '☰' },
    { id: 'general', label: 'General', icon: '⚙️' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white text-xl tracking-[0.2em] font-light">SITE MANAGER</h2>
          <p className="text-white/40 text-sm mt-1">Customize your website content and appearance</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-3 text-sm tracking-[0.2em] rounded transition-colors ${
            isSaving 
              ? 'bg-white/50 text-black cursor-not-allowed' 
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          {isSaving ? 'SAVING...' : 'SAVE ALL CHANGES'}
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Changes saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4">
            <h3 className="text-white/60 text-xs tracking-[0.2em] mb-4">SECTIONS</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors text-sm ${
                    activeSection === section.id
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
            {/* Hero Section Editor */}
            {activeSection === 'hero' && (
              <div className="space-y-6">
                <h3 className="text-white text-lg tracking-[0.1em] mb-4">Hero Section</h3>
                
                <div>
                  <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">BACKGROUND IMAGE</label>
                  <ImageUploader
                    currentImage={content.hero.backgroundImage}
                    onImageChange={(url) => setContent({
                      ...content,
                      hero: { ...content.hero, backgroundImage: url }
                    })}
                    aspectRatio="landscape"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">TITLE (English)</label>
                    <input
                      type="text"
                      value={content.hero.title}
                      onChange={(e) => setContent({
                        ...content,
                        hero: { ...content.hero, title: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">TITLE (فارسی)</label>
                    <input
                      type="text"
                      value={content.hero.titleFa}
                      onChange={(e) => setContent({
                        ...content,
                        hero: { ...content.hero, titleFa: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">SUBTITLE (English)</label>
                    <textarea
                      value={content.hero.subtitle}
                      onChange={(e) => setContent({
                        ...content,
                        hero: { ...content.hero, subtitle: e.target.value }
                      })}
                      rows={3}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">SUBTITLE (فارسی)</label>
                    <textarea
                      value={content.hero.subtitleFa}
                      onChange={(e) => setContent({
                        ...content,
                        hero: { ...content.hero, subtitleFa: e.target.value }
                      })}
                      rows={3}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded resize-none"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">CTA TEXT (English)</label>
                    <input
                      type="text"
                      value={content.hero.ctaText}
                      onChange={(e) => setContent({
                        ...content,
                        hero: { ...content.hero, ctaText: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">CTA TEXT (فارسی)</label>
                    <input
                      type="text"
                      value={content.hero.ctaTextFa}
                      onChange={(e) => setContent({
                        ...content,
                        hero: { ...content.hero, ctaTextFa: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">CTA LINK</label>
                    <input
                      type="text"
                      value={content.hero.ctaLink}
                      onChange={(e) => setContent({
                        ...content,
                        hero: { ...content.hero, ctaLink: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-white/60 text-xs tracking-[0.15em] mb-4">PREVIEW</h4>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={content.hero.backgroundImage}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                      <h2 className="text-white text-3xl md:text-5xl tracking-[0.3em] mb-4">
                        {isRTL ? content.hero.titleFa : content.hero.title}
                      </h2>
                      <p className="text-white/80 text-sm md:text-base max-w-lg">
                        {isRTL ? content.hero.subtitleFa : content.hero.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Craftsmanship Section Editor */}
            {activeSection === 'craftsmanship' && (
              <div className="space-y-6">
                <h3 className="text-white text-lg tracking-[0.1em] mb-4">Craftsmanship Section</h3>
                
                <div>
                  <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">SECTION IMAGE</label>
                  <ImageUploader
                    currentImage={content.craftsmanship.image}
                    onImageChange={(url) => setContent({
                      ...content,
                      craftsmanship: { ...content.craftsmanship, image: url }
                    })}
                    aspectRatio="portrait"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">TITLE (English)</label>
                    <input
                      type="text"
                      value={content.craftsmanship.title}
                      onChange={(e) => setContent({
                        ...content,
                        craftsmanship: { ...content.craftsmanship, title: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">TITLE (فارسی)</label>
                    <input
                      type="text"
                      value={content.craftsmanship.titleFa}
                      onChange={(e) => setContent({
                        ...content,
                        craftsmanship: { ...content.craftsmanship, titleFa: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">DESCRIPTION (English)</label>
                    <textarea
                      value={content.craftsmanship.description}
                      onChange={(e) => setContent({
                        ...content,
                        craftsmanship: { ...content.craftsmanship, description: e.target.value }
                      })}
                      rows={5}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">DESCRIPTION (فارسی)</label>
                    <textarea
                      value={content.craftsmanship.descriptionFa}
                      onChange={(e) => setContent({
                        ...content,
                        craftsmanship: { ...content.craftsmanship, descriptionFa: e.target.value }
                      })}
                      rows={5}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded resize-none"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Lookbook Editor */}
            {activeSection === 'lookbook' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-lg tracking-[0.1em]">Lookbook Gallery</h3>
                  <button
                    onClick={() => setContent({
                      ...content,
                      lookbook: [
                        ...content.lookbook,
                        { id: Date.now(), url: '', alt: `Lookbook ${content.lookbook.length + 1}` }
                      ]
                    })}
                    className="px-4 py-2 bg-white/10 text-white text-sm rounded hover:bg-white/20 transition-colors"
                  >
                    + Add Image
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.lookbook.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <ImageUploader
                        currentImage={image.url}
                        onImageChange={(url) => {
                          const newLookbook = [...content.lookbook];
                          newLookbook[index] = { ...newLookbook[index], url };
                          setContent({ ...content, lookbook: newLookbook });
                        }}
                        aspectRatio="portrait"
                      />
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) => {
                            const newLookbook = [...content.lookbook];
                            newLookbook[index] = { ...newLookbook[index], alt: e.target.value };
                            setContent({ ...content, lookbook: newLookbook });
                          }}
                          placeholder="Alt text"
                          className="flex-1 bg-black border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-white/40 rounded"
                        />
                        <button
                          onClick={() => {
                            const newLookbook = content.lookbook.filter((_, i) => i !== index);
                            setContent({ ...content, lookbook: newLookbook });
                          }}
                          className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Editor */}
            {activeSection === 'footer' && (
              <div className="space-y-6">
                <h3 className="text-white text-lg tracking-[0.1em] mb-4">Footer Settings</h3>

                <div className="space-y-6">
                  <div className="p-4 bg-black/30 rounded-lg">
                    <h4 className="text-white/60 text-xs tracking-[0.15em] mb-4">NEWSLETTER</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Title (English)</label>
                        <input
                          type="text"
                          value={content.footer.newsletterTitle}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, newsletterTitle: e.target.value }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Title (فارسی)</label>
                        <input
                          type="text"
                          value={content.footer.newsletterTitleFa}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, newsletterTitleFa: e.target.value }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                          dir="rtl"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Description (English)</label>
                        <textarea
                          value={content.footer.newsletterDescription}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, newsletterDescription: e.target.value }
                          })}
                          rows={2}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Description (فارسی)</label>
                        <textarea
                          value={content.footer.newsletterDescriptionFa}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, newsletterDescriptionFa: e.target.value }
                          })}
                          rows={2}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded resize-none"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg">
                    <h4 className="text-white/60 text-xs tracking-[0.15em] mb-4">CONTACT INFO</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Email</label>
                        <input
                          type="email"
                          value={content.footer.contactEmail}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, contactEmail: e.target.value }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Phone</label>
                        <input
                          type="text"
                          value={content.footer.contactPhone}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, contactPhone: e.target.value }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                          dir="ltr"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-white/60 text-xs mb-2">Address</label>
                        <input
                          type="text"
                          value={content.footer.address}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, address: e.target.value }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg">
                    <h4 className="text-white/60 text-xs tracking-[0.15em] mb-4">SOCIAL LINKS</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Instagram</label>
                        <input
                          type="url"
                          value={content.footer.socialLinks.instagram}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, socialLinks: { ...content.footer.socialLinks, instagram: e.target.value } }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Twitter</label>
                        <input
                          type="url"
                          value={content.footer.socialLinks.twitter}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, socialLinks: { ...content.footer.socialLinks, twitter: e.target.value } }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs mb-2">YouTube</label>
                        <input
                          type="url"
                          value={content.footer.socialLinks.youtube}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, socialLinks: { ...content.footer.socialLinks, youtube: e.target.value } }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs mb-2">Pinterest</label>
                        <input
                          type="url"
                          value={content.footer.socialLinks.pinterest}
                          onChange={(e) => setContent({
                            ...content,
                            footer: { ...content.footer, socialLinks: { ...content.footer.socialLinks, pinterest: e.target.value } }
                          })}
                          className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items Editor */}
            {activeSection === 'menu' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-lg tracking-[0.1em]">Navigation Menu</h3>
                  <button
                    onClick={() => setContent({
                      ...content,
                      menuItems: [
                        ...content.menuItems,
                        { id: Date.now(), label: 'New Item', labelFa: 'آیتم جدید', href: '#', isActive: true }
                      ]
                    })}
                    className="px-4 py-2 bg-white/10 text-white text-sm rounded hover:bg-white/20 transition-colors"
                  >
                    + Add Menu Item
                  </button>
                </div>

                <div className="space-y-4">
                  {content.menuItems.map((item, index) => (
                    <div key={item.id} className="p-4 bg-black/30 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                          <label className="block text-white/60 text-xs mb-2">Label (English)</label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const newItems = [...content.menuItems];
                              newItems[index] = { ...newItems[index], label: e.target.value };
                              setContent({ ...content, menuItems: newItems });
                            }}
                            className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 text-xs mb-2">Label (فارسی)</label>
                          <input
                            type="text"
                            value={item.labelFa}
                            onChange={(e) => {
                              const newItems = [...content.menuItems];
                              newItems[index] = { ...newItems[index], labelFa: e.target.value };
                              setContent({ ...content, menuItems: newItems });
                            }}
                            className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                            dir="rtl"
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 text-xs mb-2">Link</label>
                          <input
                            type="text"
                            value={item.href}
                            onChange={(e) => {
                              const newItems = [...content.menuItems];
                              newItems[index] = { ...newItems[index], href: e.target.value };
                              setContent({ ...content, menuItems: newItems });
                            }}
                            className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                            dir="ltr"
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.isActive}
                              onChange={(e) => {
                                const newItems = [...content.menuItems];
                                newItems[index] = { ...newItems[index], isActive: e.target.checked };
                                setContent({ ...content, menuItems: newItems });
                              }}
                              className="w-4 h-4"
                            />
                            <span className="text-white/60 text-sm">Active</span>
                          </label>
                          <button
                            onClick={() => {
                              const newItems = content.menuItems.filter((_, i) => i !== index);
                              setContent({ ...content, menuItems: newItems });
                            }}
                            className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="space-y-6">
                <h3 className="text-white text-lg tracking-[0.1em] mb-4">General Settings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">SITE LOGO</label>
                    <ImageUploader
                      currentImage={content.general.logo}
                      onImageChange={(url) => setContent({
                        ...content,
                        general: { ...content.general, logo: url }
                      })}
                      aspectRatio="square"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">FAVICON</label>
                    <ImageUploader
                      currentImage={content.general.favicon}
                      onImageChange={(url) => setContent({
                        ...content,
                        general: { ...content.general, favicon: url }
                      })}
                      aspectRatio="square"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">SITE NAME (English)</label>
                    <input
                      type="text"
                      value={content.general.siteName}
                      onChange={(e) => setContent({
                        ...content,
                        general: { ...content.general, siteName: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">SITE NAME (فارسی)</label>
                    <input
                      type="text"
                      value={content.general.siteNameFa}
                      onChange={(e) => setContent({
                        ...content,
                        general: { ...content.general, siteNameFa: e.target.value }
                      })}
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">PRIMARY COLOR</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={content.general.primaryColor}
                        onChange={(e) => setContent({
                          ...content,
                          general: { ...content.general, primaryColor: e.target.value }
                        })}
                        className="w-12 h-12 bg-transparent border border-white/20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={content.general.primaryColor}
                        onChange={(e) => setContent({
                          ...content,
                          general: { ...content.general, primaryColor: e.target.value }
                        })}
                        className="flex-1 bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">SECONDARY COLOR</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={content.general.secondaryColor}
                        onChange={(e) => setContent({
                          ...content,
                          general: { ...content.general, secondaryColor: e.target.value }
                        })}
                        className="w-12 h-12 bg-transparent border border-white/20 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={content.general.secondaryColor}
                        onChange={(e) => setContent({
                          ...content,
                          general: { ...content.general, secondaryColor: e.target.value }
                        })}
                        className="flex-1 bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
