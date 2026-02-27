import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
    adapter,
  });

// 開発環境ではホットリロードによる接続数増加を防ぐため、global変数にインスタンスを保持する
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
