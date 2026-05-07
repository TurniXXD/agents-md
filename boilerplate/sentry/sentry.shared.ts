import * as Sentry from "@sentry/nextjs";

export const disableSessionReplaysForErrorTypes = ["TimeoutError", "NetworkRequestError"];

export const ignoreErrors: Array<string | RegExp> = [];

export const ignoreErrorMessages: string[] = [];

export const sentryBaseConfig: Sentry.BrowserOptions | Sentry.NodeOptions | Sentry.VercelEdgeOptions = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_SENTRY_DISABLED !== "true" && process.env.NODE_ENV === "production",
  tracesSampleRate: 0.1,
  skipOpenTelemetrySetup: true,
  attachStacktrace: true,
  environment: process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? "production",
};
