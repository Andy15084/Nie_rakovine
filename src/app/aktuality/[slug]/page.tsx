import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

async function getArticle(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        slug: slug,
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!article) {
      return null;
    }

    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Failed to fetch article');
  }
}

type ArticleWithRelations = NonNullable<Awaited<ReturnType<typeof getArticle>>>;

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Article Header */}
        <section className="relative h-[40vh] flex items-center justify-center px-4 bg-gradient-to-b from-purple-50 to-white">
          <div className="absolute inset-0 z-0">
            {article.featuredImage && (
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover opacity-20"
              />
            )}
          </div>
          <div className="relative z-10 text-center text-gray-800 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {article.category.name}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <span>{article.author.name}</span>
              <span>•</span>
              <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('sk-SK') : ''}</span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </section>

        {/* Back to News Button */}
        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/aktuality"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Späť na aktuality
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 