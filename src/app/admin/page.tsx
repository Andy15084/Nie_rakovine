'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          New Article
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Articles</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Published Articles</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Draft Articles</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium text-gray-900">Recent Articles</h2>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500 py-8">
            No articles yet. Create your first article to get started.
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <Link
              href="/admin/articles/new"
              className="block w-full px-4 py-2 text-center bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              Create New Article
            </Link>
            <Link
              href="/admin/categories"
              className="block w-full px-4 py-2 text-center bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
            >
              Manage Categories
            </Link>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Database Status</span>
              <span className="text-green-600">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Storage Usage</span>
              <span className="text-gray-900">0 MB / 1 GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Last Backup</span>
              <span className="text-gray-900">Never</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 