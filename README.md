# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Prerequisites

- **Node.js** `^20.19.0 || >=22.12.0` (22 LTS recommended)
- **pnpm** `>= 10` — install via `corepack enable` or https://pnpm.io/installation
- **Git**
- **React 19** is already included as a project dependency — no global install needed

## Installation

```bash
git clone https://github.com/tunlabscorp/web.git
cd web
pnpm install
```

## Running

```bash
pnpm dev       # dev server with HMR at http://localhost:5173
pnpm build     # type-check + production build to dist/
pnpm preview   # serve the production build locally
pnpm lint      # run oxlint
```

> Tests are not configured yet — `pnpm test` will be added during project setup.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
