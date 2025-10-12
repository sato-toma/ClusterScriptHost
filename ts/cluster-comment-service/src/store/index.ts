import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import serverReducer from "./slices/serverChannelSlice";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    server: serverReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
