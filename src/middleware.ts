import { authMiddleware } from "@clerk/nextjs";
import { pathToRegexp } from "path-to-regexp";

const profiles = pathToRegexp("/:foo");
const trpc = pathToRegexp("/api/:foo/:bar");

export default authMiddleware({
  publicRoutes: ["/", profiles, trpc],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
