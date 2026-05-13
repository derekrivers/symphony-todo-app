import type { Task } from "../types/taskTypes";

const STORAGE_KEY = "symphony.todo.tasks";

export function loadTasks(): Task[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const rawTasks = window.localStorage.getItem(STORAGE_KEY);
    if (!rawTasks) {
      return [];
    }

    const parsedTasks: unknown = JSON.parse(rawTasks);
    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks.filter(isStoredTask);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function isStoredTask(task: unknown): task is Task {
  if (!task || typeof task !== "object") {
    return false;
  }

  const candidate = task as Partial<Task>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.completed === "boolean" &&
    ["low", "medium", "high"].includes(candidate.priority ?? "") &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.updatedAt === "string"
  );
}
