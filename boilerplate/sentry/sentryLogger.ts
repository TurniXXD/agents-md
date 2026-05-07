import * as Sentry from "@sentry/nextjs";

export type DebugBlock = string;

interface SentryLoggerProps {
  error?: unknown;
  type?: "error" | "warning" | "debug";
  message?: string;
  context?: Record<string, unknown>;
  tags?: {
    source?: "api" | "server" | "auth" | "middleware" | string;
    endpoint?: string;
  } & Record<string, string>;
  throwError?: boolean;
  debugBlock?: DebugBlock;
}

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
  throwError,
}: SentryLoggerProps) => {
  const tags = {
    source: "sentry-logger",
    ...tagsProvided,
  };

  try {
    const shouldLogDebug =
      process.env.NEXT_PUBLIC_DEBUG === "true" && (debugBlock ? resolveEnabledDebugBlocks(debugBlock) : true);

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

    if (type !== "error" && message) {
      if (type === "debug" && !shouldLogDebug) {
        return;
      }

      Sentry.captureMessage(message, {
        level: type,
        tags,
        ...(context
          ? {
              extra: { context },
            }
          : {}),
      });

      return;
    }

    if (error) {
      const errorContext = {
        tags,
        ...(debugBlock ? { debugBlock } : {}),
        ...((message || context)
          ? {
              extra: {
                ...(message ? { message } : {}),
                ...(context ? { context } : {}),
              },
            }
          : {}),
      };

      if (typeof window === "undefined") {
        console.error({ error, ...errorContext });
      }

      Sentry.captureException(error, errorContext);
    }
  } catch (loggingError) {
    if (throwError) {
      throw loggingError;
    }
  }
};

export const resolveEnabledDebugBlocks = (block: string) => {
  if (!process.env.NEXT_PUBLIC_ENABLED_DEBUG_BLOCKS) {
    return true;
  }

  const enabledBlocks = process.env.NEXT_PUBLIC_ENABLED_DEBUG_BLOCKS
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return enabledBlocks.includes(block);
};
