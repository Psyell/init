// ============ LocalStorage Service ============
// Provides persistent storage for the application

const STORAGE_PREFIX = 'noir_store_';

export const StorageKeys = {
  PRODUCTS: `${STORAGE_PREFIX}products`,
  ORDERS: `${STORAGE_PREFIX}orders`,
  CUSTOMERS: `${STORAGE_PREFIX}customers`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  AUTH_TOKEN: `${STORAGE_PREFIX}auth_token`,
  AUTH_USER: `${STORAGE_PREFIX}auth_user`,
  CART: `${STORAGE_PREFIX}cart`,
  ACTIVITIES: `${STORAGE_PREFIX}activities`,
} as const;

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to storage: ${key}`, error);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
    }
  },

  clear(): void {
    try {
      Object.values(StorageKeys).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  },
};
