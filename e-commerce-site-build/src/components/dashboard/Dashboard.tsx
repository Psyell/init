import { useState, useEffect } from 'react';
import { Product, Order, DashboardStats, Activity, RevenueData, CategoryData, ProductFormData } from '@/types';
import { productsApi, ordersApi, dashboardApi, activitiesApi } from '@/services/api';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/utils/cn';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { StatsCard } from './StatsCard';
import { RevenueChart } from './RevenueChart';
import { CategoryChart } from './CategoryChart';
import { RecentOrders } from './RecentOrders';
import { ActivityFeed } from './ActivityFeed';
import { ProductsManager } from './ProductsManager';
import { OrdersManager } from './OrdersManager';
import { CustomersView } from './CustomersView';
import { AnalyticsView } from './AnalyticsView';
import { SettingsView } from './SettingsView';

interface DashboardProps {
  onBackToStore?: () => void;
}

export function Dashboard({ onBackToStore }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, isRTL } = useLanguage();
  
  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, ordersRes, statsRes, activitiesRes, revenueRes, categoryRes] = await Promise.all([
          productsApi.getAll(),
          ordersApi.getAll(),
          dashboardApi.getStats(),
          activitiesApi.getRecent(10),
          dashboardApi.getRevenueData(),
          dashboardApi.getCategoryData(),
        ]);
        
        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setStats(statsRes.data);
        setActivities(activitiesRes.data);
        setRevenueData(revenueRes.data);
        setCategoryData(categoryRes.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async (productData: ProductFormData) => {
    try {
      const response = await productsApi.create(productData);
      setProducts(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleEditProduct = async (id: number, productData: Partial<ProductFormData>) => {
    try {
      const response = await productsApi.update(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? response.data : p));
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm(t.dashboard.confirmDelete)) {
      try {
        await productsApi.delete(id);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const response = await ordersApi.updateStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? response.data : o));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-white/40 tracking-[0.2em]">{t.dashboard.loading}</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatsCard
                title={t.dashboard.totalRevenue}
                value={stats?.totalRevenue || 0}
                change={stats?.revenueChange}
                icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                prefix="$"
              />
              <StatsCard
                title={t.dashboard.totalOrders}
                value={stats?.totalOrders || 0}
                change={stats?.ordersChange}
                icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
              <StatsCard
                title={t.dashboard.totalProducts}
                value={stats?.totalProducts || products.length}
                icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
              <StatsCard
                title={t.dashboard.totalCustomers}
                value={stats?.totalCustomers || 0}
                icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <RevenueChart data={revenueData} />
              </div>
              <CategoryChart data={categoryData} />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentOrders orders={orders} onViewAll={() => setActiveTab('orders')} />
              </div>
              <ActivityFeed activities={activities} />
            </div>
          </>
        );

      case 'products':
        return (
          <ProductsManager
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );

      case 'orders':
        return (
          <OrdersManager
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        );

      case 'customers':
        return <CustomersView />;

      case 'analytics':
        return <AnalyticsView />;

      case 'settings':
        return <SettingsView />;

      default:
        return null;
    }
  };

  return (
    <div className={cn("min-h-screen bg-black", isRTL ? "rtl" : "ltr")}>
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onBackToStore={onBackToStore}
      />

      <div className={cn(isRTL ? "lg:mr-64" : "lg:ml-64")}>
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
