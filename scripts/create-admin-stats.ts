import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createAdminStats() {
  const email = 'admin@nierakovine.org';

  try {
    // Find admin user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { donationStats: true },
    });

    if (!user) {
      console.error('Admin user not found');
      return;
    }

    if (user.donationStats) {
      console.log('Admin user already has donation stats');
      return;
    }

    // Create donation stats for admin
    const stats = await prisma.donationStats.create({
      data: {
        userId: user.id,
        totalDonated: 0,
        currentTier: 'BRONZE',
        nextTierProgress: 0,
        lastDonation: null,
      },
    });

    console.log('Admin donation stats created successfully:', stats);
  } catch (error) {
    console.error('Error creating admin stats:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminStats(); 