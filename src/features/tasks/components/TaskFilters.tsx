import type { Task, TaskFilter } from "../types/taskTypes";
import { countByFilter } from "../utils/taskFilters";

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  tasks: Task[];
}

const filterOptions: Array<{ label: string; value: TaskFilter }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Today", value: "today" },
  { label: "Overdue", value: "overdue" },
  { label: "High", value: "high" },
];

export function TaskFilters({
  activeFilter,
  onFilterChange,
  tasks,
}: TaskFiltersProps) {
  return (
    <div className="panel-stack">
      <div className="filter-group" aria-label="Task filters">
        {filterOptions.map((option) => (
          <button
            className="filter-button"
            data-active={activeFilter === option.value}
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            type="button"
          >
            <span>{option.label}</span>
            <span className="count">{countByFilter(tasks, option.value)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
