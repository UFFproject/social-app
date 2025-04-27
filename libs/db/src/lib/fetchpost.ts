import { prisma } from './client';

export async function fetchPosts(limit: number, offset: number) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: limit,
      select: {
        id: true,
        textContent: true,
        imagine: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
