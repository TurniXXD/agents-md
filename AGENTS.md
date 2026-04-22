# AGENTS.md

This repository uses a single frontend workspace in [`/web`](/Users/teapot/work/test/agents-md/web).

## Frontend Stack

- Use Next.js 16 with App Router.
- Always use `pnpm` for package installation, script execution, and lockfile management.
- Do not use `npm` or `yarn` unless the user explicitly requests an exception.
- Always use SCSS for styles.
- Do not create or use plain CSS files.
- Use `proxy.ts` instead of `middleware.ts`.
- Use `next-intl` for all user-facing text.
- Use Czech (`cs`) as the default locale unless the user explicitly asks for another default.
- Use `next-auth` for authentication.
- Use Chakra UI for UI primitives.
- Use React Hook Form for forms.
- Use Zod for all validation.
- Use Zustand for lightweight client state only when component state is not enough.
- Use T3 Env with Zod to validate envs on startup.
- Use Playwright for e2e tests.
- Use Jest for unit tests.
- Use ES6 arrow functions instead of `function` declarations unless a framework API requires otherwise.

## Backend Policy

- Do not create a Python backend by default.
- Do not add authorization or authentication to simple presentation websites by default.
- Only add a Python backend when the product has a real backend requirement that cannot be handled cleanly by the frontend app or built-in Next.js server capabilities.
- Landing pages, presentation websites, and other mostly static marketing sites should remain frontend-only.
- If backend work is actually needed, state the reason clearly before introducing a separate backend service.

## Reuse Rules

- Treat [`boilerplate`](/Users/teapot/work/test/agents-md/boilerplate) as a source of reusable templates, not a folder to copy wholesale.
- Always add a `.gitignore` to generated projects.
- Build project `.gitignore` files from [`boilerplate/.gitignore`](/Users/teapot/work/test/agents-md/boilerplate/.gitignore), but copy only the sections that apply to the project being created.
- Do not add ignore rules for stacks that are not present; for example, do not add Python backend rules when the project has no Python backend, and do not add Rust or Go rules unless those backends exist.
- Reuse the same root pre-commit flow from [`boilerplate/.husky/pre-commit`](/Users/teapot/work/test/agents-md/boilerplate/.husky/pre-commit) and [`boilerplate/.husky/commit-msg`](/Users/teapot/work/test/agents-md/boilerplate/.husky/commit-msg) when the project uses Git hooks.
- Reuse Husky, lint-staged, prettier, and commitlint from [`boilerplate/package.json`](/Users/teapot/work/test/agents-md/boilerplate/package.json) and [`boilerplate/commitlint.config.cjs`](/Users/teapot/work/test/agents-md/boilerplate/commitlint.config.cjs), but only include dependencies and scripts needed by the target project.
- Reuse the repo pipeline setup from [`boilerplate/.github/workflows/ci.yml`](/Users/teapot/work/test/agents-md/boilerplate/.github/workflows/ci.yml), adjusting commands to match the actual project stack and omitting jobs for missing stacks.
- Reuse the env setup pattern from [`boilerplate/.env.example`](/Users/teapot/work/test/agents-md/boilerplate/.env.example), adding only env variables that are actually used.
- Use Dockerfile templates from [`boilerplate/dockerfiles`](/Users/teapot/work/test/agents-md/boilerplate/dockerfiles) only when the project needs Docker.
- Copy only the Dockerfiles for stacks that actually exist in the project: [`nextjs.Dockerfile`](/Users/teapot/work/test/agents-md/boilerplate/dockerfiles/nextjs.Dockerfile), [`python-be.Dockerfile`](/Users/teapot/work/test/agents-md/boilerplate/dockerfiles/python-be.Dockerfile), [`rust-be.Dockerfile`](/Users/teapot/work/test/agents-md/boilerplate/dockerfiles/rust-be.Dockerfile), or [`go-be.Dockerfile`](/Users/teapot/work/test/agents-md/boilerplate/dockerfiles/go-be.Dockerfile).
- Do not add Python, Rust, Go, or Node backend Dockerfiles when the project is only a landing page or simple presentation website.
- Omit non-folder-specific duplication when extending the workspace.

## Structure

Use a page-scoped component structure:

```text
/web/src/components/{page-name}/
  {ComponentName}/
    {ComponentName}.tsx
    {ComponentName}.module.scss
    index.ts

/web/src/components/shared/
/web/src/lib/constants/
```

Additional structure rules:

- Do not create a `/web/src/features` folder.
- Put page-specific components into folders named after the page where they are used.
- Put reusable cross-page components into `/web/src/components/shared`.
- If a hook or util is specific to a single component, colocate it with that component.
- API calls go through a dedicated `/api` layer.
- Never call `fetch` directly inside React components.

## Component Rules

- Do not create one huge file of code or styles.
- Keep components small and composable.
- Target a maximum of roughly 300 lines per component file.
- Keep business logic out of UI components.
- Move lifecycle-driven logic into separate hook files when that improves clarity.
- Use Server Components by default.
- Mark Client Components explicitly.
- Avoid unnecessary `useEffect`.
- Memoize only when needed.
- Use refs only when necessary; prefer state when possible.

## Types And Validation

- Prefer `type` over `interface`.
- Create base types for shared types and extend from them.
- Never trust client input.
- Validate all inputs with Zod.
- Protect server actions and server-side entry points.
- Use typed API clients.
- Prefer generated Swagger types and generated queries when an API schema exists.

## Errors And Async Code

- Handle errors centrally.
- All async code must handle errors explicitly.
- No silent failures.
- Log meaningful errors.
- Prefer simple solutions over complex abstractions.
- Avoid premature optimization.

## Text And Internationalization

- No hardcoded user-facing strings in components or routes.
- All text must go through translations.
- Use namespaces per feature.

## Environment And Secrets

- No secrets in client code.
- Add every env variable to [`/web/.env.example`](/Users/teapot/work/test/agents-md/web/.env.example).
- Separate public and private envs.

## Testing

- Every util must have a unit test.
- Every form must have an e2e test.

## Generation Priorities

When generating or editing code, prioritize:

1. Readability
2. Consistency with the existing codebase
3. Simplicity
4. Performance only when needed

## Library Policy

- Do not introduce new libraries unless necessary.
- Always reuse existing patterns in the repo before creating new ones.
