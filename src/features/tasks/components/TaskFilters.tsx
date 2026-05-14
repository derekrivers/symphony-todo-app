import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Flame,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

import type { Task, TaskFilter } from "../types/taskTypes";
import { countByFilter } from "../utils/taskFilters";

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  tasks: Task[];
}

const filterOptions: Array<{
  Icon: LucideIcon;
  label: string;
  value: TaskFilter;
}> = [
  { Icon: ListChecks, label: "All", value: "all" },
  { Icon: CircleDot, label: "Active", value: "active" },
  { Icon: CheckCircle2, label: "Completed", value: "completed" },
  { Icon: CalendarDays, label: "Today", value: "today" },
  { Icon: AlertTriangle, label: "Overdue", value: "overdue" },
  { Icon: Flame, label: "High", value: "high" },
];

export function TaskFilters({
  activeFilter,
  onFilterChange,
  tasks,
}: TaskFiltersProps) {
  return (
    <div className="panel-stack">
      <div className="filter-group" aria-label="Task filters">
        {filterOptions.map(({ Icon, ...option }) => (
          <button
            aria-pressed={activeFilter === option.value}
            className="filter-button"
            data-active={activeFilter === option.value}
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            type="button"
          >
            <span className="filter-label">
              <Icon size={16} aria-hidden="true" />
              <span>{option.label}</span>
            </span>
            <span className="count">{countByFilter(tasks, option.value)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
