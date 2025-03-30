'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  category: string;
  author: string;
}

export default function AktualityPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        console.log('Fetching articles...');
        const response = await fetch('/api/articles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.details || 'Failed to fetch articles');
        }

        const data = await response.json();
        console.log('Articles fetched:', data);
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="relative h-[30vh] flex items-center justify-center px-4 bg-gradient-to-b from-purple-50 to-white">
          <div className="relative z-10 text-center text-gray-800 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Aktuality
            </h1>
            <p className="text-lg md:text-xl mb-4">
              Sledujte najnovšie správy a udalosti z oblasti onkológie
            </p>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-4 px-4 bg-purple-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Prihláste sa na odber noviniek
              </h2>
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
                Získajte najnovšie informácie o výskume, liečbe a podpore pre pacientov s rakovinou.
              </p>
              <form className="max-w-md mx-auto flex gap-2">
                <input
                  type="email"
                  placeholder="Váš email"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Prihlásiť sa
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* News Grid Section */}
        <section className="py-6 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Načítavam články...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles && articles.length > 0 ? (
                  articles.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-40">
                        <Image
                          src={article.featuredImage || '/images/logo.png'}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          onError={(e) => {
                            // Fallback to logo if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/logo.png';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.author}</span>
                          <span>
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    Zatiaľ nie sú žiadne články.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
} 