import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { createNextPageApiHandler } from "uploadthing/next-legacy";

import { ourFileRouter } from "~/server/uploadthing";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default async function uploadthing(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = getAuth(req);
  if (userId) {
    req.body = JSON.stringify({ ...req.body, userId });
  }
  await handler(req, res);
}
