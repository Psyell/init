import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  Product, Order, Customer, DashboardStats, Activity, Settings,
  ProductFilters, OrderFilters, ProductFormData
} from '@/types';
import { 
  productsApi, ordersApi, customersApi, dashboardApi, 
  settingsApi, activitiesApi 
} from '@/services/api';

interface StoreState {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  stats: DashboardStats | null;
  activities: Activity[];
  settings: Settings | null;
  isLoading: boolean;
  error: string | null;
}

interface StoreContextType extends StoreState {
  // Products
  fetchProducts: (filters?: Partial<ProductFilters>) => Promise<void>;
  createProduct: (data: ProductFormData) => Promise<Product>;
  updateProduct: (id: number, data: Partial<ProductFormData>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
  
  // Orders
  fetchOrders: (filters?: Partial<OrderFilters>) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  
  // Customers
  fetchCustomers: () => Promise<void>;
  
  // Dashboard
  fetchDashboardData: () => Promise<void>;
  
  // Settings
  fetchSettings: () => Promise<void>;
  updateSettings: (data: Partial<Settings>) => Promise<void>;
  
  // Activities
  fetchActivities: () => Promise<void>;
  
  // Refresh all data
  refreshAll: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>({
    products: [],
    orders: [],
    customers: [],
    stats: null,
    activities: [],
    settings: null,
    isLoading: true,
    error: null,
  });

  // Products
  const fetchProducts = useCallback(async (filters?: Partial<ProductFilters>) => {
    try {
      const response = await productsApi.getAll(filters);
      setState(prev => ({ ...prev, products: response.data }));
    } catch (error) {
      const err = error as { message: string };
      setState(prev => ({ ...prev, error: err.message }));
    }
  }, []);

  const createProduct = useCallback(async (data: ProductFormData): Promise<Product> => {
    const response = await productsApi.create(data);
    setState(prev => ({ ...prev, products: [...prev.products, response.data] }));
    return response.data;
  }, []);

  const updateProduct = useCallback(async (id: number, data: Partial<ProductFormData>): Promise<Product> => {
    const response = await productsApi.update(id, data);
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? response.data : p)
    }));
    return response.data;
  }, []);

  const deleteProduct = useCallback(async (id: number): Promise<void> => {
    await productsApi.delete(id);
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  }, []);

  // Orders
  const fetchOrders = useCallback(async (filters?: Partial<OrderFilters>) => {
    try {
      const response = await ordersApi.getAll(filters);
      setState(prev => ({ ...prev, orders: response.data }));
    } catch (error) {
      const err = error as { message: string };
      setState(prev => ({ ...prev, error: err.message }));
    }
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: Order['status']) => {
    const response = await ordersApi.updateStatus(id, status);
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === id ? response.data : o)
    }));
  }, []);

  // Customers
  const fetchCustomers = useCallback(async () => {
    try {
      const response = await customersApi.getAll();
      setState(prev => ({ ...prev, customers: response.data }));
    } catch (error) {
      const err = error as { message: string };
      setState(prev => ({ ...prev, error: err.message }));
    }
  }, []);

  // Dashboard
  const fetchDashboardData = useCallback(async () => {
    try {
      const statsResponse = await dashboardApi.getStats();
      setState(prev => ({ ...prev, stats: statsResponse.data }));
    } catch (error) {
      const err = error as { message: string };
      setState(prev => ({ ...prev, error: err.message }));
    }
  }, []);

  // Settings
  const fetchSettings = useCallback(async () => {
    try {
      const response = await settingsApi.get();
      setState(prev => ({ ...prev, settings: response.data }));
    } catch (error) {
      const err = error as { message: string };
      setState(prev => ({ ...prev, error: err.message }));
    }
  }, []);

  const updateSettings = useCallback(async (data: Partial<Settings>) => {
    const response = await settingsApi.update(data);
    setState(prev => ({ ...prev, settings: response.data }));
  }, []);

  // Activities
  const fetchActivities = useCallback(async () => {
    try {
      const response = await activitiesApi.getRecent(10);
      setState(prev => ({ ...prev, activities: response.data }));
    } catch (error) {
      const err = error as { message: string };
      setState(prev => ({ ...prev, error: err.message }));
    }
  }, []);

  // Refresh all
  const refreshAll = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await Promise.all([
        fetchProducts(),
        fetchOrders(),
        fetchCustomers(),
        fetchDashboardData(),
        fetchActivities(),
        fetchSettings(),
      ]);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [fetchProducts, fetchOrders, fetchCustomers, fetchDashboardData, fetchActivities, fetchSettings]);

  // Initial load
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        fetchOrders,
        updateOrderStatus,
        fetchCustomers,
        fetchDashboardData,
        fetchSettings,
        updateSettings,
        fetchActivities,
        refreshAll,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
