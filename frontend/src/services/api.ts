import axios from 'axios';

export interface Item {
  id: number;
  name: string;
  quantity: number;
  location?: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log(`🔗 API Base URL: ${API_BASE_URL}`);

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received:`, response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const inventoryAPI = {
  // Get all items
  getItems: async (): Promise<Item[]> => {
    try {
      const response = await api.get<Item[]>('/items');
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Add new item
  addItem: async (item: Omit<Item, 'id'>): Promise<Item> => {
    try {
      const response = await api.post<Item>('/items', item);
      return response.data;
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  },

  // Update item
  updateItem: async (id: number, item: Partial<Item>): Promise<Item> => {
    try {
      const response = await api.put<Item>(`/items/${id}`, item);
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  },

  // Delete item
  deleteItem: async (id: number): Promise<void> => {
    try {
      await api.delete(`/items/${id}`);
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  },
};

export default api;
