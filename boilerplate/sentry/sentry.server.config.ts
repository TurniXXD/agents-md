import * as Sentry from "@sentry/nextjs";
import { getSentryServerDsn, sentryBaseConfig } from "./sentry.shared";

const dsn = getSentryServerDsn();

Sentry.init({
  ...sentryBaseConfig,
  dsn,
  enabled: Boolean(dsn),
});
