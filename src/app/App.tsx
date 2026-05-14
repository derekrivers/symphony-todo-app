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
  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;
  const highPriorityTasks = tasks.filter((task) => task.priority === "high").length;
  const completionRate = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;
  const categories = useMemo(
    () =>
      Array.from(
        new Set(tasks.map((task) => task.category).filter(Boolean)),
      ).sort((first, second) => first.localeCompare(second)),
    [tasks],
  );

  return (
    <AppLayout>
      <section className="page-heading" aria-labelledby="dashboard-heading">
        <div>
          <p className="eyebrow">Task dashboard</p>
          <h1 id="dashboard-heading">Today</h1>
          <p className="page-description">
            Plan the day, track priority work, and keep completed tasks in view.
          </p>
        </div>
        <div className="heading-metrics" aria-label="Today summary">
          <span>
            <strong>{activeTasks}</strong>
            Active
          </span>
          <span>
            <strong>{completionRate}%</strong>
            Complete
          </span>
          <span>
            <strong>{highPriorityTasks}</strong>
            High priority
          </span>
        </div>
      </section>

      <section className="overview-grid" aria-label="Task overview">
        <TaskStats tasks={tasks} />
      </section>

      <section className="workspace" aria-label="Task workspace">
        <aside className="sidebar" aria-label="Task controls">
          <section
            className="panel-card create-panel"
            id="create-task"
            aria-labelledby="create-task-heading"
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">New task</p>
                <h2 id="create-task-heading">Capture work</h2>
              </div>
            </div>
            <TaskForm categories={categories} onSubmit={addTask} />
          </section>

          <section
            className="panel-card"
            id="task-filters"
            aria-labelledby="task-filter-heading"
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Views</p>
                <h2 id="task-filter-heading">Filters</h2>
              </div>
            </div>
            <TaskFilters
              activeFilter={filter}
              onFilterChange={setFilter}
              tasks={tasks}
            />
          </section>
        </aside>

        <main className="task-area" id="tasks">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Task list</p>
              <h2>Workspace</h2>
            </div>
            <span className="result-count">
              {visibleTasks.length} of {tasks.length}
            </span>
          </div>
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
