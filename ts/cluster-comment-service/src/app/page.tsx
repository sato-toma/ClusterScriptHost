"use client";

import AppLayout from "@components/templates/AppLayout";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  );
}
