import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// 開発環境ではホットリロードによる接続数増加を防ぐため、global変数にインスタンスを保持する
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
