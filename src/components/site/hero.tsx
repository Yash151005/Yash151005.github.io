"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile, projectCount } from "@/lib/data";
import { ArrowUpRight, EASE } from "./primitives";

const stats = [
  { value: `${projectCount}`, label: "Projects built" },
  { value: "2", label: "IEEE publications" },
  { value: "1st", label: "AIForge Hackathon" },
  { value: "Top 10%", label: "Mumbai Hacks (5,500+)" },
];

const focus = ["Agentic AI & RAG", "Machine Learning", "Computer Vision", "Data Pipelines", "Responsible AI"];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-8 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <motion.div
              {...fade(0)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/80 px-3 py-1 text-xs text-dim"
            >
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-green-400" />
              Open to AI/ML & Data Science roles
            </motion.div>

            <motion.h1 {...fade(0.08)} className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Yash Pakale
            </motion.h1>
            <motion.p {...fade(0.14)} className="mt-2 text-xl font-medium md:text-2xl">
              <span className="text-gradient">{profile.role}</span>
            </motion.p>

            <motion.p {...fade(0.2)} className="mt-5 max-w-xl text-base leading-relaxed text-dim">
              I build agentic AI, RAG systems and machine learning pipelines, taking them from raw data to products people
              use. Two IEEE papers, an industry project with Rubiscape, and a B.Tech in AI & Data Science at VIIT Pune.
            </motion.p>

            <motion.ul {...fade(0.26)} className="mt-6 flex flex-wrap gap-2">
              {focus.map((f) => (
                <li key={f} className="rounded-full border border-line px-3 py-1 text-xs text-paper/80">
                  {f}
                </li>
              ))}
            </motion.ul>

            <motion.div {...fade(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg bg-paper px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                View projects
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-paper transition-colors hover:border-signal/60"
              >
                Résumé
                <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-dim transition-colors hover:text-paper"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-lg border border-line text-dim transition-colors hover:text-paper"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div {...fade(0.2)} className="hidden md:block">
            <div className="relative h-72 w-60 overflow-hidden rounded-2xl border border-line">
              <Image
                src="/me.jpeg"
                alt="Portrait of Yash Pakale"
                fill
                sizes="240px"
                unoptimized
                priority
                className="object-cover"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-lg border border-white/10 bg-ink/70 px-3 py-2 text-xs backdrop-blur-md">
                <div className="font-medium">{profile.location}</div>
                <div className="text-dim">B.Tech AI & DS · VIIT</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.ul {...fade(0.4)} className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="card px-5 py-4">
              <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
              <div className="mt-1 text-xs text-dim">{s.label}</div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
