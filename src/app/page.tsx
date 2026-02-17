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
  //ExternalLink,
  Cpu,
  Code2,
  ShieldCheck,
  Cloud,
  Sparkles,
  Globe,
  Cog,
  Blocks,
  Cuboid,
} from "lucide-react";

import Chatbot from "@/components/Chatbot";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);

  const projects = [
    {
      title: "MyBalancingIQ",
      desc: "AI-powered financial advisory platform for SMBs, automates Xero/QBO data ingestion, generates KPI packs, and delivers actionable insights.",
      img: "/projects/balancingiq.png",
      href: "https://mybalancingiq.com",
      tags: ["Next.js", "AWS", "Xero/QBO", "LLM"],
    },
    {
      title: "SOA Assist Pro",
      desc: "End-to-end Medicare compliance automation, manages SOA forms, maintains audit trails, and streamlines agent scheduling.",
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
    {
      title: "AI Administrative Assistant",
      desc: "AI-driven administrative assistant that can perform a wide range of tasks, such as scheduling appointments, sending emails, taking phones calls, and more.",
      img: "/projects/aiadmin.png",
      href: "#",
      //href: "https://www.aiadmin.com/",
      tags: ["Python", "LLM", "Twilio", "Prompt Engineering", "TTS/STT"],
    },
  ];
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  const experiences = [
    {
      company: "Versytech",
      role: "Automation Engineer",
      period: "2023 -- Present",
      points: [
        "Built AI-powered financial advisory platform: used python and typescript to automate bookkeeping ingestion with Oauth2, QuickBooks/Xero, and implemented live LLM driven insights, GDPR compliant (MyBalancingIQ).",
        "Used Python to engineer data condensing, cleaning, and transformation workflows for AI ready data ingestion.",
        "Automated Medicare compliance workflows: reduced form processing time by 90% with HIPAA-compliant CRM and encrypted document handling (SOA Assist Pro: Python, Next.js, TypeScript).",
        "Automated deployment pipelines with GitHub Actions and YAML-based CI/CD, reducing deployment time from hours to minutes.",
        "Implemented Stripe payment processing with NoSQL database subscription management.",
        "Architected multi-tenant SaaS infrastructure on AWS with CDK-based IaC, Lambda functions, DynamoDB, S3, and KMS encryption.",
        "Developed voice-enabled AI assistant, automating customer service workflows with OpenAI + Twilio integration and Azure Speech Services.",
        "Engineered Python automation solution: court case filing workflows using Python, Selenium, and Tkinter.",
      ],
    },
    {
      company: "Intelimmerse LLC",
      role: "Software Engineer",
      period: "2024 -- Present (Contract)",
      points: [
        "Automated back-office operations: reduced manual processing time by 60% using Python and Azure Serverless Functions.",
        "Developed real-time conversational AI avatars for VR experiences with OpenAI, ElevenLabs text-to-speech, and Unity character controllers.",
        "Built avatar generation web app by converting user photos to realistic 3D digital avatars using Azure Functions and Azure Blob Storage.",
        "Led Android/Quest port of a large-scale WebXR project: reduced app size by 70% with APK/OBB packaging, Addressables, SideQuest distribution, and optimized performance for mobile VR hardware.",
        "Designed adaptive UI systems and multi-user networking for educational VR modules using Photon networking, responsive layouts, and session management.",
      ],
    },
    {
      company: "Language Lab (Acquired)",
      role: "Co-Founder & Lead Engineer",
      period: "2020 -- 2024",
      points: [
        "Co-founded and lead engineering team at Language Lab, a language education app (top 3 on the Meta Quest Store), reached hundreds of thousands of users across 100+ countries, successfully acquired in 2025.",
        "Automated content generation with recursive C# algorithms, produced 1,000+ hours of adaptive, procedurally-generated learning scenarios.",
        "Built scalable backend infrastructure on Azure, PlayFab integration for analytics, real-time leaderboards, in-app purchases, and user progression tracking.",
        "Managed international development team of 10 developers and over 30 translators through product lifecycle, live operations, feature releases, content updates, and platform migrations.",
      ],
    },
    {
      company: "Stargrazer Studios",
      role: "Unity/C# Developer",
      period: "2019 -- 2020",
      points: [
        "Developed medieval VR combat game for Oculus Quest from concept to production in 6 months.",
        "Engineered dynamic NPC AI systems, NavMesh pathfinding, state machines, raycasting-based decision trees for realistic enemy behaviors.",
        "Optimized VR performance for standalone hardware, maintained 72 FPS on Quest through Unity Profiler analysis, occlusion culling, and lightmap baking.",
        "Implemented immersive VR mechanics using XR Interaction Toolkit and AutoHand, physics-based interactions, grabbing, throwing, archery systems.",
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
    {
      company: "The Shuler Group INC",
      //role: "Fabrication Engineer & CAD Designer",
      role: "Manufacturing Engineer & CAD Designer",
      period: "2014 -- 2016",
      points: [
        "Designed and manufactured custom surfboards using CAD software and CNC/CAD-driven shaping systems.",
        "Engineered and maintained electrical hot-wire foam cutting systems for precision shaping and repeatability.",
        "Translated digital designs into physical products, managing tolerances, materials, and manufacturing constraints.",
        "Built and iterated on custom tooling, jigs, and fabrication workflows to improve accuracy and efficiency.",
        "Worked hands-on across the full production lifecycle: design, prototyping, fabrication, finishing, and QA.",
        "Developed a strong foundation in systems thinking, applied engineering, and design-for-manufacturing principles."
      ],
    }
  ];
  const visibleExperiences = showAllExperience ? experiences : experiences.slice(0, 2);

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

          {/* Desktop menu */}
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
            <a href="/blog" className="opacity-80 hover:opacity-100">
              Blog
            </a>
            <a href="#contact" className="opacity-80 hover:opacity-100">
              Contact
            </a>
            <Link
              href="/adam_dugan_resume.pdf"
              className="rounded-xl border border-black/5 dark:border-white/10 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10"
            >
              Résumé
            </Link>
          </nav>

          {/* Mobile menu */}
          {/*<div className="flex md:hidden">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-black/5 dark:border-white/10 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10"
            >
              <Mail className="h-4 w-4" /> <span>Contact</span>
            </a>
          </div>*/}
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </Section>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/5 dark:border-white/10 bg-white/95 dark:bg-neutral-950/95 backdrop-blur">
            <Section className="py-4">
              <nav className="flex flex-col gap-3">
                <a
                  href="#projects"
                  className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#experience"
                  className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Experience
                </a>
                <a
                  href="#skills"
                  className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skills
                </a>
                <a
                  href="/blog"
                  className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </a>
                <a
                  href="#contact"
                  className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <Link
                  href="/adam_dugan_resume.pdf"
                  className="px-3 py-2 rounded-lg border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 text-center"
                >
                  Résumé
                </Link>
              </nav>
            </Section>
          </div>
        )}
      </header>

      {/* Hero */}
      <Section className="pt-14 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Automating complex workflows</h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-black/70 dark:text-white/70">
              I specialize in automating complex workflows across education, healthcare, finance, and legal sectors. 
              My work includes Medicare compliance processing (SOA Assist Pro: Python, Next.js), 
              AI-powered financial analysis platforms (MyBalancingIQ: Python, TypeScript), Python-based automation systems for 
              legal case filing, and voice-enabled AI assistants, all built on secure, HIPAA/GDPR-compliant 
              AWS and Azure architectures.
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

      {/* About Me - Personal Story */}
      <Section id="about" className="py-20">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">About Me</h2>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: The Journalism Journey */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">Stories Before Code</h3>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              Before I wrote my first line of code, I was chasing stories around the 
              world as an independent journalist. I spent 15 months in New Zealand, a year 
              in Australia, six months across Asia, and a year in Turkey, learning 
              to listen, ask questions, and understand different perspectives. That 
              curiosity about how people think and what they need became the foundation 
              for how I approach software today.
            </p>
          </Card>
          
          {/* Card 2: Manufacturing to Tech */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">From Surfboards to Software</h3>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              My path into tech started in a workshop at The Shuler Group, where I 
              designed and manufactured custom surfboards using CAD and CNC systems. 
              The precision required to turn digital designs into physical products, 
              managing tolerances, materials, and constraints taught me systems 
              thinking that translates directly to software architecture.
            </p>
          </Card>
          
          {/* Card 3: Entrepreneurial Journey */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">Building Language Lab</h3>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              In 2020, I co-founded Language Lab, combining my passion for language, 
              travel, and technology. We built a VR language learning platform that 
              reached Top 3 worldwide on the Meta Quest Store, engaging thousands of 
              users globally. The successful acquisition in 2025 was validation that 
              understanding users deeply, a skill honed through journalism, creates 
              products that resonate.
            </p>
          </Card>
          
          {/* Card 4: What Drives Me */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">What Drives Me Today</h3>
            <p className="text-black/70 dark:text-white/70 leading-relaxed">
              I build software that solves real problems, whether it&apos;s automating 
              compliance for healthcare, democratizing financial insights for small 
              businesses, or creating immersive educational experiences. My background 
              in storytelling, manufacturing, and international experience gives me a 
              unique lens: technology isn&apos;t just about elegant code, it&apos;s about 
              understanding people and creating meaningful impact.
            </p>
          </Card>
          
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" className="py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Products & Platforms</h2>
            {/*<p className="mt-2 text-black/70 dark:text-white/70">Real-world software solutions delivering measurable impact across cloud, AI, and user experience.</p>*/}
          </div>
          {/*<Link href="https://github.com/adamofeden" target="_blank" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
            View all <ExternalLink className="h-4 w-4" />
          </Link>*/}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleProjects.map((p) => (
            <motion.a
              key={p.title}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="group h-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-0 overflow-hidden h-full">
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
      </Section>

      {/* Experience */}
      <Section id="experience" className="py-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Experience</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleExperiences.map((e) => (
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
        {experiences.length > 2 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setShowAllExperience((v) => !v)}
              className="inline-flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/20 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
            >
              {showAllExperience ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </Section>

      {/* Skills */}
      <Section id="skills" className="py-1">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Skills</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: <Globe className="h-4 w-4" />, label: "Process Automation" },
            { icon: <Cpu className="h-4 w-4" />, label: "AI Integration" },
            { icon: <Cloud className="h-4 w-4" />, label: "Cloud Architecture" },
            { icon: <ShieldCheck className="h-4 w-4" />, label: "Security & Compliance" },
            { icon: <Code2 className="h-4 w-4" />, label: "Full-Stack Development" },
            { icon: <Cuboid className="h-4 w-4" />, label: "Manufacturing & CAD" },
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
          {/* Chatbot Widget */}
          <Chatbot />
        </Section>
      </footer>
    </div>
  );
}
