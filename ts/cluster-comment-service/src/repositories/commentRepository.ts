import { PrismaClient, Comment } from "@prisma/client";

export class CommentRepository {
  constructor(private prisma: PrismaClient) {}

  async create(content: string): Promise<Comment> {
    // Note: 実際のスキーマに合わせてフィールドを調整してください
    return this.prisma.comment.create({
      data: {
        content,
      } as any,
    });
  }

  async findById(id: string): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }

  async update(id: string, content: string): Promise<Comment> {
    return this.prisma.comment.update({
      where: { id },
      data: { content },
    });
  }

  async delete(id: string): Promise<Comment> {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
