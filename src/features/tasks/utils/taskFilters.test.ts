import { describe, expect, it } from "vitest";

import type { Task } from "../types/taskTypes";
import { filterTasks, sortTasks } from "./taskFilters";

const baseTask: Task = {
  id: "task-1",
  title: "Write implementation",
  description: "Build the initial todo app",
  completed: false,
  priority: "medium",
  dueDate: "",
  category: "Work",
  createdAt: "2026-05-13T09:00:00.000Z",
  updatedAt: "2026-05-13T09:00:00.000Z",
};

describe("taskFilters", () => {
  it("filters tasks by completion state and search text", () => {
    const tasks: Task[] = [
      baseTask,
      {
        ...baseTask,
        id: "task-2",
        title: "Buy groceries",
        description: "Milk and bread",
        completed: true,
        category: "Personal",
      },
    ];

    expect(filterTasks(tasks, "active", "implementation")).toEqual([baseTask]);
    expect(filterTasks(tasks, "completed", "bread")).toEqual([tasks[1]]);
  });

  it("sorts high-priority active work before completed work", () => {
    const tasks: Task[] = [
      { ...baseTask, id: "task-1", priority: "low" },
      { ...baseTask, id: "task-2", completed: true, priority: "high" },
      { ...baseTask, id: "task-3", priority: "high" },
    ];

    expect(sortTasks(tasks, "smart").map((task) => task.id)).toEqual([
      "task-3",
      "task-1",
      "task-2",
    ]);
  });
});
