// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/AuthSlice';
import cartReducer from './features/cart/cartSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'],
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  cart: cartReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);