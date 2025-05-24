// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
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
        
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
