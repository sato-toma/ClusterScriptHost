import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import channelReducer from "./slices/channelSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    channel: channelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
