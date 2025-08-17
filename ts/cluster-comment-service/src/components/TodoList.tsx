"use client";

import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../store/slices/todoSlice";
import { Todo, TodoId } from "@models/Todo";
import ShareMessage from "@components/molecules/ShareMessage";
import { ChannelId } from "@models/TodoChannel";
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
