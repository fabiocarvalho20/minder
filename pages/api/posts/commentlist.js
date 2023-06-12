import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const postId = req.query.postId;
  const posts = await prisma.comment.findMany({
    where: { id: postId },
    include: {
      User: true,
    },
  });
  return res.status(200).json(posts);
}
