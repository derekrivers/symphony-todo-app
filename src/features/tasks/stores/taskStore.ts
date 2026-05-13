import { useEffect, useState } from "react";

import { createId } from "../../../lib/ids";
import { loadTasks, saveTasks } from "../services/taskStorage";
import type { Task, TaskDraft } from "../types/taskTypes";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(draft: TaskDraft) {
    const now = new Date().toISOString();
    const task: Task = {
      id: createId(),
      title: draft.title,
      description: draft.description,
      completed: false,
      priority: draft.priority,
      dueDate: draft.dueDate,
      category: draft.category,
      createdAt: now,
      updatedAt: now,
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
  }

  function updateTask(taskId: string, draft: TaskDraft) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: draft.title,
              description: draft.description,
              priority: draft.priority,
              dueDate: draft.dueDate,
              category: draft.category,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }

  function deleteTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  return {
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
}
