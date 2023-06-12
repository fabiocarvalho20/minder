import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const postId = req.query.postId;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      likes: true,
    },
  });
  return res.status(200).json(post);
}
