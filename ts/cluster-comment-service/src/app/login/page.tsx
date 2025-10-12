"use client";

import { useAppDispatch } from "@store/hooks";
import { login } from "@store/slices/authSlice";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = (userId: string) => {
    dispatch(login(userId));
    router.push("/"); // ログイン後にホームページへリダイレクト
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogin("user1")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login as Alice
          </button>
          <button
            onClick={() => handleLogin("user2")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Login as Bob
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
