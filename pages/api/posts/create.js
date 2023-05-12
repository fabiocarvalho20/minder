import { getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).json({ ok: false });
  }

  const { content } = req.body;

  if (!content?.length) {
    return res.status(400).json({ ok: false });
  }

  await prisma.post.create({
    data: {
      author: {
        connect: {
            id: session.user.id
        }
      },
      content,
    },
  });

  res.status(200).json({ ok: true });
}
