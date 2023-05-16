import prisma from "../../../lib/prisma"

export default async function handler(req, res) {
    const posts = await prisma.post.findMany({
        include: {
            author: true
        }
    })
    return res.status(200).json(posts)
}