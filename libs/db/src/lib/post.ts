import { PostVisibility } from '@prisma/client';
import { prisma } from '../client';

export const getPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          profile: {
            select: {
              name: true,
              surname: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

interface CreatePostInput {
  authorId: string;
  textContent: string;
  visibility: PostVisibility;
}

export const createPost = async (data: CreatePostInput) => {
  return await prisma.post.create({
    data,
    include: {
      author: {
        select: {
          profile: {
            select: {
              name: true,
              surname: true,
            },
          },
        },
      },
    },
  });
};
