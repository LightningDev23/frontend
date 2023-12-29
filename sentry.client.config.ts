import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://3944922fa93e7efba54d001526936864@sentry.kastelapp.com/3",
  ...(process.env.KASTEL_DESKTOP_APP === "false" && {
    tunnel: "/api/monitor",
  }),
  integrations: [new Sentry.Replay()],
  tracesSampleRate: 0.8,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
