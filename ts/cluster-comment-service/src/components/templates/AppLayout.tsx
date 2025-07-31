"use client";
import { ReactNode } from "react";
import Sidebar from "@components/organisms/Sidebar";
import ServerNav from "@components/organisms/ServerNav";
import TodoForm from "@components/TodoForm";
import TodoList from "@components/TodoList";
import TodoKanban from "@components/TodoKanban";
import ReduxProvider from "@store/ReduxProvider";
import { geistMono, geistSans } from "@lib/fonts";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <ReduxProvider>
      <div className="flex h-screen text-white">
        <div className="w-16 bg-gray-900 flex flex-col items-center py-4 gap-2">
          <ServerNav />
        </div>
        <div className="w-64 bg-gray-100 text-black">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 bg-black">
          <header className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white shadow">
            <select className="bg-gray-800 text-white px-2 py-1 rounded">
              <option>Option 1</option>
              <option>Option 2</option>
            </select>

            <button className="text-2xl">⋮</button>
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </ReduxProvider>
  );
};

export default AppLayout;
