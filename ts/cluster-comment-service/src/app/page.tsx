import AppLayout from "@components/templates/AppLayout";
import DashboardPage from "./dashboard/page";
import { prisma } from "../lib/prisma";
import CommentSection from "@components/CommentSection";

export default async function Home() {
  // 既存のコメントを表示するためにデータを取得
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AppLayout>
      <DashboardPage />
      <CommentSection comments={comments} />
    </AppLayout>
  );
}
