# Frontend

This document describes frontend architecture, UI principles, and rendering constraints for the React Todo application.

## UI goals

- Clean, modern, and focused layout.
- Fast, responsive interactions with immediate feedback.
- Accessible forms, buttons, and keyboard navigation.
- Clear visual hierarchy for active, overdue, and completed tasks.
- Responsive design across desktop, tablet, and mobile.

## Component model

The frontend should be composed of small reusable components:

- `Button`
- `Input`
- `Textarea`
- `Checkbox`
- `Select`
- `Badge`
- `Modal`
- `TaskCard`
- `TaskList`
- `TaskFilters`
- `TaskSearch`

## Layout

- Header with app title and add-task control.
- Optional sidebar for filters and categories on larger screens.
- Main content area for task list and summary.
- Mobile-first layout with collapsible filter options.

## Styling

- Prefer utility-first styling for rapid iteration.
- Keep visual design minimal and highly readable.
- Use spacing, typography, and contrast to separate task states.
- Use badges and icons to communicate priority, due dates, and categories.

## Accessibility

- Use semantic HTML for form controls and task items.
- Ensure button labels and inputs are explicit.
- Make focus states visible.
- Avoid relying only on color to communicate meaning.
- Support keyboard interaction for form submission and task toggles.

## Integration with domain model

The UI should connect to the task domain through a small set of props and callbacks, leaving business logic inside feature stores and services.

For the full application description, see `docs/product-specs/react-todo-app.md`.
