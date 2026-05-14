import { type FormEvent, useState } from "react";
import { Plus, Save, X } from "lucide-react";

import type { TaskDraft, TaskPriority } from "../types/taskTypes";

interface TaskFormProps {
  categories?: string[];
  initialValue?: TaskDraft;
  onCancel?: () => void;
  onSubmit: (draft: TaskDraft) => void;
  submitLabel?: string;
}

const emptyDraft: TaskDraft = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
  category: "",
};

export function TaskForm({
  categories = [],
  initialValue,
  onCancel,
  onSubmit,
  submitLabel = "Add task",
}: TaskFormProps) {
  const [draft, setDraft] = useState<TaskDraft>(initialValue ?? emptyDraft);
  const [error, setError] = useState("");
  const isSaving = submitLabel.toLowerCase().includes("save");
  const SubmitIcon = isSaving ? Save : Plus;

  function updateField<Key extends keyof TaskDraft>(
    key: Key,
    value: TaskDraft[Key],
  ) {
    setDraft((currentDraft) => ({ ...currentDraft, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.title.trim()) {
      setError("Title is required.");
      return;
    }

    onSubmit({
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
      category: draft.category.trim(),
    });
    setDraft(emptyDraft);
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span className="field-label">Title</span>
          <input
            className="input"
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Ship todo scaffold"
            value={draft.title}
          />
        </label>

        <label className="field">
          <span className="field-label">Priority</span>
          <select
            className="select"
            onChange={(event) =>
              updateField("priority", event.target.value as TaskPriority)
            }
            value={draft.priority}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="field">
          <span className="field-label">Due</span>
          <input
            className="input"
            onChange={(event) => updateField("dueDate", event.target.value)}
            type="date"
            value={draft.dueDate}
          />
        </label>

        <label className="field">
          <span className="field-label">Category</span>
          <input
            className="input"
            list="task-categories"
            onChange={(event) => updateField("category", event.target.value)}
            placeholder="Work"
            value={draft.category}
          />
          <datalist id="task-categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </label>
      </div>

      <label className="field">
        <span className="field-label">Notes</span>
        <textarea
          className="textarea"
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Add useful context"
          rows={3}
          value={draft.description}
        />
      </label>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-actions">
        {onCancel ? (
          <button className="button secondary" onClick={onCancel} type="button">
            <X size={16} aria-hidden="true" />
            Cancel
          </button>
        ) : null}
        <button className="button primary" type="submit">
          <SubmitIcon size={16} aria-hidden="true" />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
