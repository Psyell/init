import React, { useState } from 'react';
import { Product } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { t, dir } = useLanguage();

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, selectedSize);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black" dir={dir}>
      {/* Close Button */}
      <button
        onClick={onClose}
        className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-10 text-white hover:opacity-70 transition-opacity`}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="h-full overflow-y-auto">
        <div className="min-h-full flex flex-col lg:flex-row">
          {/* Images Section */}
          <div className="lg:w-3/5 bg-neutral-900">
            {/* Main Image */}
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-screen sticky top-0">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 p-4 lg:absolute lg:bottom-4 lg:left-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-20 overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-white' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center">
            <div className="max-w-md">
              {/* Category */}
              <p className="text-white/50 text-xs tracking-[0.3em] mb-4">
                {product.category.toUpperCase()}
              </p>

              {/* Title */}
              <h1 className="text-white text-3xl md:text-4xl font-extralight tracking-[0.1em] mb-6">
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-white text-2xl font-light tracking-wider mb-8">
                ${product.price.toLocaleString()}
              </p>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white text-sm tracking-[0.2em]">{t('product.selectSize')}</span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-white/50 text-xs tracking-wider hover:text-white transition-colors"
                  >
                    {t('product.sizeGuide')}
                  </button>
                </div>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border text-sm tracking-wider transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'bg-transparent text-white border-white/30 hover:border-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 text-sm tracking-[0.3em] transition-all duration-300 ${
                  selectedSize
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-white/20 text-white/50 cursor-not-allowed'
                }`}
              >
                {t('product.addToCart')}
              </button>

              {/* Additional Info */}
              <div className="mt-12 space-y-4 border-t border-white/10 pt-8">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-white text-sm tracking-wider py-2">
                    <span>{t('product.details')}</span>
                    <span className="group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-white/60 text-sm leading-relaxed py-4">
                    {product.description}
                  </p>
                </details>
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-white text-sm tracking-wider py-2">
                    <span>{t('product.shipping')}</span>
                    <span className="group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-white/60 text-sm leading-relaxed py-4">
                    {t('product.shippingInfo')}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-6">
          <div className="bg-neutral-900 max-w-2xl w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-xl tracking-[0.2em]">{t('product.sizeGuide')}</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-white hover:opacity-70">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <table className="w-full text-white text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 text-left">SIZE</th>
                  <th className="py-3 text-left">CHEST (cm)</th>
                  <th className="py-3 text-left">WAIST (cm)</th>
                  <th className="py-3 text-left">HIPS (cm)</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/10"><td className="py-3">XS</td><td>82-86</td><td>66-70</td><td>90-94</td></tr>
                <tr className="border-b border-white/10"><td className="py-3">S</td><td>86-90</td><td>70-74</td><td>94-98</td></tr>
                <tr className="border-b border-white/10"><td className="py-3">M</td><td>90-94</td><td>74-78</td><td>98-102</td></tr>
                <tr className="border-b border-white/10"><td className="py-3">L</td><td>94-98</td><td>78-82</td><td>102-106</td></tr>
                <tr><td className="py-3">XL</td><td>98-102</td><td>82-86</td><td>106-110</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
