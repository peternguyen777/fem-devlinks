import { TRPCError } from "@trpc/server";
import { generateSlug } from "random-word-slugs";
import { UTApi } from "uploadthing/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const utapi = new UTApi();

export const profileRouter = createTRPCRouter({
  getProfile: privateProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.profile.findFirstOrThrow({
      where: {
        userId: ctx.userId,
      },
      include: {
        links: {
          orderBy: { priority: "asc" },
        },
      },
    });

    return result;
  }),
  getProfileBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.profile.findFirstOrThrow({
        where: {
          slug: input.slug,
        },
        include: {
          links: {
            orderBy: { priority: "asc" },
          },
        },
      });

      return result;
    }),
  getAvailableSlug: privateProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.profile.findFirst({
        where: {
          slug: input.slug,
        },
        select: {
          userId: true,
        },
      });

      if (!result) {
        return true;
      }

      if (result.userId === ctx.userId) {
        return true;
      }

      return false;
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
  updateProfileImage: privateProcedure
    .input(
      z.object({
        image: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const profile = await ctx.db.profile.findUnique({
        where: {
          userId: ctx.userId,
        },
        select: {
          image: true,
        },
      });

      const result = await ctx.db.profile.update({
        where: {
          userId: ctx.userId,
        },
        data: {
          image: input.image,
        },
      });

      if (profile?.image) {
        const fileKey = profile.image.replace("https://utfs.io/f/", "");

        try {
          await utapi.deleteFiles([fileKey]);
          console.log("old image deleted!");
        } catch (err) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Unable to delete original profile picture on UploadThing.",
          });
        }
      }

      return result;
    }),
});
