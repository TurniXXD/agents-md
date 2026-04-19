# AGENTS.md

This repository uses a single frontend workspace in [`/web`](/Users/teapot/work/test/agents-md/web).

## Frontend Stack

- Use Next.js 16 with App Router.
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
- Only add a Python backend when the product has a real backend requirement that cannot be handled cleanly by the frontend app or built-in Next.js server capabilities.
- Landing pages, presentation websites, and other mostly static marketing sites should remain frontend-only.
- If backend work is actually needed, state the reason clearly before introducing a separate backend service.

## Reuse Rules

- Reuse the same root pre-commit flow from [`boilerplate/personal-web/.husky/pre-commit`](/Users/teapot/work/test/agents-md/boilerplate/personal-web/.husky/pre-commit) and [`boilerplate/personal-web/.husky/commit-msg`](/Users/teapot/work/test/agents-md/boilerplate/personal-web/.husky/commit-msg).
- Reuse Husky, lint-staged, prettier, and commitlint from [`boilerplate/personal-web/package.json`](/Users/teapot/work/test/agents-md/boilerplate/personal-web/package.json) and [`boilerplate/personal-web/commitlint.config.cjs`](/Users/teapot/work/test/agents-md/boilerplate/personal-web/commitlint.config.cjs).
- Reuse the repo pipeline setup from [`boilerplate/personal-web/.github/workflows/ci.yml`](/Users/teapot/work/test/agents-md/boilerplate/personal-web/.github/workflows/ci.yml).
- Reuse the env setup pattern from [`boilerplate/personal-web/.env.example`](/Users/teapot/work/test/agents-md/boilerplate/personal-web/.env.example).
- Omit non-folder-specific duplication when extending the workspace.
- These boilerplate configs were copied from `personal-web`; keep them as reference templates and only promote them into a real project root when that project actually needs them.

## Structure

Follow feature-based structure, not type-based structure:

```text
/web/src/features/{feature}/
  components/
  components/UI/
  hooks/
  api/
  types/
  lib/

/web/src/shared/
/web/src/lib/constants/
```

Additional structure rules:

- Shared code goes only into `/web/src/shared` or `/web/src/lib`.
- Never import across features directly.
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
