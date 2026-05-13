import { useState } from "react";

import type { Task, TaskDraft } from "../types/taskTypes";
import { formatDueDate, isOverdue } from "../utils/taskDates";
import { TaskForm } from "./TaskForm";

interface TaskItemProps {
  onDelete: (taskId: string) => void;
  onToggle: (taskId: string) => void;
  onUpdate: (taskId: string, draft: TaskDraft) => void;
  task: Task;
}

export function TaskItem({
  onDelete,
  onToggle,
  onUpdate,
  task,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const overdue = isOverdue(task);

  function handleUpdate(draft: TaskDraft) {
    onUpdate(task.id, draft);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="task-card">
        <TaskForm
          initialValue={{
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            category: task.category,
          }}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleUpdate}
          submitLabel="Save"
        />
      </li>
    );
  }

  return (
    <li className="task-card" data-completed={task.completed}>
      <label className="task-check">
        <input
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          type="checkbox"
        />
        <span>{task.completed ? "Done" : "Open"}</span>
      </label>

      <div className="task-content">
        <div className="task-title-row">
          <h2>{task.title}</h2>
          <span className={`priority ${task.priority}`}>{task.priority}</span>
        </div>

        {task.description ? (
          <p className="task-description">{task.description}</p>
        ) : null}

        <div className="task-meta">
          {task.dueDate ? (
            <span data-overdue={overdue}>{formatDueDate(task.dueDate)}</span>
          ) : null}
          {task.category ? <span>{task.category}</span> : null}
        </div>
      </div>

      <div className="task-actions">
        <button
          aria-label={`Edit ${task.title}`}
          className="icon-button"
          onClick={() => setIsEditing(true)}
          type="button"
        >
          Edit
        </button>
        <button
          aria-label={`Delete ${task.title}`}
          className="icon-button danger"
          onClick={() => onDelete(task.id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
