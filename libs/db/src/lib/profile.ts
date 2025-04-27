import { Prisma } from '@prisma/client';
import { prisma } from '../client';

export async function updateProfile(
  userId: string,
  data: Prisma.ProfileUpdateInput
) {
  return await prisma.profile.update({
    data,
    where: {
      userId,
    },
  });
}

export async function getProfile(userId: string) {
  return await prisma.profile.findFirst({
    where: {
      userId,
    },
  });
}
