import type { Task } from "../types/taskTypes";
import { isOverdue } from "../utils/taskDates";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;
  const overdue = tasks.filter(isOverdue).length;
  const completion = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <div className="stats" aria-label="Task summary">
      <div>
        <span className="stat-value">{active}</span>
        <span className="stat-label">Active</span>
      </div>
      <div>
        <span className="stat-value">{completed}</span>
        <span className="stat-label">Done</span>
      </div>
      <div>
        <span className="stat-value">{overdue}</span>
        <span className="stat-label">Overdue</span>
      </div>
      <div className="progress-shell" aria-label={`${completion}% complete`}>
        <span className="progress-bar" style={{ width: `${completion}%` }} />
      </div>
    </div>
  );
}
