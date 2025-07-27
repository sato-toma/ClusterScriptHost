"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { updateTodo } from "../store/slices/todoSlice";
import { Todo } from "../models/Todo";
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
import CustomTodoNode from "./CustomTodoNode";

const nodeTypes = {
  todo: CustomTodoNode,
};

const nodeHeight = 120;

const TodoKanban = () => {
  const todosObj = useSelector((state: RootState) => state.todos.todos);
  const todos: Todo[] = Object.values(todosObj);
  const dispatch = useDispatch();

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

  const childNodes = todos.filter((todo) => todo.parentTaskId);
  const nodes: Node[] = [
    // Isolated nodes (left, vertical)
    ...isolatedNodes.map((todo, idx) => ({
      id: todo.id,
      type: "todo",
      position: { x: 50, y: 50 + idx * (nodeHeight + 40) },
      data: {
        todo,
        nodeType: "source",
      },
    })),
    // Related nodes (center, vertical)
    ...parentlessNodes.map((todo, idx) => ({
      id: todo.id,
      type: "todo",
      position: { x: 350, y: 50 + idx * (nodeHeight + 40) },
      data: {
        todo,
        nodeType: "source",
      },
    })),
    // Child nodes (right, vertical)
    ...childNodes.map((todo, idx) => ({
      id: todo.id,
      type: "todo",
      position: { x: 650, y: 50 + idx * (nodeHeight + 40) },
      data: {
        todo,
        nodeType: "source",
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
      const { source, target, sourceHandle, targetHandle } = connection;
      if (!source || !target) return;
      const sourceTodo = todosObj[source];
      const targetTodo = todosObj[target];
      if (!sourceTodo || !targetTodo) return;

      if (
        (sourceHandle === "child" && targetHandle === "parent") ||
        (sourceHandle === "parent" && targetHandle === "child")
      ) {
        const parentTodo = sourceHandle === "parent" ? sourceTodo : targetTodo;
        const ChildTodo = sourceHandle === "child" ? sourceTodo : targetTodo;
        const parent = sourceHandle === "parent" ? source : target;
        const child = sourceHandle === "child" ? source : target;
        if (!parentTodo.childTaskIds?.includes(child)) {
          dispatch(
            updateTodo({
              ...parentTodo,
              childTaskIds: [...(sourceTodo.childTaskIds ?? []), child],
            }),
          );
        }
        if (ChildTodo.parentTaskId !== parent) {
          dispatch(
            updateTodo({
              ...ChildTodo,
              parentTaskId: parent,
            }),
          );
        }
      } else if (
        sourceHandle === "related-source" &&
        targetHandle === "related-target"
      ) {
        const parentTodo =
          sourceHandle === "related-source" ? sourceTodo : targetTodo;
        const ChildTodo =
          sourceHandle === "related-source" ? sourceTodo : targetTodo;
        const parent = sourceHandle === "related-source" ? source : target;
        const child = sourceHandle === "related-source" ? source : target;
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
