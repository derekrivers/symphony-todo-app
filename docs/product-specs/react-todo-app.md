# React Todo App — Product & Architecture Description

## 1. Product Overview

We want to build a modern, polished React Todo application that goes beyond a basic checklist. The goal is to create a clean, fast, user-friendly productivity app where users can manage tasks, organise them into meaningful groups, track progress, and maintain a simple workflow for day-to-day planning.

The application should feel lightweight and easy to use, but still be built with a professional architecture that could scale into a larger product over time. It should demonstrate good React engineering practices, clear separation of concerns, reusable components, typed data models, predictable state management, and a maintainable project structure.

At its core, the app allows users to create, update, complete, delete, filter, and organise tasks. It should support a smooth user experience with instant UI feedback, form validation, persistent storage, and a clean responsive layout that works across desktop, tablet, and mobile devices.

This app can be treated as both a real productivity tool and a strong demonstration project for modern React development.

## 2. Product Goals

The primary goal is to help users manage their tasks in a simple but structured way.

The app should allow users to:

- Add new tasks quickly.
- Mark tasks as complete or incomplete.
- Edit existing tasks.
- Delete tasks.
- Categorise tasks by project, list, or tag.
- Set priorities such as low, medium, or high.
- Add optional due dates.
- Filter tasks by status, priority, project, or due date.
- Search across tasks.
- View completed and active tasks separately.
- Persist task data between sessions.
- Use the app comfortably on desktop and mobile.

The app should also be designed in a way that allows future features to be added without needing a major rewrite.

## 3. Target User

The target user is someone who wants a simple, clean task management tool without the complexity of a full project management system.

Example users include:

- A developer tracking daily coding tasks.
- A student organising coursework.
- A freelancer managing client work.
- A household user tracking chores.
- A small team member managing personal tasks.
- Anyone who wants a lightweight productivity app.

The product should not feel overwhelming. The design should prioritise speed, clarity, and focus.

## 4. Core User Journey

A typical user journey would look like this:

1. The user opens the app and sees their current tasks.
2. They quickly add a new task using an input form.
3. They optionally assign a priority, due date, or category.
4. The new task appears immediately in the task list.
5. The user can mark a task as complete with one click.
6. Completed tasks visually move into a completed state.
7. The user can filter the list to see only active, completed, overdue, or high-priority tasks.
8. The user can edit or delete a task when needed.
9. When they return later, their tasks are still available.

The app should feel immediate and responsive. Most common actions should require one or two clicks at most.

## 5. Key Features

### 5.1 Task Creation

Users should be able to create a task using a simple form.

A task should include:

- Title
- Optional description
- Completion status
- Priority
- Optional due date
- Optional category/project
- Creation timestamp
- Last updated timestamp

The task title should be required. Other fields can be optional.

The form should validate user input and prevent empty tasks from being created.

### 5.2 Task List

The main screen should display a list of tasks.

Each task item should show:

- Task title
- Completion checkbox
- Priority indicator
- Due date, if present
- Category/project, if present
- Edit button
- Delete button

Completed tasks should be visually distinct. For example, they may use faded text, a strike-through title, or be moved into a completed section.

### 5.3 Editing Tasks

Users should be able to edit a task after it has been created.

Editable fields should include:

- Title
- Description
- Priority
- Due date
- Category/project
- Completion status

Editing could happen inline, in a modal, or in a dedicated task detail panel. For this app, an inline edit form or modal would be suitable.

### 5.4 Deleting Tasks

Users should be able to delete tasks.

To avoid accidental deletion, we can either:

- Show a confirmation dialog.
- Provide an undo notification after deletion.
- Move deleted tasks into a temporary soft-delete state.

For a clean first version, an undo toast would provide a better user experience than a blocking confirmation dialog.

### 5.5 Task Completion

Users should be able to mark tasks as complete or incomplete.

Completing a task should update the UI instantly.

Completed tasks should still be accessible so that users can review what they have finished.

### 5.6 Filtering

The app should support filtering tasks by status.

Initial filters should include:

- All tasks
- Active tasks
- Completed tasks
- Overdue tasks
- Due today
- High priority

This allows users to focus on the tasks that matter most.

### 5.7 Searching

Users should be able to search tasks by title or description.

Search should work alongside filters. For example, a user should be able to search only within active tasks or high-priority tasks.

### 5.8 Sorting

The app should support sorting tasks by:

- Creation date
- Due date
- Priority
- Completion status
- Alphabetical order

The default sort could place active tasks first, then sort by priority and due date.

### 5.9 Categories or Projects

Tasks should be organisable into categories or projects.

Example categories:

- Work
- Personal
- Shopping
- Health
- Study
- Admin

In the first version, categories can be simple strings. Later, they could become full entities with colours, icons, and their own pages.

### 5.10 Data Persistence

The app should persist tasks between sessions.

For the initial version, this can be handled with browser `localStorage`.

This keeps the app simple and avoids needing a backend immediately.

Later versions could replace or extend this with:

- REST API
- GraphQL API
- Firebase
- Supabase
- PostgreSQL-backed API
- User accounts and cloud sync

The architecture should hide persistence behind a dedicated service layer so that switching storage mechanisms later is straightforward.

## 6. Suggested Technology Stack

### 6.1 React

React will be the main UI library.

It gives us a component-based architecture, making it easy to break the app into small reusable pieces such as:

- Task list
- Task item
- Task form
- Filter controls
- Search input
- Layout shell
- Modal
- Button
- Badge
- Empty state

React is a good fit because the UI changes frequently based on user actions, such as adding tasks, editing tasks, filtering, and marking tasks as complete.

### 6.2 TypeScript

The app should be written in TypeScript.

TypeScript gives us stronger safety around our data models, props, state, and functions.

### 6.3 Vite

Vite should be used as the build tool.

It provides a fast development server, quick hot module replacement, simple configuration, and modern frontend tooling.

### 6.4 React Router

React Router can be used if the app has multiple views.

For the first version, the app could work without routing. However, adding React Router early gives the app a scalable structure if we want multiple pages later.

### 6.5 Zustand for State Management

Zustand would be a strong choice for managing task state.

It is lightweight, easy to understand, and avoids much of the boilerplate that comes with heavier state management libraries.

### 6.6 React Hook Form

React Hook Form should be used for task forms.

It provides efficient form handling with minimal re-renders and a clean developer experience.

### 6.7 Zod

Zod should be used for schema validation.

It allows us to define validation rules in one place and infer TypeScript types from those rules.

### 6.8 Tailwind CSS

Tailwind CSS should be used for styling.

It allows us to build a polished UI quickly using utility classes, while keeping styles close to the components they affect.

### 6.9 shadcn/ui

shadcn/ui can provide high-quality reusable UI components.

Useful components include Button, Input, Textarea, Dialog, Dropdown menu, Select, Checkbox, Badge, Card, Tabs, Toast, and Command/search component.

### 6.10 Lucide React

Lucide React should be used for icons.

Possible icons:

- Plus icon for adding tasks
- Trash icon for deleting tasks
- Pencil icon for editing
- Check icon for completion
- Calendar icon for due dates
- Flag icon for priority
- Search icon for search input
- Folder icon for projects/categories

### 6.11 date-fns

date-fns should be used for date handling.

It can help with formatting due dates, checking whether a task is overdue, checking whether a task is due today, sorting by date, and displaying relative dates such as “Due tomorrow”.

### 6.12 Testing Libraries

The app should include automated tests.

Recommended testing tools:

- Vitest
- React Testing Library
- Testing Library User Event
- MSW if API mocking is needed later

## 7. Application Architecture

The app should be organised around clear responsibilities.

A suggested folder structure:

```txt
src/
  app/
    App.tsx
    routes.tsx
    providers.tsx

  components/
    ui/
      Button.tsx
      Input.tsx
      Modal.tsx
      Badge.tsx

  features/
    tasks/
      components/
        TaskForm.tsx
        TaskItem.tsx
        TaskList.tsx
        TaskFilters.tsx
        TaskSearch.tsx
        TaskSortSelect.tsx
        EmptyTaskState.tsx

      hooks/
        useFilteredTasks.ts
        useTaskStats.ts

      services/
        taskStorage.ts

      stores/
        taskStore.ts

      schemas/
        taskSchema.ts

      types/
        taskTypes.ts

      utils/
        taskFilters.ts
        taskSorting.ts
        taskDates.ts

  layouts/
    AppLayout.tsx
    Sidebar.tsx
    Header.tsx

  lib/
    storage.ts
    dates.ts
    ids.ts

  styles/
    globals.css

  test/
    setup.ts
```

This keeps the task feature self-contained and avoids spreading task-related code across the entire application.

## 8. Feature-Based Architecture

The app should use a feature-based architecture rather than organising everything only by technical type.

This makes the app easier to scale because each feature owns its own components, types, validation, hooks, and business logic.

For this Todo app, the main feature is `tasks`, but the structure allows future features such as `projects`, `labels`, `auth`, or `sync`.

## 9. Component Architecture

Components should be small, focused, and reusable.

Important components include:

### 9.1 AppLayout

Provides the main page structure.

### 9.2 TaskForm

Used to create or edit tasks.

### 9.3 TaskList

Responsible for rendering a list of tasks.

### 9.4 TaskItem

Responsible for displaying a single task.

### 9.5 TaskFilters

Responsible for changing the current task filter.

### 9.6 TaskSearch

Responsible for updating the current search query.

### 9.7 TaskStats

Displays useful summary information.

## 10. State Management Design

The app should separate raw state from derived state.

Raw state includes:

- `tasks`
- `filter`
- `searchQuery`
- `sortOption`
- `selectedCategory`

Derived state includes:

- Filtered tasks
- Sorted tasks
- Completed task count
- Active task count
- Overdue task count
- Completion percentage

Derived state should be calculated from the main task list.

## 11. Persistence Design

The initial app can use `localStorage`.

Persistence should be handled through a dedicated storage service rather than being scattered through components.

## 12. Data Model

A task should have a clear model.

```ts
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 13. UI/UX Direction

The app should look clean, modern, and focused.

Suggested layout:

- Header at the top with app name and add-task button.
- Sidebar for filters and categories on desktop.
- Main content area for task list.
- Mobile layout with collapsible navigation.
- Search and sort controls above the task list.
- Task cards with clear visual hierarchy.

## 14. Accessibility

The app should be accessible by default.

Accessibility considerations:

- Use semantic HTML.
- Buttons should have clear labels.
- Inputs should be associated with labels.
- Checkboxes should be keyboard accessible.
- Focus states should be visible.
- Modals should trap focus.
- Colours should not be the only way to communicate priority.

## 15. Error Handling

Handle:

- Empty task titles.
- Invalid due dates.
- localStorage read/write failures.
- Corrupted localStorage data.
- Missing task IDs when updating or deleting.

## 16. Testing Strategy

The test strategy should cover business logic, components, and user flows.

Recommended tests:

- Adding a task.
- Editing a task.
- Completing a task.
- Deleting a task.
- Searching tasks.
- Filtering completed tasks.
- Sorting by due date.

## 17. Future Enhancements

Potential future features:

- User accounts
- Cloud sync
- Drag-and-drop task ordering
- Recurring tasks
- Subtasks
- Labels
- Project pages
- Calendar view
- Kanban board view
- Notifications/reminders
- Offline-first sync
- Import/export tasks
- Shared task lists
- Collaboration
- Activity history
- Dark mode
- Keyboard shortcuts
- AI task suggestions

## 18. Suggested MVP Scope

MVP features:

- Create task
- Edit task
- Delete task
- Complete/uncomplete task
- Set priority
- Set optional due date
- Add optional category
- Filter by all/active/completed
- Search tasks
- Persist tasks in localStorage
- Responsive UI
- Basic tests

## 19. Out of Scope for MVP

Out of scope:

- User authentication
- Backend API
- Real-time sync
- Shared lists
- Team collaboration
- Push notifications
- Complex calendar scheduling
- Recurring tasks
- Drag-and-drop ordering

## 20. Recommended Library Summary

| Purpose | Library |
|---|---|
| UI framework | React |
| Language | TypeScript |
| Build tool | Vite |
| Routing | React Router |
| State management | Zustand |
| Forms | React Hook Form |
| Validation | Zod |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Icons | Lucide React |
| Date utilities | date-fns |
| Testing | Vitest |
| Component testing | React Testing Library |
| User interaction testing | Testing Library User Event |

## 21. Architectural Principles

The app should follow these principles:

- Keep components small and focused.
- Keep business logic out of UI components.
- Use TypeScript types for all core data models.
- Use schema validation for user input.
- Store only necessary state.
- Derive filtered and sorted views from the task list.
- Keep persistence behind a service abstraction.
- Prefer feature-based folders over global dumping grounds.
- Write tests around user behaviour.
- Design for future growth, but do not over-engineer the MVP.

## 22. Final Product Description

We are building a modern React Todo application that helps users manage tasks quickly and clearly. The app will allow users to create, edit, complete, delete, search, filter, sort, and categorise tasks. It will provide a clean responsive interface, persistent local storage, accessible UI components, and a scalable frontend architecture.

The product should feel simple on the surface but be professionally engineered underneath. It should demonstrate modern React practices using TypeScript, Vite, Zustand, React Hook Form, Zod, Tailwind CSS, shadcn/ui, date-fns, and Vitest.

The first version will focus on a strong MVP: task management, filtering, searching, priorities, due dates, categories, local persistence, and responsive design. The architecture should make it easy to add future features such as projects, cloud sync, user accounts, recurring tasks, reminders, drag-and-drop ordering, and collaboration.

This gives us a strong foundation for a real productivity app while keeping the initial build realistic, maintainable, and elegant.
