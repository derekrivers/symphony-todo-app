# Quality Score

This document defines quality criteria and review guidance for the React Todo application.

## Quality criteria

- Correctness: tasks can be created, edited, completed, deleted, searched, filtered, and persisted.
- Reliability: the UI should stay responsive and not break when task storage is invalid.
- Maintainability: code should use typed models, explicit state, and feature-based organization.
- Accessibility: the app should use semantic HTML, visible focus states, and non-color indicators for status.
- Testability: business logic and UI behavior should be covered by automated tests.

## Review metrics

- Does the app prevent empty task creation?
- Does task persistence work across reloads?
- Are filters and search working together?
- Does completed task state remain visible and recoverable?
- Is the component design reusable and simple?
- Are form validation errors handled clearly?
- Are all interactive elements keyboard accessible?

## Testing strategy

Recommended coverage:

- Unit tests for task filtering, sorting, and overdue calculations.
- Component tests for `TaskForm`, `TaskItem`, `TaskList`, and filter/search controls.
- User flow tests for adding, editing, completing, deleting, filtering, and searching tasks.
- Persistence tests for localStorage load and save behavior.

## Quality guardrails

- Keep task domain state in a single source of truth.
- Avoid duplicated derived state.
- Keep UI components presentational and delegate business logic to stores/services.
- Validate user input with schemas rather than ad hoc checks.
- Keep docs updated alongside implementation.
