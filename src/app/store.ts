import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/categories/categorySlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
