import { Handle, NodeProps, Position } from "reactflow";
import { Todo } from "../models/Todo";
const nodeWidth = 250;

export const TODO_NODE_TYPES = {
  ISOLATED: "isolated",
  RELATED: "related",
} as const;
export const TODO_HANDLE_ID = {
  RELATED_SOURCE: "related-source",
  RELATED_TARGET: "related-target",
} as const;

export type TodoNodeType =
  (typeof TODO_NODE_TYPES)[keyof typeof TODO_NODE_TYPES];

export interface CustomNodeData {
  todo: Todo;
  nodeType: TodoNodeType;
}

export const CustomTodoNode = ({ data }: NodeProps<CustomNodeData>) => {
  const { todo, nodeType } = data;

  return (
    <div
      style={{
        width: nodeWidth,
        background:
          nodeType === TODO_NODE_TYPES.ISOLATED
            ? "#eee"
            : nodeType === TODO_NODE_TYPES.RELATED
              ? "#e0f7fa"
              : "#f1f8e9",
        padding: 10,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Handles */}
      <Handle
        type="source"
        position={Position.Top}
        id={TODO_HANDLE_ID.RELATED_SOURCE}
        style={{ left: "50%", background: "blue" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id={TODO_HANDLE_ID.RELATED_TARGET}
        style={{ left: "50%", background: "blue" }}
      />

      <strong>
        {nodeType === TODO_NODE_TYPES.ISOLATED
          ? "Isolated Node"
          : nodeType === TODO_NODE_TYPES.RELATED
            ? "Related Node"
            : "Child Node"}
      </strong>
      <div>{todo.title}</div>
    </div>
  );
};

export default CustomTodoNode;
