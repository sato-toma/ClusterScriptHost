"use client";

import { useState } from "react";
import { Todo, TodoId } from "../models/Todo";
import TaskRelationManager from "./TaskRelationManager";

interface TodoItemProps {
  todo: Todo;
  allTodos: Record<TodoId, Todo>;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: TodoId) => void;
}

export default function TodoItem({
  todo,
  allTodos,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [showRelationManager, setShowRelationManager] = useState(false);

  const children =
    todo.childTaskIds?.map((id) => allTodos[id]).filter(Boolean) || [];
  const related =
    todo.relatedTaskIds?.map((id) => allTodos[id]).filter(Boolean) || [];
  const parent = todo.parentTaskId ? allTodos[todo.parentTaskId] : null;

  const relationCount = (children?.length || 0) + (related?.length || 0) + (parent ? 1 : 0);

  return (
    <div className="border p-4 rounded shadow-sm bg-white text-black mb-4">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onUpdate({ ...todo, completed: e.target.checked })}
          className="w-4 h-4"
        />
        <input
          type="text"
          value={todo.name}
          onChange={(e) => onUpdate({ ...todo, name: e.target.value })}
          className="flex-grow border-none outline-none text-lg font-medium"
        />
        <button
          onClick={() => setShowRelationManager(true)}
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-sm transition-colors font-medium"
          title="Manage task relations (parent, subtasks, related)"
        >
          🔗
          {relationCount > 0 && (
            <span className="bg-blue-700 text-white text-xs px-1.5 py-0.5 rounded-full">
              {relationCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
        >
          ✕
        </button>
      </div>

      <textarea
        value={todo.description || ""}
        onChange={(e) => onUpdate({ ...todo, description: e.target.value })}
        placeholder="Description..."
        className="w-full border-none outline-none resize-none text-sm text-gray-600"
        rows={2}
      />

      {/* 親タスク表示 */}
      {parent && (
        <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-700 uppercase">Parent</span>
            <input
              type="checkbox"
              checked={parent.completed}
              disabled
              className="w-4 h-4 opacity-60"
            />
            <span className={`flex-grow text-sm ${parent.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {parent.name}
            </span>
          </div>
        </div>
      )}

      {/* 子タスク表示 */}
      {children.length > 0 && (
        <div className="mt-3 space-y-2">
          <h4 className="text-xs font-semibold text-gray-700">📋 Subtasks ({children.length})</h4>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200 space-y-2">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex items-center gap-2 p-2 bg-white rounded border-l-2 border-green-300 pl-3"
              >
                <input
                  type="checkbox"
                  checked={child.completed}
                  disabled
                  className="w-4 h-4"
                />
                <span className={`flex-grow text-sm ${child.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {child.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 関連タスク表示 */}
      {related.length > 0 && (
        <div className="mt-3 space-y-2">
          <h4 className="text-xs font-semibold text-gray-700">🔗 Related ({related.length})</h4>
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 space-y-2">
            {related.map((rel) => (
              <div
                key={rel.id}
                className="flex items-center gap-2 p-2 bg-white rounded border-l-2 border-purple-300 pl-3"
              >
                <input
                  type="checkbox"
                  checked={rel.completed}
                  disabled
                  className="w-4 h-4"
                />
                <span className={`flex-grow text-sm ${rel.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {rel.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Task Relation Manager Modal */}
      {showRelationManager && (
        <TaskRelationManager
          todo={todo}
          allTodos={allTodos}
          onClose={() => setShowRelationManager(false)}
        />
      )}

      <div className="text-xs text-gray-400 mt-2">
        Created: {new Date(todo.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
