import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  // 認証プロバイダーの設定
  providers: [
    CredentialsProvider({
      // プロバイダーの名前。signIn関数で指定するIDと一致させる
      name: "Credentials",
      // ログインフォームで期待するクレデンシャル（ここではuserId）
      credentials: {
        userId: { label: "User ID", type: "text" },
      },
      // 認証ロジックを記述する関数
      async authorize(credentials, req) {
        // 実際のアプリケーションでは、ここでデータベースなどと照合してユーザーを検証します。
        // 今回は、userIdに基づいてユーザー情報を模擬的に作成します。
        if (credentials?.userId) {
          let userName = "";
          if (credentials.userId === "user1") {
            userName = "Alice";
          } else if (credentials.userId === "user2") {
            userName = "Bob";
          } else {
            // 未知のユーザーIDの場合、認証失敗
            return null;
          }

          // 認証成功の場合、ユーザーオブジェクトを返す
          // このオブジェクトはJWTとセッションに保存されます
          return { id: credentials.userId, name: userName };
        }
        // userIdが提供されない場合、認証失敗
        return null;
      },
    }),
  ],
  // コールバックの設定
  callbacks: {
    // JWTが作成または更新されるたびに呼び出される
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    // セッションがチェックされるたびに呼び出される
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
      }
      return session;
    },
  },
  // カスタムログインページを指定
  pages: {
    signIn: "/login",
  },
  // JWTの署名に使用されるシークレットキー。環境変数で設定することを強く推奨
  // secret: process.env.NEXTAUTH_SECRET, // .env.localに設定してください
};

// Next.js App RouterのAPIルートとしてエクスポート
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
