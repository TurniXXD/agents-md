import * as Sentry from "@sentry/nextjs";

import {
  ignoreErrorMessages,
  ignoreErrors,
  getSentryClientDsn,
  sanitizeSentryEvent,
  sentryBaseConfig,
} from "./sentry.shared";

export const initWebSentry = () => {
  const dsn = getSentryClientDsn();

  Sentry.init({
    ...sentryBaseConfig,
    dsn,
    enabled: Boolean(dsn),
    integrations: [],
    ignoreErrors,
    beforeSend(event) {
      const sanitizedEvent = sanitizeSentryEvent(event);
      const exception = sanitizedEvent.exception?.values?.[0];
      const message = exception?.value ?? "";

      if (
        ignoreErrorMessages.some((ignoredMessage) =>
          message
            .toLocaleLowerCase()
            .includes(ignoredMessage.toLocaleLowerCase()),
        )
      ) {
        return null;
      }

      sanitizedEvent.tags = {
        ...sanitizedEvent.tags,
        section: "web",
      };

      return sanitizedEvent;
    },
  });
};
