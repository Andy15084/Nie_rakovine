'use client';

import { useEffect, useState } from 'react';

interface Donor {
  id: string;
  name: string;
  totalDonated: number;
  currentTier: string;
  isAnonymous: boolean;
}

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch('/api/donors');
        if (!response.ok) {
          throw new Error('Failed to fetch donors');
        }
        const data = await response.json();
        setDonors(data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDonors();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'DIAMOND':
        return 'text-blue-600';
      case 'PLATINUM':
        return 'text-gray-600';
      case 'GOLD':
        return 'text-yellow-600';
      case 'SILVER':
        return 'text-gray-400';
      default: // BRONZE
        return 'text-amber-700';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Naši darcovia</h1>
          
          {/* Tier explanation */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Úrovne darcov</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-amber-50">
                <span className="text-amber-700 font-semibold">Bronze</span>
                <p className="text-sm text-gray-600">Do 100€</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-100">
                <span className="text-gray-400 font-semibold">Silver</span>
                <p className="text-sm text-gray-600">100€ - 499€</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50">
                <span className="text-yellow-600 font-semibold">Gold</span>
                <p className="text-sm text-gray-600">500€ - 999€</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <span className="text-gray-600 font-semibold">Platinum</span>
                <p className="text-sm text-gray-600">1,000€ - 4,999€</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50">
                <span className="text-blue-600 font-semibold">Diamond</span>
                <p className="text-sm text-gray-600">5,000€ a viac</p>
              </div>
            </div>
          </div>

          {/* Donors list */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {donors.length > 0 ? (
                donors.map((donor) => (
                  <div key={donor.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {donor.isAnonymous ? 'Anonymný darca' : donor.name}
                        </h3>
                        <p className={`text-sm font-semibold ${getTierColor(donor.currentTier)}`}>
                          {donor.currentTier} úroveň
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">
                          €{donor.totalDonated.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  Zatiaľ nemáme žiadnych darcov
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 