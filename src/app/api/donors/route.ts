import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all users with their donation stats
    const donors = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        donationStats: {
          select: {
            totalDonated: true,
            currentTier: true,
          },
        },
        donations: {
          select: {
            anonymous: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      where: {
        donationStats: {
          totalDonated: {
            gt: 0,
          },
        },
      },
      orderBy: {
        donationStats: {
          totalDonated: 'desc',
        },
      },
    });

    // Format the response
    const formattedDonors = donors.map((donor) => ({
      id: donor.id,
      name: donor.name,
      totalDonated: donor.donationStats?.totalDonated || 0,
      currentTier: donor.donationStats?.currentTier || 'BRONZE',
      isAnonymous: donor.donations[0]?.anonymous || false,
    }));

    return NextResponse.json(formattedDonors);
  } catch (error) {
    console.error('Error fetching donors:', error);
    return NextResponse.json(
      { message: 'Error fetching donors' },
      { status: 500 }
    );
  }
} 