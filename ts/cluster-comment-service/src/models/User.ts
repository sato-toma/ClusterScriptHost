import { ServerId } from "./TodoServer";
import { ISODateString } from "../types/date";
export type UserId = string;

export interface UserCore {
  id: UserId;
  createdAt: ISODateString;
  deletedAt?: ISODateString;
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
  lastLoginAt?: ISODateString;
}

export interface UserServerMembership {
  userId: UserId;
  serverId: ServerId;
  role: "admin" | "core" | "member";
  joinedAt: ISODateString;
}
