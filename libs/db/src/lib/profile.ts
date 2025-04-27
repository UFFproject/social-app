import { prisma } from './client';

export type UpdateProfilePayload = {
  name?: string;
  surname?: string;
  dateOfBirth?: Date;
  gender?: string;
  nationality?: string;
  fieldOfStudy?: string;
  yearOfStudy?: number;
  languages?: string;
  relationships?: string;
};

export async function updateProfile(
  userId: string,
  profileData: UpdateProfilePayload
) {
  return prisma.profile.update({
    where: { userId },
    data: { ...profileData },
  });
}
