# ARCHITECTURE

This repository is structured for agent-first engineering: strict boundaries, predictable layers, and mechanically enforceable rules.

## Layered domain structure

Each business domain is divided into a fixed set of layers:

- `types/` — shared data shapes and DTOs.
- `config/` — domain configuration and environment bindings.
- `repo/` — persistence adapters and storage abstractions.
- `service/` — business logic and domain operations.
- `runtime/` — runtime orchestration, local services, and side effects.
- `ui/` — user-facing presentation and interface wiring.

Cross-cutting concerns such as auth, telemetry, feature flags, and connectors enter through explicit `providers/` interfaces.

## Dependency rules

- Dependencies flow forward through the layer stack only.
- Each domain must expose a minimal public interface.
- Providers are the only permitted cross-domain boundary for shared concerns.

## React Todo app architecture

The Todo application uses a feature-based architecture with a central `tasks` domain and dedicated UI, storage, and state layers.

Suggested structure:

- `src/features/tasks/types/` — task models and enums.
- `src/features/tasks/schemas/` — form and validation schemas.
- `src/features/tasks/services/` — persistence and storage adapters.
- `src/features/tasks/stores/` — state management and task actions.
- `src/features/tasks/components/` — task UI components.
- `src/app/` — top-level application wiring, routes, and providers.
- `src/layouts/` — page shells and responsive layout.

This structure supports local storage now, with a clean migration path to backend persistence later.

## Suggested technology stack

- React for UI composition.
- TypeScript for type-safe data models.
- Vite for fast development and production builds.
- Zustand for lightweight state management.
- React Hook Form for form handling.
- Zod for input validation and schema inference.
- Tailwind CSS for styling.
- shadcn/ui for reusable UI primitives.
- Lucide React for icons.
- date-fns for date utilities.
- Vitest and React Testing Library for tests.

## Repository knowledge and legibility

The source of truth is the repository itself. Design documents, execution plans, and product specs are versioned and indexed in `docs/`.

## Codebase scaffolding

- `src/` — application code, organized by domain and layer.
- `docs/` — structured product and architecture knowledge.
- `.github/workflows/` — CI and verification automation.
- `package.json` / `tsconfig.json` — package manager and build configuration.

## Next steps

This scaffold establishes the application shell and documentation framework. The next phase is implementing the Todo app feature set in the `src/` hierarchy and validating it with tests and UI prototypes.
