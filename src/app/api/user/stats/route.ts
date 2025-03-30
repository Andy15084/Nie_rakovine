import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        donationStats: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // If donationStats don't exist, create them
    if (!user.donationStats) {
      const stats = await prisma.donationStats.create({
        data: {
          userId: user.id,
          totalDonated: 0,
          currentTier: 'BRONZE',
          nextTierProgress: 0,
          lastDonation: null,
        },
      });

      return NextResponse.json({
        totalDonated: stats.totalDonated,
        currentTier: stats.currentTier,
        nextTierProgress: stats.nextTierProgress,
        lastDonation: stats.lastDonation,
      });
    }

    return NextResponse.json({
      totalDonated: user.donationStats.totalDonated,
      currentTier: user.donationStats.currentTier,
      nextTierProgress: user.donationStats.nextTierProgress,
      lastDonation: user.donationStats.lastDonation,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { message: 'Error fetching user stats' },
      { status: 500 }
    );
  }
} 