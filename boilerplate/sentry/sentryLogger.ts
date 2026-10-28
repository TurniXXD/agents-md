import * as Sentry from "@sentry/nextjs";

export type DebugBlock = string;

export type SentryLoggerProps = {
  error?: unknown;
  type?: "error" | "warning" | "debug";
  message?: string;
  context?: Record<string, unknown>;
  tags?: Record<string, string>;
  fingerprint?: string[];
  throwError?: boolean;
  debugBlock?: DebugBlock;
};

const normalizeError = (error: unknown, message?: string) => {
  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);
  return new Error(message ?? "Unknown error");
};

const sentryConfigured = () =>
  Boolean(
    process.env.SENTRY_DSN?.trim() ||
    process.env.NEXT_PUBLIC_SENTRY_DSN?.trim(),
  );

/**
 * Logs controlled error, warning, and debug cases to Sentry.
 * When `NEXT_PUBLIC_DEBUG` is enabled, the same cases are also written to the console.
 */
export const sentryLogger = ({
  error,
  type = "error",
  message,
  debugBlock,
  context,
  tags: tagsProvided,
  fingerprint,
  throwError,
}: SentryLoggerProps) => {
  const tags = {
    source: "sentry-logger",
    ...tagsProvided,
  };
  const normalizedError =
    type === "error" ? normalizeError(error, message) : undefined;

  try {
    const shouldLogDebug =
      process.env.NEXT_PUBLIC_DEBUG === "true" &&
      (debugBlock ? resolveEnabledDebugBlocks(debugBlock) : true);

    if (shouldLogDebug) {
      console.debug({
        type,
        tags,
        ...(debugBlock ? { debugBlock } : {}),
        ...(error !== undefined && typeof error === "object" ? { error } : {}),
        ...(message ? { message } : {}),
        ...(context ? { context } : {}),
      });
    }

    if (type === "debug" && !shouldLogDebug) return normalizedError;
    if (!sentryConfigured()) return normalizedError;

    Sentry.withScope((scope) => {
      scope.setLevel(type);
      Object.entries(tags).forEach(([key, value]) => scope.setTag(key, value));
      if (debugBlock) scope.setTag("debug_block", debugBlock);
      if (context) scope.setContext("diagnostic", context);
      if (fingerprint) scope.setFingerprint(fingerprint);

      if (type === "error" && normalizedError) {
        if (message) scope.setExtra("message", message);
        Sentry.captureException(normalizedError);
        return;
      }

      if (message) Sentry.captureMessage(message);
    });
  } catch (loggingError) {
    if (throwError) {
      throw loggingError;
    }
  }

  return normalizedError;
};

export const resolveEnabledDebugBlocks = (block: string) => {
  if (!process.env.NEXT_PUBLIC_ENABLED_DEBUG_BLOCKS) {
    return true;
  }

  const enabledBlocks = process.env.NEXT_PUBLIC_ENABLED_DEBUG_BLOCKS.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return enabledBlocks.includes(block);
};
