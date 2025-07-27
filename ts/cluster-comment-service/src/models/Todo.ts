export type TodoId = string;

export type TodoType = {
  id: TodoId;
  title: string;
  description: string;
  relatedTaskIds: TodoId[];
  childTaskIds: TodoId[];
  parentTaskId: TodoId;
};

export interface Todo {
  id: TodoId;
  title: string;
  description?: string;
  relatedTaskIds?: TodoId[];
  childTaskIds?: TodoId[];
  parentTaskId?: TodoId;
}
