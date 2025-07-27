export type TodoId = string;

export interface Todo {
  id: TodoId;
  title: string;
  description?: string;
  relatedTaskIds?: TodoId[];
  childTaskIds?: TodoId[];
  parentTaskId?: TodoId;
}
