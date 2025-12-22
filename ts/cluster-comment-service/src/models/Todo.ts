import { ChannelId } from "./TodoChannel";
import { ISODateString } from "../types/date";
import { UserId } from "./User";
export type TodoId = string;

export interface Todo {
  id: TodoId;

  channelId: ChannelId;
  completed: boolean;
  createdAt: ISODateString;
  creatorId: UserId;
  description?: string;
  dueDate?: ISODateString;
  name: string;
  updatedAt?: ISODateString;

  relatedTaskIds?: TodoId[];
  childTaskIds?: TodoId[];
  parentTaskId?: TodoId | null;
}
