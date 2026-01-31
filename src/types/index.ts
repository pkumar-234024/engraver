export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string; // Primary thumbnail
  images: string[]; // Additional gallery images
  details: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface AppState {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}
