import * as Sentry from "@sentry/nextjs";
import { initWebSentry } from "./sentry.client.config";

initWebSentry();

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
