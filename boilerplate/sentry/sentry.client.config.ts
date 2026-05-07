import * as Sentry from "@sentry/nextjs";

import {
  disableSessionReplaysForErrorTypes,
  ignoreErrorMessages,
  ignoreErrors,
  sentryBaseConfig,
} from "./sentry.shared";

export const initWebSentry = () => {
  Sentry.init({
    ...sentryBaseConfig,
    integrations: [Sentry.replayIntegration()],
    ignoreErrors,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      const exception = event.exception?.values?.[0];
      const message = exception?.value ?? "";

      if (
        ignoreErrorMessages.some((ignoredMessage) =>
          message.toLocaleLowerCase().includes(ignoredMessage.toLocaleLowerCase()),
        )
      ) {
        return null;
      }

      if (exception?.type && disableSessionReplaysForErrorTypes.includes(exception.type)) {
        return null;
      }

      event.tags = {
        ...event.tags,
        section: "web",
      };

      return event;
    },
  });
};
