"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/data";
import { ArrowUpRight, EASE, Serif } from "./primitives";

const stats = [
  { value: "02", label: "IEEE publications" },
  { value: "1st", label: "AIForge Hackathon '24" },
  { value: "Top 10%", label: "of 5,500+ at Mumbai Hacks" },
  { value: "07", label: "Systems built & shipped" },
];

function SplitName({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.035 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-4 pt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-dim md:pt-16"
        >
          <span>Portfolio / 2026</span>
          <span className="flex items-center gap-2.5">
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-green-400" />
            Open to internships & full-time roles
          </span>
        </motion.div>

        <h1 className="mt-10 text-[clamp(3.5rem,14.5vw,13.5rem)] font-semibold leading-[0.86] tracking-[-0.06em] md:mt-14">
          <SplitName text="Yash" delay={0.15} />
          <br />
          <span className="flex flex-wrap items-end">
            <SplitName text="Pakale" delay={0.3} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mb-[0.12em] text-signal"
              aria-hidden="true"
            >
              .
            </motion.span>
          </span>
        </h1>

        <div className="mt-14 grid gap-12 border-t border-line pt-10 md:mt-20 md:grid-cols-12 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            className="md:col-span-7"
          >
            <p className="max-w-2xl text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.18] tracking-[-0.02em] text-paper/90">
              AI engineer and full-stack developer. I build{" "}
              <Serif className="text-paper">machine-learning systems that ship</Serif>, from computer
              vision models to the products and pipelines that put them to work.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-signal"
              >
                See selected work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 border border-line px-5 py-3 text-sm text-paper transition-colors hover:border-paper/50"
              >
                {profile.email}
                <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.85 }}
            className="flex gap-6 md:col-span-5 md:justify-end"
          >
            <div className="group relative h-44 w-36 shrink-0 overflow-hidden border border-line md:h-56 md:w-44">
              <Image
                src="/me.jpeg"
                alt="Portrait of Yash Pakale"
                fill
                sizes="176px"
                unoptimized
                priority
                className="object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <dl className="flex flex-col justify-between font-mono text-[11px] uppercase tracking-[0.14em]">
              {[
                ["Based", profile.location],
                ["Focus", "ML · CV · Full-stack"],
                ["Studying", "B.Tech AI & DS, VIIT"],
                ["Industry", "Rubiscape"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-mute">{k}</dt>
                  <dd className="mt-1 normal-case tracking-normal text-paper/90 font-sans text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-16 grid grid-cols-2 border-y border-line md:mt-24 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={`px-1 py-7 md:px-6 ${i % 2 === 1 ? "border-l border-line pl-5" : ""} ${
                i > 1 ? "border-t border-line md:border-t-0" : ""
              } ${i === 2 ? "md:border-l md:pl-6" : ""} ${i === 0 ? "md:pl-0" : ""}`}
            >
              <div className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">{s.value}</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{s.label}</div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
