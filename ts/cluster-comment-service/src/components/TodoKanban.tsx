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
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { useMemo, useCallback } from "react";
const nodeWidth = 250;
const nodeHeight = 120;

const TodoKanban = () => {
  const todosObj = useSelector((state: RootState) => state.todos.todos);
  const todos: Todo[] = Object.values(todosObj);
  const dispatch = useDispatch();

  // ノード定義
  const nodes: Node[] = useMemo(
    () =>
      todos.map((todo, idx) => ({
        id: todo.id,
        type: "default",
        position: { x: 50, y: idx * (nodeHeight + 40) },
        data: {
          label: (
            <div style={{ width: nodeWidth }}>
              <input style={{ width: "90%" }} value={todo.title} readOnly />
              <textarea
                style={{ width: "90%", marginTop: 8 }}
                value={todo.description ?? ""}
                readOnly
              />
            </div>
          ),
        },
      })),
    [todos, dispatch],
  );

  // エッジ定義（関連タスクを線でつなぐ）
  const edges: Edge[] = useMemo(
    () =>
      todos.flatMap((todo) =>
        (todo.relatedTaskIds ?? []).map((relatedId) => ({
          id: `${todo.id}-${relatedId}`,
          source: todo.id,
          target: relatedId,
          animated: true,
          style: { stroke: "blue" },
        })),
      ),
    [todos],
  );

  // エッジ追加時（ノードを結び付けたとき）
  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const { source, target } = connection;
      if (!source || !target) return;
      const sourceTodo = todosObj[source];
      if (!sourceTodo) return;
      // すでに関連がなければ追加
      if (!sourceTodo.relatedTaskIds?.includes(target)) {
        dispatch(
          updateTodo({
            ...sourceTodo,
            relatedTaskIds: [...(sourceTodo.relatedTaskIds ?? []), target],
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
