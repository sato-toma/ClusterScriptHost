import { UserId } from "./User";

export type ServerId = string;

export interface ServerCore {
  id: ServerId;
  ownerId: UserId;
  name: string;
}
