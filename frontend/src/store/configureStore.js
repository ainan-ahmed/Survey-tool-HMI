import reducer from "./reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import api from "./middleware/api";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
const persistConfig = {
  key: "root",
  whitelist: ['auth','surveys'],
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
export default function () {
  return configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      //api,
    ],
  });
}