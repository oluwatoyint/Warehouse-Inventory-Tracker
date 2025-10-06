export interface Item {
  id: number;
  name: string;
  quantity: number;
  location?: string;
}

export interface ApiError {
  error: string;
}

export interface InventoryState {
  items: Item[];
  loading: boolean;
  error: string | null;
}
