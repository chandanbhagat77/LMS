import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authSlice from "./slices/authSlice";

// Configure persistence
const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['auth'], // Persist only the 'auth' slice
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Use the persisted reducer for auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
