"use client";

import TodoForm from "@components/TodoForm";
import TodoList from "@components/TodoList";
import TodoKanban from "@components/TodoKanban";
import AppLayout from "@components/templates/AppLayout";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { useState } from "react";

export default function Home() {
  const selectedChannelId = useSelector(
    (state: RootState) => state.server.selectedChannelId,
  );
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [viewMode, setViewMode] = useState("table");
  return (
    <AppLayout>
      {selectedChannelId ? (
        <div>
          <select
            className="bg-gray-800 text-white px-2 py-1 rounded"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="table">table</option>
            <option value="board">board</option>
          </select>
          <TodoForm channelId={selectedChannelId} />
          {viewMode === "table" && (
            <TodoList channelId={selectedChannelId} todosObj={todos} />
          )}
          {viewMode === "board" && (
            <TodoKanban channelId={selectedChannelId} todosObj={todos} />
          )}
        </div>
      ) : (
        <div className="p-4 text-gray-400">
          Select a channel to add a new task.
        </div>
      )}
    </AppLayout>
  );
}
