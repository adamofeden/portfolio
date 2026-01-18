// src/app/blog/journalism-to-code/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "From Journalism to Code: Why Non-Traditional Backgrounds Make Better Engineers — Adam Dugan",
  description:
    "Most engineers start with CS degrees. I started by interviewing strangers in Istanbul cafes. Here's why non-traditional paths create more empathetic, user-focused engineers who build products people actually want.",
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
        From Journalism to Code: Why Non-Traditional Backgrounds Make Better Engineers
      </h1>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I didn&apos;t write my first line of code until my late twenties. Before that, I was a journalist 
        chasing stories across four continents, a manufacturing engineer building custom surfboards, 
        and someone who thought &quot;API&quot; was a typo.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Today, I build AI-powered systems, architect cloud infrastructure, and run a software company. 
        And here&apos;s what I&apos;ve learned: <strong>My &quot;unconventional&quot; path wasn&apos;t a detour — it was the 
        foundation.</strong>
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        The skills I developed as a journalist, traveler, and manufacturing engineer translate 
        directly into building better software. And I think the tech industry needs more people 
        who took the scenic route.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The Journalism Years: Learning to Ask the Right Questions</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Before I ever opened VS Code, I spent years as an independent journalist traveling the world. 
        Fifteen months in New Zealand. A year in Australia. Six months across Asia. A year in Turkey. 
        My job was simple: talk to people, understand their stories, and communicate them clearly.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I didn&apos;t realize it at the time, but I was learning the most important skill in software 
        engineering: <strong>how to ask the right questions.</strong>
      </p>

      <h3 className="mt-8 text-xl font-semibold">What Journalism Taught Me About Engineering</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>1. Start with "Why?"</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Good journalism isn&apos;t about what happened — it&apos;s about why it matters. The same is true 
        in software. Before I write any code, I ask: Why does this feature exist? Why does the 
        user need this? Why now?
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Most engineers jump straight to &quot;How do I build this?&quot; But if you don&apos;t understand the 
        &quot;why,&quot; you&apos;re solving the wrong problem.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>2. Empathy Through Listening</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        As a journalist, I learned to shut up and listen. Really listen. Not &quot;waiting for my turn 
        to talk&quot; listening, but &quot;trying to understand how this person sees the world&quot; listening.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        That skill translates directly to user research. When I talk to customers about 
        <em> BalancingIQ</em> or <em>SOA Assist Pro</em>, I&apos;m not pitching features — I&apos;m listening 
        for pain points, frustrations, and workflows. The best product ideas come from what users 
        <em>don&apos;t</em> say out loud.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>3. Clarity Over Cleverness</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        In journalism, the goal isn&apos;t to impress readers with your vocabulary — it&apos;s to communicate 
        clearly. Complex ideas need simple language.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        The same applies to code. The best code isn&apos;t the cleverest one-liner or the most abstract 
        architecture. It&apos;s code that another human can read six months later and understand immediately. 
        Documentation, variable names, API design — it&apos;s all about communication.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>4. Storytelling Matters</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Whether you&apos;re pitching to investors, onboarding a customer, or explaining a technical 
        decision to your team, you&apos;re telling a story. Engineers who can&apos;t explain <em>why</em> their 
        solution matters struggle to get buy-in.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Journalism taught me to frame technical work in human terms. Not "We implemented a Lambda-based 
        event-driven architecture&quot; — but &quot;Now when a customer uploads their financial data, it processes 
        in the background so they don&apos;t have to wait."
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The Manufacturing Years: Systems Thinking Before Systems Architecture</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        After journalism, I spent two years at The Shuler Group designing and manufacturing custom 
        surfboards. CAD software, CNC machines, hot-wire foam cutting systems. My job was to turn 
        digital designs into physical products — managing tolerances, materials, and constraints.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        I didn&apos;t realize it then, but I was learning <strong>systems thinking</strong> — how 
        everything connects, where bottlenecks emerge, and how small decisions compound.
      </p>

      <h3 className="mt-8 text-xl font-semibold">What Manufacturing Taught Me About Software</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>1. Constraints Force Creativity</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        In manufacturing, you can&apos;t just wish away physics. Foam has density limits. CNC machines 
        have precision tolerances. Materials have costs. You work <em>within</em> constraints, not 
        around them.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Software has the same constraints: latency, memory, cost, time. The best engineers don&apos;t 
        fight constraints — they design around them. I learned to ask &quot;What&apos;s actually possible 
        here?&quot; before &quot;What would be ideal?&quot;
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>2. Everything Is a System</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Making a surfboard isn&apos;t just shaping foam — it&apos;s a system. CAD design → CNC routing → 
        hand-shaping → glassing → finishing. Each step affects the next. Miss a tolerance in step 
        one, and step five is impossible.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Software is the same. Data flows through systems. An architectural decision in week one 
        affects scalability in month six. Manufacturing taught me to think in <strong>flows</strong>, 
        not features.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>3. Measure Twice, Cut Once</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        In physical manufacturing, mistakes are expensive. You can&apos;t Ctrl+Z a piece of foam you just 
        cut wrong. So you plan, you measure, you double-check.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Software gives you the illusion of infinite undo. But in production, mistakes are still 
        expensive — they just cost time, trust, and revenue instead of materials. Manufacturing 
        taught me to <strong>think before I ship</strong>, not just ship and iterate blindly.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The International Years: Understanding Users Across Cultures</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Spending years abroad — New Zealand, Australia, Asia, Turkey — fundamentally changed how 
        I think about users. Not &quot;the user&quot; as an abstract persona, but <em>actual humans</em> with 
        different contexts, assumptions, and mental models.
      </p>

      <h3 className="mt-8 text-xl font-semibold">What Travel Taught Me About Product Design</h3>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>1. Your Assumptions Are Local</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        In New Zealand, I learned that &quot;next week&quot; means genuinely next week, not &quot;maybe in a month.&quot; 
        In Turkey, I learned that tea isn&apos;t a beverage — it&apos;s a social ritual. Context shapes everything.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        The same is true in software. What feels &quot;intuitive&quot; to you is often just familiar <em>to you</em>. 
        Travel taught me to question my assumptions: Does this workflow make sense to someone who&apos;s 
        never used software like this? Does this UI work for someone in a different timezone, on a 
        different device, with a different workflow?
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>2. Humility in the Face of Complexity</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Living abroad is humbling. You don&apos;t speak the language. You don&apos;t understand the customs. 
        You&apos;re constantly a beginner, asking &quot;dumb&quot; questions and learning obvious things.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        That humility is <em>essential</em> in engineering. Every user is coming to your product 
        as a beginner. If you design for experts (yourself), you alienate 90% of potential users. 
        Travel taught me to embrace the beginner&apos;s perspective.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>3. Adaptability Over Perfection</strong>
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        When you&apos;re traveling, nothing goes according to plan. Trains are late. Hostels are full. 
        Plans change. You adapt.
      </p>
      <p className="mt-2 text-black/70 dark:text-white/70 leading-relaxed">
        Building software is the same. Requirements change. APIs break. Users do unexpected things. 
        The engineers who succeed aren&apos;t the ones with perfect plans — they&apos;re the ones who adapt 
        quickly and keep moving forward.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">The &quot;Beginner&apos;s Mind&quot; Advantage</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        When I started learning to code in my late twenties, I was surrounded by people who&apos;d been 
        programming since they were twelve. I felt behind. I <em>was</em> behind, technically.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        But I had something they didn&apos;t: <strong>fresh eyes.</strong>
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        When you learn to code early, you absorb the culture, the assumptions, the &quot;right way&quot; 
        to do things. When you learn later, you question everything. Why is this API so confusing? 
        Why does this error message make no sense? Why does this workflow feel so clunky?
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Those frustrations aren&apos;t weaknesses — they&apos;re insights. Every time I struggled to understand 
        something, I remembered: <strong>If this is hard for me, it&apos;s probably hard for users too.</strong>
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        That beginner&apos;s mind led me to:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>Build simpler UIs (because I know what confusion feels like)</li>
        <li>Write better documentation (because I remember not understanding the docs)</li>
        <li>Design more intuitive workflows (because I&apos;ve been the frustrated user)</li>
        <li>Prioritize user empathy over technical elegance (because I know software is for humans, not compilers)</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Why Tech Needs More Non-Traditional Engineers</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        The tech industry has a monoculture problem. Most engineers follow a similar path: CS degree, 
        internship, junior role, senior role. That path works, and those engineers are great.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        But when <em>everyone</em> takes the same path, you get <em>similar thinking</em>. Similar 
        products. Similar blind spots.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        The industry needs more people who:
      </p>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70 ml-4">
        <li>
          <strong>Understand humans first, code second.</strong> Former teachers, journalists, 
          healthcare workers — they know how to communicate, empathize, and simplify.
        </li>
        <li>
          <strong>Bring domain expertise.</strong> Building fintech? You want someone who understands 
          accounting. Building healthcare tools? You want someone who&apos;s worked in a clinic.
        </li>
        <li>
          <strong>Think in systems, not just features.</strong> Manufacturing, logistics, operations — 
          these fields teach systems thinking that translates directly to software architecture.
        </li>
        <li>
          <strong>Challenge assumptions.</strong> Career switchers ask &quot;Why do we do it this way?&quot; 
          instead of accepting &quot;This is how it&apos;s always been done.&quot;
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">What I&apos;d Tell My Younger Self</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        If I could go back to 2018 — when I was learning Python basics while friends were already 
        senior engineers — here&apos;s what I&apos;d say:
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Your &quot;detour&quot; wasn&apos;t a detour.</strong> The years you spent interviewing people, 
        building physical products, living abroad — those weren&apos;t wasted. They gave you perspective 
        that most engineers never develop.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>You&apos;ll never catch up technically — and that&apos;s okay.</strong> There will always be 
        someone who knows algorithms better, who can code faster, who&apos;s read more books. But there 
        aren&apos;t many engineers who can <em>also</em> interview customers, write documentation that 
        doesn&apos;t suck, and design workflows that normal humans understand.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <strong>Your difference is your advantage.</strong> Don&apos;t try to be like the engineers who 
        started at eighteen. Be the engineer who brings something they can&apos;t: empathy, communication, 
        systems thinking, and a perspective shaped by the real world.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Building Products That Actually Matter</h2>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Today, I build software that solves real problems. <em>BalancingIQ</em> helps small business 
        owners understand their finances. <em>SOA Assist Pro</em> automates Medicare compliance for 
        healthcare workers. <em>Language Lab</em> reached the Top 3 on the Meta Quest Store before 
        being acquired.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        None of these products would exist if I&apos;d taken the traditional path. They exist <em>because</em> 
        I didn&apos;t.
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        <em>BalancingIQ</em> exists because I understand how to talk to non-technical business owners 
        (journalism). <em>SOA Assist Pro</em> exists because I understand regulatory constraints and 
        workflows (manufacturing systems thinking). <em>Language Lab</em> exists because I know what 
        it&apos;s like to struggle with language barriers abroad (travel).
      </p>

      <p className="mt-4 text-black/70 dark:text-white/70 leading-relaxed">
        Your background isn&apos;t baggage. It&apos;s your unfair advantage.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Key Takeaways</h2>
      <ul className="mt-4 list-disc list-inside space-y-2 text-black/70 dark:text-white/70">
        <li>
          <strong>Non-traditional backgrounds aren&apos;t detours</strong> — they&apos;re foundations. The skills 
          you learned in other fields translate directly to better engineering.
        </li>
        <li>
          <strong>Journalism teaches you to ask the right questions,</strong> listen deeply, and 
          communicate clearly — all critical for product development.
        </li>
        <li>
          <strong>Manufacturing teaches systems thinking,</strong> working within constraints, and 
          understanding how everything connects.
        </li>
        <li>
          <strong>International experience teaches cultural awareness,</strong> adaptability, and 
          humility — essential for designing products that work for diverse users.
        </li>
        <li>
          <strong>The &quot;beginner&apos;s mind&quot; is an advantage,</strong> not a weakness. Fresh eyes spot 
          problems that veterans have stopped noticing.
        </li>
        <li>
          <strong>Tech needs more diversity of experience,</strong> not just diversity of demographics. 
          Different paths create different perspectives, which create better products.
        </li>
        <li>
          <strong>Your difference is your advantage.</strong> Don&apos;t try to be like everyone else — 
          lean into what makes you unique.
        </li>
      </ul>

      <div className="mt-12 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur">
        <p className="text-sm text-black/70 dark:text-white/70">
          <strong>Are you a career switcher or someone with a non-traditional background?</strong> I&apos;d 
          love to hear your story and what unique perspective you bring to engineering. Reach out at{" "}
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