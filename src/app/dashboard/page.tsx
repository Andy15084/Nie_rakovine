'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DonationStats {
  totalDonated: number;
  currentTier: string;
  nextTierProgress: number;
  lastDonation: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchDonationStats();
    }
  }, [session]);

  async function fetchDonationStats() {
    try {
      const response = await fetch('/api/user/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Initialize with default stats if fetch fails
      setStats({
        totalDonated: 0,
        currentTier: 'BRONZE',
        nextTierProgress: 0,
        lastDonation: null,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const user = session?.user as User | undefined;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, {user?.name}</h1>

          {/* Donation Stats */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Donation Stats</h2>
            {stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Total Donated</p>
                  <p className="text-2xl font-bold text-red-600">€{(stats.totalDonated || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Tier</p>
                  <p className="text-2xl font-bold text-red-600">{stats.currentTier || 'BRONZE'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Progress to Next Tier</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-600 h-2.5 rounded-full"
                        style={{ width: `${stats.nextTierProgress || 0}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{stats.nextTierProgress || 0}% complete</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Donation</p>
                  <p className="text-lg text-gray-900">
                    {stats.lastDonation
                      ? new Date(stats.lastDonation).toLocaleDateString()
                      : 'No donations yet'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading donation stats...</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Make a Donation
              </Link>
              <Link
                href="/subscription"
                className="inline-flex items-center justify-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50"
              >
                Manage Subscription
              </Link>
            </div>
          </div>

          {/* Admin Section */}
          {user?.role === 'ADMIN' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/admin/articles/new"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800"
                >
                  Create New Article
                </Link>
                <Link
                  href="/admin/donations"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-900 text-sm font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
                >
                  View All Donations
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 