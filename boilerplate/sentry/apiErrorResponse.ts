import { sentryLogger } from "./sentryLogger";

type ApiErrorResponseOptions<Body extends Record<string, unknown>> = {
  body: Body;
  status: number;
  code: string;
  endpoint: string;
  message: string;
  error?: unknown;
  context?: Record<string, unknown>;
  headers?: HeadersInit;
  reported?: boolean;
};

/** Reports a controlled API failure and preserves its public response contract. */
export const apiErrorResponse = <Body extends Record<string, unknown>>({
  body,
  status,
  code,
  endpoint,
  message,
  error,
  context,
  headers,
  reported = false,
}: ApiErrorResponseOptions<Body>) => {
  const type = status >= 500 ? "error" : "warning";

  if (!reported) {
    sentryLogger({
      error: type === "error" ? (error ?? new Error(message)) : error,
      type,
      message,
      context: { status, code, ...context },
      tags: {
        source: "api",
        endpoint,
        error_code: code,
        http_status: String(status),
      },
      fingerprint: [endpoint, code],
    });
  }

  return Response.json(body, { status, headers });
};
