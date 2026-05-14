import { ArrowDownUp } from "lucide-react";

import type { TaskSort } from "../types/taskTypes";

interface TaskSortSelectProps {
  activeSort: TaskSort;
  onSortChange: (sort: TaskSort) => void;
}

const sortOptions: Array<{ label: string; value: TaskSort }> = [
  { label: "Smart", value: "smart" },
  { label: "Due date", value: "dueDate" },
  { label: "Priority", value: "priority" },
  { label: "Newest", value: "createdAt" },
  { label: "A-Z", value: "alphabetical" },
];

export function TaskSortSelect({
  activeSort,
  onSortChange,
}: TaskSortSelectProps) {
  return (
    <label className="sort-field" htmlFor="sort">
      <span className="field-label">Sort</span>
      <span className="select-shell">
        <ArrowDownUp size={16} aria-hidden="true" />
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
      </span>
    </label>
  );
}
