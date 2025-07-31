"use client";
import { ReactNode } from "react";
import Sidebar from "@components/organisms/Sidebar";
import ServerNav from "@components/organisms/ServerNav";
import TodoForm from "@components/TodoForm";
import TodoList from "@components/TodoList";
import TodoKanban from "@components/TodoKanban";

import { geistMono, geistSans } from "@lib/fonts";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex`}
      >
        <ServerNav />
        <Sidebar />
        <TodoForm channelId={"SampleChannelId"} />
        <TodoList />
        <TodoKanban />
      </body>
    </html>
  );
};

export default AppLayout;
