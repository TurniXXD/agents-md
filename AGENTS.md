# AGENTS.md

## Frontend Stack

- Use Next.js 16 with App Router.
- Use Node.js 22 or newer.
- Always use `pnpm` for package installation, script execution, and lockfile management.
- Use the repository-pinned pnpm version. For new projects, default to `pnpm@11.6.0`.
- Do not use `npm` or `yarn` unless the user explicitly requests an exception.
- Use Tailwind CSS v4 as the default styling system for new projects.
- Use shadcn-style components as the default UI layer and Radix primitives as the default behavior layer.
- Use semantic Tailwind theme variables instead of repeating raw colors, spacing, radii, shadows, transition timings, or breakpoints.
- Preserve an existing project's styling stack when the task does not authorize a migration. Do not mix SCSS and Tailwind conventions casually.
- Import and mount Three.js, `@react-three/fiber`, and STL-related code dynamically, never eagerly in the main page bundle.
- Use `proxy.ts` instead of `middleware.ts`.
- Use `next-intl` for all user-facing text.
- Use Czech (`cs`) as the default locale unless the user explicitly asks for another default.
- Use `next-auth` for authentication.
- Use `lucide-react` for icons.
- Use React Hook Form for forms.
- Use Zod for all validation.
- Use Zustand for lightweight client state only when component state is not enough.
- Use T3 Env with Zod to validate envs on startup.
- Use Playwright for e2e tests.
- Use Jest for unit tests.
- Use ES6 arrow functions instead of `function` declarations unless a framework API requires otherwise.

## Default Decisions

- Read the nearest `AGENTS.md` before editing. Project-local instructions override this central template where they intentionally differ.
- Use absolute imports via `@/` by default.
- Prefer absolute imports for cross-area imports.
- Use relative imports only for true sibling or private files such as `./hooks`, `./utils`, `./data`, or component-local helpers.
- Do not use deep relative imports such as `../../...` or `../../../...` when a configured alias exists.
- When changing imports, preserve the project's configured alias style, for example `@/...`, `components/...`, or `design-system/...`, depending on the repo.
- Use React Hook Form with Zod as the default form pattern.
- Use a dedicated `/api` layer for all API communication.
- Use one shared dialog/modal pattern across the project instead of custom dialog implementations per page.
- Use shared button and CTA variants before creating page-specific button styles.
- Use `cn` for class composition and CVA for components with meaningful variants. Do not introduce another class-merging utility without need.
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
- If a project should use Sentry, implement the complete centralized setup documented in [`boilerplate/sentry/README.md`](boilerplate/sentry/README.md). Reuse its logger, API error helper, shared privacy config, client initialization, Node.js server config, Edge config, instrumentation hooks, source-map build config, and env pattern instead of inventing ad hoc logging or initializing only one runtime.
- Reuse the repo pipeline setup from [`boilerplate/.github/workflows/ci.yml`](boilerplate/.github/workflows/ci.yml), adjusting commands to match the actual project stack and omitting jobs for missing stacks.
- Reuse the env setup pattern from [`boilerplate/.env.example`](boilerplate/.env.example), adding only env variables that are actually used.
- Use Dockerfile templates from [`boilerplate/dockerfiles`](boilerplate/dockerfiles) only when the project needs Docker.
- Copy only the Dockerfiles for stacks that actually exist in the project: [`nextjs.Dockerfile`](boilerplate/dockerfiles/nextjs.Dockerfile), [`python-be.Dockerfile`](boilerplate/dockerfiles/python-be.Dockerfile), [`rust-be.Dockerfile`](boilerplate/dockerfiles/rust-be.Dockerfile), or [`go-be.Dockerfile`](boilerplate/dockerfiles/go-be.Dockerfile).
- Do not add Python, Rust, Go, or Node backend Dockerfiles when the project is only a landing page or simple presentation website.
- Omit non-folder-specific duplication when extending the workspace.

## Structure

Organize frontend code by domain or page section while keeping framework route files thin:

```text
/web/src/app/
/web/src/components/ui/
/web/src/components/shared/
/web/src/components/{domain}/
  sections/
  blocks/
  forms/
  hooks/
/web/src/lib/integrations/
/web/src/lib/observability/
/web/src/lib/seo/
/web/src/lib/site/
/web/src/messages/{domain}/
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

- Keep App Router pages focused on validating route parameters, loading localized content and metadata, and composing domain components.
- Put page-specific components into folders named after the page or domain where they are used.
- Put reusable cross-page components into `/web/src/components/shared`.
- Promote code to `shared` only after it has proven consumers in multiple domains. Do not create speculative abstractions.
- If a hook or util is specific to a single component, colocate it with that component.
- Organize non-UI code by domain. Keep provider clients in `lib/integrations`, observability in `lib/observability`, SEO in `lib/seo`, and shared route definitions in `lib/site`.
- Mirror the feature structure in localized message files and use descriptive filenames, never numbered names such as `examples1.ts`.
- In a monorepo, preserve application boundaries. A change for one application must not alter another application unless a genuinely shared contract changes.
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

- Use kebab-case for filenames and feature folders.
- Use `PascalCase` for React component and type names.
- Use `camelCase` for hooks, functions, variables, utilities, and helpers.
- Use descriptive uppercase names for shared constants that behave as enumerations.
- Name hooks with the `use...` prefix.
- Keep an allowed CSS Module beside its owning component and use the same base filename.
- Prefer `index.ts` only as a simple re-export file.

## Tailwind, shadcn, Radix, And CSS Rules

- Use Tailwind utilities for layout, spacing, sizing, typography, colors, borders, radii, shadows, responsive behavior, and ordinary hover, focus, and open states.
- Keep project UI primitives composable through `className`, `data-slot`, `asChild`, CVA variants, and `cn`.
- Add repeated design decisions as semantic tokens under Tailwind's theme configuration. Name tokens by purpose, not by a single page or raw color.
- One-off geometry may use an arbitrary Tailwind value. Repeated values must become semantic tokens or shared variants.
- Reserve CSS Modules for complex keyframes, pseudo-element artwork, masks, procedural gradients, orbit paths, multi-element state choreography, or runtime CSS custom properties.
- A CSS Module owns only the artwork or motion that is clearer in CSS; its component still owns ordinary layout, spacing, typography, borders, and responsive rules in Tailwind.
- Do not create a CSS Module for a normal card, grid, section, button, or breakpoint.
- Keep global CSS limited to the Tailwind import, semantic theme tokens, reset and foundation rules, and explicitly documented legacy imports. It is not a destination for page-specific styles.
- Do not add new feature selectors to legacy global style files. When touching a legacy selector, migrate ordinary declarations into the owning component and leave only genuinely global or complex shared motion.
- Do not use inline `style` for static presentation. Use it only for runtime values such as measured coordinates or typed CSS custom properties.

Prefer semantic utilities:

```tsx
<article className="rounded-card border border-border-card bg-card p-6 text-card-foreground shadow-card transition-colors hover:border-primary" />
```

Avoid repeated raw values:

```tsx
<article className="rounded-[1.5rem] border border-[#dce2fa] bg-[#fff] p-[24px] shadow-[0_24px_64px_rgba(36,46,94,0.12)]" />
```

For unique animated artwork, split responsibilities so the component owns ordinary layout and the CSS Module owns only the artwork and motion:

```tsx
<div
  className={cn("relative grid size-full place-items-center", styles.orbit)}
/>
```

```css
.orbit::before {
  animation: orbit 14s linear infinite;
  offset-path: circle(46%);
}
```

## Component Rules

- Do not create one huge file of code or styles.
- Keep components small and composable.
- Target a maximum of roughly 300 lines per component file.
- Keep business logic out of UI components.
- Move lifecycle-driven logic into separate hook files when that improves clarity.
- Add stable `data-testid` markers to reusable loading components and reusable error components so visual and e2e tests can detect those states reliably.
- Use Server Components by default.
- Add `"use client"` only to the smallest leaf that needs state, effects, browser APIs, pointer or scroll input, or a client-only primitive.
- Never turn an entire route or large page composition into a Client Component to support one interactive child.
- Reuse the project's existing UI primitives before creating another button, card, menu, dialog, popover, or form-control abstraction.
- For a new accessible interactive primitive, use this order:
  1. Existing project shadcn component.
  2. A shadcn component adapted to the project theme.
  3. A Radix primitive with Tailwind styling.
  4. A custom implementation only when neither shadcn nor Radix models the interaction.
- Let Radix own focus management, keyboard navigation, dismissal, portals, and ARIA state. Style its state attributes instead of recreating that behavior.
- Use semantic elements: links navigate, buttons perform actions, headings preserve hierarchy, and form controls have labels and useful autocomplete attributes.
- Decorative icons must use `aria-hidden="true"`; icon-only controls need an accessible name.
- Repeated card families must share a primitive and interaction model. Avoid bespoke markup, unexplained empty footer space, or different hover timing for each card.

Example:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ContactActionProps = {
  href: string;
  label: string;
};

export const ContactAction = ({ href, label }: ContactActionProps) => (
  <Button asChild variant="default">
    <Link href={href}>{label}</Link>
  </Button>
);
```

Do not rebuild the same element from a raw `<button>` plus duplicated focus, disabled, color, and spacing classes.

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

## Responsive Hero Rules

- Never place decorative pipeline lines, connector tracks, or square-node dividers in or immediately after a hero section.
- Keep heroes focused on the headline, supporting copy, actions, and one relevant visual.
- Service heroes may have unique artwork and animation, but the artwork must explain the service and remain subordinate to the content.
- Decorative motifs that do not belong to the hero may appear between later content sections.
- On mobile presentation and service pages, do not stack a decorative right-hand hero visual below the hero copy. Hide the right-side visual at the mobile breakpoint so the heading, description, and primary action form the complete hero.
- Keep the right-side visual on mobile only when it is essential to the primary task, explicitly designed for the compact layout, and covered by a mobile layout test.

## Hover, Focus, Scroll, And Pointer Rules

- Never move an element upward on hover or focus. This includes cards, buttons, links, icons, badges, and nested content.
- Do not use negative vertical translations, negative `top` changes, or equivalent upward movement in hover or focus states.
- Hover feedback may change color, border, shadow, opacity, subtle scale or rotation, or an intentional horizontal arrow position while keeping vertical layout fixed.
- Use a consistent short card transition. Long easing belongs to illustrative animation, not ordinary UI feedback.
- Hover and focus must communicate the same state. Never make essential information available only on hover.
- When touching an existing interaction, remove upward hover movement in the touched UI.
- Reuse existing scroll-reveal, scroll-aware header, and pointer-reactive helpers instead of creating parallel implementations.
- Scroll and pointer handlers must be passive where appropriate and batch visual updates with `requestAnimationFrame`.
- Avoid React state updates on every pointer or scroll event when refs or CSS variables are sufficient.
- Clamp pointer displacement and use smoothing for hero cards and decorative layers so cursor effects cannot pull elements far from their composition.
- Sticky navigation must reappear on upward scrolling and remain visible while its menu is open or focus is inside it.

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
- Preserve visible keyboard focus and use semantic focus-ring tokens instead of removing outlines.
- Interactive controls must work with keyboard, touch, and pointer input. Preserve the built-in keyboard and focus behavior of Radix primitives.
- Maintain readable contrast in default, hover, focus, open, disabled, and dark-surface states.
- Use mobile-first responsive utilities and verify narrow phone, tablet, desktop, and WebKit behavior when layout or interaction changes.
- Do not hide required content on mobile merely to make a layout fit. Reflow or simplify the composition.
- Avoid fixed heights for copy-heavy cards and translated text. Prefer intrinsic sizing and use minimum constraints only when needed.

## Motion Rules

- Prefer `transform` and `opacity` for animation.
- Avoid animations that trigger expensive layout recalculation during common interactions.
- Keep motion purposeful and lightweight, especially on mobile devices.
- Every non-essential animation must honor `prefers-reduced-motion: reduce` and render a complete, readable static state.
- Animation must not cause layout shifts, obscure controls, block pointer input, or make content depend on JavaScript becoming active.

## Media Rules

- Do not eagerly load heavy visual assets on first render unless they are critical above the fold.
- Prefer lazy loading for non-critical images, videos, 3D assets, and STL files.
- Always consider asset weight and memory cost on smaller devices.
- Use `next/image` when appropriate, provide meaningful alt text, and declare realistic responsive `sizes`.

## Types And Validation

- Prefer `type` over `interface`.
- Treat TypeScript strict mode as the baseline. Do not introduce `any`, unchecked casts, or duplicate domain shapes to silence the compiler.
- Define every object parameter with a named type. Use `ComponentNameProps` for component props and a descriptive input type for helpers.
- Never declare an object type inline in a function parameter list.
- Keep types near their domain owner and export them only when another module consumes them.
- Prefer readonly arrays and literal unions for finite content and route sets. Use `satisfies` when it preserves useful inference while checking a contract.
- Create base types for shared types and extend from them.
- Keep shared prop and type ownership clear.
- Shared primitive props should live in one canonical type module.
- Do not import a prop type from one module and immediately re-export the same type from a component index unless there is a deliberate compatibility reason.
- Avoid duplicate public type entry points for the same type.
- Prefer importing shared props from the canonical type source instead of component implementation folders.
- Use early returns for invalid or unavailable states. Keep provider and parsing details out of React components.
- Remove dead code and obsolete files when replacing an implementation. Do not leave numbered backups or commented-out alternatives.
- Comments should explain constraints and non-obvious decisions, not restate the code.
- Never trust client input.
- Validate all inputs with Zod.
- Protect server actions and server-side entry points.
- Use typed API clients.
- Prefer generated Swagger types and generated queries when an API schema exists.

Example of a named helper input:

```ts
type ClampParams = {
  value: number;
  min: number;
  max: number;
};

const clamp = ({ value, min, max }: ClampParams) =>
  Math.min(Math.max(value, min), max);
```

Do not declare `{ value: number; min: number; max: number }` inline in the function parameter.

## API Routes, Integrations, And Observability

- Treat every API payload as untrusted. Validate and normalize it in a domain module before calling providers.
- Keep anti-abuse controls such as Turnstile verification, honeypots, and rate limiting on public form endpoints.
- Never trust referral identity, source paths, or attribution supplied directly by a browser.
- Keep provider clients in `lib/integrations`; route handlers should orchestrate them and translate failures into one shared API response contract.
- Use the project's centralized API error helper and Sentry logger for handled failures. Do not add isolated `console.error` reporting paths.
- Sentry diagnostics may contain operational metadata only. Never attach form bodies, contact data, cookies, authorization headers, API keys, tokens, or raw secrets.
- Preserve CSP and security headers. Any new external script, frame, image, or connection requires the narrowest corresponding CSP change.

## Errors And Async Code

- Handle errors centrally.
- All async code must handle errors explicitly.
- No silent failures.
- Log meaningful errors.
- If Sentry is enabled in the project, route controlled application errors, warnings, and debug cases through a centralized Sentry logger instead of scattering raw `Sentry.captureException` and `Sentry.captureMessage` calls across the codebase.
- When Sentry is used, keep the init config centralized and reusable, including shared base options, replay policy, ignored error filtering, and section tagging.
- In a Next.js App Router project with Sentry, configure all applicable runtimes: `instrumentation-client.ts` for the browser, `sentry.server.config.ts` for Node.js, `sentry.edge.config.ts` for Edge, and `instrumentation.ts` for registration plus `captureRequestError`.
- Route every unsuccessful API result through the centralized Sentry error-response helper or an equivalent project abstraction. Expected client rejections should be warnings; unexpected provider, configuration, and server failures should be exceptions.
- Never include form values, email addresses, request bodies, cookies, authorization headers, Turnstile tokens, signed referral values, or secrets in Sentry context. Use only bounded operational metadata such as endpoint, status, error code, field names, provider status, and boolean configuration flags.
- Redact provider response bodies and expose only safe, flat, named diagnostic fields when they need to be visible in Sentry.
- External requests must have an explicit timeout, intentional cache behavior, and useful redacted error context.
- Keep `sendDefaultPii` disabled by default. Do not enable Session Replay, performance tracing, or PII collection unless the project explicitly requires it and its consent and privacy documentation cover it.
- Prefer simple solutions over complex abstractions.
- Avoid premature optimization.

## Async UI Rules

- Every async UI surface must define loading, empty, error, and success or populated states.
- Do not ship async UI that only supports the happy path.

## Text And Internationalization

- No hardcoded user-facing strings in components or routes.
- All text must go through translations.
- Treat every supported locale as an equal product variant. Whenever user-visible copy changes, update all supported locales in the same change.
- Brand names, protocol identifiers, schema.org keys, and genuinely language-neutral labels may remain constants.
- Use namespaces per page.
- Use a consistent translation key structure per page and feature area.
- Do not add inline fallback copy unless there is a clear product reason.

## Routes, Static Generation, And SEO

- Keep route segments and slugs in shared semantic constants. Do not compare or assemble route slugs from ad hoc string literals in components.
- Localized slugs must use one shared locale mapping. Page generation, navigation, canonical URLs, alternate-language links, and sitemap generation must consume the same source.
- Keep public content pages statically generated: enumerate locale and slug combinations with `generateStaticParams`, call `setRequestLocale` before localized rendering, and keep request-specific data in API routes or client leaves.
- Do not opt a public page into dynamic rendering merely for convenience.
- Generate page metadata from the same localized copy as the page and preserve canonical and alternate-language URLs.
- Keep structured-data builders in the SEO domain and render them through one shared script component. Human-readable schema values come from localized content; stable schema identifiers may remain in code.
- Whenever a public page is added, removed, renamed, hidden, or changes its canonical route, update the sitemap for every supported locale in the same change.
- Keep `robots.ts` aligned with public route visibility and preserve the canonical sitemap URL.

## Environment And Secrets

- No secrets in client code.
- Add every env variable to `/web/.env.example`.
- Always add every newly introduced env variable to the relevant `.env.example` file in the project.
- Separate public and private envs.
- Server secrets must never use a public environment-variable prefix.
- Keep `.env` files out of Git. Example environment files contain placeholders only.
- A dependency or deployment change must update the documented environment contract and every affected deployment environment before relying on a new required variable.
- Keep secrets out of build output, client bundles, test artifacts, logs, Sentry context, and command output.

## Testing

- Add or update the closest test whenever behavior changes.
- Prefer stable behavior assertions, roles, labels, URLs, and `data-*` state over brittle DOM depth, generated class names, or pixel-perfect timing.
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
- UI changes should cover the relevant combination of keyboard and accessibility behavior, mobile and WebKit layout, reduced motion, localized routes, and navigation, card, or form interaction.
- Provider integration tests must use simulated fetchers and must never contact real production services.
- Run focused formatting, lint, typecheck, unit, and Playwright checks while iterating, then verify the affected application.
- Before handing off a broad refactor or dependency or configuration change, run the relevant root lint, format, typecheck, unit-test, build, and e2e commands.
- Always run `git diff --check` before handoff.
- Do not commit framework build output, development build output, test results, logs, local environment files, or other generated artifacts.

## CI/CD And Dependencies

- Treat the repository's CI workflow as the source of truth for merge checks and keep local scripts aligned with it.
- CI should use the repository-pinned Node.js and pnpm versions, a frozen lockfile, lint, formatting checks, strict type checking, unit tests, production builds, and relevant Playwright browser coverage.
- When adding or updating a dependency, change the correct workspace package and commit the root lockfile. Do not duplicate a dependency across packages without need.
- Keep development and production build directories separate when the project configures them that way. Use the development server for visual iteration and production builds for final verification.
- Preserve independently deployed application boundaries and monorepo access to genuinely shared packages.
- Do not change domains, deployment root directories, production environment variables, DNS, or provider configuration unless the task explicitly authorizes that external change.

## Change Discipline

- Preserve unrelated user changes and avoid broad formatting churn outside the task.
- When touching legacy code, improve the touched boundary toward these rules instead of cloning the legacy pattern.
- A refactor is complete only when imports, tests, content files, sitemap and SEO sources, and obsolete files are updated together.
- Prefer a small coherent diff with an explicit owner over another compatibility layer or duplicate implementation.

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
- Narrow phone, tablet, desktop, and WebKit behavior checked when layout or interaction changed.
- Slower and smaller device experience checked when the page contains 3D, forms, or heavy visuals.
- No hardcoded user-facing strings.
- Every changed user-facing string is updated in all supported locales.
- No duplicate barrel exports.
- Cross-area imports use configured aliases.
- Shared prop types have a single canonical owner.
- Migrated UI primitives are checked for mobile overflow and responsive behavior.
- Repeated design values use semantic Tailwind tokens or shared variants.
- Interactive primitives preserve keyboard, focus, dismissal, portal, and ARIA behavior.
- Non-essential animation respects reduced motion and renders a complete static state.
- No eager Three.js or STL imports in the main page bundle.
- Loading, empty, error, and success states covered where relevant.
- Accessibility basics covered for forms, buttons, dialogs, and navigation.
- TypeScript passes after import and path refactors.
- Relevant formatting, lint, tests, build, and `git diff --check` pass.
