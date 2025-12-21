import { describe, it, expect, vi, beforeEach } from "vitest";
import { CommentRepository } from "./commentRepository";
import { PrismaClient } from "@prisma/client";

describe("CommentRepository", () => {
  let repository: CommentRepository;
  let prismaMock: any;

  beforeEach(() => {
    // PrismaClientのモック作成
    prismaMock = {
      comment: {
        create: vi.fn(),
        findUnique: vi.fn(),
      },
    };
    repository = new CommentRepository(prismaMock as PrismaClient);
  });

  it("should create a comment", async () => {
    const mockComment = { id: "1", content: "test content" };
    prismaMock.comment.create.mockResolvedValue(mockComment);

    const result = await repository.create("test content");

    expect(result).toEqual(mockComment);
    expect(prismaMock.comment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          content: "test content",
        }),
      }),
    );
  });
});
