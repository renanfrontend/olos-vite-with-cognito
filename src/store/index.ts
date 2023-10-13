import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import configReducer from "./slices/slices";

export const store = configureStore({
  reducer: {
    uras: configReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
