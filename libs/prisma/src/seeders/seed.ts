import { PrismaClient } from '@prisma/client';

// FIXME: Change this file to SQL
const prisma = new PrismaClient();

async function main() {
  // Create some sample users
  const users = [
    {
      email: 'user1@example.com',
      password: 'password123',
      isActive: true,
    },
    {
      email: 'user2@example.com',
      password: 'password456',
      isActive: false,
    },
    {
      email: 'user3@example.com',
      password: 'password789',
      isActive: true,
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
