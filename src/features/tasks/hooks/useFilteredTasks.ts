import { useMemo } from "react";

import type { Task, TaskFilter, TaskSort } from "../types/taskTypes";
import { filterTasks, sortTasks } from "../utils/taskFilters";

export function useFilteredTasks(
  tasks: Task[],
  filter: TaskFilter,
  searchQuery: string,
  sort: TaskSort,
) {
  return useMemo(
    () => sortTasks(filterTasks(tasks, filter, searchQuery), sort),
    [filter, searchQuery, sort, tasks],
  );
}
