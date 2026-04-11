import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getSortedPostsData } from '@/lib/blog';

const SITE_URL = 'https://naftexnika.az';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const staticRoutes = [
    '',
    '/texnikalar',
    '/layiheler',
    '/blog',
    '/haqqimizda',
    '/elaqe',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Fetch Equipment Slugs
  const { data: equipment } = await supabaseAdmin
    .from('equipment')
    .select('id, updated_at');

  const equipmentRoutes = (equipment || []).map((item) => ({
    url: `${SITE_URL}/texnikalar/${item.id}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 3. Fetch Project Slugs
  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('id, updated_at')
    .eq('is_published', true);

  const projectRoutes = (projects || []).map((item) => ({
    url: `${SITE_URL}/layiheler/${item.id}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 4. Fetch Blog Posts
  const blogPosts = getSortedPostsData();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...equipmentRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];
}
