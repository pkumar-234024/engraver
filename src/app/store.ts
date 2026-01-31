import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/categories/categorySlice';
import authReducer from '../features/auth/authSlice';
import siteReducer from '../features/site/siteSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    auth: authReducer,
    site: siteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
