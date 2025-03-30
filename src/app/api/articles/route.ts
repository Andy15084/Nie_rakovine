import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    console.log('API GET request received');

    // For public view, only get published articles
    const articles = await prisma.article.findMany({
      where: {
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
      orderBy: {
        publishedAt: 'desc',
      },
    });

    console.log('Published articles found:', articles.length);

    // Format articles for public view
    const formattedArticles = articles.map(article => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      featuredImage: article.featuredImage || '/images/logo.png',
      publishedAt: article.publishedAt,
      category: article.category?.name || 'Uncategorized',
      author: article.author?.name || 'Anonymous',
    }));

    console.log('Returning formatted articles:', formattedArticles.length);
    return NextResponse.json(formattedArticles);
  } catch (error) {
    console.error('Error in GET /api/articles:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Failed to fetch articles', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    console.log('Received data:', JSON.stringify(data, null, 2));

    // Log each required field
    console.log('Title:', data.title);
    console.log('Slug:', data.slug);
    console.log('Category Slug:', data.categorySlug);
    console.log('Excerpt:', data.excerpt);
    console.log('Content:', data.content ? 'Present' : 'Missing');
    console.log('Status:', data.status);

    // Validate required fields
    if (!data.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    if (!data.slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }
    if (!data.categorySlug) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }
    if (!data.excerpt) {
      return NextResponse.json(
        { error: 'Excerpt is required' },
        { status: 400 }
      );
    }
    if (!data.content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Check if slug is unique
    const existingArticle = await prisma.article.findUnique({
      where: { slug: data.slug },
    });

    if (existingArticle) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 400 }
      );
    }

    // Find the category by slug
    const category = await prisma.category.findUnique({
      where: { slug: data.categorySlug },
    });

    if (!category) {
      console.error('Category not found:', data.categorySlug);
      return NextResponse.json(
        { error: `Invalid category: ${data.categorySlug}` },
        { status: 400 }
      );
    }

    // Get the admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@nierakovine.org' },
    });

    if (!adminUser) {
      console.error('Admin user not found');
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 500 }
      );
    }

    // Create the article with proper connections
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        status: data.status === 'published' ? 'PUBLISHED' : 'DRAFT',
        publishedAt: data.status === 'published' ? new Date() : null,
        category: {
          connect: {
            id: category.id,
          },
        },
        author: {
          connect: {
            id: adminUser.id,
          },
        },
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

    console.log('Article created successfully:', article);
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    // Log the full error details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create article' },
      { status: 500 }
    );
  }
} 