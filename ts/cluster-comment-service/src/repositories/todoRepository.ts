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
}
