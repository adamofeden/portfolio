// src/app/blog/industry-native-design/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Designing Software That Feels Native: Why Your App Should Speak the Language of Its Industry - Adam Dugan",
  description:
    "Most software feels like a tech product dropped into an industry. Here's why studying industry tools—their patterns, workflows, and design language—creates software users understand immediately, based on building products for insurance, finance, education, and healthcare.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 sm:px-8 py-16">
      <nav className="mb-8">
        <Link
          href="/blog"
          className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
        >
          ← Back to blog
        </Link>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Designing Software That Feels Native: Why Your App Should Speak the Language of Its Industry
      </h1>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Most software built for a specific industry feels like a generic tech product with industry 
        features bolted on. Users open it and immediately feel lost, even though they&apos;ve worked 
        in the industry for decades.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        The problem isn&apos;t bad UX. It&apos;s that the software doesn&apos;t <em>speak the 
        language</em> of the industry. It doesn&apos;t follow the mental models users already have. 
        It doesn&apos;t feel like it <em>belongs</em>.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I&apos;ve built software for insurance, finance, education, and healthcare. Every time, the 
        biggest design insight came from studying <strong>the tools that already exist in that 
        industry</strong> — not to copy them, but to understand the design language users already 
        speak.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The Problem: Tech-First Design</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        When engineers build software for an unfamiliar industry, we default to patterns we know: 
        admin dashboards, CRM-style forms, SaaS navigation. These patterns work, but they don&apos;t 
        feel <em>native</em>. When an insurance underwriter opens your app, they shouldn&apos;t 
        think &quot;this is software.&quot; They should think &quot;this is an underwriting tool.&quot;
      </p>

      <h2 className="mt-10 text-2xl font-semibold">What Industry-Native Design Means</h2>

      <h3 className="mt-8 text-xl font-semibold">1. Use Industry Terminology</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        In BalancingIQ, I didn&apos;t call things &quot;data sources&quot; or &quot;integrations.&quot; 
        I used accounting terms: <strong>&quot;Chart of Accounts,&quot;</strong> <strong>&quot;Balance 
        Sheet,&quot;</strong> <strong>&quot;Trial Balance.&quot;</strong> Users shouldn&apos;t 
        need to translate your app&apos;s language into their industry&apos;s language.
      </p>

      <h3 className="mt-8 text-xl font-semibold">2. Match Established Workflows</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Industries have workflows that evolved over decades for good reasons — regulations, error 
        prevention, collaboration patterns. When building court case filing automation, I didn&apos;t 
        &quot;improve&quot; the process. I matched how court clerks <em>actually</em> work: verify 
        case info → check formatting → validate fees → assign timestamp → generate confirmation. 
        Deviating from this would confuse users and create errors.
      </p>

      <h3 className="mt-8 text-xl font-semibold">3. Adopt Visual Language from Industry Tools</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        In financial software, negative numbers appear in parentheses and red: <span className="text-red-600">(2,450.00)</span>. 
        Currency shows two decimal places. Debits and credits appear in separate columns. These 
        aren&apos;t just aesthetics — they&apos;re <strong>scanning patterns</strong> professionals 
        have trained their eyes to recognize.
      </p>

      <h3 className="mt-8 text-xl font-semibold">4. Respect Industry Constraints</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        In SOA Assist Pro (healthcare AI), HIPAA compliance shaped the entire UX: visible audit 
        trails, explicit consent workflows, manual overrides for every AI suggestion, PHI warnings. 
        Healthcare workers <em>expect</em> these constraints. Software that ignores them feels 
        unsafe, even if technically compliant.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">How to Research Industry Design Language</h2>

      <h3 className="mt-8 text-xl font-semibold">Study the Incumbent Tools</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Before writing code, spend time with dominant tools: QuickBooks and Xero for finance, Epic 
        and Cerner for healthcare, Canvas for education. Look for vocabulary, information hierarchy, 
        input patterns, output formats, and error handling approaches.
      </p>

      <h3 className="mt-8 text-xl font-semibold">Talk to Power Users</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Find practitioners who live in the software daily. Ask: &quot;Walk me through your typical 
        workflow,&quot; &quot;What parts do you use constantly?&quot; and critically, <strong>&quot;What 
        would you never want changed?&quot;</strong> This reveals patterns users depend on and would 
        resist changing.
      </p>

      <h3 className="mt-8 text-xl font-semibold">Observe Real Work Sessions</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Watch someone work. You&apos;ll see keyboard shortcuts they use unconsciously, how they 
        switch between tools, manual verification steps, and workarounds. When building BalancingIQ, 
        watching accountants constantly switch between QuickBooks, Excel, and paper templates told 
        me the software needed to feel like both a bookkeeping tool <em>and</em> a spreadsheet.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Real Examples</h2>

      <h3 className="mt-8 text-xl font-semibold">BalancingIQ: Financial Advisory AI</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I used exact GAAP financial statement layouts, accounting number conventions (negatives in 
        parentheses), organized by accounting periods, and named features after accounting concepts. 
        Accountants said it felt like &quot;QuickBooks with intelligence built in.&quot;
      </p>

      <h3 className="mt-8 text-xl font-semibold">SOA Assist Pro: Healthcare AI</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I used SOAP note structure (Subjective, Objective, Assessment, Plan), visible audit trails, 
        explicit consent before AI accessed data, and healthcare terminology (&quot;client&quot; 
        not &quot;user&quot;). Healthcare workers trusted it because it <em>looked</em> like it 
        understood compliance.
      </p>

      <h3 className="mt-8 text-xl font-semibold">Language Lab VR: Education</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Organized by CEFR levels (A1, A2, B1, B2, C1, C2), provided lesson plans and learning 
        objectives, included assessment rubrics, used education terms like &quot;Module&quot; and 
        &quot;Learning Path.&quot; Teachers integrated it without learning a new framework.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Balancing Familiarity with Innovation</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Industry-native design doesn&apos;t mean copying. It means <strong>innovating within the 
        design language users already speak</strong>. Like modern architecture in Paris — distinctly 
        new, but respecting height limits, materials, and street-level design.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Keep:</strong> Terminology, core workflows, visual conventions, data structures
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Innovate:</strong> Speed, intelligence, integration, accessibility, error prevention
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        In BalancingIQ, I kept financial layouts traditional but added AI insights and natural 
        language queries. The <em>presentation</em> felt familiar; the <em>capabilities</em> felt novel.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Common Mistakes</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Don&apos;t oversimplify.</strong> Accountants, doctors, lawyers use complex tools 
        efficiently. Don&apos;t hide features to reduce &quot;complexity.&quot;
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Don&apos;t reinvent terminology.</strong> Call invoices &quot;invoices,&quot; not 
        &quot;payment requests.&quot;
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Don&apos;t ignore regulatory UI.</strong> Some patterns exist because of regulations. 
        Hiding audit trails to clean up the UI makes software unusable.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Don&apos;t assume you know better.</strong> When users say &quot;we&apos;ve always 
        done it this way,&quot; that&apos;s institutional knowledge. Understand the <em>why</em> 
        before you &quot;improve&quot; it.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The Payoff: Trust and Adoption</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        When software feels industry-native, <strong>users trust it immediately</strong>. They 
        don&apos;t need extensive onboarding. They recognize the design language and intuitively 
        know how to use it.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        This is the difference between software that <em>works</em> and software that <em>belongs</em>. 
        When an accountant opens BalancingIQ and immediately understands it because it matches 
        QuickBooks patterns — that&apos;s industry-native design. When healthcare workers see audit 
        trails and think &quot;these developers understand HIPAA&quot; — that&apos;s industry-native 
        design.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">How to Get Started</h2>

      <ol className="mt-4 list-decimal list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li><strong>Inventory incumbent tools</strong> — List the 5-10 most-used tools in your industry</li>
        <li><strong>Use them yourself</strong> — Sign up, watch tutorials, complete real workflows</li>
        <li><strong>Talk to power users</strong> — Understand their mental models</li>
        <li><strong>Document design language</strong> — Terminology, visual patterns, workflow sequences</li>
        <li><strong>Design within constraints first</strong> — Match patterns, then innovate selectively</li>
        <li><strong>Test with professionals</strong> — Show prototypes early, watch reactions</li>
      </ol>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        The goal isn&apos;t copying. It&apos;s <strong>earning the right to innovate</strong> by 
        proving you understand the industry deeply enough to speak its language.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Conclusion</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Most software fails not because of bad technology, but because it feels foreign. It doesn&apos;t 
        respect users&apos; mental models, workflows, or terminology.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Industry-native design means building software that feels like it was made <em>by</em> 
        industry experts <em>for</em> industry experts. Study tools that exist, understand why they 
        work the way they do, and design software that feels like it belongs.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I&apos;ve built software for insurance, finance, education, healthcare, and legal industries. 
        Every time, the biggest competitive advantage wasn&apos;t better technology — it was 
        <strong> designing software that spoke the language of the industry</strong>.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        That&apos;s what makes software feel like it belongs.
      </p>

      <div className="mt-10 p-6 rounded-2xl border border-black/10 dark:border-white/20 bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-indigo-950/30 dark:to-emerald-950/30">
        <p className="text-sm opacity-90">
          <strong>Building software for a specific industry?</strong> I&apos;ve designed 
          industry-native products for finance, healthcare, education, and legal sectors. 
          If you&apos;re working on domain-specific software, reach out at{' '}
          <a href="mailto:adamdugan6@gmail.com" className="underline underline-offset-2">
            adamdugan6@gmail.com
          </a>
        </p>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/blog"
          className="text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
        >
          ← Back to blog
        </Link>
      </div>
    </main>
  );
}