import type { Task, TaskDraft } from "../types/taskTypes";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  onDelete: (taskId: string) => void;
  onToggle: (taskId: string) => void;
  onUpdate: (taskId: string, draft: TaskDraft) => void;
  tasks: Task[];
}

export function TaskList({
  onDelete,
  onToggle,
  onUpdate,
  tasks,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks match this view.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
          task={task}
        />
      ))}
    </ul>
  );
}
