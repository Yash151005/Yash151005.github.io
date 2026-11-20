"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { engineering, featured, projects, type Project } from "@/lib/data";
import { ArrowUpRight, EASE, Reveal, Section, Tag } from "./primitives";
import { cn } from "@/lib/utils";

const stages = ["Ingest", "Profile", "Clean", "Validate", "Ready"];

const rawRows = [
  ["id", "region", "spend"],
  ["1042", "pune ", "12,400"],
  ["1043", "NULL", "—"],
  ["1045", "PUNE", "n/a"],
];
const cleanRows = [
  ["id", "region", "spend"],
  ["1042", "Pune", "12400.0"],
  ["1043", "Mumbai", "8100.0"],
  ["1045", "Pune", "9850.0"],
];

function PipelineVisual() {
  return (
    <div className="flex h-full flex-col gap-6 rounded-xl border border-line bg-ink p-5 font-mono text-[11px]">
      <div className="flex items-center justify-between text-mute">
        <span>pipeline / run_0193</span>
        <span className="flex items-center gap-1.5 rounded-full bg-green-400/10 px-2 py-0.5 text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> passing
        </span>
      </div>

      <div className="relative flex items-center justify-between px-1">
        <div className="absolute inset-x-4 top-3 h-px bg-line" />
        <motion.div
          className="absolute left-4 top-3 h-px bg-gradient-to-r from-signal to-signal-2"
          initial={{ width: 0 }}
          whileInView={{ width: "calc(100% - 2rem)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
        />
        {stages.map((s, i) => (
          <motion.div
            key={s}
            className="relative z-10 flex flex-col items-center gap-1.5"
            initial={{ opacity: 0.35 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.35, duration: 0.4 }}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full border border-line bg-ink-3 text-[10px] text-paper">
              {i + 1}
            </span>
            <span className="text-[10px] text-dim">{s}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { title: "raw.csv", rows: rawRows, bad: true },
          { title: "ready.parquet", rows: cleanRows, bad: false },
        ].map((t) => (
          <div key={t.title} className="min-w-0 overflow-hidden rounded-lg border border-line">
            <div className="border-b border-line bg-ink-3 px-2.5 py-1.5 text-mute">{t.title}</div>
            <table className="w-full table-fixed">
              <tbody>
                {t.rows.map((r, ri) => (
                  <tr key={ri} className="border-b border-line/60 last:border-0">
                    {r.map((c, ci) => {
                      const flagged = t.bad && ri > 0 && /NULL|—|n\/a|pune |PUNE|,/.test(c);
                      return (
                        <td
                          key={ci}
                          className={cn(
                            "truncate px-2.5 py-1 text-paper/80",
                            ri === 0 && "text-mute",
                            flagged && "text-rose-400",
                            !t.bad && ri > 0 && "text-emerald-300/90"
                          )}
                        >
                          {c}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p, i, compact = false }: { p: Project; i: number; compact?: boolean }) {
  const Wrapper = p.github ? "a" : "div";
  return (
    <Reveal delay={i * 0.05} className="h-full">
      <Wrapper
        {...(p.github ? { href: p.github, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="card card-hover group flex h-full flex-col p-5"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-signal">{p.kind}</span>
          {p.github && (
            <FaGithub className="h-4 w-4 text-mute transition-colors group-hover:text-paper" aria-label="View on GitHub" />
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-1 text-sm text-paper/80">{p.summary}</p>
        {!compact && <p className="mt-3 text-sm leading-relaxed text-dim">{p.description}</p>}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </Wrapper>
    </Reveal>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="Projects"
      title="AI & data science work"
      intro="Selected machine learning, computer vision and data projects, from model to deployment."
    >
      {/* Featured */}
      <Reveal>
        <article className="card grid gap-8 p-6 md:grid-cols-2 md:p-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-full bg-signal/15 px-2.5 py-0.5 font-medium text-signal">Featured</span>
              <span className="text-dim">
                {featured.kind} · {featured.org}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{featured.title}</h3>
            <p className="mt-1 text-paper/80">{featured.summary}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-dim">{featured.description}</p>
            <ul className="mt-5 space-y-1.5 text-sm text-dim">
              {["Automated type coercion & deduplication", "Missing-value imputation", "Schema & quality validation"].map(
                (x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-signal-2" />
                    {x}
                  </li>
                )
              )}
            </ul>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
              {featured.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <PipelineVisual />
          </div>
        </article>
      </Reveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} p={p} i={i} />
        ))}
      </div>

      <Reveal className="mt-14 mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-dim">Other engineering projects</h3>
        <a
          href="https://github.com/Yash151005"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-sm text-dim transition-colors hover:text-paper"
        >
          All repositories
          <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {engineering.map((p, i) => (
          <ProjectCard key={p.slug} p={p} i={i} compact />
        ))}
      </div>
    </Section>
  );
}
