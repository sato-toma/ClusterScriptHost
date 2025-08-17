"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { updateTodo, deleteTodo } from "../store/slices/todoSlice";
import { Todo } from "../models/Todo";
import ShareMessage from "@components/molecules/ShareMessage";
const TodoList = () => {
  const todosObj = useSelector((state: RootState) => state.todos.todos);
  const todos: Todo[] = Object.values(todosObj);
  const dispatch = useDispatch();

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            value={todo.name}
            onChange={(e) =>
              dispatch(
                updateTodo({
                  ...todo,
                  name: e.target.value,
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
          <ShareMessage
            text={`[TODO] ${todo.name}${todo.description ? `\n${todo.description}` : ""}`}
          ></ShareMessage>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
