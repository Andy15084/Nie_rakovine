const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nierakovine.org' },
    update: {},
    create: {
      email: 'admin@nierakovine.org',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Created admin user:', admin);

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'news' },
      update: {},
      create: {
        name: 'News',
        slug: 'news',
        description: 'Latest news and updates',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'patient-stories' },
      update: {},
      create: {
        name: 'Patient Stories',
        slug: 'patient-stories',
        description: 'Inspiring stories from cancer survivors',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'research-updates' },
      update: {},
      create: {
        name: 'Research Updates',
        slug: 'research-updates',
        description: 'Latest research findings and breakthroughs',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'events' },
      update: {},
      create: {
        name: 'Events',
        slug: 'events',
        description: 'Upcoming events and fundraisers',
      },
    }),
  ]);

  console.log('Created categories:', categories);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 