import { z } from "zod";
import { formSchema } from "~/components/edit/customize-links";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const linksRouter = createTRPCRouter({
  getLinks: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.links.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: {
          priority: "asc",
        },
      });

      //remap priority by index
      const prioritizedResult = result.map((link, index) => ({
        ...link,
        priority: index + 1,
      }));

      return prioritizedResult;
    }),
  updateLinks: privateProcedure
    .input(formSchema)
    .mutation(async ({ ctx, input }) => {
      const links = input.links;

      for (const link of links) {
        console.log("updating link:", link);
        const { id, linkName, url, priority } = link;
        if (id) {
          await ctx.db.links.update({
            where: {
              id,
            },
            data: {
              linkName,
              url,
              priority,
            },
          });
        } else {
          await ctx.db.links.create({
            data: {
              userId: ctx.userId,
              linkName,
              url,
              priority,
            },
          });
        }
      }

      return ctx.db.links.findMany({
        where: {
          userId: ctx.userId,
        },
        orderBy: {
          priority: "asc",
        },
      });
    }),
});
