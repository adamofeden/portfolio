// src/app/blog/llm-cost-comparison/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Real Cost of LLMs in Production: A Model Comparison for Finished Products - Adam Dugan",
  description:
    "Everyone talks about LLM capabilities, but nobody talks about the bills. Here's what AI actually costs in production across GPT-4, Claude, and other models, with real numbers from BalancingIQ, Handyman AI, and voice systems.",
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
        The Real Cost of LLMs in Production: A Model Comparison for Finished Products
      </h1>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Building an AI product is easy. Making it profitable is hard.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I&apos;ve shipped multiple AI products: <strong>BalancingIQ</strong> (financial advisory platform), 
        <strong> Handyman AI</strong> (image-based repair planning), and <strong>AI Administrative 
        Assistant</strong> (voice-enabled phone system). Every single one hit the same wall: 
        <strong> LLM costs can destroy your margins if you&apos;re not careful</strong>.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Here&apos;s what AI actually costs in production, broken down by real usage patterns, and how to 
        make it economically viable.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The Models: Pricing Breakdown (January 2026)</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        First, let&apos;s establish the baseline costs. All prices are per 1 million tokens.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-black/20 dark:border-white/20">
              <th className="text-left py-3 px-2">Model</th>
              <th className="text-right py-3 px-2">Input</th>
              <th className="text-right py-3 px-2">Output</th>
              <th className="text-left py-3 px-2">Best For</th>
            </tr>
          </thead>
          <tbody className="text-black/70 dark:text-white/70">
            <tr className="border-b border-black/5 dark:border-white/5">
              <td className="py-3 px-2"><strong>GPT-4o</strong></td>
              <td className="text-right py-3 px-2">$2.50</td>
              <td className="text-right py-3 px-2">$10.00</td>
              <td className="py-3 px-2">Complex reasoning, multi-step tasks</td>
            </tr>
            <tr className="border-b border-black/5 dark:border-white/5">
              <td className="py-3 px-2"><strong>GPT-4o-mini</strong></td>
              <td className="text-right py-3 px-2">$0.15</td>
              <td className="text-right py-3 px-2">$0.60</td>
              <td className="py-3 px-2">Simple tasks, high volume</td>
            </tr>
            <tr className="border-b border-black/5 dark:border-white/5">
              <td className="py-3 px-2"><strong>GPT-4 Turbo</strong></td>
              <td className="text-right py-3 px-2">$10.00</td>
              <td className="text-right py-3 px-2">$30.00</td>
              <td className="py-3 px-2">Highest quality, low latency</td>
            </tr>
            <tr className="border-b border-black/5 dark:border-white/5">
              <td className="py-3 px-2"><strong>Claude 3.5 Sonnet</strong></td>
              <td className="text-right py-3 px-2">$3.00</td>
              <td className="text-right py-3 px-2">$15.00</td>
              <td className="py-3 px-2">Long context, code generation</td>
            </tr>
            <tr className="border-b border-black/5 dark:border-white/5">
              <td className="py-3 px-2"><strong>Claude 3.5 Haiku</strong></td>
              <td className="text-right py-3 px-2">$0.25</td>
              <td className="text-right py-3 px-2">$1.25</td>
              <td className="py-3 px-2">Fast responses, simple queries</td>
            </tr>
            <tr>
              <td className="py-3 px-2"><strong>GPT-3.5 Turbo</strong></td>
              <td className="text-right py-3 px-2">$0.50</td>
              <td className="text-right py-3 px-2">$1.50</td>
              <td className="py-3 px-2">Legacy, being phased out</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Key insight:</strong> GPT-4o-mini is <strong>17x cheaper</strong> than GPT-4 Turbo 
        for input, and <strong>50x cheaper</strong> for output. That difference compounds fast.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Real-World Cost Examples from Production Systems</h2>

      <h3 className="mt-8 text-xl font-semibold">Example 1: BalancingIQ Financial Advisory</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>BalancingIQ</strong> analyzes financial data from Xero/QuickBooks and generates 
        actionable insights for SMBs.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Typical workflow:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>User connects their accounting software (one-time)</li>
        <li>System syncs financial data (monthly, automated)</li>
        <li>User requests analysis: &quot;How&apos;s my cash flow?&quot; or &quot;What should I focus on?&quot;</li>
        <li>LLM processes 3-6 months of transactions, generates insights</li>
        <li>User asks follow-up questions</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Token usage per analysis:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Input:</strong> 8,000 tokens (financial data + context + prompt)</li>
        <li><strong>Output:</strong> 1,500 tokens (insights + recommendations)</li>
        <li><strong>Follow-ups:</strong> Average 3 per session, ~3K input / 800 output each</li>
      </ul>

      <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <h4 className="font-semibold mb-3">Cost Per User Session:</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10">
              <th className="text-left py-2">Model</th>
              <th className="text-right py-2">Initial</th>
              <th className="text-right py-2">Follow-ups</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody className="text-black/70 dark:text-white/70">
            <tr className="border-b border-black/5 dark:border-white/5">
              <td className="py-2"><strong>GPT-4 Turbo</strong></td>
              <td className="text-right py-2">$0.125</td>
              <td className="text-right py-2">$0.162</td>
              <td className="text-right py-2 font-semibold">$0.287</td>
            </tr>
            <tr className="border-b border-black/5 dark:border-white/5">
              <td className="py-2"><strong>GPT-4o</strong></td>
              <td className="text-right py-2">$0.035</td>
              <td className="text-right py-2">$0.046</td>
              <td className="text-right py-2 font-semibold">$0.081</td>
            </tr>
            <tr>
              <td className="py-2"><strong>GPT-4o-mini</strong></td>
              <td className="text-right py-2">$0.002</td>
              <td className="text-right py-2">$0.003</td>
              <td className="text-right py-2 font-semibold">$0.005</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Reality check:</strong> If a user pays $50/month and uses the product 10 times, 
        GPT-4 Turbo costs $2.87 (5.7% of revenue). GPT-4o-mini costs $0.05 (0.1% of revenue).
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>What I actually use:</strong> GPT-4o for complex analyses, GPT-4o-mini for simple 
        queries and follow-ups. Average cost per session: ~$0.03.
      </p>

      <h3 className="mt-8 text-xl font-semibold">Example 2: Handyman AI (Image Analysis)</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Handyman AI</strong> analyzes photos of home repairs and generates detailed repair 
        plans, material lists, and cost estimates.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Typical workflow:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>User uploads 2-5 photos of the repair</li>
        <li>LLM with vision analyzes images</li>
        <li>Generates repair plan, material list, cost breakdown</li>
        <li>User asks clarification questions</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Token usage per request:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Input:</strong> 12,000 tokens (3 images ~3K tokens each, plus prompt)</li>
        <li><strong>Output:</strong> 2,000 tokens (detailed repair plan)</li>
      </ul>

      <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <h4 className="font-semibold mb-3">Cost Per Image Analysis:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-black/70 dark:text-white/70">
          <li><strong>GPT-4 Turbo (Vision):</strong> $0.18 per request</li>
          <li><strong>GPT-4o (Vision):</strong> $0.05 per request</li>
          <li><strong>Claude 3.5 Sonnet (Vision):</strong> $0.066 per request</li>
        </ul>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Reality check:</strong> If users pay $5 per analysis, GPT-4 Turbo takes 3.6% of 
        revenue. GPT-4o takes 1%. At scale (1,000 requests/month), that&apos;s $180 vs $50.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>What I actually use:</strong> GPT-4o for most analyses. The quality difference from 
        GPT-4 Turbo is minimal for this use case, and the cost savings are significant.
      </p>

      <h3 className="mt-8 text-xl font-semibold">Example 3: AI Administrative Assistant (Voice)</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Voice AI is expensive. You&apos;re paying for TTS, STT, <em>and</em> LLM inference, all in real-time.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Typical 5-minute call:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Twilio:</strong> $0.065 (phone infrastructure)</li>
        <li><strong>Azure STT:</strong> $0.083 (speech-to-text)</li>
        <li><strong>Azure TTS:</strong> $0.080 (text-to-speech)</li>
        <li><strong>LLM (10K tokens):</strong> Variable, see below</li>
      </ul>

      <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <h4 className="font-semibold mb-3">Total Cost Per 5-Minute Call:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-black/70 dark:text-white/70">
          <li><strong>Base (Twilio + TTS/STT):</strong> $0.228</li>
          <li><strong>+ GPT-4 Turbo:</strong> $0.528 total ($6.34/hour)</li>
          <li><strong>+ GPT-4o:</strong> $0.309 total ($3.71/hour)</li>
          <li><strong>+ GPT-4o-mini:</strong> $0.236 total ($2.83/hour)</li>
        </ul>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Reality check:</strong> If you&apos;re running a customer support line with 500 calls/day, 
        that&apos;s $158/day with GPT-4o-mini or $264/day with GPT-4 Turbo. Over a month: $4,740 vs $7,920.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>What I actually use:</strong> GPT-4o-mini for most calls, GPT-4o for complex routing 
        decisions or multi-step workflows. I also cache common responses (FAQs) to avoid LLM calls entirely.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Hidden Costs: Embeddings, Fine-Tuning, and Storage</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        LLM inference isn&apos;t the only cost. Here are the hidden expenses:
      </p>

      <h3 className="mt-8 text-xl font-semibold">Embeddings</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        If you&apos;re using RAG (retrieval-augmented generation), you need embeddings for semantic search.
      </p>

      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>OpenAI text-embedding-3-small:</strong> $0.02 per 1M tokens</li>
        <li><strong>OpenAI text-embedding-3-large:</strong> $0.13 per 1M tokens</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Example:</strong> Embedding a 100-page document (≈75K tokens) costs $0.0015 (small) 
        or $0.01 (large). If you&apos;re indexing thousands of documents, this adds up.
      </p>

      <h3 className="mt-8 text-xl font-semibold">Vector Database Storage</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Storing embeddings requires a vector database (Pinecone, Weaviate, pgvector).
      </p>

      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Pinecone:</strong> $70/month for 100K vectors (1536 dimensions)</li>
        <li><strong>pgvector (self-hosted):</strong> EC2/RDS costs, ~$20-50/month for small scale</li>
      </ul>

      <h3 className="mt-8 text-xl font-semibold">Fine-Tuning</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Fine-tuning models for domain-specific tasks has upfront costs:
      </p>

      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>GPT-4o-mini training:</strong> $3.00 per 1M tokens</li>
        <li><strong>GPT-4o-mini inference (fine-tuned):</strong> $0.30 input / $1.20 output (2-3x base cost)</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>When it&apos;s worth it:</strong> If you need very specific behavior and prompt engineering 
        isn&apos;t enough. But usually, <strong>better prompts + RAG is cheaper</strong> than fine-tuning.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Cost Optimization Strategies That Actually Work</h2>

      <h3 className="mt-8 text-xl font-semibold">1. Aggressive Caching</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        The cheapest LLM call is the one you don&apos;t make.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>What I cache:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>FAQ responses:</strong> &quot;What are your hours?&quot; → cached answer, zero cost</li>
        <li><strong>Common analyses:</strong> &quot;Show me cash flow&quot; for similar businesses</li>
        <li><strong>Embeddings:</strong> Never re-embed the same document</li>
        <li><strong>Voice audio:</strong> Pre-generated TTS for greetings and common phrases</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Impact:</strong> Caching reduces LLM calls by 40-60% in production. Use Redis with TTL 
        for dynamic content, S3 for static responses.
      </p>

      <h3 className="mt-8 text-xl font-semibold">2. Model Tiering</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Route queries to the cheapest model that can handle them.
      </p>

      <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <h4 className="font-semibold mb-3">My Routing Strategy:</h4>
        <ul className="list-disc list-inside space-y-2 text-sm text-black/70 dark:text-white/70">
          <li><strong>GPT-4o-mini:</strong> Simple queries, follow-up questions, clarifications</li>
          <li><strong>GPT-4o:</strong> Complex analysis, multi-step reasoning, vision tasks</li>
          <li><strong>GPT-4 Turbo:</strong> Rare, only for highest-stakes decisions</li>
        </ul>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>How to decide:</strong> Start with a classifier (even a simple keyword check). Route 
        80% of queries to the cheap model, 20% to the expensive one. Monitor quality and adjust.
      </p>

      <h3 className="mt-8 text-xl font-semibold">3. Shorter Context Windows</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Input tokens cost money. Don&apos;t send more context than you need.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Bad:</strong> Sending 50K tokens of conversation history on every request.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Good:</strong> Summarize older messages, keep only the last 5-10 turns, use embeddings 
        to retrieve relevant context.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Impact:</strong> In BalancingIQ, I reduced input tokens by 60% by summarizing financial 
        data instead of sending raw transactions. Quality stayed the same, costs dropped dramatically.
      </p>

      <h3 className="mt-8 text-xl font-semibold">4. Batch Processing</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        For non-urgent tasks, use OpenAI&apos;s Batch API: <strong>50% discount</strong>, 24-hour turnaround.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Good use cases:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>Nightly reports</li>
        <li>Bulk data analysis</li>
        <li>Email summaries</li>
        <li>Content moderation backlogs</li>
      </ul>

      <h3 className="mt-8 text-xl font-semibold">5. Prompt Optimization</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Shorter, clearer prompts = fewer tokens = lower costs.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Example:</strong> I rewrote a 1,500-token system prompt down to 600 tokens by removing 
        redundancy and being more concise. Quality improved (clearer instructions) and costs dropped 40%.
      </p>

      <h3 className="mt-8 text-xl font-semibold">6. Usage Limits and Guardrails</h3>
      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Prevent abuse and runaway costs:
      </p>

      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Rate limits:</strong> 10 queries per user per day on free tier</li>
        <li><strong>Max token limits:</strong> Cap output at 2K tokens to prevent infinite generation</li>
        <li><strong>Cost alerts:</strong> CloudWatch alarms when daily spend exceeds threshold</li>
        <li><strong>Per-user tracking:</strong> Flag users making 100+ requests/day for review</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">When to Use Which Model: Decision Framework</h2>

      <div className="mt-6 space-y-6">
        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
          <h4 className="font-semibold mb-2">Use GPT-4o-mini When:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-black/70 dark:text-white/70">
            <li>Simple queries with clear inputs</li>
            <li>High-volume, low-complexity tasks</li>
            <li>Following instructions (not reasoning)</li>
            <li>Summarization, formatting, extraction</li>
            <li>You&apos;re cost-sensitive and quality is &quot;good enough&quot;</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
          <h4 className="font-semibold mb-2">Use GPT-4o When:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-black/70 dark:text-white/70">
            <li>Complex reasoning and multi-step logic</li>
            <li>Vision tasks (image analysis)</li>
            <li>Technical content generation</li>
            <li>Code generation and debugging</li>
            <li>Balance between cost and quality matters</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
          <h4 className="font-semibold mb-2">Use Claude 3.5 Sonnet When:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-black/70 dark:text-white/70">
            <li>Very long context windows (200K tokens)</li>
            <li>Code generation (often better than GPT-4)</li>
            <li>Research and analysis tasks</li>
            <li>You need detailed, thoughtful responses</li>
            <li>JSON parsing reliability (better adherence)</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
          <h4 className="font-semibold mb-2">Use GPT-4 Turbo When:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-black/70 dark:text-white/70">
            <li>You need the absolute best quality</li>
            <li>Low latency is critical (faster than GPT-4o)</li>
            <li>High-stakes decisions (legal, medical, financial)</li>
            <li>Cost is not a primary concern</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Real Cost Analysis: A $50/Month SaaS Product</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Let&apos;s say you&apos;re building a SaaS product with a $50/month subscription. How much can you 
        afford to spend on LLM costs?
      </p>

      <div className="mt-6 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <h4 className="font-semibold mb-3">Typical SaaS Margins:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-black/70 dark:text-white/70">
          <li><strong>Gross revenue:</strong> $50/month</li>
          <li><strong>Payment processing (3%):</strong> -$1.50</li>
          <li><strong>Cloud infrastructure:</strong> -$5 (AWS, hosting, databases)</li>
          <li><strong>Support and ops:</strong> -$3</li>
          <li><strong>Target gross margin:</strong> 60% = $30 profit</li>
        </ul>
        <p className="mt-3 text-sm text-black/70 dark:text-white/70">
          <strong>Available for LLM costs: ~$10/month (20% of revenue)</strong>
        </p>
      </div>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        If users make 20 requests per month at $0.05 each (GPT-4o), that&apos;s $1/month. Comfortable margin.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        If users make 100 requests per month at $0.30 each (GPT-4 Turbo), that&apos;s $30/month. 
        <strong>You&apos;re losing money on every customer.</strong>
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>The fix:</strong> Tier pricing based on usage, use cheaper models, or implement 
        aggressive caching and rate limits.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Monitoring and Cost Tracking</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        You can&apos;t optimize what you don&apos;t measure. Here&apos;s what I track:
      </p>

      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Cost per user per month:</strong> Total LLM spend / active users</li>
        <li><strong>Cost per request:</strong> By model, by feature, by user type</li>
        <li><strong>Cache hit rate:</strong> % of requests served from cache vs LLM</li>
        <li><strong>Model distribution:</strong> % of requests to mini vs standard vs turbo</li>
        <li><strong>Token usage:</strong> Input vs output, per endpoint</li>
      </ul>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Tools I use:</strong>
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>OpenAI Dashboard:</strong> Real-time usage and costs</li>
        <li><strong>CloudWatch:</strong> Custom metrics, alarms for cost spikes</li>
        <li><strong>Custom logging:</strong> Log every LLM call with user_id, feature, tokens, cost</li>
        <li><strong>Weekly reports:</strong> Automated summary of costs, trends, outliers</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Key Takeaways</h2>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70">
        <li>
          <strong>GPT-4o-mini is 17-50x cheaper than GPT-4 Turbo.</strong> Use it as your default, 
          upgrade only when necessary.
        </li>
        <li>
          <strong>Model tiering is essential:</strong> Route simple queries to cheap models, complex 
          ones to expensive models. This alone can cut costs 60%.
        </li>
        <li>
          <strong>Caching is your best friend:</strong> 40-60% of requests can be cached. The 
          cheapest LLM call is the one you don&apos;t make.
        </li>
        <li>
          <strong>Voice AI is expensive:</strong> $0.23-0.53 per 5-minute call adds up fast. Cache 
          FAQs, use cheaper models, set time limits.
        </li>
        <li>
          <strong>Hidden costs matter:</strong> Embeddings, vector storage, and fine-tuning add to 
          your bill. Budget for the full stack, not just inference.
        </li>
        <li>
          <strong>Monitor everything:</strong> Track cost per user, per request, per feature. Set 
          alarms for spikes. Optimize continuously.
        </li>
        <li>
          For a $50/month SaaS, aim to spend &lt;$10/month per user on LLM costs (20% of revenue). 
          Adjust pricing or usage limits accordingly.
        </li>
      </ul>

      <div className="mt-12 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <p className="text-sm text-black/70 dark:text-white/70">
          <strong>Building an AI product and worried about costs?</strong> I&apos;d love to hear about 
          your cost optimization challenges, model selection, or pricing strategy. Reach out at{" "}
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
      <p className="mt-8 text-sm text-black/60 dark:text-white/60 italic text-center">
        I (Adam Dugan) used LLMs while writing this article.
      </p>
    </main>
  );
}