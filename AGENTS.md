# AGENTS.md

## Frontend Stack

- Use Next.js 16 with App Router.
- Always use `pnpm` for package installation, script execution, and lockfile management.
- Do not use `npm` or `yarn` unless the user explicitly requests an exception.
- Always use SCSS for styles.
- Do not create or use plain CSS files.
- Define breakpoint values in shared SCSS variables such as `sm`, `md`, `lg`, `xl`.
- Do not hardcode breakpoint values inside component styles when shared variables can be used.
- Define colors through shared semantic SCSS variables such as `primary`, `secondary`, `text`, `background`, `border`, `success`, `warning`, and `error`.
- Do not hardcode one-off color values in component styles when they belong to the design system.
- Import and mount Three.js, `@react-three/fiber`, and STL-related code dynamically, never eagerly in the main page bundle.
- Use `proxy.ts` instead of `middleware.ts`.
- Use `next-intl` for all user-facing text.
- Use Czech (`cs`) as the default locale unless the user explicitly asks for another default.
- Use `next-auth` for authentication.
- Use `lucide-react` for icons.
- Use Chakra UI for UI primitives.
- Use React Hook Form for forms.
- Use Zod for all validation.
- Use Zustand for lightweight client state only when component state is not enough.
- Use T3 Env with Zod to validate envs on startup.
- Use Playwright for e2e tests.
- Use Jest for unit tests.
- Use ES6 arrow functions instead of `function` declarations unless a framework API requires otherwise.

## Default Decisions

- Use absolute imports via `@/` by default.
- Prefer absolute imports for cross-area imports.
- Use relative imports only for true sibling or private files such as `./hooks`, `./utils`, `./data`, or component-local helpers.
- Do not use deep relative imports such as `../../...` or `../../../...` when a configured alias exists.
- When changing imports, preserve the project's configured alias style, for example `@/...`, `components/...`, or `design-system/...`, depending on the repo.
- Use React Hook Form with Zod as the default form pattern.
- Use a dedicated `/api` layer for all API communication.
- Use one shared dialog/modal pattern across the project instead of custom dialog implementations per page.
- Use shared button and CTA variants before creating page-specific button styles.
- Check [`boilerplate`](boilerplate) first before creating config or infrastructure from scratch.

## Backend Policy

- Do not create a Python backend by default.
- Do not add authorization or authentication to simple presentation websites by default.
- Only add a Python backend when the product has a real backend requirement that cannot be handled cleanly by the frontend app or built-in Next.js server capabilities.
- Landing pages, presentation websites, and other mostly static marketing sites should remain frontend-only.
- If backend work is actually needed, state the reason clearly before introducing a separate backend service.

## Website Privacy Rules

- For public-facing websites such as presentation websites or e-shops, do not store data in cookies or `localStorage` unless the user has given cookie consent.
- Only treat internal apps or clearly authenticated product applications as exempt from this default public-website consent rule.

## Reuse Rules

- Treat [`boilerplate`](boilerplate) as a source of reusable templates, not a folder to copy wholesale.
- When creating a new project, always create a local `AGENTS.md` in that project.
- The new project's `AGENTS.md` should explicitly reference this central template via GitHub: [github.com/TurniXXD/agents-md/blob/main/AGENTS.md](https://github.com/TurniXXD/agents-md/blob/main/AGENTS.md).
- Prefer a lightweight project-local `AGENTS.md` that extends this template with only project-specific additions, constraints, or overrides.
- Always add a `.gitignore` to generated projects.
- Build project `.gitignore` files from [`boilerplate/.gitignore`](boilerplate/.gitignore), but copy only the sections that apply to the project being created.
- Do not add ignore rules for stacks that are not present; for example, do not add Python backend rules when the project has no Python backend, and do not add Rust or Go rules unless those backends exist.
- Reuse the same root pre-commit flow from [`boilerplate/.husky/pre-commit`](boilerplate/.husky/pre-commit) and [`boilerplate/.husky/commit-msg`](boilerplate/.husky/commit-msg) when the project uses Git hooks.
- Reuse Husky, lint-staged, prettier, commitlint, and ESLint dependencies from [`boilerplate/package.json`](boilerplate/package.json) and [`boilerplate/commitlint.config.cjs`](boilerplate/commitlint.config.cjs), but only include dependencies and scripts needed by the target project.
- Reuse the ESLint flat config from [`boilerplate/eslint.config.mjs`](boilerplate/eslint.config.mjs) for TypeScript/Next.js projects, adapting paths only when the project structure requires it.
- Reuse the general Playwright visual regression config from [`boilerplate/playwright.visual.config.ts`](boilerplate/playwright.visual.config.ts) when the project needs screenshot-based UI regression coverage.
- The boilerplate Playwright visual config intentionally starts with `en` as the only locale.
- Adjust the locale list and any locale-aware path handling in the visual test setup to match the target project's actual i18n settings before using it broadly.
- If the project uses Sentry, reuse the centralized boilerplate setup from [`boilerplate/sentry/sentryLogger.ts`](boilerplate/sentry/sentryLogger.ts), [`boilerplate/sentry/sentry.shared.ts`](boilerplate/sentry/sentry.shared.ts), and [`boilerplate/sentry/sentry.client.config.ts`](boilerplate/sentry/sentry.client.config.ts) instead of inventing ad hoc logging and init logic.
- Reuse the repo pipeline setup from [`boilerplate/.github/workflows/ci.yml`](boilerplate/.github/workflows/ci.yml), adjusting commands to match the actual project stack and omitting jobs for missing stacks.
- Reuse the env setup pattern from [`boilerplate/.env.example`](boilerplate/.env.example), adding only env variables that are actually used.
- Use Dockerfile templates from [`boilerplate/dockerfiles`](boilerplate/dockerfiles) only when the project needs Docker.
- Copy only the Dockerfiles for stacks that actually exist in the project: [`nextjs.Dockerfile`](boilerplate/dockerfiles/nextjs.Dockerfile), [`python-be.Dockerfile`](boilerplate/dockerfiles/python-be.Dockerfile), [`rust-be.Dockerfile`](boilerplate/dockerfiles/rust-be.Dockerfile), or [`go-be.Dockerfile`](boilerplate/dockerfiles/go-be.Dockerfile).
- Do not add Python, Rust, Go, or Node backend Dockerfiles when the project is only a landing page or simple presentation website.
- Omit non-folder-specific duplication when extending the workspace.

## Structure

Use a page-scoped component structure:

```text
/web/src/components/{page-name}/
  sections/
  blocks/
  ui/
  forms/
  hooks/

/web/src/components/shared/
/web/src/lib/constants/
/web/src/styles/
  tokens/
  mixins/
  globals/
```

If a separate backend is truly needed, organize it by technical layers instead of page names or random business folders:

```text
/backend/
  api/
  auth/
  db/
    migrations/
    client.ts
    schema.ts
  models/
  repositories/
  services/
  integrations/
  jobs/
  lib/
```

Additional structure rules:

- Put page-specific components into folders named after the page where they are used.
- Put reusable cross-page components into `/web/src/components/shared`.
- Extract a repeated pattern into `/web/src/components/shared` once it appears the second time.
- If a hook or util is specific to a single component, colocate it with that component.
- API calls go through a dedicated `/api` layer.
- Never call `fetch` directly inside React components.
- If a separate backend exists, prefer technical folders such as `services`, `repositories`, `models`, `integrations`, and `db` over scattered business-area folders like `products` at the backend root.
- Keep external providers such as Stripe, email, storage, and other third-party integrations inside dedicated integration folders instead of mixing them into domain service files.
- Keep database access inside repositories or clearly isolated data-access modules, not inside route handlers or UI-facing code.
- Barrel files such as `index.ts` should contain simple re-exports only.
- Before adding a new barrel export, check that the same module is not already exported.
- Avoid duplicate `export * from ...` entries.
- Avoid using barrels to hide unclear ownership; prefer importing shared types and primitives from their owning module.

## Naming Rules

- Use `PascalCase` for component folder names, component files, and React component exports.
- Use `camelCase` for hooks, utilities, helpers, and non-component files.
- Name hooks with the `use...` prefix.
- Use `.module.scss` files with the same base name as the component they style.
- Prefer `index.ts` only as a simple re-export file.

## SCSS Rules

- Keep shared SCSS tokens, breakpoints, mixins, and utility functions in `/web/src/styles`.
- Reuse shared breakpoint variables and mixins instead of duplicating raw media queries.
- Reuse semantic color variables instead of hardcoded hex values.
- Prefer spacing, radius, shadow, and z-index tokens when the design system defines them.
- Keep component SCSS modules local and focused on that component only.

## Component Rules

- Do not create one huge file of code or styles.
- Keep components small and composable.
- Target a maximum of roughly 300 lines per component file.
- Keep business logic out of UI components.
- Move lifecycle-driven logic into separate hook files when that improves clarity.
- Add stable `data-testid` markers to reusable loading components and reusable error components so visual and e2e tests can detect those states reliably.
- Use Server Components by default.
- Mark Client Components explicitly.
- Avoid unnecessary `useEffect`.
- Inside `useEffect`, do not use the `void` keyword to fire async work.
- Handle promises explicitly inside `useEffect`, for example by calling an inner async function and attaching clear success and error handling.
- Fix primitive and component behavior at the primitive implementation level instead of patching unrelated call sites.
- When replacing or recreating a UI primitive, preserve its behavioral contract first, including responsive props, pseudo props, forwarded DOM props, default styles, and `ref` or `as` support.
- Preserve responsive prop behavior for primitives, including the project's existing responsive value format.
- Preserve `className`, `style`, and forwarded native DOM props when refactoring primitives.
- Avoid adding extra wrapper layers around primitives unless they are required, because wrappers can change CSS order, layout behavior, and forwarded props.
- Validate migrated primitives on mobile layouts, not only desktop.
- Memoize only when needed.
- Use refs only when necessary; prefer state when possible.

## Form Rules

- If a page contains a form, at `950px` viewport width and below move input labels onto the top border of the input so the label overlaps the field border instead of sitting above the field.
- At `950px` and below, treat these labels as integrated field captions, not as separate stacked text above the input.
- Browser autofill colors must match the input background color.
- Form background and input background must use the same background color.
- Reuse one shared field pattern for label, input, helper text, and error message instead of re-inventing field structure per form.
- Every form must have clear validation, error, success, and submitting states.

## 3D And Performance

- Treat Three.js scenes, STL viewers, and other 3D features as progressive enhancements.
- Dynamically import heavy 3D components with `next/dynamic` and disable SSR for them when appropriate.
- Mount heavy 3D canvases after the first paint when possible, instead of blocking the initial page render.
- Load STL assets dynamically and only on pages/components that actually need them.
- Do not add Three.js or STL viewers to simple presentation pages unless they materially improve the page.
- Always check the experience on slower and smaller devices.
- Reduce DPR, effects, geometry complexity, animation intensity, or asset weight on compact screens and lower-power devices.
- Prefer safe fallbacks for mobile and low-power devices, including simpler visuals or non-3D replacements when needed.
- Keep the main interaction path usable even if the 3D scene loads late or is disabled.

## Accessibility Rules

- All icon-only buttons must include an accessible label.
- All dialogs, menus, and overlays must support keyboard interaction and visible focus states.
- Inputs must remain properly associated with labels even when labels are visually integrated into the field border.
- Do not remove focus outlines unless an accessible replacement is provided.

## Motion Rules

- Prefer `transform` and `opacity` for animation.
- Avoid animations that trigger expensive layout recalculation during common interactions.
- Keep motion purposeful and lightweight, especially on mobile devices.

## Media Rules

- Do not eagerly load heavy visual assets on first render unless they are critical above the fold.
- Prefer lazy loading for non-critical images, videos, 3D assets, and STL files.
- Always consider asset weight and memory cost on smaller devices.

## Types And Validation

- Prefer `type` over `interface`.
- Create base types for shared types and extend from them.
- Keep shared prop and type ownership clear.
- Shared primitive props should live in one canonical type module.
- Do not import a prop type from one module and immediately re-export the same type from a component index unless there is a deliberate compatibility reason.
- Avoid duplicate public type entry points for the same type.
- Prefer importing shared props from the canonical type source instead of component implementation folders.
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
- If Sentry is enabled in the project, route controlled application errors, warnings, and debug cases through a centralized Sentry logger instead of scattering raw `Sentry.captureException` and `Sentry.captureMessage` calls across the codebase.
- When Sentry is used, keep the init config centralized and reusable, including shared base options, replay policy, ignored error filtering, and section tagging.
- Prefer simple solutions over complex abstractions.
- Avoid premature optimization.

## Async UI Rules

- Every async UI surface must define loading, empty, error, and success or populated states.
- Do not ship async UI that only supports the happy path.

## Text And Internationalization

- No hardcoded user-facing strings in components or routes.
- All text must go through translations.
- Use namespaces per page.
- Use a consistent translation key structure per page and feature area.
- Do not add inline fallback copy unless there is a clear product reason.

## Environment And Secrets

- No secrets in client code.
- Add every env variable to `/web/.env.example`.
- Always add every newly introduced env variable to the relevant `.env.example` file in the project.
- Separate public and private envs.

## Testing

- Every folder that contains tests must keep them inside a local `__tests__` subfolder for that folder.
- Prefer grouping all tests for a module, service, component, or utility inside its nearest `__tests__` folder instead of scattering `*.test.*` files across sibling directories.
- Every util must have a unit test.
- Every form must have an e2e test.
- For visually important pages or components, add a Playwright visual regression suite using screenshots.
- Prefer the shared baseline from [`boilerplate/playwright.visual.config.ts`](boilerplate/playwright.visual.config.ts) for visual regression setup instead of inventing a new config from scratch.
- Do not rely on smoke tests alone when the task changes layout, spacing, typography, navigation, responsive behavior, or visual hierarchy.
- Keep visual regression coverage for both desktop and mobile when the UI differs between breakpoints.
- Keep the default boilerplate visual locale as `en` unless the target project requires a different or multi-locale setup.
- If the project supports multiple locales, explicitly adjust the visual regression locale matrix to the locales that matter for that project.
- In pages and components covered by visual regression, expose stable `data-testid` markers for loading states and error states so the visual test layer can detect them deterministically.
- Do not save a visual snapshot while any loading component is still present on the page.
- If an error component is present, do not save the snapshot at all; record the failure in the visual test logs and let the case retry again later instead of accepting an error-state image as a baseline.
- Prefer dedicated scripts for normal visual checks and baseline updates, for example `test:e2e:visual` and `test:e2e:visual:update`.

## Generation Priorities

When generating or editing code, prioritize:

1. Readability
2. Consistency with the existing codebase
3. Simplicity
4. Performance only when needed

## Do Not Add By Default

- Do not add a separate backend unless there is a concrete product requirement.
- Do not add authentication or authorization to simple presentation websites by default.
- Do not add 3D, STL viewers, or heavy visual effects unless they materially improve the product.
- Do not add infrastructure copied from boilerplate unless the target project actually needs it.

## Library Policy

- Do not introduce new libraries unless necessary.
- Always reuse existing patterns in the repo before creating new ones.
- Reuse existing design-system primitives, tokens, helpers, and theme utilities before creating new ones.
- Keep legacy compatibility layers isolated and clearly marked when a migration is in progress.
- Do not add new behavior back into deprecated or legacy abstractions when the project is migrating away from them.

## Done Criteria

- Mobile layout checked.
- Slower and smaller device experience checked when the page contains 3D, forms, or heavy visuals.
- No hardcoded user-facing strings.
- No duplicate barrel exports.
- Cross-area imports use configured aliases.
- Shared prop types have a single canonical owner.
- Migrated UI primitives are checked for mobile overflow and responsive behavior.
- Shared SCSS variables used for breakpoints and semantic colors.
- No eager Three.js or STL imports in the main page bundle.
- Loading, empty, error, and success states covered where relevant.
- Accessibility basics covered for forms, buttons, dialogs, and navigation.
- TypeScript passes after import and path refactors.
