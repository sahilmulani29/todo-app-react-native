import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import RootReducer from "../reducer/root.reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, 
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } 
from 'redux-persist'

// Configure and Persist your store

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
  
const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})
export const persistor = persistStore(store)