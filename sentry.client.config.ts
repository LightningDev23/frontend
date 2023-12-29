import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: ":DSN@sentry.kastelapp.com/:ID",
  ...(process.env.KASTEL_DESKTOP_APP === "false" && {
    tunnel: "/api/monitor",
  }),
  integrations: [new Sentry.Replay()],
  tracesSampleRate: 0.8,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
