"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const AuthStatus = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleLogout = () => {
    // ログアウト後にログインページへリダイレクト
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated && session?.user ? (
        <>
          <span className="text-sm text-gray-300">
            Welcome, {session.user.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthStatus;
