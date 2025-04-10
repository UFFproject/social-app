import { prisma } from './client';

export type CreateUserPayload = {
  forename: string;
  surname: string;
  email: string;
  hashedPassword: string;
};

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
}

export async function fetchUserById(id: string) {
  return prisma.user.findUnique({where: {id}});
}

export async function fetchUserByEmail(email: string) {
  return prisma.user.findUnique({where: {email}});
}

export async function createUser(data: CreateUserPayload) {
  return await prisma.user.create({
    data: {
      email: data.email,
      password: data.hashedPassword,
      isActive: false,
      profile: {
        create: {
          name: data.forename,
          surname: data.surname,
        },
      },
    },
  });
}

export async function activateAccount(userId: string) {
  const updateUser = await prisma.user.update({
    where: {id: userId, isActive: false},
    data: {isActive: true}
  });

  return !!updateUser;
}

export async function updateProfile(userId: string, profileData: UpdateProfilePayload) {
  return prisma.profile.update({
    where: {userId},
    data: {...profileData}
  });
}
