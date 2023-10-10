import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const updateLinksSchema = z.object({
  links: z
    .object({
      linkId: z.string().optional(),
      linkName: z.string().nonempty(),
      url: z.string().nonempty(),
      priority: z.number(),
    })
    .array(),
  deleteLinks: z.string().array(),
});

export const linksRouter = createTRPCRouter({
  updateLinks: privateProcedure
    .input(updateLinksSchema)
    .mutation(async ({ ctx, input }) => {
      let index = 0;

      for (const link of input.links) {
        const { linkId, linkName, url } = link;
        if (linkId) {
          await ctx.db.links.update({
            where: {
              linkId,
            },
            data: {
              linkName,
              url,
              priority: index,
            },
          });
        } else {
          await ctx.db.links.create({
            data: {
              userId: ctx.userId,
              linkName,
              url,
              priority: index,
            },
          });
        }

        index++;
      }

      for (const linkId of input.deleteLinks) {
        await ctx.db.links.delete({
          where: {
            linkId,
          },
        });
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
