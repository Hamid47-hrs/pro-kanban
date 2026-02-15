export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}

export interface BoardState {
  tasks: Record<string, Task>;
  columns: {
    [key in TaskStatus]: string[];
  };
}
