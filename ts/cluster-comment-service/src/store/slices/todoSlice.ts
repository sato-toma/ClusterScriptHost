import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoId } from "../../models/Todo";

interface TodosState {
  todos: Record<TodoId, Todo>;
}

const initialState: TodosState = {
  todos: {
    sample: {
      id: "TodoId",
      channelId: "ChannelId",
      creatorId: "UserId",
      name: "Sample Todo",
      completed: false,
      createdAt: "ISODateString",
    },
  },
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
    addChildTask: (
      state,
      action: PayloadAction<{ parentId: string; childId: string }>,
    ) => {
      const { parentId, childId } = action.payload;
      const parent = state.todos[parentId];
      const child = state.todos[childId];

      if (parent && child) {
        // 親に子を追加
        if (!parent.childTaskIds) {
          parent.childTaskIds = [];
        }
        if (!parent.childTaskIds.includes(childId)) {
          parent.childTaskIds.push(childId);
        }

        // 子のparentTaskIdを設定
        child.parentTaskId = parentId;
      }
    },
    removeChildTask: (
      state,
      action: PayloadAction<{ parentId: string; childId: string }>,
    ) => {
      const { parentId, childId } = action.payload;
      const parent = state.todos[parentId];
      const child = state.todos[childId];

      if (parent && child) {
        // 親から子を削除
        if (parent.childTaskIds) {
          parent.childTaskIds = parent.childTaskIds.filter(
            (id) => id !== childId,
          );
        }

        // 子のparentTaskIdをクリア
        child.parentTaskId = null;
      }
    },
    addRelatedTask: (
      state,
      action: PayloadAction<{ todoId: string; relatedId: string }>,
    ) => {
      const { todoId, relatedId } = action.payload;
      const todo = state.todos[todoId];
      const related = state.todos[relatedId];

      if (todo && related) {
        if (!todo.relatedTaskIds) {
          todo.relatedTaskIds = [];
        }
        if (!todo.relatedTaskIds.includes(relatedId)) {
          todo.relatedTaskIds.push(relatedId);
        }
      }
    },
    removeRelatedTask: (
      state,
      action: PayloadAction<{ todoId: string; relatedId: string }>,
    ) => {
      const { todoId, relatedId } = action.payload;
      const todo = state.todos[todoId];

      if (todo && todo.relatedTaskIds) {
        todo.relatedTaskIds = todo.relatedTaskIds.filter(
          (id) => id !== relatedId,
        );
      }
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  addChildTask,
  removeChildTask,
  addRelatedTask,
  removeRelatedTask,
} = todoSlice.actions;
export default todoSlice.reducer;
