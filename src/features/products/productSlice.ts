import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [
    {
      id: '1',
      name: 'Custom Brass Name Plate',
      description: 'Hand-engraved premium brass name plate for your home or office.',
      price: 49.99,
      categoryId: '1',
      imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800'
      ],
      details: 'Our brass name plates are made from high-quality solid brass, meticulously engraved and polished to a mirror finish. Perfect for outdoor use as they are weather-resistant.'
    },
    {
      id: '2',
      name: 'Acrylic Poster Stand',
      description: 'Clear acrylic poster stand with modern laser-etched design.',
      price: 29.99,
      categoryId: '2',
      imageUrl: 'https://images.unsplash.com/photo-1583512676225-8664ec602929?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1583512676225-8664ec602929?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800'
      ],
      details: 'Sleek and professional acrylic stands for displaying your custom posters. The engraving is deep and precise, creating a beautiful light-diffusing effect.'
    },
    {
      id: '3',
      name: 'Professional Rubber Stamp',
      description: 'Self-inking rubber stamp with high precision engraving.',
      price: 19.99,
      categoryId: '3',
      imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800'
      ],
      details: 'High-quality self-inking stamps designed for thousands of impressions. The rubber is laser-engraved for maximum clarity and detail.'
    }
  ],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
