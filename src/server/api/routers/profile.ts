import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  //   privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.profile.findFirstOrThrow({
        where: {
          userId: input.userId,
        },
        include: {
          links: {
            orderBy: { priority: "asc" },
          },
        },
      });

      if (!result)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Profile not found",
        });

      return result;
      //remap priority by index
      // const remapLinksPriority = result.links.map((link, index) => ({
      //   ...link,
      //   priority: index + 1,
      // }));

      // return { ...result, links: remapLinksPriority };
    }),
});
