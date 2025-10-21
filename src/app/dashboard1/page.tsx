import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 [background:radial-gradient(60rem_60rem_at_top,rgba(99,102,241,0.08),transparent_60%)]"
      />
      <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/70 backdrop-blur">
        <nav className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
          <Link href="#home" className="text-sm font-semibold tracking-tight">
            Your Name
          </Link>
          <ul className="hidden items-center gap-6 text-sm text-foreground/80 sm:flex">
            <li><a href="#projects" className="hover:text-foreground">Projects</a></li>
            <li><a href="#about" className="hover:text-foreground">About</a></li>
            <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
          </ul>
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              className="rounded-md border border-black/10 px-3 py-2 text-sm hover:bg-black/[.04] dark:border-white/10 dark:hover:bg-white/[.06]"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              Get in touch
            </a>
          </div>
        </nav>
      </header>

      <main id="home" className="mx-auto max-w-screen-xl px-4">
        {/* Hero */}
        <section className="relative isolate flex flex-col items-center gap-8 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-foreground/60">
              Software Engineer
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              I design and build reliable, performant web experiences.
            </h1>
            <p className="mt-4 text-pretty text-base text-foreground/70 sm:text-lg">
              Specializing in modern React, Next.js, and cloud-first architectures.
              Focused on usability, accessibility, and measurable impact.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#projects"
                className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[.04] dark:border-white/10 dark:hover:bg-white/[.06]"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid w-full max-w-3xl grid-cols-3 gap-4">
            <div className="rounded-lg border border-black/5 p-4 text-center dark:border-white/10">
              <div className="text-2xl font-semibold">5+</div>
              <div className="text-xs text-foreground/60">Years</div>
            </div>
            <div className="rounded-lg border border-black/5 p-4 text-center dark:border-white/10">
              <div className="text-2xl font-semibold">20+</div>
              <div className="text-xs text-foreground/60">Projects</div>
            </div>
            <div className="rounded-lg border border-black/5 p-4 text-center dark:border-white/10">
              <div className="text-2xl font-semibold">100%</div>
              <div className="text-xs text-foreground/60">Quality</div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-12 sm:py-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold sm:text-2xl">Selected work</h2>
            <Link href="#" className="text-sm text-foreground/70 hover:text-foreground">
              See all →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="group rounded-xl border border-black/5 p-5 transition-colors hover:bg-black/[.03] dark:border-white/10 dark:hover:bg-white/[.03]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-medium">Project {i}</h3>
                  <span className="text-xs text-foreground/60">202{2 + i}</span>
                </div>
                <p className="text-sm text-foreground/70">
                  A concise description of the project, the problem it solves, and
                  the outcome or measurable impact.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-md bg-black/[.05] px-2 py-1 text-[11px] dark:bg-white/[.08]">
                    Next.js
                  </span>
                  <span className="rounded-md bg-black/[.05] px-2 py-1 text-[11px] dark:bg-white/[.08]">
                    TypeScript
                  </span>
                  <span className="rounded-md bg-black/[.05] px-2 py-1 text-[11px] dark:bg-white/[.08]">
                    AWS
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-4 text-sm">
                  <Link href="#" className="text-foreground hover:underline">
                    Case study
                  </Link>
                  <Link href="#" className="text-foreground/70 hover:text-foreground">
                    Live →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold sm:text-2xl">About</h2>
            <p className="mt-3 text-foreground/70">
              I’m a software engineer focused on building high-quality user
              experiences. I enjoy collaborating across design and engineering to
              ship meaningful features quickly, with an eye on performance,
              maintainability, and accessibility.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node", "AWS", "Postgres"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-black/10 px-2 py-1 text-[11px] dark:border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold sm:text-2xl">Contact</h2>
            <p className="mt-3 text-foreground/70">
              Interested in working together? I’m open to freelance and full-time
              opportunities.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="mailto:you@example.com"
                className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
              >
                Email me
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[.04] dark:border-white/10 dark:hover:bg-white/[.06]"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-black/10 px-4 py-2 text-sm hover:bg-black/[.04] dark:border-white/10 dark:hover:bg-white/[.06]"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 py-8 text-center text-sm text-foreground/60 dark:border-white/10">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </div>
  );
}