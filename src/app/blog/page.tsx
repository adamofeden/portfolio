// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Adam Dugan",
  description: "Articles and notes on engineering, AI, and product.",
};

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string: YYYY-MM-DD
  tags?: string[];
};

const posts: Post[] = [
  {
    slug: "seoaeogeo",
    title: "SEO / AEO / GEO",
    description: "Quick primer on Search, Answer, and Generative Engine Optimization.",
    date: "2025-10-22",
    tags: ["SEO", "AEO", "GEO"],
  },
  // Add more posts here as you create them
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Page() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 py-16">
      <nav className="mb-8">
        <Link href="/" className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4">
          ← Back to home
        </Link>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mt-3 text-black/70 dark:text-white/70">
        Notes on building secure, intelligent software: Next.js, AWS, Python, AI, and more.
      </p>

      <div className="mt-10 space-y-4">
        {sorted.map((p) => (
          <article
            key={p.slug}
            className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                <Link href={`/blog/${p.slug}`} className="hover:underline underline-offset-4">
                  {p.title}
                </Link>
              </h2>
              <time className="shrink-0 text-xs opacity-70" dateTime={p.date}>
                {formatDate(p.date)}
              </time>
            </div>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">{p.description}</p>
            {p.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 dark:border-white/20 bg-white/50 dark:bg-black/30 px-2.5 py-1 text-xs opacity-80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}