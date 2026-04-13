import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase/client';
import { getSortedPostsData } from '@/lib/blog';
import { servicePages } from '@/data/services';
import { locationPages } from '@/data/locations';
import { equipmentSeoMapping } from '@/data/seo-mapping';

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

  // 2. Service Category Routes (Programmatic SEO)
  const serviceRoutes = Object.keys(servicePages).map((slug) => ({
    url: `${SITE_URL}/texnikalar/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Add additional mapping categories not in servicePages
  const mappingRoutes = Object.keys(equipmentSeoMapping)
    .filter(slug => !servicePages[slug])
    .map((slug) => ({
      url: `${SITE_URL}/texnikalar/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // 3. Location Routes
  const locationRoutes = Object.keys(locationPages).map((slug) => ({
    url: `${SITE_URL}/xidmet-bolgeleri/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Fetch Individual Equipment from DB
  const { data: equipment } = await supabaseAdmin
    .from('equipment')
    .select('id, updated_at');

  const equipmentRoutes = (equipment || []).map((item) => ({
    url: `${SITE_URL}/texnikalar/${item.id}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 5. Fetch Project Slugs
  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('id, updated_at')
    .eq('is_published', true);

  const projectRoutes = (projects || []).map((item) => ({
    url: `${SITE_URL}/layiheler/${item.id}`,
    lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // 6. Fetch Blog Posts
  const blogPosts = getSortedPostsData();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...mappingRoutes,
    ...locationRoutes,
    ...equipmentRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];
}

