import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const linksRouter = createTRPCRouter({
  getLinks: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.links.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
});
