import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { checkArcjet } from "./middleware/arcJet";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const arcjetRes = await checkArcjet(req);
  if (arcjetRes) return arcjetRes;

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
