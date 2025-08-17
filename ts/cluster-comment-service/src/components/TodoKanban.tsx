"use client";
import { useDispatch } from "react-redux";

import { updateTodo } from "../store/slices/todoSlice";
import { Todo, TodoId } from "@models/Todo";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback } from "react";
import CustomTodoNode, {
  TODO_NODE_TYPES,
  TODO_HANDLE_ID,
} from "./CustomTodoNode";
import { ChannelId } from "@models/TodoChannel";

const nodeTypes = {
  todo: CustomTodoNode,
};

const nodeHeight = 120;
export type TodoKanbanProps = {
  channelId?: ChannelId;
  todosObj?: Record<TodoId, Todo>;
};
const TodoKanban = ({ channelId, todosObj }: TodoKanbanProps) => {
  const dispatch = useDispatch();

  // エッジ追加時（ノードを結び付けたとき）
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const { source, target, sourceHandle, targetHandle } = connection;
      if (!source || !target) return;
      const sourceTodo = todosObj?.[source];
      const targetTodo = todosObj?.[target];
      if (!sourceTodo || !targetTodo) return;

      if (
        sourceHandle === TODO_HANDLE_ID.RELATED_SOURCE &&
        targetHandle === TODO_HANDLE_ID.RELATED_TARGET
      ) {
        const parentTodo = sourceTodo;
        const ChildTodo = targetTodo;
        const parent = source;
        const child = target;
        // sourceTodoのrelatedTaskIdsにtargetを追加
        if (!parentTodo.relatedTaskIds?.includes(child)) {
          dispatch(
            updateTodo({
              ...parentTodo,
              relatedTaskIds: [...(parentTodo.relatedTaskIds ?? []), child],
            }),
          );
        }
        // targetTodoのrelatedTaskIdsにsourceを追加
        if (!ChildTodo.relatedTaskIds?.includes(parent)) {
          dispatch(
            updateTodo({
              ...ChildTodo,
              relatedTaskIds: [...(ChildTodo.relatedTaskIds ?? []), parent],
            }),
          );
        }
      }
    },
    [todosObj, dispatch],
  );

  // エッジ削除時
  const onEdgesDelete = useCallback(
    (deletedEdges: Edge[]) => {
      deletedEdges.forEach((edge) => {
        const sourceTodo = todosObj?.[edge.source];
        if (!sourceTodo || !sourceTodo.relatedTaskIds) return;
        dispatch(
          updateTodo({
            ...sourceTodo,
            relatedTaskIds: sourceTodo.relatedTaskIds.filter(
              (id) => id !== edge.target,
            ),
          }),
        );
      });
    },
    [todosObj, dispatch],
  );
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

  const isolatedNodes = todos.filter(
    (todo) =>
      (!todo.relatedTaskIds || todo.relatedTaskIds.length === 0) &&
      (!todo.childTaskIds || todo.childTaskIds.length === 0) &&
      !todo.parentTaskId,
  );

  const parentlessNodes = todos.filter(
    (todo) =>
      !todo.parentTaskId &&
      ((todo.relatedTaskIds && todo.relatedTaskIds.length > 0) ||
        (todo.childTaskIds && todo.childTaskIds.length > 0)),
  );

  const nodes: Node[] = [
    // Isolated nodes (left, vertical)
    ...isolatedNodes.map((todo, idx) => ({
      id: todo.id,
      type: "todo",
      position: { x: 50, y: 50 + idx * (nodeHeight + 40) },
      data: {
        todo,
        nodeType: TODO_NODE_TYPES.ISOLATED,
      },
    })),
    // Related nodes (center, vertical)
    ...parentlessNodes.map((todo, idx) => ({
      id: todo.id,
      type: "todo",
      position: { x: 350, y: 50 + idx * (nodeHeight + 40) },
      data: {
        todo,
        nodeType: TODO_NODE_TYPES.RELATED,
      },
    })),
  ];

  // エッジ定義（関連タスクを線でつなぐ）
  const edges: Edge[] = [
    ...todos.flatMap((todo) =>
      (todo.relatedTaskIds ?? []).map((relatedId) => ({
        id: `${todo.id}-related-${relatedId}`,
        source: todo.id,
        target: relatedId,
        animated: true,
        style: { stroke: "blue" },
      })),
    ),
  ];

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TodoKanban;
