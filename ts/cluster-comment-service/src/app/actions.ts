"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

// 作成用 Server Action
export async function create(formData: FormData) {
  const content = formData.get("comment") as string;
  await prisma.comment.create({
    data: { content },
  });
  revalidatePath("/");
}

// 更新用 Server Action
export async function update(formData: FormData) {
  const id = formData.get("id") as string;
  const content = formData.get("content") as string;

  await prisma.comment.update({
    where: { id },
    data: { content },
  });
  revalidatePath("/");
}

// 削除用 Server Action
export async function remove(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.comment.delete({ where: { id } });
  revalidatePath("/");
}
