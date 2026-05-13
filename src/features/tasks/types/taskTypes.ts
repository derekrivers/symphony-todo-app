export type TaskPriority = "low" | "medium" | "high";

export type TaskFilter =
  | "all"
  | "active"
  | "completed"
  | "overdue"
  | "today"
  | "high";

export type TaskSort =
  | "smart"
  | "createdAt"
  | "dueDate"
  | "priority"
  | "alphabetical";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskDraft {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  category: string;
}
