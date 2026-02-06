import React, { useState } from 'react';
import { Product } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { t, dir } = useLanguage();

  const categories = [
    { id: 'all', name: t('categories.all') },
    { id: 'outerwear', name: t('categories.outerwear') },
    { id: 'tops', name: t('categories.tops') },
    { id: 'bottoms', name: t('categories.bottoms') },
    { id: 'footwear', name: t('categories.footwear') },
    { id: 'accessories', name: t('categories.accessories') },
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="collection" className="bg-black py-24 px-6 lg:px-12" dir={dir}>
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl font-extralight tracking-[0.3em] mb-4">
            {t('products.title')}
          </h2>
          <div className="w-24 h-[1px] bg-white/30 mx-auto" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`text-sm tracking-[0.2em] transition-all duration-300 pb-2 border-b ${
                activeCategory === category.id
                  ? 'text-white border-white'
                  : 'text-white/50 border-transparent hover:text-white/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 mb-6">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 text-white text-xs tracking-[0.2em] bg-black/80 px-3 py-1">
                    {t('products.new')}
                  </span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-white text-sm tracking-[0.15em] mb-2 group-hover:opacity-70 transition-opacity">
                  {product.name}
                </h3>
                <p className="text-white/60 text-sm tracking-wider">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
