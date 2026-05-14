import { AlertTriangle, CheckCircle2, CircleDot, Gauge } from "lucide-react";

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
      <article className="stat-card">
        <span className="stat-icon" aria-hidden="true">
          <CircleDot size={18} />
        </span>
        <span className="stat-value">{active}</span>
        <span className="stat-label">Active</span>
      </article>

      <article className="stat-card">
        <span className="stat-icon success" aria-hidden="true">
          <CheckCircle2 size={18} />
        </span>
        <span className="stat-value">{completed}</span>
        <span className="stat-label">Done</span>
      </article>

      <article className="stat-card">
        <span className="stat-icon warning" aria-hidden="true">
          <AlertTriangle size={18} />
        </span>
        <span className="stat-value">{overdue}</span>
        <span className="stat-label">Overdue</span>
      </article>

      <article className="stat-card progress-card">
        <span className="stat-icon" aria-hidden="true">
          <Gauge size={18} />
        </span>
        <span className="stat-value">{completion}%</span>
        <span className="stat-label">Completion</span>
        <span className="progress-shell" aria-label={`${completion}% complete`}>
          <span className="progress-bar" style={{ width: `${completion}%` }} />
        </span>
      </article>
    </div>
  );
}
