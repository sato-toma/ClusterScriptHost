import { ServerId } from "./TodoServer";
export type UserId = string;

export interface UserCore {
  id: UserId;
  createdAt: Date;
  deletedAt?: Date;
  isActive: boolean;
}

export interface UserProfile {
  id: UserId;
  username: string;
  email?: string;
  bio?: string;
  profileImageUrl?: string;
}

export interface UserSecurity {
  userId: UserId;
  authToken: string;
  lastLoginAt?: Date;
}

export interface UserServerMembership {
  userId: UserId;
  serverId: ServerId;
  role: "admin" | "core" | "member";
  joinedAt: Date;
}
