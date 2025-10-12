"use client";

import { useAppSelector, useAppDispatch } from "@store/hooks";
import { logout } from "@store/slices/authSlice";
import Link from "next/link";

const AuthStatus = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.auth,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated && currentUser ? (
        <>
          <span className="text-sm text-gray-300">
            Welcome, {currentUser.username}
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
