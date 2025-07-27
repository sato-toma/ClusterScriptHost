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
      const deleteId = action.payload;
      // 他のTodoから関連ID・子IDを除去
      Object.values(state.todos).forEach((todo) => {
        if (todo.relatedTaskIds) {
          todo.relatedTaskIds = todo.relatedTaskIds.filter(
            (id) => id !== deleteId,
          );
        }
        if (todo.childTaskIds) {
          todo.childTaskIds = todo.childTaskIds.filter((id) => id !== deleteId);
        }
      });
      // Todo自体を削除
      delete state.todos[deleteId];
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
