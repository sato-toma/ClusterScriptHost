"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { updateTodo, deleteTodo } from "../store/slices/todoSlice";
import { Todo } from "../models/Todo";

const TodoList = () => {
  const todosObj = useSelector((state: RootState) => state.todos.todos);
  const todos: Todo[] = Object.values(todosObj);
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            value={todo.title}
            onChange={(e) =>
              dispatch(
                updateTodo({
                  ...todo,
                  title: e.target.value,
                }),
              )
            }
          />
          <div>
            <textarea
              value={todo.description ?? ""}
              onChange={(e) =>
                dispatch(
                  updateTodo({
                    ...todo,
                    description: e.target.value,
                  }),
                )
              }
            />
          </div>
          <button onClick={() => dispatch(deleteTodo(todo.id))}>
            delete todo
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
