# Sentry setup for Next.js App Router

Use this directory as a coordinated template set. Do not copy only the logger: logging works reliably only when the client, Node.js, Edge, request-error, privacy, and source-map setup are present together.

## File placement

- Copy `instrumentation-client.ts`, `instrumentation.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts` to the Next.js application root (usually beside `next.config.ts`).
- Copy `sentry.shared.ts`, `sentryLogger.ts`, and `apiErrorResponse.ts` into the project's shared observability or `lib` directory and adjust imports to the configured alias.
- Merge `next.config.example.ts` into the existing `next.config.ts`; do not replace framework plugins already used by the project.
- Merge the Sentry variables from `../.env.example` into the application's own `.env.example`.

## Required behavior

- Keep `sendDefaultPii: false` and the event sanitizer unless the project's approved privacy policy explicitly requires a different setup.
- Use the private `SENTRY_DSN` in Node.js and Edge runtimes, with `NEXT_PUBLIC_SENTRY_DSN` only as a fallback. Browser code may use only `NEXT_PUBLIC_SENTRY_DSN`.
- Keep source-map credentials server/build-only. Never expose `SENTRY_AUTH_TOKEN` publicly.
- Route controlled errors, warnings, and debug diagnostics through `sentryLogger`.
- Route JSON API error results through `apiErrorResponse` or an equivalent project helper so returned failures and diagnostics cannot drift apart.
- Context must contain operational metadata only. Never attach request bodies, form values, email addresses, auth headers, cookies, provider tokens, signed URLs, or secrets.
- Use exceptions for unexpected or server-side failures and warnings for expected rejected input. Give recurring cases stable tags and fingerprints.
- Test that reporting does not alter the response body/status and that the sanitizer removes sensitive request information.

Session Replay and performance tracing are disabled in this privacy-first baseline. Enable them only when the project requires them and its consent/privacy implementation covers them.
