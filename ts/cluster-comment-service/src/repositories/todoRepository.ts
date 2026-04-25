import { PrismaClient, Todo as PrismaTodo } from "@prisma/client";
import { Todo } from "../models/Todo";

export class TodoRepository {
  constructor(private prisma: PrismaClient) {}

  // Prismaの型をドメインモデルに変換するヘルパーメソッド
  private mapToModel(item: PrismaTodo): Todo {
    return {
      id: item.id,
      channelId: item.channelId,
      creatorId: item.creatorId,
      name: item.name,
      description: item.description ?? undefined,
      dueDate: item.dueDate?.toISOString(),
      completed: item.completed,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
      relatedTaskIds: item.relatedTaskIds,
      childTaskIds: item.childTaskIds,
      parentTaskId: item.parentTaskId,
    };
  }

  async create(
    channelId: string,
    name: string,
    creatorId: string,
  ): Promise<Todo> {
    // Note: schema.prisma で Todo モデルに channelId が定義されている前提です
    const result = await this.prisma.todo.create({
      data: {
        name,
        channelId,
        creatorId,
        completed: false,
      } as any,
    });
    return this.mapToModel(result);
  }

  async update(
    id: string,
    data: Partial<Pick<Todo, "name" | "completed" | "relatedTaskIds">>,
  ): Promise<Todo> {
    const result = await this.prisma.todo.update({
      where: { id },
      data: data as any,
    });
    return this.mapToModel(result);
  }

  async delete(id: string): Promise<Todo> {
    const result = await this.prisma.todo.delete({
      where: { id },
    });
    return this.mapToModel(result);
  }

  async findByChannelId(channelId: string): Promise<Todo[]> {
    const results: PrismaTodo[] = await this.prisma.todo.findMany({
      where: { channelId } as any,
      orderBy: { createdAt: "desc" }, // 作成日時の新しい順、または "asc" で古い順
    });
    return results.map((item: PrismaTodo) => this.mapToModel(item));
  }

  // 関連付け機能のメソッドを追加
  async addChildTask(parentId: string, childId: string): Promise<Todo> {
    // 親タスクに子タスクを追加
    const parentResult = await this.prisma.todo.update({
      where: { id: parentId },
      data: {
        childTaskIds: {
          push: childId,
        },
      } as any,
    });

    // 子タスクのparentTaskIdを設定
    await this.prisma.todo.update({
      where: { id: childId },
      data: {
        parentTaskId: parentId,
      } as any,
    });

    return this.mapToModel(parentResult);
  }

  async removeChildTask(parentId: string, childId: string): Promise<Todo> {
    // 親タスクから子タスクを削除
    const parent = await this.prisma.todo.findUnique({
      where: { id: parentId },
    });

    if (!parent) {
      throw new Error("Parent todo not found");
    }

    const updatedChildTaskIds = (parent.childTaskIds as string[]).filter(
      (id) => id !== childId,
    );

    const parentResult = await this.prisma.todo.update({
      where: { id: parentId },
      data: {
        childTaskIds: updatedChildTaskIds,
      } as any,
    });

    // 子タスクのparentTaskIdをクリア
    await this.prisma.todo.update({
      where: { id: childId },
      data: {
        parentTaskId: null,
      } as any,
    });

    return this.mapToModel(parentResult);
  }

  async addRelatedTask(todoId: string, relatedId: string): Promise<Todo> {
    // 関連タスクを追加
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new Error("Todo not found");
    }

    const updatedRelatedTaskIds = [
      ...(todo.relatedTaskIds as string[]),
      relatedId,
    ];

    const result = await this.prisma.todo.update({
      where: { id: todoId },
      data: {
        relatedTaskIds: updatedRelatedTaskIds,
      } as any,
    });

    return this.mapToModel(result);
  }

  async removeRelatedTask(todoId: string, relatedId: string): Promise<Todo> {
    // 関連タスクを削除
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new Error("Todo not found");
    }

    const updatedRelatedTaskIds = (todo.relatedTaskIds as string[]).filter(
      (id) => id !== relatedId,
    );

    const result = await this.prisma.todo.update({
      where: { id: todoId },
      data: {
        relatedTaskIds: updatedRelatedTaskIds,
      } as any,
    });

    return this.mapToModel(result);
  }

  async findById(id: string): Promise<Todo | null> {
    const result = await this.prisma.todo.findUnique({
      where: { id },
    });
    return result ? this.mapToModel(result) : null;
  }

  async findChildren(parentId: string): Promise<Todo[]> {
    const results = await this.prisma.todo.findMany({
      where: { parentTaskId: parentId } as any,
    });
    return results.map((item) => this.mapToModel(item));
  }

  async findRelated(todoId: string): Promise<Todo[]> {
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo || !todo.relatedTaskIds || todo.relatedTaskIds.length === 0) {
      return [];
    }

    const results = await this.prisma.todo.findMany({
      where: {
        id: { in: todo.relatedTaskIds as string[] },
      } as any,
    });

    return results.map((item) => this.mapToModel(item));
  }
}
