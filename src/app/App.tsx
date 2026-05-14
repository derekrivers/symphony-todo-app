import { useMemo, useState } from "react";

import { TaskFilters } from "../features/tasks/components/TaskFilters";
import { TaskForm } from "../features/tasks/components/TaskForm";
import { TaskList } from "../features/tasks/components/TaskList";
import { TaskSearch } from "../features/tasks/components/TaskSearch";
import { TaskSortSelect } from "../features/tasks/components/TaskSortSelect";
import { TaskStats } from "../features/tasks/components/TaskStats";
import { useFilteredTasks } from "../features/tasks/hooks/useFilteredTasks";
import { useTasks } from "../features/tasks/stores/taskStore";
import type { TaskFilter, TaskSort } from "../features/tasks/types/taskTypes";
import { AppLayout } from "../layouts/AppLayout";

export function App() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<TaskSort>("smart");

  const visibleTasks = useFilteredTasks(tasks, filter, searchQuery, sort);
  const categories = useMemo(
    () =>
      Array.from(
        new Set(tasks.map((task) => task.category).filter(Boolean)),
      ).sort((first, second) => first.localeCompare(second)),
    [tasks],
  );

  return (
    <AppLayout>
      <section className="entry-panel" aria-labelledby="create-task-heading">
        <div>
          <p className="eyebrow">Today</p>
          <h1 id="create-task-heading">Symphony Todo</h1>
        </div>
        <TaskForm categories={categories} onSubmit={addTask} />
      </section>

      <section className="workspace" aria-label="Task workspace">
        <aside className="sidebar" aria-label="Task summary and filters">
          <TaskStats tasks={tasks} />
          <TaskFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            tasks={tasks}
          />
        </aside>

        <main className="task-area">
          <div className="task-toolbar">
            <TaskSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <TaskSortSelect activeSort={sort} onSortChange={setSort} />
          </div>
          <TaskList
            tasks={visibleTasks}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onUpdate={updateTask}
          />
        </main>
      </section>
    </AppLayout>
  );
}
