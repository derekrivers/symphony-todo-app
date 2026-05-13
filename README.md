# Symphony Todo App

A React + Vite Todo application scaffold with typed task models, local
storage-backed state, filtering, search, sorting, and responsive task
management UI.

This repository is organized to support a modern, scalable React product built with strong architecture and agent-friendly documentation.

Key artifacts:

- `AGENTS.md`: concise agent entry point and map to deeper docs.
- `ARCHITECTURE.md`: top-level architecture and dependency rules.
- `docs/`: structured repository knowledge, including design docs, execution plans, product specs, and reliability/security guidance.
- `docs/product-specs/react-todo-app.md`: the detailed React Todo product and architecture spec.
- `src/`: React application scaffold with explicit domain boundaries and feature-based structure.
- `.github/workflows/ci.yml`: base CI workflow.

## Setup and local commands

Use Node.js and npm from your local development environment. From a fresh
checkout, install project dependencies before starting the app:

```sh
npm install
```

Then start the Vite development server through the project script:

```sh
npm run dev
```

To expose the dev server on all network interfaces, pass Vite's host flag
through the same npm script:

```sh
npm run dev -- --host 0.0.0.0
```

Do not run `vite` directly from a shell for normal local development. The npm
scripts automatically resolve the Vite binary installed in `node_modules/.bin`,
so a global `vite` installation is not required.

- `npm run dev`: start the Vite dev server.
- `npm run dev -- --host 0.0.0.0`: start the Vite dev server on all network
  interfaces.
- `npm run build`: type-check and create a production build.
- `npm run lint`: run ESLint.
- `npm test`: run Vitest.
