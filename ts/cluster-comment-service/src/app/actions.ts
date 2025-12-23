"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { CommentRepository } from "../repositories/commentRepository";
import { CommentService } from "../services/commentService";
import { TodoRepository } from "../repositories/todoRepository";
import { TodoService } from "../services/todoService";

// Repositoryのインスタンス化
const commentRepository = new CommentRepository(prisma);
const todoRepository = new TodoRepository(prisma);

// 作成用 Server Action
export async function create(formData: FormData) {
  const content = formData.get("comment") as string;

  // バリデーションとサニタイズ
  const error = CommentService.validate(content);
  if (error) throw new Error(error);
  const sanitized = CommentService.sanitize(content);

  await commentRepository.create(sanitized);
  revalidatePath("/");
}

// 更新用 Server Action
export async function update(formData: FormData) {
  const id = formData.get("id") as string;
  const content = formData.get("content") as string;

  // バリデーションとサニタイズ
  const error = CommentService.validate(content);
  if (error) throw new Error(error);
  const sanitized = CommentService.sanitize(content);

  await commentRepository.update(id, sanitized);
  revalidatePath("/");
}

// 削除用 Server Action
export async function remove(formData: FormData) {
  const id = formData.get("id") as string;
  await commentRepository.delete(id);
  revalidatePath("/");
}

// --- Todo Actions ---

export async function createTodo(formData: FormData) {
  const channelId = formData.get("channelId") as string;
  const content = formData.get("content") as string;
  const creatorId = formData.get("creatorId") as string;

  const error = TodoService.validate(content);
  if (error) throw new Error(error);
  const sanitized = TodoService.sanitize(content);

  await todoRepository.create(channelId, sanitized, creatorId);
  revalidatePath("/");
}

export async function updateTodoStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const completed = formData.get("completed") === "true";

  await todoRepository.update(id, { completed });
  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get("id") as string;
  await todoRepository.delete(id);
  revalidatePath("/");
}
