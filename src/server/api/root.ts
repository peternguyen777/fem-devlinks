import { createTRPCRouter } from "~/server/api/trpc";
import { linksRouter } from "./routers/links";
import { exampleRouter } from "./routers/example";
import { profileRouter } from "./routers/profile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  links: linksRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
