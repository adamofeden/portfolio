// src/app/blog/founder-engineer-mindset/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Being Both a Founder and Engineer Changed How I Write Software — Adam Dugan",
  description:
    "Wearing both hats taught me to ask four critical questions about every feature: Who uses this? What happens when it breaks at 2am? Can this scale? Does this reduce cognitive load? Here's what that dual perspective reveals.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 py-16">
      <nav className="mb-8">
        <Link
          href="/"
          className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
        >
          ← Back to home
        </Link>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        How Being Both a Founder and Engineer Changed How I Write Software
      </h1>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        There's something clarifying about wearing both the founder and engineer hats. When you're 
        the one who has to sell the product, support the customer, and debug the outage at 2am, your 
        relationship with code changes fundamentally.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I've been building software for years, but founding <em>Versytech</em> and shipping products 
        like <em>BalancingIQ</em> and <em>SOA Assist Pro</em> forced me to confront a question I'd 
        been avoiding as a pure engineer: <strong>Does this actually matter?</strong>
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The Four Questions That Now Guide Every Feature</h2>
      
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Before I write a single line of code now, I ask myself four questions. They sound simple, 
        but they filter out a surprising amount of work that <em>feels</em> productive but doesn't 
        move the needle.
      </p>

      <h3 className="mt-8 text-xl font-semibold">1. Who Actually Uses This?</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Not "who might use this someday" or "what if a user wants to…" — but <strong>who, right now, 
        is asking for this?</strong> If I can't name a specific customer or use case, I don't build it.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        As an engineer, I used to build features because they were interesting or because they made 
        the architecture more "complete." As a founder, I realized that every feature has a carrying 
        cost: maintenance, documentation, support burden, cognitive overhead. If no one's asking for 
        it, it's not a feature — it's tech debt I'm paying interest on.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Example: Early on in <em>BalancingIQ</em>, I wanted to build a sophisticated role-based 
        permissions system with granular controls. But when I talked to customers, they just needed 
        "admin" and "viewer." We shipped the simple version in a day. Six months later, still no one 
        has asked for more. That's weeks of engineering time saved.
      </p>

      <h3 className="mt-8 text-xl font-semibold">2. What Happens When It Breaks at 2am?</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        This one is personal. If you're the founder, you're also the on-call engineer. There's no 
        "escalate to the team" when you <em>are</em> the team.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        So before I ship something, I ask: If this fails at 2am, can I understand what went wrong 
        from the logs? Can I roll back safely? Is there a dead man's switch or alert that wakes me 
        up before customers notice?
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        This mindset has made me ruthless about observability and simplicity. Clever code that saves 
        10 lines but makes debugging impossible isn't clever — it's a liability. Boring, explicit, 
        well-logged code that I can fix half-asleep is gold.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Example: In <em>SOA Assist Pro</em>, we process Medicare compliance forms that have strict 
        deadlines. If the pipeline fails, people miss submission windows. So every critical step logs 
        to CloudWatch with structured JSON, includes request IDs, and has retry logic with exponential 
        backoff. When something breaks, I know <em>exactly</em> where and why within 30 seconds.
      </p>

      <h3 className="mt-8 text-xl font-semibold">3. Can This Scale Without a Rewrite?</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I used to think "premature optimization is the root of all evil" meant you could ignore 
        scalability early on. Now I realize it means: <strong>don't over-engineer, but don't paint 
        yourself into a corner either.</strong>
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        As a founder, I can't afford to rewrite the system every six months. So I think ahead — not 
        about hypothetical millions of users, but about whether this design will handle 10x growth 
        without fundamental changes.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Can I add more Lambdas if traffic spikes? Can I partition the database by tenant without a 
        migration? Can I swap out the LLM provider without touching business logic?
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Example: In <em>BalancingIQ</em>, we partition customer data by organization ID from day one. 
        It's a simple pattern — every DynamoDB table has `orgId` as the partition key — but it means 
        we can scale horizontally forever. No sharding rewrites, no migration scripts, just add capacity.
      </p>

      <h3 className="mt-8 text-xl font-semibold">4. Does This Reduce Real Cognitive Load?</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        This is the question I didn't ask when I was purely an engineer. I'd build features that were 
        technically impressive but mentally exhausting to use.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Now I think about cognitive load constantly. Does this feature make the user's life simpler, 
        or does it add one more thing to remember? Does this abstraction make the code easier to 
        reason about, or does it require holding three levels of indirection in your head?
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        As a founder, you realize: <strong>your customers are busy, tired, and distracted.</strong> If 
        your product requires a manual to use, you've already lost. If your codebase requires a PhD 
        to modify, you're blocking yourself from shipping fast.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Example: In <em>BalancingIQ</em>, we auto-generate financial insights with AI. Early versions 
        had a complex UI with dropdowns, filters, and customization options. Usage was low. We 
        simplified it to: connect your books, get insights. One button. Usage tripled. Sometimes the 
        best feature is the one you <em>don't</em> build.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">What I've Become Ruthless About</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Asking these questions has made me ruthless about cutting things that don't pass the test. 
        Here's what I now actively avoid:
      </p>

      <h3 className="mt-8 text-xl font-semibold">Over-Engineering</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Engineers love building flexible, extensible systems. But flexibility has a cost: complexity. 
        Every abstraction layer, every plugin system, every "future-proof" interface adds cognitive 
        overhead and maintenance burden.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I used to build systems that could handle any use case. Now I build systems that handle 
        <em>this</em> use case really well. If requirements change, I'll refactor. But I won't carry 
        the weight of hypothetical futures that never arrive.
      </p>

      <h3 className="mt-8 text-xl font-semibold">Shiny Abstractions</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        New frameworks, new patterns, new paradigms — they're exciting. But they're also risky. Every 
        time you adopt a shiny new abstraction, you're betting that it'll still be maintained, documented, 
        and supported when you need to fix a bug at 2am.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I now favor boring, battle-tested tools. AWS Lambda, DynamoDB, S3. Next.js, React, TypeScript. 
        Python, Pandas. These aren't the newest or coolest, but they're reliable, well-documented, and 
        have massive communities. When something breaks, I can find answers in minutes, not days.
      </p>

      <h3 className="mt-8 text-xl font-semibold">"Future-Proofing" That Never Arrives</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        "What if we need to support multiple payment providers?" "What if we need to run on-prem?" 
        "What if we need to handle billions of records?"
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        These are valid questions — <em>if</em> they're grounded in reality. But most of the time, 
        they're just fear-driven engineering. You spend weeks building abstractions for problems you 
        don't have, and when the real problems arrive, they look nothing like what you planned for.
      </p>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I now build for the problems I have <em>today</em>, with an eye toward making future changes 
        <em>possible</em> but not <em>premature</em>. Ship, learn, adapt.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Shipping Reliable Systems Beats Clever Code Every Time</h2>
      
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Here's what I've learned wearing both hats: <strong>No one cares how clever your code is.</strong> 
        They care that it works, that it's fast, that it doesn't lose their data, and that when it breaks, 
        you can fix it quickly.
      </p>
      
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        The most beautiful abstraction in the world doesn't matter if it ships three months late. The 
        most extensible architecture doesn't matter if it crashes under load. The most "future-proof" 
        system doesn't matter if no one uses it.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        What matters is:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Does it solve a real problem?</strong></li>
        <li><strong>Can I ship it this week?</strong></li>
        <li><strong>Will it survive contact with real users?</strong></li>
        <li><strong>Can I debug it when it breaks?</strong></li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Being a founder-engineer means constantly balancing: Ship fast vs ship right. Simple vs scalable. 
        Clever vs maintainable. And the answer is almost always: <strong>boring, reliable, and shippable 
        beats clever every time.</strong>
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Key Takeaways</h2>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70">
        <li>
          Wearing both founder and engineer hats forces you to ask: <strong>Does this actually matter?</strong>
        </li>
        <li>
          Four critical questions: Who uses this? What happens at 2am? Can this scale? Does this reduce 
          cognitive load?
        </li>
        <li>
          Be ruthless about cutting over-engineering, shiny abstractions, and "future-proofing" that 
          never arrives.
        </li>
        <li>
          No one cares how clever your code is. They care that it works, scales, and can be fixed when 
          it breaks.
        </li>
        <li>
          Boring, reliable, and shippable beats clever every single time.
        </li>
      </ul>

      <div className="mt-12 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <p className="text-sm text-black/70 dark:text-white/70">
          <strong>Building a product as a founder-engineer?</strong> I'd love to hear about your experience. 
          Reach out at{" "}
          <a href="mailto:adamdugan6@gmail.com" className="underline hover:opacity-80">
            adamdugan6@gmail.com
          </a>{" "}
          or connect with me on{" "}
          <a 
            href="https://www.linkedin.com/in/adam-dugan-918722217/" 
            target="_blank" 
            rel="noreferrer noopener"
            className="underline hover:opacity-80"
          >
            LinkedIn
          </a>.
        </p>
      </div>
    </main>
  );
}