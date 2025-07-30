import { ChannelId } from "./TodoChannel";
export type TodoId = string;

export interface Todo {
  id: TodoId;
  channelId: ChannelId;

  name: string;
  description?: string;

  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;

  relatedTaskIds?: TodoId[];
  childTaskIds?: TodoId[];
  parentTaskId?: TodoId | null;
}
