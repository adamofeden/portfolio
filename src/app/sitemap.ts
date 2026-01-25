// src/app/sitemap.ts
import { MetadataRoute } from 'next'

type Post = {
  slug: string;
  date: string;
};

const posts: Post[] = [
  { slug: "oauth2-production-guide", date: "2026-01-26" },
  { slug: "llm-action-handler-pattern", date: "2026-01-25" },
  { slug: "rust-vs-python-backend", date: "2026-01-23" },
  { slug: "journalism-to-code", date: "2026-01-21" },
  { slug: "xero-quickbooks-integration-guide", date: "2026-01-20" },
  { slug: "ai-infrastructure-challenges", date: "2026-01-19" },
  { slug: "ai-regulated-industries", date: "2026-01-18" },
  { slug: "founder-engineer-mindset", date: "2026-01-18" },
  { slug: "cloud-ai-architecture", date: "2026-01-17" },
  { slug: "seoaeogeo", date: "2025-10-22" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adamdugan.com';
  
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPosts,
  ];
}