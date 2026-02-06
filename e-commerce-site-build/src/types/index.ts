// ============ Base Types ============
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  stock: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  size: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  createdAt: string;
  lastOrderAt: string;
  addresses: Address[];
}

export interface Address {
  id: number;
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

// ============ Auth Types ============
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
  permissions: Permission[];
  createdAt: string;
  lastLoginAt: string;
}

export type Permission = 
  | 'products.read' | 'products.write' | 'products.delete'
  | 'orders.read' | 'orders.write' | 'orders.delete'
  | 'customers.read' | 'customers.write' | 'customers.delete'
  | 'analytics.read'
  | 'settings.read' | 'settings.write';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============ API Types ============
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// ============ Filter & Sort Types ============
export interface ProductFilters {
  search: string;
  category: string;
  status: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy: 'name' | 'price' | 'createdAt' | 'stock';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface OrderFilters {
  search: string;
  status: string;
  paymentStatus: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy: 'createdAt' | 'total';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface CustomerFilters {
  search: string;
  status: string;
  sortBy: 'name' | 'totalSpent' | 'orders' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

// ============ Dashboard Types ============
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenueChange: number;
  ordersChange: number;
  averageOrderValue: number;
  conversionRate: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface Activity {
  id: number;
  type: 'order' | 'product' | 'customer' | 'stock' | 'system';
  message: string;
  details?: string;
  timestamp: string;
  userId?: number;
}

// ============ Settings Types ============
export interface StoreSettings {
  name: string;
  email: string;
  phone: string;
  currency: string;
  timezone: string;
  logo?: string;
  address: Address;
}

export interface ShippingSettings {
  freeShippingThreshold: number;
  standardShipping: number;
  expressShipping: number;
  internationalShipping: number;
}

export interface NotificationSettings {
  orders: boolean;
  stock: boolean;
  customers: boolean;
  marketing: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface Settings {
  store: StoreSettings;
  shipping: ShippingSettings;
  notifications: NotificationSettings;
}

// ============ Form Types ============
export interface ProductFormData {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  sizes: string[];
  stock: number;
  status: 'active' | 'draft' | 'archived';
}

export interface OrderFormData {
  customerId: number;
  items: OrderItem[];
  shippingAddressId: number;
  billingAddressId: number;
  paymentMethod: string;
  notes: string;
}

// ============ Notification Types ============
export interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
