# Design

This document captures the high-level design decisions and architecture goals for the React Todo application.

## Design goals

- Keep business logic separate from presentation.
- Use feature-based organization to reduce cross-cutting coupling.
- Favor explicit boundaries and small reusable components.
- Make the system legible for both humans and agents.
- Support future growth without a major rewrite.

## Architecture decisions

- Use a feature-driven structure with core task behavior encapsulated under `features/tasks/`.
- Expose a clear persistence boundary so storage can evolve from `localStorage` to a backend API later.
- Derive filters and sorting from the canonical task list instead of storing duplicate state.
- Keep form validation and data schema in dedicated packages (`React Hook Form` + `Zod`).
- Build UI components that can be reused across task views, filters, and settings.

## Component boundaries

- `AppLayout` owns page structure and responsive shell.
- `TaskForm` owns creation and editing UI.
- `TaskList` renders the task collection.
- `TaskItem` renders each task row.
- `TaskFilters` owns status and priority filtering.
- `TaskSearch` owns search query input.
- `TaskStats` summarizes task state.

## Quality and validation

- Use typed data models for all task shapes.
- Validate user input at the form boundary.
- Handle invalid persistence data gracefully.
- Keep error handling user-friendly and minimal.

For the full product and architecture description, see `docs/product-specs/react-todo-app.md`.
