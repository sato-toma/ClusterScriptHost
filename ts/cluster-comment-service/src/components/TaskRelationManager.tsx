"use client";

import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Todo, TodoId } from "@models/Todo";
import {
  addChildTask,
  removeChildTask,
  addRelatedTask,
  removeRelatedTask,
} from "../store/slices/todoSlice";

interface TaskRelationManagerProps {
  todo: Todo;
  allTodos: Record<TodoId, Todo>;
  onClose: () => void;
}

type RelationType = "parent" | "child" | "related";

export default function TaskRelationManager({
  todo,
  allTodos,
  onClose,
}: TaskRelationManagerProps) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<RelationType>("child");

  // 親タスク
  const parentTask = todo.parentTaskId ? allTodos[todo.parentTaskId] : null;

  // 子タスク
  const childTasks = useMemo(
    () =>
      (todo.childTaskIds || [])
        .map((id) => allTodos[id])
        .filter(Boolean) as Todo[],
    [todo.childTaskIds, allTodos]
  );

  // 関連タスク
  const relatedTasks = useMemo(
    () =>
      (todo.relatedTaskIds || [])
        .map((id) => allTodos[id])
        .filter(Boolean) as Todo[],
    [todo.relatedTaskIds, allTodos]
  );

  // 選択可能なタスク（自分と既に関連付けられているタスクを除外）
  const availableTasks = useMemo(() => {
    const excludeIds = new Set([
      todo.id,
      ...(todo.parentTaskId ? [todo.parentTaskId] : []),
      ...(todo.childTaskIds || []),
      ...(todo.relatedTaskIds || []),
    ]);

    return Object.values(allTodos)
      .filter((t) => !excludeIds.has(t.id))
      .filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allTodos, todo, searchTerm]);

  const handleSetParent = (parentId: TodoId | null) => {
    if (parentId) {
      dispatch(addChildTask({ parentId, childId: todo.id }));
    } else if (parentTask) {
      dispatch(removeChildTask({ parentId: parentTask.id, childId: todo.id }));
    }
    setSearchTerm("");
  };

  const handleAddChild = (childId: TodoId) => {
    dispatch(addChildTask({ parentId: todo.id, childId }));
    setSearchTerm("");
  };

  const handleRemoveChild = (childId: TodoId) => {
    dispatch(removeChildTask({ parentId: todo.id, childId }));
  };

  const handleAddRelated = (relatedId: TodoId) => {
    dispatch(addRelatedTask({ todoId: todo.id, relatedId }));
    setSearchTerm("");
  };

  const handleRemoveRelated = (relatedId: TodoId) => {
    dispatch(removeRelatedTask({ todoId: todo.id, relatedId }));
  };

  const renderTaskItem = (
    t: Todo,
    onRemove?: (id: TodoId) => void,
    showRemove = true
  ) => (
    <div
      key={t.id}
      className="flex items-center gap-3 p-3 bg-white rounded border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
    >
      <input
        type="checkbox"
        checked={t.completed}
        disabled
        className="w-4 h-4"
      />
      <div className="flex-grow min-w-0">
        <div
          className={`text-sm font-medium truncate ${
            t.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {t.name}
        </div>
        {t.description && (
          <div className="text-xs text-gray-500 truncate">{t.description}</div>
        )}
      </div>
      {showRemove && onRemove && (
        <button
          onClick={() => onRemove(t.id)}
          className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors"
          title="Remove relation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Task Relations</h2>
            <p className="text-blue-100 text-sm mt-1">Managing: {todo.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* コンテンツ */}
        <div className="overflow-y-auto flex-grow">
          <div className="p-6 space-y-6">
            {/* 検索バー */}
            <div className="sticky top-0 bg-white -mx-6 px-6 py-3 border-b">
              <input
                type="text"
                placeholder="Search tasks to relate..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* タブ */}
            <div className="flex gap-2 border-b">
              <button
                onClick={() => setSelectedTab("parent")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  selectedTab === "parent"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                👨‍👧 Parent Task
              </button>
              <button
                onClick={() => setSelectedTab("child")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  selectedTab === "child"
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                📋 Subtasks ({childTasks.length})
              </button>
              <button
                onClick={() => setSelectedTab("related")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  selectedTab === "related"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                🔗 Related ({relatedTasks.length})
              </button>
            </div>

            {/* 親タスクタブ */}
            {selectedTab === "parent" && (
              <div className="space-y-4">
                {parentTask && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Current Parent
                    </h3>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      {renderTaskItem(parentTask, () => handleSetParent(null), true)}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    {parentTask ? "Change Parent" : "Set Parent"}
                  </h3>
                  {availableTasks.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {availableTasks.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleSetParent(t.id)}
                          className="w-full text-left"
                        >
                          {renderTaskItem(t, undefined, false)}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 p-3">No tasks available</p>
                  )}
                </div>
              </div>
            )}

            {/* 子タスクタブ */}
            {selectedTab === "child" && (
              <div className="space-y-4">
                {childTasks.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Current Subtasks ({childTasks.length})
                    </h3>
                    <div className="space-y-2 bg-green-50 p-3 rounded-lg border border-green-200">
                      {childTasks.map((t) =>
                        renderTaskItem(t, handleRemoveChild, true)
                      )}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Add Subtask
                  </h3>
                  {availableTasks.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {availableTasks.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleAddChild(t.id)}
                          className="w-full text-left"
                        >
                          {renderTaskItem(t, undefined, false)}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 p-3">No tasks available</p>
                  )}
                </div>
              </div>
            )}

            {/* 関連タスクタブ */}
            {selectedTab === "related" && (
              <div className="space-y-4">
                {relatedTasks.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Related Tasks ({relatedTasks.length})
                    </h3>
                    <div className="space-y-2 bg-purple-50 p-3 rounded-lg border border-purple-200">
                      {relatedTasks.map((t) =>
                        renderTaskItem(t, handleRemoveRelated, true)
                      )}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Add Related Task
                  </h3>
                  {availableTasks.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {availableTasks.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleAddRelated(t.id)}
                          className="w-full text-left"
                        >
                          {renderTaskItem(t, undefined, false)}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 p-3">No tasks available</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
