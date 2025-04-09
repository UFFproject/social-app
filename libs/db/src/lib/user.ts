import {prisma} from './client';

export async function fetchUserById(id: string) {
  return prisma.user.findUnique({where: {id}});
}

export async function fetchUserByEmail(email: string) {
  return prisma.user.findUnique({where: {email}});
}

export async function createUser(forename: string, surname: string, email: string, hashedPassword: string) {
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      isActive: false
    }
  });

  if (!user)
    return null;

  const profile = await prisma.profile.create({
    data: {
      name: forename,
      surname: surname,
      userId: user.id
    }
  });

  if (!profile) {
    await prisma.user.delete({where: {id: user.id}});
    return null;
  }

  return {
    user: user,
    profile: profile
  }
}

export async function activateAccount(userId: string) {
  const user = await prisma.user.findUnique({where: {id: userId}});
  if (!user)
    return false;

  if (user.isActive)
    return false;

  const updateUser = await prisma.user.update({
    where: {id: userId},
    data: {isActive: true}
  });

  return !!updateUser;
}
