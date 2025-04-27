import { prisma } from './client';

type CreatePostInput = {
  authorId: string;
  communityId: string;
  visibility: 'PUBLIC' | 'PRIVATE' | 'COMMUNITY_ONLY';
  textContent?: string;
  imagine?: string;
};

export async function createPost(input: CreatePostInput) {
  try {
    const post = await prisma.post.create({
      data: {
        authorId: input.authorId,
        communityId: input.communityId,
        visibility: input.visibility,
        textContent: input.textContent ?? null,
        imagine: input.imagine ?? null,
      },
    });

    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}
