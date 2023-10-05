import { TRPCError } from "@trpc/server";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
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

      // remap priority by index
      const remapLinksPriority = result.links.map((link, index) => ({
        ...link,
        priority: index + 1,
      }));

      return { ...result, links: remapLinksPriority };
    }),
  createNewProfile: privateProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.profile.create({
        data: {
          userId: ctx.userId,
          email: input.email,
          slug: generateSlug(),
        },
      });
    }),
  updateProfile: privateProcedure
    .input(
      z.object({
        firstName: z.string().nonempty("Required"),
        lastName: z.string().nonempty("Required"),
        email: z.string().email(),
        slug: z.string().refine((value) => !/\s/.test(value)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.profile.update({
        where: {
          userId: ctx.userId,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          slug: input.slug,
        },
      });
    }),
});
