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
    slug: "voice-ai-production",
    title: "Building Voice AI That Doesn't Suck: Real-Time Conversational Interfaces in Production",
    description: "Everyone wants to build 'the next Jarvis,' but most voice AI feels clunky. Here's what I learned about latency, interruptions, and conversation design using Twilio, OpenAI, and Azure Speech.",
    date: "2026-01-22",
    tags: ["Voice AI", "Twilio", "Azure", "OpenAI", "Real-time", "TTS", "STT"],
  },
  {
    slug: "journalism-to-code",
    title: "From Journalism to Code: Why Non-Traditional Backgrounds Make Better Engineers",
    description: "Most engineers start with CS degrees. I started by interviewing strangers in Istanbul cafes. Here's why taking the scenic route creates more empathetic, user-focused engineers.",
    date: "2026-01-21",
    tags: ["Career", "Engineering", "Storytelling", "Product", "UX"],
  },
  {
    slug: "xero-quickbooks-integration-guide",
    title: "Integrating with Xero and QuickBooks: A Developer's Guide to Accounting APIs",
    description: "Building BalancingIQ taught me that accounting APIs are deceptively complex. Here's everything about OAuth flows, data models, rate limits, and making integrations production-ready.",
    date: "2026-01-20",
    tags: ["FinTech", "API Integration", "Xero", "QuickBooks", "OAuth", "Backend"],
  },
  {
    slug: "ai-infrastructure-challenges",
    title: "The Hard Part Isn't the Model: Real Challenges in Production AI Systems",
    description: "After building multiple AI products, the toughest problems weren't prompts or LLM choice — they were multi-tenant isolation, cost control, explainability, and guardrails. Here's what actually matters.",
    date: "2026-01-19",
    tags: ["AI", "Infrastructure", "Security", "Multi-tenant", "Cost Optimization"],
  },
  {
    slug: "ai-regulated-industries",
    title: "AI in Regulated Industries: Why Constraints Lead to Better Engineering",
    description: "Building AI for healthcare, finance, and regulated spaces requires auditability, deterministic workflows, secure data boundaries, and human oversight. Here's why these constraints make you a better engineer.",
    date: "2026-01-18",
    tags: ["AI", "Compliance", "Security", "HIPAA", "Healthcare", "Finance"],
  },
  {
    slug: "founder-engineer-mindset",
    title: "How Being Both a Founder and Engineer Changed How I Write Software",
    description: "Wearing both hats taught me to ask four critical questions about every feature, and made me ruthless about over-engineering, shiny abstractions, and false future-proofing.",
    date: "2026-01-18",
    tags: ["Engineering", "Startup", "Product", "Leadership"],
  },
  {
    slug: "cloud-ai-architecture",
    title: "Why Architecture Matters More Than Your Model Choice in Cloud + AI Systems",
    description: "Early architectural decisions compound faster than model improvements. Learn why event-driven workflows, data partitioning, encryption boundaries, and observability matter more than which model you choose.",
    date: "2026-01-17",
    tags: ["Architecture", "AI", "Cloud", "AWS", "System Design"],
  },
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
            className="rounded-2xl border border-black/20 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur p-6 hover:shadow-md transition-shadow"
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