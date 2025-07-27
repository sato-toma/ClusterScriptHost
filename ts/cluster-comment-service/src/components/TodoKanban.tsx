"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { updateTodo } from "../store/slices/todoSlice";
import { Todo, TodoId } from "../models/Todo";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  OnConnect,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { useMemo, useCallback, useState } from "react";
const nodeWidth = 250;
const nodeHeight = 120;

const TodoKanban = () => {
  const todosObj = useSelector((state: RootState) => state.todos.todos);
  const todos: Todo[] = Object.values(todosObj);
  const dispatch = useDispatch();

  const isolatedNodes = todos.filter(
    (todo) =>
      (!todo.relatedTaskIds || todo.relatedTaskIds.length === 0) &&
      (!todo.childTaskIds || todo.childTaskIds.length === 0),
  );

  const relatedNodes = todos.filter(
    (todo) => todo.relatedTaskIds && todo.relatedTaskIds.length > 0,
  );

  const childNodes = todos.filter(
    (todo) => todo.childTaskIds && todo.childTaskIds.length > 0,
  );

  const nodes: Node[] = [
    // 孤立ノード（左側・縦並び）
    ...isolatedNodes.map((todo, idx) => ({
      id: todo.id,
      type: "default",
      position: { x: 50, y: 50 + idx * (nodeHeight + 40) },
      data: {
        label: (
          <div style={{ width: nodeWidth, background: "#eee" }}>
            <strong>孤立ノード</strong>
            <div>{todo.title}</div>
          </div>
        ),
      },
    })),
    // 関連ノード（中央・縦並び）
    ...relatedNodes.map((todo, idx) => ({
      id: todo.id,
      type: "default",
      position: { x: 350, y: 50 + idx * (nodeHeight + 40) },
      data: {
        label: (
          <div style={{ width: nodeWidth, background: "#e0f7fa" }}>
            <strong>関連ノード</strong>
            <div>{todo.title}</div>
          </div>
        ),
      },
    })),
    // 子ノード（右側・縦並び）
    ...childNodes.map((todo, idx) => ({
      id: todo.id,
      type: "default",
      position: { x: 650, y: 50 + idx * (nodeHeight + 40) },
      data: {
        label: (
          <div style={{ width: nodeWidth, background: "#f1f8e9" }}>
            <strong>子ノード</strong>
            <div>{todo.title}</div>
          </div>
        ),
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
    ...todos.flatMap((todo) =>
      (todo.childTaskIds ?? []).map((childId) => ({
        id: `${todo.id}-child-${childId}`,
        source: todo.id,
        target: childId,
        animated: true,
        style: { stroke: "green" },
      })),
    ),
  ];

  // エッジ追加時（ノードを結び付けたとき）
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const { source, target } = connection;
      if (!source || !target) return;
      const sourceTodo = todosObj[source];
      const targetTodo = todosObj[target];
      if (!sourceTodo || !targetTodo) return;

      // sourceTodoのrelatedTaskIdsにtargetを追加
      if (!sourceTodo.relatedTaskIds?.includes(target)) {
        dispatch(
          updateTodo({
            ...sourceTodo,
            relatedTaskIds: [...(sourceTodo.relatedTaskIds ?? []), target],
          }),
        );
      }
      // targetTodoのrelatedTaskIdsにsourceを追加
      if (!targetTodo.relatedTaskIds?.includes(source)) {
        dispatch(
          updateTodo({
            ...targetTodo,
            relatedTaskIds: [...(targetTodo.relatedTaskIds ?? []), source],
          }),
        );
      }
    },
    [todosObj, dispatch],
  );

  // エッジ削除時
  const onEdgesDelete = useCallback(
    (deletedEdges: Edge[]) => {
      deletedEdges.forEach((edge) => {
        const sourceTodo = todosObj[edge.source];
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

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
