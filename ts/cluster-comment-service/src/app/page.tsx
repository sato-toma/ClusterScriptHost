"use client";

import TodoForm from "@components/TodoForm";
import TodoList from "@components/TodoList";
import TodoKanban from "@components/TodoKanban";
import AppLayout from "@components/templates/AppLayout";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

export default function Home() {
  const selectedChannelId = useSelector(
    (state: RootState) => state.server.selectedChannelId,
  );
  const todos = useSelector((state: RootState) => state.todos.todos);
  return (
    <AppLayout>
      {selectedChannelId ? (
        <div>
          <TodoForm channelId={selectedChannelId} />
          <TodoList channelId={selectedChannelId} todosObj={todos} />
          <TodoKanban channelId={selectedChannelId} todosObj={todos} />
        </div>
      ) : (
        <div className="p-4 text-gray-400">
          Select a channel to add a new task.
        </div>
      )}
    </AppLayout>
  );
}
