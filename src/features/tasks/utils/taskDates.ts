import type { Task } from "../types/taskTypes";

export function isOverdue(task: Task): boolean {
  if (!task.dueDate || task.completed) {
    return false;
  }

  return task.dueDate < getTodayKey();
}

export function isDueToday(task: Task): boolean {
  return task.dueDate === getTodayKey();
}

export function formatDueDate(dueDate: string): string {
  if (!dueDate) {
    return "";
  }

  const date = new Date(`${dueDate}T00:00:00`);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}
