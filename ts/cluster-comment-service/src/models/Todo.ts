import { ChannelId } from "./TodoChannel";
import { ISODateString } from "../types/date";
export type TodoId = string;

export interface Todo {
  id: TodoId;
  channelId: ChannelId;

  name: string;
  description?: string;

  dueDate?: ISODateString;
  completed: boolean;
  createdAt: ISODateString;
  updatedAt?: ISODateString;

  relatedTaskIds?: TodoId[];
  childTaskIds?: TodoId[];
  parentTaskId?: TodoId | null;
}
