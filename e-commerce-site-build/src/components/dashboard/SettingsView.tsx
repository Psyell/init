import { useState } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { useLanguage } from '@/i18n/LanguageContext';

export function SettingsView() {
  const [storeName, setStoreName] = useState('NOIR');
  const [storeEmail, setStoreEmail] = useState('contact@noir-fashion.com');
  const [currency, setCurrency] = useState('USD');
  const [storeLogo, setStoreLogo] = useState('');
  const [notifications, setNotifications] = useState({
    orders: true,
    stock: true,
    customers: false,
    marketing: false,
  });
  
  const { t } = useLanguage();

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white text-xl tracking-[0.2em] font-light">{t.dashboard.settings}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Store Logo */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
            <h3 className="text-white text-sm tracking-[0.2em] mb-6">{t.dashboard.storeLogo}</h3>
            <ImageUploader
              currentImage={storeLogo}
              onImageChange={setStoreLogo}
              aspectRatio="square"
              className="max-w-xs"
            />
          </div>

          {/* Store Settings */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
            <h3 className="text-white text-sm tracking-[0.2em] mb-6">{t.dashboard.storeSettings}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">{t.dashboard.storeName}</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">{t.dashboard.storeEmail}</label>
                <input
                  type="email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">{t.dashboard.currency}</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
            <h3 className="text-white text-sm tracking-[0.2em] mb-6">{t.dashboard.notificationsSettings}</h3>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-white text-sm capitalize">
                      {key === 'orders' && t.dashboard.orderNotifications}
                      {key === 'stock' && t.dashboard.stockNotifications}
                      {key === 'customers' && t.dashboard.customerNotifications}
                      {key === 'marketing' && t.dashboard.marketingNotifications}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications({ ...notifications, [key]: !value })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      value ? 'bg-white' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                        value ? 'left-7 bg-black' : 'left-1 bg-white/60'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
            <h3 className="text-white text-sm tracking-[0.2em] mb-6">{t.dashboard.shippingSettings}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div>
                  <p className="text-white text-sm">{t.dashboard.freeShippingThreshold}</p>
                </div>
                <input
                  type="text"
                  defaultValue="$500"
                  className="w-24 bg-black border border-white/20 text-white px-3 py-2 text-sm text-right focus:outline-none focus:border-white/40 rounded"
                  dir="ltr"
                />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <div>
                  <p className="text-white text-sm">{t.dashboard.standardShipping}</p>
                  <p className="text-white/40 text-xs">5-7 business days</p>
                </div>
                <input
                  type="text"
                  defaultValue="$25"
                  className="w-24 bg-black border border-white/20 text-white px-3 py-2 text-sm text-right focus:outline-none focus:border-white/40 rounded"
                  dir="ltr"
                />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-white text-sm">{t.dashboard.expressShipping}</p>
                  <p className="text-white/40 text-xs">2-3 business days</p>
                </div>
                <input
                  type="text"
                  defaultValue="$50"
                  className="w-24 bg-black border border-white/20 text-white px-3 py-2 text-sm text-right focus:outline-none focus:border-white/40 rounded"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account */}
          <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
            <h3 className="text-white text-sm tracking-[0.2em] mb-6">{t.dashboard.account}</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white text-2xl">A</span>
              </div>
              <div>
                <p className="text-white">Admin User</p>
                <p className="text-white/40 text-sm">admin@noir.com</p>
              </div>
            </div>
            <button className="w-full border border-white/20 text-white py-2 text-xs tracking-[0.15em] hover:border-white/40 transition-colors rounded">
              {t.dashboard.changePassword}
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-zinc-900/50 border border-red-500/20 rounded-lg p-6">
            <h3 className="text-red-400 text-sm tracking-[0.2em] mb-4">{t.dashboard.dangerZone}</h3>
            <p className="text-white/40 text-xs mb-4">
              {t.dashboard.deleteStoreWarning}
            </p>
            <button className="w-full border border-red-500/50 text-red-400 py-2 text-xs tracking-[0.15em] hover:bg-red-500/10 transition-colors rounded">
              {t.dashboard.deleteStore}
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="bg-white text-black px-8 py-3 text-sm tracking-[0.2em] hover:bg-gray-100 transition-colors rounded">
          {t.dashboard.saveChanges}
        </button>
      </div>
    </div>
  );
}
