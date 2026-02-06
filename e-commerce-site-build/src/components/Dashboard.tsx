import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SiteManager } from './dashboard/SiteManager';

interface DashboardProps {
  onBackToStore: () => void;
}

// Sample data
const sampleProducts = [
  { id: 1, name: 'Leather Biker Jacket', price: 2890, category: 'outerwear', status: 'active', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80' },
  { id: 2, name: 'Draped Wool Coat', price: 3450, category: 'outerwear', status: 'active', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=200&q=80' },
  { id: 3, name: 'Geometric Knit Sweater', price: 890, category: 'tops', status: 'active', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=200&q=80' },
];

const sampleOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 3780, status: 'delivered', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 2890, status: 'shipped', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Mike Johnson', total: 1540, status: 'processing', date: '2024-01-13' },
  { id: 'ORD-004', customer: 'Sarah Williams', total: 4230, status: 'pending', date: '2024-01-12' },
];

const sampleCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, spent: 12450 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: 8670 },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 7, spent: 15890 },
];

const Dashboard: React.FC<DashboardProps> = ({ onBackToStore }) => {
  const [activeView, setActiveView] = useState('overview');
  const [products, setProducts] = useState(sampleProducts);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const { t, language, setLanguage, dir } = useLanguage();

  const stats = [
    { label: t('dashboard.totalRevenue'), value: '$124,580', icon: '💰', change: '+12%' },
    { label: t('dashboard.totalOrders'), value: '1,234', icon: '📦', change: '+8%' },
    { label: t('dashboard.totalProducts'), value: '156', icon: '👕', change: '+3%' },
    { label: t('dashboard.totalCustomers'), value: '892', icon: '👥', change: '+15%' },
  ];

  const menuItems = [
    { id: 'overview', label: t('dashboard.overview'), icon: '📊' },
    { id: 'products', label: t('dashboard.products'), icon: '👕' },
    { id: 'orders', label: t('dashboard.orders'), icon: '📦' },
    { id: 'customers', label: t('dashboard.customers'), icon: '👥' },
    { id: 'analytics', label: t('dashboard.analytics'), icon: '📈' },
    { id: 'sitemanager', label: 'Site Manager', icon: '🎨' },
    { id: 'settings', label: t('dashboard.settings'), icon: '⚙️' },
  ];

  const handleSaveProduct = (product: any) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black flex" dir={dir}>
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-white/10 fixed h-full">
        <div className="p-6">
          <h1 className="text-white text-xl tracking-[0.2em] font-light">INiT</h1>
          <p className="text-white/40 text-xs mt-1">Admin Dashboard</p>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                activeView === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <button
            onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
            className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white text-sm mb-3"
          >
            <span>🌐</span>
            <span>{language === 'en' ? 'فارسی' : 'English'}</span>
          </button>
          <button
            onClick={onBackToStore}
            className="w-full flex items-center gap-3 px-4 py-2 text-white/60 hover:text-white text-sm"
          >
            <span>←</span>
            <span>{t('dashboard.backToStore')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${dir === 'rtl' ? 'mr-64' : 'ml-64'} p-8`}>
        {/* Overview */}
        {activeView === 'overview' && (
          <div>
            <h2 className="text-white text-2xl font-light tracking-wider mb-8">{t('dashboard.overview')}</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="bg-neutral-900 border border-white/10 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/50 text-sm mb-2">{stat.label}</p>
                      <p className="text-white text-2xl font-light">{stat.value}</p>
                    </div>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <p className="text-green-400 text-sm mt-4">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-neutral-900 border border-white/10 p-6 mb-8">
              <h3 className="text-white text-lg mb-6">{t('dashboard.recentOrders')}</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-white/50 text-sm border-b border-white/10">
                    <th className="text-left py-3">Order ID</th>
                    <th className="text-left py-3">Customer</th>
                    <th className="text-left py-3">Total</th>
                    <th className="text-left py-3">{t('dashboard.status')}</th>
                    <th className="text-left py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-white/5 text-white/80">
                      <td className="py-4">{order.id}</td>
                      <td className="py-4">{order.customer}</td>
                      <td className="py-4">${order.total}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded ${
                          order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products */}
        {activeView === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white text-2xl font-light tracking-wider">{t('dashboard.products')}</h2>
              <button
                onClick={() => { setEditingProduct(null); setShowProductForm(true); }}
                className="bg-white text-black px-6 py-2 text-sm tracking-wider hover:bg-white/90"
              >
                + {t('dashboard.addProduct')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-neutral-900 border border-white/10 overflow-hidden group">
                  <div className="aspect-square relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        onClick={() => { setEditingProduct(product); setShowProductForm(true); }}
                        className="bg-white text-black px-4 py-2 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 text-white px-4 py-2 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-sm mb-1">{product.name}</h3>
                    <p className="text-white/50 text-sm">${product.price}</p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs ${
                      product.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-neutral-900 w-full max-w-lg p-6">
                  <h3 className="text-white text-xl mb-6">
                    {editingProduct ? t('dashboard.editProduct') : t('dashboard.addProduct')}
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    handleSaveProduct({
                      id: editingProduct?.id,
                      name: formData.get('name'),
                      price: Number(formData.get('price')),
                      category: formData.get('category'),
                      status: formData.get('status'),
                      image: formData.get('image') || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80',
                    });
                  }}>
                    <div className="space-y-4">
                      <input
                        name="name"
                        defaultValue={editingProduct?.name}
                        placeholder={t('dashboard.productName')}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm"
                        required
                      />
                      <input
                        name="price"
                        type="number"
                        defaultValue={editingProduct?.price}
                        placeholder={t('dashboard.price')}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm"
                        required
                      />
                      <select
                        name="category"
                        defaultValue={editingProduct?.category}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm"
                      >
                        <option value="outerwear">Outerwear</option>
                        <option value="tops">Tops</option>
                        <option value="bottoms">Bottoms</option>
                        <option value="footwear">Footwear</option>
                        <option value="accessories">Accessories</option>
                      </select>
                      <select
                        name="status"
                        defaultValue={editingProduct?.status || 'active'}
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                      </select>
                      <input
                        name="image"
                        defaultValue={editingProduct?.image}
                        placeholder="Image URL"
                        className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm"
                      />
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button type="submit" className="flex-1 bg-white text-black py-3 text-sm">
                        {t('dashboard.save')}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowProductForm(false); setEditingProduct(null); }}
                        className="flex-1 border border-white/20 text-white py-3 text-sm"
                      >
                        {t('dashboard.cancel')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders */}
        {activeView === 'orders' && (
          <div>
            <h2 className="text-white text-2xl font-light tracking-wider mb-8">{t('dashboard.orders')}</h2>
            <div className="bg-neutral-900 border border-white/10 p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-white/50 text-sm border-b border-white/10">
                    <th className="text-left py-3">Order ID</th>
                    <th className="text-left py-3">Customer</th>
                    <th className="text-left py-3">Total</th>
                    <th className="text-left py-3">{t('dashboard.status')}</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-left py-3">{t('dashboard.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 text-white/80">
                      <td className="py-4">{order.id}</td>
                      <td className="py-4">{order.customer}</td>
                      <td className="py-4">${order.total}</td>
                      <td className="py-4">
                        <select
                          defaultValue={order.status}
                          className="bg-black border border-white/20 text-white px-2 py-1 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4">{order.date}</td>
                      <td className="py-4">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers */}
        {activeView === 'customers' && (
          <div>
            <h2 className="text-white text-2xl font-light tracking-wider mb-8">{t('dashboard.customers')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCustomers.map((customer) => (
                <div key={customer.id} className="bg-neutral-900 border border-white/10 p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white">{customer.name}</h3>
                      <p className="text-white/50 text-sm">{customer.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white/50 text-xs">{t('dashboard.totalOrders')}</p>
                      <p className="text-white text-lg">{customer.orders}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Total Spent</p>
                      <p className="text-white text-lg">${customer.spent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics */}
        {activeView === 'analytics' && (
          <div>
            <h2 className="text-white text-2xl font-light tracking-wider mb-8">{t('dashboard.analytics')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-neutral-900 border border-white/10 p-6">
                <h3 className="text-white mb-6">Revenue Overview</h3>
                <div className="h-64 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 70, 90, 75, 60, 85, 95, 88].map((height, i) => (
                    <div key={i} className="flex-1 bg-white/20 hover:bg-white/40 transition-colors" style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-white/50 text-xs">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
              </div>
              <div className="bg-neutral-900 border border-white/10 p-6">
                <h3 className="text-white mb-6">Top Categories</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Outerwear', value: 45 },
                    { name: 'Tops', value: 30 },
                    { name: 'Footwear', value: 15 },
                    { name: 'Accessories', value: 10 },
                  ].map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between text-white/70 text-sm mb-1">
                        <span>{cat.name}</span>
                        <span>{cat.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10">
                        <div className="h-full bg-white/60" style={{ width: `${cat.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Site Manager */}
        {activeView === 'sitemanager' && (
          <SiteManager />
        )}

        {/* Settings */}
        {activeView === 'settings' && (
          <div>
            <h2 className="text-white text-2xl font-light tracking-wider mb-8">{t('dashboard.settings')}</h2>
            <div className="max-w-2xl space-y-6">
              <div className="bg-neutral-900 border border-white/10 p-6">
                <h3 className="text-white mb-6">Store Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-white/50 text-sm block mb-2">Store Name</label>
                    <input
                      type="text"
                      defaultValue="NOIR"
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-sm block mb-2">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="contact@noir.com"
                      className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-sm block mb-2">Currency</label>
                    <select className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                  <button className="bg-white text-black px-6 py-3 text-sm tracking-wider mt-4">
                    {t('dashboard.save')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
