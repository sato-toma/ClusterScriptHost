import * as TOML from "@iarna/toml";
import fs from "fs";
import { Todo, TodoType } from "../models/Todo";

function todoToJsonMap(todo: Todo): TodoType {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description ?? "",
    relatedTaskIds: todo.relatedTaskIds ?? [],
    childTaskIds: todo.childTaskIds ?? [],
    parentTaskId: todo.parentTaskId ?? "",
  };
}

const sampleTodo: Todo = {
  id: "task-1",
  title: "Write Code",
  description: "Export to TOML",
  relatedTaskIds: ["task-2", "task-3"],
  childTaskIds: ["task-4"],
  parentTaskId: "task-0",
};

// TOML 文字列に変換
const tomlString = TOML.stringify(todoToJsonMap(sampleTodo));

// ファイル出力
fs.writeFileSync("todo.toml", tomlString);
