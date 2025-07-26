import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoId } from "../../models/Todo";

interface TodosState {
  todos: Record<TodoId, Todo>;
}

const initialState: TodosState = {
  todos: {},
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos[action.payload.id] = action.payload;
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      if (state.todos[action.payload.id]) {
        state.todos[action.payload.id] = {
          ...state.todos[action.payload.id],
          ...action.payload,
        };
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      delete state.todos[action.payload];
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
