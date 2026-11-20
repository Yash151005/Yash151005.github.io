"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { education, profile, publications, recognition, stack } from "@/lib/data";
import { ArrowUpRight, Reveal, Section, Tag } from "./primitives";

export function Research() {
  return (
    <Section id="research" eyebrow="Research" title="Peer-reviewed publications">
      <div className="grid gap-4 md:grid-cols-2">
        {publications.map((p, i) => (
          <Reveal key={p.link} delay={i * 0.06} className="h-full">
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover group flex h-full flex-col p-6"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-signal/15 px-2.5 py-0.5 font-medium text-signal">{p.venue}</span>
                <ArrowUpRight className="h-4 w-4 text-mute transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
              </div>
              <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-snug md:text-lg">{p.title}</h3>
              <p className="mt-auto pt-5 text-xs text-dim">{p.area}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Recognition() {
  return (
    <Section id="recognition" eyebrow="Recognition" title="Awards & certifications">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recognition.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.04}>
            <div className="card flex items-center gap-4 p-4">
              <span className="grid h-11 min-w-11 shrink-0 place-items-center rounded-lg bg-signal/10 px-2 text-sm font-semibold text-signal">
                {r.place}
              </span>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{r.title}</div>
                <div className="truncate text-xs text-dim">{r.org}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Skills & background">
      <div className="grid gap-4 md:grid-cols-5">
        <Reveal className="card p-6 md:col-span-3">
          <p className="leading-relaxed text-paper/85">
            I&apos;m an AI & Data Science undergraduate at VIIT Pune with a diploma in Computer Technology. I build LLM
            agents, RAG systems and ML pipelines, and I focus on work that holds up outside the notebook: clean data,
            sound evaluation and models deployed behind real products. I&apos;m open to internships, collaborations and
            hackathons.
          </p>
          <div className="mt-6 space-y-5">
            {stack.map((g) => (
              <div key={g.label}>
                <div className="mb-2 text-xs font-medium text-dim">{g.label}</div>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Tag key={s} className="text-paper/80">
                      {s}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06} className="card p-6 md:col-span-2">
          <div className="text-xs font-medium text-dim">Education</div>
          <ol className="mt-4 space-y-5 border-l border-line pl-5">
            {education.map((e, i) => (
              <li key={e.title} className="relative">
                <span
                  className={`absolute -left-[25px] top-1.5 h-2 w-2 rounded-full ${
                    i === 0 ? "bg-signal" : "border border-line bg-ink"
                  }`}
                />
                <div className="font-mono text-[11px] text-mute">{e.period}</div>
                <div className="mt-1 text-sm font-medium">{e.title}</div>
                <div className="text-xs text-dim">{e.place}</div>
              </li>
            ))}
          </ol>
          <div className="mt-6 border-t border-line pt-5 text-xs font-medium text-dim">Industry</div>
          <div className="mt-2 text-sm font-medium">Rubiscape</div>
          <div className="text-xs text-dim">DataForge AI, data preparation pipeline</div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-24 md:px-8 md:pt-28">
      <Reveal className="card relative overflow-hidden p-8 md:p-12">
        <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-signal">Contact</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Let&apos;s work together</h2>
            <p className="mt-3 max-w-md text-dim">
              Open to AI/ML engineering and data science internships and full-time roles. I usually reply within a day.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-paper px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                {profile.email}
              </a>
              <button
                onClick={copy}
                className="rounded-lg border border-line px-3 py-2.5 text-sm text-dim transition-colors hover:text-paper"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-dim">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 transition-colors hover:text-paper"
              >
                <FaLinkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 transition-colors hover:text-paper"
              >
                <FaGithub className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 transition-colors hover:text-paper"
              >
                Résumé <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto mt-20 max-w-6xl px-5 pb-10 md:px-8">
      <div className="flex flex-col justify-between gap-3 border-t border-line pt-6 text-xs text-mute sm:flex-row">
        <span>© 2026 Yash Pakale · {profile.location}</span>
        <a href="#top" className="transition-colors hover:text-paper">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
