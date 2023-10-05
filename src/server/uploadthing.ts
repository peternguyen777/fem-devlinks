import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    "image/jpeg": { maxFileSize: "1MB", maxFileCount: 1 },
    "image/png": { maxFileSize: "1MB", maxFileCount: 1 },
  })
    .middleware(({ req }) => {
      const { userId } = JSON.parse(req.body as string) as { userId: string };
      if (!userId) throw new Error("Unauthorized");
      return { userId };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
