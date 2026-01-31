import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '../../types';

interface CategoryState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  items: [
    { id: '1', name: 'Name Plates', description: 'Custom engraved plates for doors and desks.' },
    { id: '2', name: 'Poster Designs', description: 'Laser-etched posters and display stands.' },
    { id: '3', name: 'Stamps', description: 'Professional self-inking and wooden stamps.' },
  ],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.items.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(cat => cat.id !== action.payload);
    },
  },
});

export const { addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
