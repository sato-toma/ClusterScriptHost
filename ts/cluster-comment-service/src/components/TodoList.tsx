"use client";

import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../store/slices/todoSlice";
import { Todo, TodoId } from "@models/Todo";
import ShareMessage from "@components/molecules/ShareMessage";
import { ChannelId } from "@models/TodoChannel";
import TodoItem from "./TodoItem";

export type TodoListProps = {
  channelId?: ChannelId;
  todosObj?: Record<TodoId, Todo>;
};

const TodoList = ({ channelId, todosObj }: TodoListProps) => {
  const dispatch = useDispatch();

  if (!channelId) {
    return (
      <div className="p-4 text-gray-400">
        Select a channel to view the kanban board.
      </div>
    );
  }

  const todos: Todo[] = Object.values(todosObj ?? {}).filter(
    (todo) => todo.channelId === channelId,
  );

  if (todos.length === 0) {
    return <div className="p-4 text-gray-400">No tasks in this channel.</div>;
  }

  const handleUpdateTodo = (updatedTodo: Todo) => {
    dispatch(updateTodo(updatedTodo));
  };

  const handleDeleteTodo = (id: TodoId) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          allTodos={todosObj ?? {}}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
