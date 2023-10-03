import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
    .input(updateLinksSchema)
    .mutation(async ({ ctx, input }) => {
      for (const link of input.links) {
        const { linkId, linkName, url, priority } = link;
        if (linkId) {
          await ctx.db.links.update({
            where: {
              linkId,
            },
            data: {
              linkName,
              url,
              priority, //remap the priority according to index
            },
          });
        } else {
          await ctx.db.links.create({
            data: {
              userId: ctx.userId,
              linkName,
              url,
              priority, //any subsequent links would have be
            },
          });
        }
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
