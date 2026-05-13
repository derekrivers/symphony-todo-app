import type { Task, TaskFilter, TaskPriority, TaskSort } from "../types/taskTypes";
import { isDueToday, isOverdue } from "./taskDates";

const priorityWeight: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function countByFilter(tasks: Task[], filter: TaskFilter): number {
  return filterTasks(tasks, filter, "").length;
}

export function filterTasks(
  tasks: Task[],
  filter: TaskFilter,
  searchQuery: string,
): Task[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesFilter = matchesTaskFilter(task, filter);
    const matchesSearch =
      !normalizedQuery ||
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery) ||
      task.category.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesSearch;
  });
}

export function sortTasks(tasks: Task[], sort: TaskSort): Task[] {
  return [...tasks].sort((firstTask, secondTask) => {
    switch (sort) {
      case "alphabetical":
        return firstTask.title.localeCompare(secondTask.title);
      case "createdAt":
        return secondTask.createdAt.localeCompare(firstTask.createdAt);
      case "dueDate":
        return compareDueDates(firstTask, secondTask);
      case "priority":
        return comparePriority(firstTask, secondTask);
      case "smart":
        return (
          compareCompletion(firstTask, secondTask) ||
          comparePriority(firstTask, secondTask) ||
          compareDueDates(firstTask, secondTask)
        );
    }
  });
}

function matchesTaskFilter(task: Task, filter: TaskFilter): boolean {
  switch (filter) {
    case "active":
      return !task.completed;
    case "completed":
      return task.completed;
    case "high":
      return task.priority === "high";
    case "overdue":
      return isOverdue(task);
    case "today":
      return isDueToday(task);
    case "all":
      return true;
  }
}

function compareCompletion(firstTask: Task, secondTask: Task): number {
  return Number(firstTask.completed) - Number(secondTask.completed);
}

function compareDueDates(firstTask: Task, secondTask: Task): number {
  if (!firstTask.dueDate && !secondTask.dueDate) {
    return 0;
  }

  if (!firstTask.dueDate) {
    return 1;
  }

  if (!secondTask.dueDate) {
    return -1;
  }

  return firstTask.dueDate.localeCompare(secondTask.dueDate);
}

function comparePriority(firstTask: Task, secondTask: Task): number {
  return priorityWeight[secondTask.priority] - priorityWeight[firstTask.priority];
}
