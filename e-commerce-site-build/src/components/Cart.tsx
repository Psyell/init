import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number, size: string) => void;
  onUpdateQuantity: (id: number, size: string, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }) => {
  const { t, dir } = useLanguage();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-black z-50 transform transition-transform duration-500 ${
          isOpen 
            ? 'translate-x-0' 
            : dir === 'rtl' ? '-translate-x-full' : 'translate-x-full'
        }`}
        dir={dir}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-white text-lg tracking-[0.3em]">{t('cart.title')}</h2>
            <button onClick={onClose} className="text-white hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-white/50 text-sm tracking-wider">{t('cart.empty')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-32 bg-neutral-900 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-white text-sm tracking-wider mb-1">{item.name}</h3>
                      <p className="text-white/50 text-xs tracking-wider mb-2">{t('cart.size')}: {item.size}</p>
                      <p className="text-white text-sm mb-4">${item.price.toLocaleString()}</p>

                      {/* Quantity */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/20">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 text-white hover:bg-white/10 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-white text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 text-white hover:bg-white/10 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id, item.size)}
                          className="text-white/50 text-xs tracking-wider hover:text-white transition-colors"
                        >
                          {t('cart.remove')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/70 text-sm tracking-wider">{t('cart.subtotal')}</span>
                <span className="text-white text-lg tracking-wider">${total.toLocaleString()}</span>
              </div>
              <button className="w-full bg-white text-black py-4 text-sm tracking-[0.3em] hover:bg-white/90 transition-colors mb-3">
                {t('cart.checkout')}
              </button>
              <button
                onClick={onClose}
                className="w-full border border-white/30 text-white py-4 text-sm tracking-[0.3em] hover:bg-white/10 transition-colors"
              >
                {t('cart.continueShopping')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
