// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import notesReducer from './notesSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const notesPersistConfig = {
  key: 'notes',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedNotesReducer = persistReducer(notesPersistConfig, notesReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    notes: persistedNotesReducer,
  },
});

export const persistor = persistStore(store);
