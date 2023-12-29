import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: ":DSN@sentry.kastelapp.com/:ID",
  ...(process.env.KASTEL_DESKTOP_APP === "false" && {
    tunnel: "/api/monitor",
  }),
  tracesSampleRate: 0.8,
});
