// ============ API Service Layer ============
// Simulates HTTP requests with localStorage persistence

import { storage, StorageKeys } from './storage';
import { 
  Product, Order, Customer, User, Settings, Activity,
  ApiResponse, PaginatedResponse, LoginCredentials,
  ProductFilters, OrderFilters, CustomerFilters,
  DashboardStats, ProductFormData
} from '@/types';
import { initialProducts, initialOrders, initialCustomers, initialSettings, initialActivities } from '@/data/initialData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const API_DELAY = 300;

// Generate unique IDs
const generateId = () => Date.now() + Math.random();

// ============ Products API ============
export const productsApi = {
  async getAll(filters?: Partial<ProductFilters>): Promise<PaginatedResponse<Product>> {
    await delay(API_DELAY);
    
    let products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    
    // Apply filters
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }
    
    if (filters?.category && filters.category !== 'ALL') {
      products = products.filter(p => p.category === filters.category);
    }
    
    if (filters?.status && filters.status !== 'ALL') {
      products = products.filter(p => p.status === filters.status);
    }
    
    if (filters?.minPrice !== undefined) {
      products = products.filter(p => p.price >= filters.minPrice!);
    }
    
    if (filters?.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filters.maxPrice!);
    }
    
    // Apply sorting
    const sortBy = filters?.sortBy || 'createdAt';
    const sortOrder = filters?.sortOrder || 'desc';
    
    products.sort((a, b) => {
      const aVal = a[sortBy as keyof Product];
      const bVal = b[sortBy as keyof Product];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    
    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedProducts = products.slice(start, start + limit);
    
    return {
      success: true,
      data: paginatedProducts,
      pagination: { page, limit, total, totalPages }
    };
  },

  async getById(id: number): Promise<ApiResponse<Product>> {
    await delay(API_DELAY);
    
    const products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    const product = products.find(p => p.id === id);
    
    if (!product) {
      throw { status: 404, message: 'Product not found' };
    }
    
    return { success: true, data: product };
  },

  async create(data: ProductFormData): Promise<ApiResponse<Product>> {
    await delay(API_DELAY);
    
    const products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    
    const newProduct: Product = {
      ...data,
      id: Math.floor(generateId()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    products.push(newProduct);
    storage.set(StorageKeys.PRODUCTS, products);
    
    // Log activity
    await activitiesApi.log({
      type: 'product',
      message: `Product "${newProduct.name}" created`,
      details: `ID: ${newProduct.id}`,
    });
    
    return { success: true, data: newProduct, message: 'Product created successfully' };
  },

  async update(id: number, data: Partial<ProductFormData>): Promise<ApiResponse<Product>> {
    await delay(API_DELAY);
    
    const products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw { status: 404, message: 'Product not found' };
    }
    
    const updatedProduct: Product = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    products[index] = updatedProduct;
    storage.set(StorageKeys.PRODUCTS, products);
    
    await activitiesApi.log({
      type: 'product',
      message: `Product "${updatedProduct.name}" updated`,
    });
    
    return { success: true, data: updatedProduct, message: 'Product updated successfully' };
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    await delay(API_DELAY);
    
    const products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    const product = products.find(p => p.id === id);
    
    if (!product) {
      throw { status: 404, message: 'Product not found' };
    }
    
    const filteredProducts = products.filter(p => p.id !== id);
    storage.set(StorageKeys.PRODUCTS, filteredProducts);
    
    await activitiesApi.log({
      type: 'product',
      message: `Product "${product.name}" deleted`,
    });
    
    return { success: true, data: null, message: 'Product deleted successfully' };
  },

  async updateStock(id: number, quantity: number): Promise<ApiResponse<Product>> {
    await delay(API_DELAY);
    
    const products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw { status: 404, message: 'Product not found' };
    }
    
    products[index].stock += quantity;
    products[index].updatedAt = new Date().toISOString();
    
    if (products[index].stock <= 5) {
      await activitiesApi.log({
        type: 'stock',
        message: `Low stock alert: ${products[index].name}`,
        details: `Only ${products[index].stock} items left`,
      });
    }
    
    storage.set(StorageKeys.PRODUCTS, products);
    
    return { success: true, data: products[index] };
  },
};

// ============ Orders API ============
export const ordersApi = {
  async getAll(filters?: Partial<OrderFilters>): Promise<PaginatedResponse<Order>> {
    await delay(API_DELAY);
    
    let orders = storage.get<Order[]>(StorageKeys.ORDERS, initialOrders);
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      orders = orders.filter(o => 
        o.id.toLowerCase().includes(search) ||
        o.customer.name.toLowerCase().includes(search) ||
        o.customer.email.toLowerCase().includes(search)
      );
    }
    
    if (filters?.status && filters.status !== 'ALL') {
      orders = orders.filter(o => o.status === filters.status);
    }
    
    if (filters?.paymentStatus && filters.paymentStatus !== 'ALL') {
      orders = orders.filter(o => o.paymentStatus === filters.paymentStatus);
    }
    
    if (filters?.dateFrom) {
      orders = orders.filter(o => new Date(o.createdAt) >= new Date(filters.dateFrom!));
    }
    
    if (filters?.dateTo) {
      orders = orders.filter(o => new Date(o.createdAt) <= new Date(filters.dateTo!));
    }
    
    // Sort
    const sortBy = filters?.sortBy || 'createdAt';
    const sortOrder = filters?.sortOrder || 'desc';
    
    orders.sort((a, b) => {
      const aVal = sortBy === 'createdAt' ? new Date(a.createdAt).getTime() : a.total;
      const bVal = sortBy === 'createdAt' ? new Date(b.createdAt).getTime() : b.total;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
    
    // Pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const total = orders.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedOrders = orders.slice(start, start + limit);
    
    return {
      success: true,
      data: paginatedOrders,
      pagination: { page, limit, total, totalPages }
    };
  },

  async getById(id: string): Promise<ApiResponse<Order>> {
    await delay(API_DELAY);
    
    const orders = storage.get<Order[]>(StorageKeys.ORDERS, initialOrders);
    const order = orders.find(o => o.id === id);
    
    if (!order) {
      throw { status: 404, message: 'Order not found' };
    }
    
    return { success: true, data: order };
  },

  async updateStatus(id: string, status: Order['status']): Promise<ApiResponse<Order>> {
    await delay(API_DELAY);
    
    const orders = storage.get<Order[]>(StorageKeys.ORDERS, initialOrders);
    const index = orders.findIndex(o => o.id === id);
    
    if (index === -1) {
      throw { status: 404, message: 'Order not found' };
    }
    
    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    storage.set(StorageKeys.ORDERS, orders);
    
    await activitiesApi.log({
      type: 'order',
      message: `Order ${id} status updated to ${status}`,
    });
    
    return { success: true, data: orders[index], message: 'Order status updated' };
  },

  async updatePaymentStatus(id: string, paymentStatus: Order['paymentStatus']): Promise<ApiResponse<Order>> {
    await delay(API_DELAY);
    
    const orders = storage.get<Order[]>(StorageKeys.ORDERS, initialOrders);
    const index = orders.findIndex(o => o.id === id);
    
    if (index === -1) {
      throw { status: 404, message: 'Order not found' };
    }
    
    orders[index].paymentStatus = paymentStatus;
    orders[index].updatedAt = new Date().toISOString();
    storage.set(StorageKeys.ORDERS, orders);
    
    return { success: true, data: orders[index] };
  },

  async getStats(): Promise<ApiResponse<{ pending: number; processing: number; shipped: number; delivered: number }>> {
    await delay(API_DELAY);
    
    const orders = storage.get<Order[]>(StorageKeys.ORDERS, initialOrders);
    
    const stats = {
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
    };
    
    return { success: true, data: stats };
  },
};

// ============ Customers API ============
export const customersApi = {
  async getAll(filters?: Partial<CustomerFilters>): Promise<PaginatedResponse<Customer>> {
    await delay(API_DELAY);
    
    let customers = storage.get<Customer[]>(StorageKeys.CUSTOMERS, initialCustomers);
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      customers = customers.filter(c => 
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search)
      );
    }
    
    if (filters?.status && filters.status !== 'ALL') {
      customers = customers.filter(c => c.status === filters.status);
    }
    
    // Sort
    const sortBy = filters?.sortBy || 'name';
    const sortOrder = filters?.sortOrder || 'asc';
    
    customers.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      const aVal = a[sortBy as keyof Customer] as number;
      const bVal = b[sortBy as keyof Customer] as number;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
    
    // Pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const total = customers.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedCustomers = customers.slice(start, start + limit);
    
    return {
      success: true,
      data: paginatedCustomers,
      pagination: { page, limit, total, totalPages }
    };
  },

  async getById(id: number): Promise<ApiResponse<Customer>> {
    await delay(API_DELAY);
    
    const customers = storage.get<Customer[]>(StorageKeys.CUSTOMERS, initialCustomers);
    const customer = customers.find(c => c.id === id);
    
    if (!customer) {
      throw { status: 404, message: 'Customer not found' };
    }
    
    return { success: true, data: customer };
  },

  async getStats(): Promise<ApiResponse<{ total: number; active: number; totalRevenue: number }>> {
    await delay(API_DELAY);
    
    const customers = storage.get<Customer[]>(StorageKeys.CUSTOMERS, initialCustomers);
    
    return {
      success: true,
      data: {
        total: customers.length,
        active: customers.filter(c => c.status === 'active').length,
        totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
      }
    };
  },
};

// ============ Auth API ============
export const authApi = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(API_DELAY);
    
    // Demo credentials
    if (credentials.email === 'admin@noir.com' && credentials.password === 'admin123') {
      const user: User = {
        id: 1,
        email: 'admin@noir.com',
        name: 'Admin User',
        role: 'admin',
        permissions: [
          'products.read', 'products.write', 'products.delete',
          'orders.read', 'orders.write', 'orders.delete',
          'customers.read', 'customers.write', 'customers.delete',
          'analytics.read',
          'settings.read', 'settings.write'
        ],
        createdAt: '2024-01-01T00:00:00Z',
        lastLoginAt: new Date().toISOString(),
      };
      
      const token = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 86400000 }));
      
      storage.set(StorageKeys.AUTH_USER, user);
      storage.set(StorageKeys.AUTH_TOKEN, token);
      
      await activitiesApi.log({
        type: 'system',
        message: `User ${user.name} logged in`,
        userId: user.id,
      });
      
      return { success: true, data: { user, token } };
    }
    
    throw { status: 401, message: 'Invalid email or password' };
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay(API_DELAY);
    
    const user = storage.get<User | null>(StorageKeys.AUTH_USER, null);
    
    storage.remove(StorageKeys.AUTH_USER);
    storage.remove(StorageKeys.AUTH_TOKEN);
    
    if (user) {
      await activitiesApi.log({
        type: 'system',
        message: `User ${user.name} logged out`,
      });
    }
    
    return { success: true, data: null };
  },

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    await delay(API_DELAY);
    
    const token = storage.get<string | null>(StorageKeys.AUTH_TOKEN, null);
    const user = storage.get<User | null>(StorageKeys.AUTH_USER, null);
    
    if (!token || !user) {
      return { success: true, data: null };
    }
    
    // Check token expiration
    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp < Date.now()) {
        storage.remove(StorageKeys.AUTH_TOKEN);
        storage.remove(StorageKeys.AUTH_USER);
        return { success: true, data: null };
      }
    } catch {
      return { success: true, data: null };
    }
    
    return { success: true, data: user };
  },

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    await delay(API_DELAY);
    
    const user = storage.get<User | null>(StorageKeys.AUTH_USER, null);
    
    if (!user) {
      throw { status: 401, message: 'Not authenticated' };
    }
    
    const updatedUser = { ...user, ...data };
    storage.set(StorageKeys.AUTH_USER, updatedUser);
    
    return { success: true, data: updatedUser };
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<null>> {
    await delay(API_DELAY);
    
    // In a real app, this would verify the current password
    if (currentPassword === 'admin123') {
      console.log('Password changed to:', newPassword);
      return { success: true, data: null, message: 'Password changed successfully' };
    }
    
    throw { status: 400, message: 'Current password is incorrect' };
  },
};

// ============ Dashboard API ============
export const dashboardApi = {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    await delay(API_DELAY);
    
    const products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    const orders = storage.get<Order[]>(StorageKeys.ORDERS, initialOrders);
    const customers = storage.get<Customer[]>(StorageKeys.CUSTOMERS, initialCustomers);
    
    const totalRevenue = orders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.total, 0);
    
    const averageOrderValue = orders.length > 0 
      ? totalRevenue / orders.filter(o => o.paymentStatus === 'paid').length 
      : 0;
    
    return {
      success: true,
      data: {
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCustomers: customers.length,
        revenueChange: 12.5,
        ordersChange: 8.3,
        averageOrderValue,
        conversionRate: 3.2,
      }
    };
  },

  async getRevenueData(): Promise<ApiResponse<{ month: string; revenue: number; orders: number }[]>> {
    await delay(API_DELAY);
    
    // Generate revenue data for the last 12 months
    const data = [
      { month: 'Jan', revenue: 45000, orders: 89 },
      { month: 'Feb', revenue: 52000, orders: 102 },
      { month: 'Mar', revenue: 48000, orders: 95 },
      { month: 'Apr', revenue: 61000, orders: 118 },
      { month: 'May', revenue: 55000, orders: 108 },
      { month: 'Jun', revenue: 67000, orders: 132 },
      { month: 'Jul', revenue: 72000, orders: 145 },
      { month: 'Aug', revenue: 69000, orders: 138 },
      { month: 'Sep', revenue: 78000, orders: 156 },
      { month: 'Oct', revenue: 85000, orders: 168 },
      { month: 'Nov', revenue: 92000, orders: 182 },
      { month: 'Dec', revenue: 128750, orders: 245 },
    ];
    
    return { success: true, data };
  },

  async getCategoryData(): Promise<ApiResponse<{ name: string; value: number; color: string }[]>> {
    await delay(API_DELAY);
    
    const products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    const categories = ['OUTERWEAR', 'FOOTWEAR', 'TOPS', 'BOTTOMS', 'KNITWEAR'];
    const colors = ['#ffffff', '#a1a1aa', '#71717a', '#52525b', '#3f3f46'];
    
    const data = categories.map((cat, index) => ({
      name: cat,
      value: products.filter(p => p.category === cat).length,
      color: colors[index],
    }));
    
    // Convert to percentages
    const total = data.reduce((sum, d) => sum + d.value, 0);
    data.forEach(d => {
      d.value = total > 0 ? Math.round((d.value / total) * 100) : 0;
    });
    
    return { success: true, data };
  },

  async getTopProducts(): Promise<ApiResponse<{ id: number; name: string; sales: number; revenue: number }[]>> {
    await delay(API_DELAY);
    
    const products = storage.get<Product[]>(StorageKeys.PRODUCTS, initialProducts);
    
    // Simulate top products data
    const topProducts = products.slice(0, 5).map((p, i) => ({
      id: p.id,
      name: p.name,
      sales: 45 - (i * 7),
      revenue: p.price * (45 - (i * 7)),
    }));
    
    return { success: true, data: topProducts };
  },
};

// ============ Settings API ============
export const settingsApi = {
  async get(): Promise<ApiResponse<Settings>> {
    await delay(API_DELAY);
    
    const settings = storage.get<Settings>(StorageKeys.SETTINGS, initialSettings);
    return { success: true, data: settings };
  },

  async update(data: Partial<Settings>): Promise<ApiResponse<Settings>> {
    await delay(API_DELAY);
    
    const settings = storage.get<Settings>(StorageKeys.SETTINGS, initialSettings);
    const updatedSettings = {
      ...settings,
      ...data,
      store: { ...settings.store, ...data.store },
      shipping: { ...settings.shipping, ...data.shipping },
      notifications: { ...settings.notifications, ...data.notifications },
    };
    
    storage.set(StorageKeys.SETTINGS, updatedSettings);
    
    await activitiesApi.log({
      type: 'system',
      message: 'Store settings updated',
    });
    
    return { success: true, data: updatedSettings, message: 'Settings saved successfully' };
  },
};

// ============ Activities API ============
export const activitiesApi = {
  async getRecent(limit: number = 10): Promise<ApiResponse<Activity[]>> {
    await delay(API_DELAY);
    
    const activities = storage.get<Activity[]>(StorageKeys.ACTIVITIES, initialActivities);
    return { success: true, data: activities.slice(0, limit) };
  },

  async log(activity: Omit<Activity, 'id' | 'timestamp'>): Promise<void> {
    const activities = storage.get<Activity[]>(StorageKeys.ACTIVITIES, initialActivities);
    
    const newActivity: Activity = {
      ...activity,
      id: Math.floor(generateId()),
      timestamp: new Date().toISOString(),
    };
    
    activities.unshift(newActivity);
    
    // Keep only last 100 activities
    if (activities.length > 100) {
      activities.pop();
    }
    
    storage.set(StorageKeys.ACTIVITIES, activities);
  },
};
