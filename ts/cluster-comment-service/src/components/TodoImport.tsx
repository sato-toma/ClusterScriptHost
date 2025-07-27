import * as TOML from "@iarna/toml";
import fs from "fs";
import { Todo, TodoType } from "../models/Todo";

const tomlString = fs.readFileSync("todo.toml", "utf-8");

// TOML をパースして Todo に変換
const parsedTodo = TOML.parse(tomlString) as TodoType;

console.log("✅ 読み込み結果:", parsedTodo);
