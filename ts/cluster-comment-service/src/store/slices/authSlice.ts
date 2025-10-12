import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile, UserId } from "@models/User";

interface AuthState {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
}

// サンプルユーザーデータ
const sampleUsers: Record<UserId, UserProfile> = {
  user1: { id: "user1", username: "Alice" },
  user2: { id: "user2", username: "Bob" },
};

const initialState: AuthState = {
  currentUser: null, // 初期状態は未ログイン
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserId>) {
      const user = sampleUsers[action.payload];
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
      }
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
