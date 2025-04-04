import { PrismaClient as PrismaClientType } from '@prisma/client';
import { hash } from 'bcryptjs';

const db = new PrismaClientType();

async function main() {
  console.log('Starting seed...');
  
  try {
    // Create admin user
    const adminPassword = await hash('admin123', 12);
    const admin = await db.user.upsert({
      where: { email: 'admin@nierakovine.org' },
      update: {},
      create: {
        email: 'admin@nierakovine.org',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    console.log('Created admin user:', admin);

    // Create categories
    const categories = [
      {
        name: 'News',
        slug: 'news',
        description: 'Latest updates and news about cancer research and treatments',
      },
      {
        name: 'Patient Stories',
        slug: 'patient-stories',
        description: 'Inspiring stories from cancer survivors and patients',
      },
      {
        name: 'Research Updates',
        slug: 'research-updates',
        description: 'Recent developments in cancer research and clinical trials',
      },
      {
        name: 'Events',
        slug: 'events',
        description: 'Upcoming events, fundraisers, and awareness campaigns',
      },
    ];

    for (const category of categories) {
      await db.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      });
    }

    console.log('Created categories:', categories);
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Failed to seed database:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding finished.');
    await db.$disconnect();
  }); 