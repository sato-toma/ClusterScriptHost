import { Handle, NodeProps, Position } from "reactflow";

const nodeWidth = 250;

export const CustomTodoNode = ({ data }: NodeProps) => {
  const { todo, nodeType } = data;

  return (
    <div
      style={{
        width: nodeWidth,
        background:
          nodeType === "isolated"
            ? "#eee"
            : nodeType === "related"
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
        id="related"
        style={{ left: "50%", background: "blue" }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="related"
        style={{ left: "50%", background: "blue" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="child"
        style={{ top: "50%", background: "green" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="parent"
        style={{ top: "50%", background: "green" }}
      />

      <strong>
        {nodeType === "isolated"
          ? "Isolated Node"
          : nodeType === "related"
            ? "Related Node"
            : "Child Node"}
      </strong>
      <div>{todo.title}</div>
    </div>
  );
};

export default CustomTodoNode;
