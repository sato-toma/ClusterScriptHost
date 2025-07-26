"use client";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Todo } from "../models/Todo";

const TodoList = () => {
  const todosObj = useSelector((state: RootState) => state.todos.todos);
  const todos: Todo[] = Object.values(todosObj);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <strong>{todo.title}</strong>
          <div>{todo.description}</div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
