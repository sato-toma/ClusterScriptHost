"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { CommentRepository } from "../repositories/commentRepository";
import { CommentService } from "../services/commentService";

// Repositoryのインスタンス化
const commentRepository = new CommentRepository(prisma);

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
