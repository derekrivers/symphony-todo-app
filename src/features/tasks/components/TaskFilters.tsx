import type { Task, TaskFilter, TaskSort } from "../types/taskTypes";
import { countByFilter } from "../utils/taskFilters";

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  activeSort: TaskSort;
  onFilterChange: (filter: TaskFilter) => void;
  onSortChange: (sort: TaskSort) => void;
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

const sortOptions: Array<{ label: string; value: TaskSort }> = [
  { label: "Smart", value: "smart" },
  { label: "Due date", value: "dueDate" },
  { label: "Priority", value: "priority" },
  { label: "Newest", value: "createdAt" },
  { label: "A-Z", value: "alphabetical" },
];

export function TaskFilters({
  activeFilter,
  activeSort,
  onFilterChange,
  onSortChange,
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

      <label className="field-label" htmlFor="sort">
        Sort
      </label>
      <select
        className="select"
        id="sort"
        onChange={(event) => onSortChange(event.target.value as TaskSort)}
        value={activeSort}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
