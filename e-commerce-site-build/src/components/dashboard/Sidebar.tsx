import { cn } from '@/utils/cn';
import { useLanguage, LanguageSwitcher } from '@/i18n/LanguageContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onBackToStore?: () => void;
}

export function Sidebar({ activeTab, onTabChange, isOpen, onClose, onBackToStore: _onBackToStore }: SidebarProps) {
  const { t, isRTL } = useLanguage();

  const menuItems = [
    { id: 'overview', label: t.dashboard.overview, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'products', label: t.dashboard.products, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'orders', label: t.dashboard.orders, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { id: 'customers', label: t.dashboard.customers, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'analytics', label: t.dashboard.analytics, icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'settings', label: t.dashboard.settings, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 h-full bg-zinc-950 border-white/10 z-50 transition-transform duration-300 w-64",
          isRTL ? "right-0 border-l lg:translate-x-0" : "left-0 border-r lg:translate-x-0",
          isOpen 
            ? "translate-x-0" 
            : isRTL 
              ? "translate-x-full" 
              : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <span className="text-white text-lg tracking-[0.2em] font-light">INiT</span>
          <span className="text-white/30 text-xs tracking-widest">ADMIN</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-xs tracking-[0.15em] transition-all duration-200 rounded",
                activeTab === item.id
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Language Switcher */}
        <div className="px-4 py-2">
          <LanguageSwitcher className="w-full justify-center border border-white/10 rounded" />
        </div>

        {/* Back to Store */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-4 border-t border-white/10"
        )}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
            className="flex items-center gap-3 px-4 py-3 text-white/40 text-xs tracking-[0.15em] hover:text-white transition-colors"
          >
            <svg className={cn("w-5 h-5", isRTL && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            {t.dashboard.backToStore}
          </a>
        </div>
      </aside>
    </>
  );
}
