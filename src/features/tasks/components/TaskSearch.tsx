import { Search } from "lucide-react";

interface TaskSearchProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export function TaskSearch({ onSearchChange, searchQuery }: TaskSearchProps) {
  return (
    <label className="search-field" htmlFor="task-search">
      <span className="field-label">Search</span>
      <span className="input-shell">
        <Search size={16} aria-hidden="true" />
        <input
          className="input"
          id="task-search"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Find tasks"
          type="search"
          value={searchQuery}
        />
      </span>
    </label>
  );
}
