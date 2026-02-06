import { useState, useEffect } from 'react';
import { Product, products } from './data/products';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import { useLanguage } from './context/LanguageContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { dir } = useLanguage();

  // Load cart and user from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          size,
          quantity: 1,
          image: product.images[0],
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: number, size: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const handleUpdateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setShowDashboard(false);
  };

  // Show Dashboard
  if (showDashboard && user?.role === 'admin') {
    return <Dashboard onBackToStore={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-black" dir={dir}>
      <Header
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onDashboardClick={() => setShowDashboard(true)}
        isLoggedIn={!!user}
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />

      <main>
        <Hero />
        
        <ProductGrid products={products} onProductClick={setSelectedProduct} />

        {/* Craftsmanship Section */}
        <section className="bg-black py-32 px-6 lg:px-12">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-white text-4xl md:text-5xl font-extralight tracking-[0.2em] mb-8">
                  CRAFTSMANSHIP
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  Each piece is meticulously crafted in our ateliers using traditional techniques 
                  passed down through generations, combined with innovative approaches to design 
                  and construction.
                </p>
                <p className="text-white/60 text-lg leading-relaxed">
                  We source the finest materials from around the world, working closely with 
                  specialized tanneries and mills to create fabrics that meet our exacting standards.
                </p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1000&q=80"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lookbook Section */}
        <section className="bg-neutral-900 py-24 px-6 lg:px-12">
          <div className="max-w-[1800px] mx-auto">
            <h2 className="text-white text-4xl md:text-5xl font-extralight tracking-[0.3em] text-center mb-16">
              LOOKBOOK
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
                'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
              ].map((image, index) => (
                <div key={index} className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
                  <img
                    src={image}
                    alt={`Lookbook ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
