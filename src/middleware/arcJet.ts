import { env } from "@/data/env/server";
import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/next";

// ARCJET Middleware for bot detection and shielding
const aj = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: 60,
      max: 100,
    }),
  ],
});

export async function checkArcjet(req: Request) {
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    return new Response("Forbidden", { status: 403 });
  }

  return null;
}
