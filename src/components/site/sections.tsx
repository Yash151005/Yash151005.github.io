"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { education, profile, publications, recognition, stack } from "@/lib/data";
import { ArrowUpRight, EASE, Reveal, SectionHeader, Serif, useLocalTime } from "./primitives";

export function Research() {
  return (
    <section id="research" className="mx-auto max-w-[1400px] scroll-mt-14 px-5 pt-32 md:px-10 md:pt-44">
      <SectionHeader
        index="02"
        label="Research"
        title={
          <>
            Peer-reviewed work, <Serif className="text-dim">published in IEEE Xplore.</Serif>
          </>
        }
      />
      <div className="grid gap-px border border-line bg-line md:grid-cols-2">
        {publications.map((p, i) => (
          <Reveal key={p.link} delay={i * 0.08} className="bg-ink">
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between gap-16 p-7 transition-colors duration-500 hover:bg-ink-2 md:p-10"
            >
              <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                <span>[{i + 1}]&nbsp;&nbsp;{p.venue}</span>
                <ArrowUpRight className="h-4 w-4 text-paper transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
              </div>
              <div>
                <h3 className="text-2xl leading-[1.15] tracking-[-0.025em] md:text-[1.75rem]">{p.title}</h3>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                  <span>{p.area}</span>
                  <span className="text-dim transition-colors group-hover:text-paper">Read paper</span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Recognition() {
  return (
    <section id="recognition" className="mx-auto max-w-[1400px] scroll-mt-14 px-5 pt-32 md:px-10 md:pt-44">
      <SectionHeader
        index="03"
        label="Recognition"
        title={
          <>
            Competing against thousands, <Serif className="text-dim">building under pressure.</Serif>
          </>
        }
      />
      <ul className="border-t border-line">
        {recognition.map((r, i) => (
          <motion.li
            key={r.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
            className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-1 border-b border-line py-6 transition-colors hover:bg-ink-2 md:py-7"
          >
            <span className="col-span-3 text-2xl font-medium tracking-[-0.04em] text-signal md:col-span-2 md:pl-2 md:text-4xl">
              {r.place}
            </span>
            <span className="col-span-9 text-lg tracking-[-0.02em] md:col-span-5 md:text-2xl">{r.title}</span>
            <span className="col-span-9 col-start-4 text-sm text-dim md:col-span-4 md:col-start-auto">{r.org}</span>
            <span className="hidden text-right font-mono text-[11px] text-mute md:col-span-1 md:block md:pr-2">{r.year}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] scroll-mt-14 px-5 pt-32 md:px-10 md:pt-44">
      <SectionHeader
        index="04"
        label="About"
        title={
          <>
            Engineer first. <Serif className="text-dim">Curious always.</Serif>
          </>
        }
      />
      <div className="grid gap-16 md:grid-cols-12 md:gap-8">
        <Reveal className="space-y-6 text-lg leading-relaxed text-paper/80 md:col-span-6">
          <p>
            I&apos;m a B.Tech student in Artificial Intelligence &amp; Data Science at VIIT Pune, and I got here
            through a diploma in Computer Technology. That diploma made me practical: I care about models
            that hold up in production, not just ones that score well in a notebook.
          </p>
          <p>
            Most of my work sits where ML meets real software. That means computer vision pipelines, data
            preparation systems and fairness tooling, plus the React and Node.js products around them. I&apos;ve
            published two papers in IEEE Xplore, shipped an industry project with Rubiscape, and placed at
            hackathons against thousands of other builders.
          </p>
          <p className="text-paper">
            I&apos;m looking for teams that ship ambitious products, where I can learn fast and own real problems
            from start to finish.
          </p>
        </Reveal>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Education</Reveal>
          <div className="relative border-l border-line">
            {education.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08} className="relative pb-10 pl-7 last:pb-0">
                <span
                  className={`absolute -left-[4.5px] top-1.5 h-2 w-2 ${i === 0 ? "bg-signal" : "border border-line bg-ink"}`}
                />
                <div className="font-mono text-[11px] tabular-nums text-dim">{e.period}</div>
                <div className="mt-2 text-lg tracking-[-0.02em]">{e.title}</div>
                <div className="mt-1 text-sm text-dim">{e.place}</div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mb-6 mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Toolkit</Reveal>
          <div className="space-y-6">
            {stack.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.06} className="grid grid-cols-[110px_1fr] gap-4 border-t border-line pt-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{g.label}</span>
                <span className="text-[15px] leading-relaxed text-paper/85">{g.items.join(", ")}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const words = ["Machine Learning", "Computer Vision", "Data Pipelines", "Full-Stack", "Responsible AI", "Research"];
  const row = [...words, ...words];
  return (
    <div className="mt-32 overflow-hidden border-y border-line py-6 md:mt-44" aria-hidden="true">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-12 text-4xl tracking-[-0.03em] text-paper/80 md:text-6xl">
            {i % 2 === 0 ? w : <Serif className="text-dim">{w}</Serif>}
            <span className="text-2xl text-signal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const links = [
    { label: "GitHub", href: profile.github, meta: "@Yash151005" },
    { label: "LinkedIn", href: profile.linkedin, meta: "in/yash-pakale" },
    { label: "Résumé", href: profile.resume, meta: "PDF" },
    { label: "Instagram", href: profile.instagram, meta: "@yashpakale.swami" },
  ];

  return (
    <section id="contact" className="mx-auto max-w-[1400px] scroll-mt-14 px-5 pt-32 md:px-10 md:pt-44">
      <Reveal className="flex items-center gap-4 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
        <span className="text-signal">05</span>
        <span>Contact</span>
        <span className="h-px flex-1 bg-line" />
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-12 text-[clamp(3rem,10vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.055em]">
          Let&apos;s build
          <br />
          <Serif className="text-dim">something</Serif> real<span className="text-signal">.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="mb-6 max-w-md text-dim">
            Hiring for an ML, AI or full-stack role, or just want to talk shop? My inbox is open, and I
            usually reply within a day.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 text-[clamp(1.25rem,3vw,2.25rem)] tracking-[-0.03em]"
            >
              <span className="link-underline">{profile.email}</span>
              <ArrowUpRight className="h-5 w-5 text-signal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <button
              onClick={copy}
              className="border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dim transition-colors hover:border-paper/40 hover:text-paper"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <p className="mt-4 font-mono text-[12px] text-mute">{profile.phone}</p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <ul className="border-t border-line">
            {links.map((l) => (
              <li key={l.label} className="border-b border-line">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 transition-colors"
                >
                  <span className="text-lg tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1.5">
                    {l.label}
                  </span>
                  <span className="flex items-center gap-3 font-mono text-[11px] text-mute transition-colors group-hover:text-paper">
                    {l.meta}
                    <ArrowUpRight className="transition-colors group-hover:text-signal" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const time = useLocalTime(profile.timezone);
  return (
    <footer className="mx-auto mt-32 max-w-[1400px] px-5 pb-10 md:mt-44 md:px-10">
      <div className="grid gap-6 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mute md:grid-cols-3">
        <span>© 2026 Yash Pakale</span>
        <span className="md:text-center">
          Designed &amp; built by me · Next.js on GitHub Pages
        </span>
        <span className="flex justify-between gap-6 md:justify-end">
          <span className="tabular-nums">Pune {time ?? "--:--:--"}</span>
          <a href="#top" className="text-dim transition-colors hover:text-signal">
            Back to top ↑
          </a>
        </span>
      </div>
    </footer>
  );
}
