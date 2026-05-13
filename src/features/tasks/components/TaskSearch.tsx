interface TaskSearchProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export function TaskSearch({ onSearchChange, searchQuery }: TaskSearchProps) {
  return (
    <label className="search-field">
      <span className="field-label">Search</span>
      <input
        className="input"
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Find tasks"
        type="search"
        value={searchQuery}
      />
    </label>
  );
}
