// src/app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cpu,
  Code2,
  ShieldCheck,
  Cloud,
  Sparkles,
  Globe,
  Cog,
  Blocks,
} from "lucide-react";

const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`mx-auto w-full max-w-7xl px-6 sm:px-8 ${className}`}
  >
    {children}
  </section>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </div>
);

export default function Page() {
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: "BalancingIQ",
      desc: "AI-powered financial advisory platform for SMBs — automates Xero/QBO data ingestion, generates KPI packs, and delivers actionable insights.",
      img: "/projects/balancingiq.png",
      href: "https://mybalancingiq.com",
      tags: ["Next.js", "AWS", "Xero/QBO", "LLM"],
    },
    {
      title: "SOA Assist Pro",
      desc: "End-to-end Medicare compliance automation — manages SOA forms, maintains audit trails, and streamlines agent scheduling.",
      img: "/projects/soa.png",
      href: "https://soaassistpro.com/",
      tags: ["Python", "Azure", "HIPAA", "TTS"],
    },
    {
      title: "Language Lab",
      desc: "Reached Top 3 Worldwide: Language Learning Tool on Meta Quest Store. Immersive education platform simulating real-world language learning environments, engaging thousands of users globally.",
      img: "/projects/languagelab.png",
      href: "https://www.languagelabvr.com/",
      tags: ["Unity", "C#", "Photon", "Oculus"],
    },
    {
      title: "Court Case Filing Automation",
      desc: "Desktop automation tool that analyzes case data and generates filing plans, cost estimates, and submission workflows.",
      img: "/projects/courtfiler.png",
      href: "#",
      tags: ["Python", "Selenium", "Tkinter", "Executable"],
    },
    {
      title: "Handyman AI",
      desc: "AI-driven service that analyzes images to produce detailed repair plans, material lists, and cost breakdowns.",
      img: "/projects/handyman.png",
      href: "https://www.handymanllm.com/",
      tags: ["Python", "LLM", "Image Analysis", "Prompt Engineering"],
    },
    /*{
      title: "AI Administrative Assistant",
      desc: "AI-driven administrative assistant that can perform a wide range of tasks, such as scheduling appointments, sending emails, taking phones calls, and more.",
      img: "/projects/aiadmin.png",
      href: "https://www.aiadmin.com/",
      tags: ["Python", "LLM", "Twilio", "Prompt Engineering", "TTS/STT"],
    },*/
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,.25),transparent),radial-gradient(60%_50%_at_100%_0%,rgba(34,197,94,.20),transparent)] dark:bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,.12),transparent),radial-gradient(60%_50%_at_100%_0%,rgba(34,197,94,.12),transparent)] text-foreground">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-40 w-full border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
        <Section className="flex h-16 items-center justify-between">
          <Link href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-emerald-400 to-cyan-400 text-white shadow">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>Adam Dugan</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="opacity-80 hover:opacity-100">
              Projects
            </a>
            <a href="#experience" className="opacity-80 hover:opacity-100">
              Experience
            </a>
            <a href="#skills" className="opacity-80 hover:opacity-100">
              Skills
            </a>
            <a href="#contact" className="opacity-80 hover:opacity-100">
              Contact
            </a>
            <Link
              href="/AdamDugan_Resume.pdf"
              className="rounded-xl border border-black/5 dark:border-white/10 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Résumé
            </Link>
          </nav>

          <div className="flex md:hidden">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-black/5 dark:border-white/10 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Mail className="h-4 w-4" /> <span>Contact</span>
            </a>
          </div>
        </Section>
      </header>

      {/* Hero */}
      <Section className="pt-14 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Building secure, intelligent software solutions.</h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/70">
              I design and deliver automation-driven products end-to-end — from <strong> Python</strong>-based <strong>AI</strong>,
              <strong> Rust</strong> backend systems, and data services, to <strong>AWS</strong>{" "}cloud infrastructures and
              <strong> Next.js</strong> front-ends. My work includes <em>BalancingIQ</em> {" "}
              (AI-powered financial advisory platform), <em>SOA Assist Pro</em> (Medicare compliance automation suite), automated court case filing,
              and immersive Unity experiences.
            </p>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/70">
              Co-founded and lead the engineering team at Language Lab, a top performing VR language education platform that was successfully acquired in 2025.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-white bg-black dark:bg-white dark:text-black hover:opacity-90 shadow"
              >
                View projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:adamdugan6@gmail.com"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/20 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> Let’s talk
              </a>
              <a
                href="https://github.com/adamofeden"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/20 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/adam-dugan-918722217/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/20 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-indigo-500/20 via-sky-300/10 to-emerald-300/10">
              {/* <Image src="/portrait.jpg" alt="Adam Dugan" fill className="object-cover mix-blend-luminosity" priority /> */}
              <Image src="/portrait.jpg" alt="Adam Dugan" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-white/10 dark:from-black/30" />
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {[
            { icon: <Cloud className="h-4 w-4" />, label: "AWS Amplify, CDK, Lambda" },
            { icon: <Code2 className="h-4 w-4" />, label: "Next.js, React, TypeScript" },
            { icon: <Cpu className="h-4 w-4" />, label: "Python, Rust, Data, AI" },
            { icon: <ShieldCheck className="h-4 w-4" />, label: "Security: KMS, SSE-KMS, OAuth, Compliance" },
          ].map((s, i) => (
            <Card key={i} className="flex items-center gap-2 py-3">
              {s.icon}
              <span className="opacity-80">{s.label}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" className="py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Selected Projects</h2>
            <p className="mt-2 text-black/70 dark:text-white/70">Real-world software solutions delivering measurable impact across cloud, AI, and user experience.</p>
          </div>
          <Link href="https://github.com/adamofeden" target="_blank" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
            View all <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleProjects.map((p) => (
            <motion.a
              key={p.title}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-0 overflow-hidden">
                <div className="relative aspect-[16/10] rounded-xl ring-1 ring-black/10 dark:ring-white/20 overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60 mb-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-black/10 dark:border-white/20 px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm opacity-80">{p.desc}</p>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/20 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
            >
              {showAll ? "Show less" : "Show more"}
            </button>
          </div>
        )}

        {/*<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            {
              title: "BalancingIQ",
              desc: "AI-powered financial advisory platform for SMBs — automates Xero/QBO data ingestion, generates KPI packs, and delivers actionable insights.",
              img: "/projects/balancingiq.png",
              href: "https://mybalancingiq.com",
              tags: ["Next.js", "AWS", "Xero/QBO", "LLM"],
            },
            {
              title: "SOA Assist Pro",
              desc: "End-to-end Medicare compliance automation — manages SOA forms, maintains audit trails, and streamlines agent scheduling.",
              img: "/projects/soa.png",
              href: "https://soaassistpro.com/",
              tags: ["Python", "Azure", "HIPAA", "TTS"],
            },
            {
              title: "Language Lab",
              desc: "Reached Top 3 Worldwide: Language Learning Tool on Meta Quest Store. Immersive education platform simulating real-world language learning environments, engaging thousands of users globally.",
              img: "/projects/languagelab.png",
              href: "https://www.languagelabvr.com/",
              tags: ["Unity", "C#", "Photon", "Oculus"],
            },
            {
              title: "Court Case Filing Automation",
              desc: "Desktop automation tool that analyzes case data and generates filing plans, cost estimates, and submission workflows.",
              img: "/projects/courtfiler.png",
              href: "#",
              tags: ["Python", "Selenium", "Tkinter", "Executable"],
            },
            {
              title: "Handyman AI",
              desc: "AI-driven service that analyzes images to produce detailed repair plans, material lists, and cost breakdowns.",
              img: "/projects/handyman.png",
              href: "https://www.handymanllm.com/",
              tags: ["Python", "LLM", "Image Analysis", "Prompt Engineering"],
            },
          ].map((p) => (
            <motion.a
              key={p.title}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-0 overflow-hidden">
                <div className="relative aspect-[16/10] rounded-xl ring-1 ring-black/10 dark:ring-white/20 overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-black/60 dark:text-white/60 mb-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-black/10 dark:border-white/20 px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm opacity-80">{p.desc}</p>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>*/}
      </Section>

      {/* Experience */}
      <Section id="experience" className="py-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Experience</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              company: "Versytech",
              role: "Founder & Full-Stack Engineer",
              period: "2023 — Present",
              points: [
                "Architected and deployed multi-tenant SaaS on AWS (Amplify Gen2, CDK, Lambda, DynamoDB, S3, KMS).",
                "Developed encrypted Xero/QBO integrations, KPI pipelines, and REST APIs powering BalancingIQ.",
                "Built secure bookkeeping integrations with Xero/QBO OAuth and encrypted token storage.",
                "Shipped BalancingIQ and SOA Assist Pro — led full lifecycle from architecture to UX and GTM.",
                "Shipped SOA Assist Pro, automating compliance workflows and reducing form processing time by 90%.",
                "Designed secure deployment pipelines with GitHub Actions and CI/CD automation.",
                "Built voice-enabled AI assistants using Twilio, OpenAI, and Azure Speech.",
              ],
            },
            {
              company: "Intelimmerse LLC",
              role: "Software Engineer",
              period: "2024 — Present",
              points: [
                "Automated back-office operations using Azure and Python",
                "Created real-time conversational AI bots leveraging OpenAI, ElevenLabs, and Unity.",
                "Worked directly with Metality Lab leadership to prioritize roadmaps and ship on schedule.",
                "Converted a large-scale project from WebGL and WebXR to Android. ",
                "Owned Android/Quest delivery: APK/OBB packaging, SideQuest distribution, and tester sideloading flows.",
                "Implemented UI/UX and scene orchestration for inteliMuseum edutainment modules.",
              ],
            },
            {
              company: "Language Lab (Acquired)",
              role: "Co-Founder & Lead Engineer",
              period: "2020 — 2024",
              points: [
                "Designed engaging experiences using Unity, C#, Photon networking, custom shaders, and performance optimization.",
                "Created a recursive C# algorithm generating 1,000+ hours of adaptive learning content.",
                "Delivered user-centric interfaces, economy systems, and analytics pipelines for live Quest titles.",
                "Deployed secure APIs on Azure for dynamic content delivery.",
              ],
            },
            {
              company: "Stargrazer Studios",
              role: "Unity/C# Developer",
              period: "2019 — 2020",
              points: [
                "Used C# and Unity to create a medieval Robin Hood style game for Oculus Quest 1 and 2.",
                "Built dynamic NPC AI Systems using NavMesh, raycasting and state machines.",
                "Used Unity Profiler, occlusion culling, and light baking to improve performance on standalone devices’ slow computation speed.",
                "Used Unity’s XR Interaction Toolkit with AutoHand to create an immersive experience within the virtual world.",
                "Completed the project from start to finish within a 6-month period."
              ]
            },
            {
              company: "Dualmind",
              role: "Software Engineer",
              period: "2018",
              points: [
                "Developed and maintained web applications using Python, SQL, and Django.",
                "Worked on a team of 3 to build a teaching aid web application.",
                "The application was a web-based system designed to assist teachers in grading and understanding student performance.",
              ],
            },
          ].map((e) => (
            <Card key={e.company}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <p className="opacity-80">{e.company}</p>
                </div>
                <span className="text-sm opacity-70">{e.period}</span>
              </div>
              <ul className="mt-4 list-disc list-inside space-y-1 text-sm opacity-90">
                {e.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" className="py-1">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Skills</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: <Code2 className="h-4 w-4" />, label: "Full-Stack Development" },
            { icon: <Cloud className="h-4 w-4" />, label: "Cloud Architecture" },
            { icon: <Cog className="h-4 w-4" />, label: "Secure Automation" },
            { icon: <Cpu className="h-4 w-4" />, label: "AI Integration" },
            { icon: <ShieldCheck className="h-4 w-4" />, label: "Security & Compliance" },
          ].map((s, i) => (
            <Card key={i} className="flex items-center gap-2 py-3">
              {s.icon}
              <span className="opacity-80">{s.label}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" className="py-1">
        {/*<h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Skills</h2>*/}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Code2 className="h-4 w-4" />,
              title: "Languages",
              items: ["Python", "Rust", "C#", "TypeScript", "JavaScript", "HTML/CSS"],
            },
            {
              icon: <Blocks className="h-4 w-4" />,
              title: "Frameworks",
              items: ["Next.js", "React", "Unity"],
            },
            {
              icon: <Cloud className="h-4 w-4" />,
              title: "Cloud & DevOps",
              items: ["AWS Amplify", "AWS CDK", "Lambda", "DynamoDB", "S3", "Azure"],
            },
            {
              icon: <Sparkles className="h-4 w-4" />,
              title: "AI & Data",
              items: ["OpenAI", "LLMs", "Pandas", "NumPy", "ElevenLabs", "TTS/STT"],
            },
            {
              icon: <ShieldCheck className="h-4 w-4" />,
              title: "Security & Compliance",
              items: ["KMS", "SSE-KMS", "OAuth2", "HIPAA", "GDPR"],
            },
            {
              icon: <Globe className="h-4 w-4" />,
              title: "Workflows",
              items: ["GitHub Actions", "CI/CD", "RESTful APIs", "IaC"],
            },
          ].map((cat) => (
            <Card key={cat.title}>
              <div className="flex items-center gap-2">
                {cat.icon}
                <h3 className="text-base font-semibold tracking-tight">{cat.title}</h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/10 dark:border-white/20 bg-white/50 dark:bg-black/30 px-2.5 py-1 text-xs opacity-80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Let’s build something.</h2>
            <p className="mt-2 text-black/70 dark:text-white/70">Open to consulting, collaborations, or full-stack product development opportunities. I typically respond within 24 hours.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:adamdugan6@gmail.com"
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-white bg-black dark:bg-white dark:text-black hover:opacity-90 shadow"
              >
                <Mail className="h-4 w-4" /> Email me
              </a>
              <a
                href="https://www.linkedin.com/in/adam-dugan-918722217/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/20 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/adamofeden"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/20 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
          <Card>
            <form action="https://formspree.io/f/xovkzbkj" method="POST" className="space-y-3">
              <div>
                <label className="text-sm opacity-80" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="text-sm opacity-80" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="text-sm opacity-80" htmlFor="msg">
                  Message
                </label>
                <textarea
                  id="msg"
                  name="message"
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-white bg-black dark:bg-white dark:text-black hover:opacity-90 shadow">
                Send <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs opacity-70">This form posts to Formspree; replace with your API route if needed.</p>
            </form>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="mt-20 border-t border-black/5 dark:border-white/10 py-10">
        <Section className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70">© {new Date().getFullYear()} Adam Dugan. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm opacity-80">
            <a href="/privacy" className="hover:opacity-100">
              Privacy
            </a>
            <a href="/terms" className="hover:opacity-100">
              Terms
            </a>
          </div>
        </Section>
      </footer>
    </div>
  );
}
