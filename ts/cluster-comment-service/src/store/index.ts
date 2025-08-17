import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import serverReducer from "./slices/serverChannelSlice";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    server: serverReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
