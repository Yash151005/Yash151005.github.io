"use client";

import { AnimatePresence, animate, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile, projectCount, stack } from "@/lib/data";
import { ArrowUpRight, EASE } from "./primitives";

const roles = ["AI Engineer", "Data Scientist", "ML Researcher", "Software Developer"];

const stats = [
  { value: projectCount, suffix: "+", label: "Projects built" },
  { value: 2, suffix: "", label: "IEEE publications" },
  { value: 1, suffix: "st", label: "AIForge Hackathon" },
  { value: 10, prefix: "Top ", suffix: "%", label: "Mumbai Hacks (5,500+)" },
];

const focus = ["Agentic AI & RAG", "Machine Learning", "Computer Vision", "Data Pipelines", "Responsible AI"];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="text-gradient whitespace-nowrap"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

function TiltPortrait() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-80 w-64"
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-signal/60 via-transparent to-signal-2/60" />
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-line bg-ink-2">
          <Image src="/me.jpeg" alt="Portrait of Yash Pakale" fill sizes="256px" unoptimized priority className="object-cover" />
        </div>
        <div
          style={{ transform: "translateZ(40px)" }}
          className="absolute inset-x-3 bottom-3 rounded-lg border border-white/10 bg-ink/70 px-3 py-2 text-xs backdrop-blur-md"
        >
          <div className="font-medium">{profile.location}</div>
          <div className="text-dim">B.Tech AI & DS · VIIT</div>
        </div>
        <div
          style={{ transform: "translateZ(60px)" }}
          className="absolute -right-5 top-6 rounded-lg border border-line bg-ink-2/90 px-2.5 py-1.5 font-mono text-[10px] text-signal shadow-xl shadow-black/40 backdrop-blur-md"
        >
          2× IEEE
        </div>
        <div
          style={{ transform: "translateZ(50px)" }}
          className="absolute -left-6 top-1/2 rounded-lg border border-line bg-ink-2/90 px-2.5 py-1.5 font-mono text-[10px] text-signal-2 shadow-xl shadow-black/40 backdrop-blur-md"
        >
          🏆 Hackathon winner
        </div>
      </motion.div>
    </div>
  );
}

function TechMarquee() {
  const items = stack.flatMap((g) => g.items);
  return (
    <div className="marquee mt-14 overflow-hidden border-y border-line py-4" aria-label="Technologies">
      <div className="marquee-track flex w-max gap-3">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-md border border-line bg-ink-2 px-3 py-1 font-mono text-xs text-dim transition-colors hover:border-signal/50 hover:text-paper"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="orb pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-signal/20" aria-hidden="true" />
      <div
        className="orb pointer-events-none absolute -right-16 top-64 h-64 w-64 rounded-full bg-signal-2/15 [animation-delay:-7s]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-8 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <motion.a
              {...fade(0)}
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-ink-2/80 px-3 py-1 text-xs text-dim transition-colors hover:border-signal/50 hover:text-paper"
            >
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-green-400" />
              Open to AI/ML & Data Science roles
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>

            <motion.h1 {...fade(0.08)} className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
              Hi, I&apos;m Yash Pakale
            </motion.h1>
            <motion.p {...fade(0.14)} className="mt-3 text-2xl font-medium md:text-3xl">
              <RotatingRole />
            </motion.p>

            <motion.p {...fade(0.2)} className="mt-5 max-w-xl text-base leading-relaxed text-dim">
              I build agentic AI, RAG systems and machine learning pipelines, taking them from raw data to products people
              use. Two IEEE papers, an industry project with Rubiscape, and a B.Tech in AI & Data Science at VIIT Pune.
            </motion.p>

            <motion.ul {...fade(0.26)} className="mt-6 flex flex-wrap gap-2">
              {focus.map((f) => (
                <li
                  key={f}
                  className="cursor-default rounded-full border border-line px-3 py-1 text-xs text-paper/80 transition-all hover:-translate-y-0.5 hover:border-signal/50 hover:text-paper"
                >
                  {f}
                </li>
              ))}
            </motion.ul>

            <motion.div {...fade(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                <span className="shine pointer-events-none absolute inset-0" aria-hidden="true" />
                Get in touch
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-paper transition-colors hover:border-signal/60"
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
              {[
                { href: profile.github, label: "GitHub", icon: <FaGithub className="h-4 w-4" /> },
                { href: profile.linkedin, label: "LinkedIn", icon: <FaLinkedin className="h-4 w-4" /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line text-dim transition-all hover:-translate-y-0.5 hover:border-signal/50 hover:text-paper"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div {...fade(0.2)} className="hidden md:block">
            <TiltPortrait />
          </motion.div>
        </div>

        <motion.ul {...fade(0.4)} className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="card card-hover px-5 py-4">
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-dim">{s.label}</div>
            </li>
          ))}
        </motion.ul>

        <TechMarquee />
      </div>
    </section>
  );
}
