import { useState } from 'react';
import { Product, ProductFormData } from '@/types';
import { cn } from '@/utils/cn';
import { ImageUploader } from '@/components/ImageUploader';

interface ProductsManagerProps {
  products: Product[];
  onAddProduct: (product: ProductFormData) => void;
  onEditProduct: (id: number, product: Partial<ProductFormData>) => void;
  onDeleteProduct: (id: number) => void;
}

export function ProductsManager({ products, onAddProduct, onEditProduct, onDeleteProduct }: ProductsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    category: string;
    description: string;
    image: string;
    sizes: string;
    stock: string;
    status: 'active' | 'draft' | 'archived';
  }>({
    name: '',
    price: '',
    category: 'OUTERWEAR',
    description: '',
    image: '',
    sizes: 'XS,S,M,L,XL',
    stock: '50',
    status: 'active',
  });

  const categories = ['ALL', 'OUTERWEAR', 'KNITWEAR', 'TOPS', 'BOTTOMS', 'FOOTWEAR'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: ProductFormData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      sizes: formData.sizes.split(',').map(s => s.trim()),
      stock: parseInt(formData.stock),
      status: formData.status,
    };

    if (editingProduct) {
      onEditProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'OUTERWEAR',
      description: '',
      image: '',
      sizes: 'XS,S,M,L,XL',
      stock: '50',
      status: 'active',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      sizes: product.sizes.join(','),
      stock: product.stock.toString(),
      status: product.status,
    });
    setShowForm(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-white text-xl tracking-[0.2em] font-light">PRODUCTS</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-black px-6 py-3 text-xs tracking-[0.2em] hover:bg-gray-100 transition-colors"
        >
          + ADD PRODUCT
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 rounded"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-colors group"
          >
            <div className="relative aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-white text-black p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Status Badge */}
              <div className={cn(
                "absolute top-2 right-2 px-2 py-1 text-xs rounded",
                product.status === 'active' ? 'bg-green-500/80 text-white' :
                product.status === 'draft' ? 'bg-yellow-500/80 text-black' :
                'bg-gray-500/80 text-white'
              )}>
                {product.status}
              </div>
            </div>

            <div className="p-4">
              <p className="text-white/40 text-xs tracking-[0.15em] mb-1">{product.category}</p>
              <h3 className="text-white text-sm mb-2 truncate">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-white">${product.price.toLocaleString()}</span>
                <span className="text-white/40 text-xs">Stock: {product.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-white/10 rounded-lg w-full max-w-2xl my-8">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-white text-lg tracking-[0.2em]">
                {editingProduct ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
              </h3>
              <button
                onClick={resetForm}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">PRICE ($)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  >
                    {categories.filter(c => c !== 'ALL').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">STATUS</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'draft' | 'archived' })}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">تصویر محصول</label>
                <ImageUploader
                  currentImage={formData.image}
                  onImageChange={(url) => setFormData({ ...formData, image: url })}
                  aspectRatio="portrait"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">DESCRIPTION</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">SIZES (comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs tracking-[0.15em] mb-2">STOCK</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 border border-white/20 text-white py-3 text-sm tracking-[0.2em] hover:border-white/40 transition-colors rounded"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-white text-black py-3 text-sm tracking-[0.2em] hover:bg-gray-100 transition-colors rounded"
                >
                  {editingProduct ? 'UPDATE' : 'CREATE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
