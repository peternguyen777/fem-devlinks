import { TRPCError } from "@trpc/server";
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
          firstName: "",
          lastName: "",
        },
      });
    }),
  updateProfile: privateProcedure
    .input(
      z.object({
        firstName: z.string().nonempty("Required"),
        lastName: z.string().nonempty("Required"),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.profile.upsert({
        where: {
          userId: ctx.userId,
        },
        update: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
        },
        create: {
          userId: ctx.userId,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
        },
      });
    }),
});
