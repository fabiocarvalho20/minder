import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).json({ ok: false });
  }

  const { postId } = req.body;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return res.status(400).json({ ok: false, message: "Post not found" });
  }

  if (post.authorId !== session.user.id) {
    return res
      .status(403)
      .json({ ok: false, message: "You can't delete other users' posts" });
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  res.status(200).json({ ok: true });
}
