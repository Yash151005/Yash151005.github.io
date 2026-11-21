"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { featured, moreProjects, projectCount, projectGroups, type Project } from "@/lib/data";
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

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <Reveal delay={i * 0.05} className="h-full">
      <article className="card card-hover group relative flex h-full flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-signal">{p.kind}</span>
          <div className="flex items-center gap-3">
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-1 text-xs text-dim transition-colors hover:text-paper"
              >
                Live demo <ArrowUpRight />
              </a>
            )}
            {p.github && <FaGithub className="h-4 w-4 text-mute transition-colors group-hover:text-paper" aria-hidden="true" />}
          </div>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight">
          {p.github ? (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </h3>
        <p className="mt-1 text-sm text-paper/80">{p.summary}</p>
        <p className="mt-3 text-sm leading-relaxed text-dim">{p.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {p.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function ProjectGrid() {
  const [filter, setFilter] = useState("all");
  const tabs = [{ id: "all", label: "All" }, ...projectGroups.map((g) => ({ id: g.id, label: g.label }))];
  const projects = projectGroups.filter((g) => filter === "all" || g.id === filter).flatMap((g) => g.projects);

  return (
    <div className="mt-14">
      <Reveal className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-full border border-line bg-ink-2/70 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={filter === t.id}
              onClick={() => setFilter(t.id)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors",
                filter === t.id ? "text-paper" : "text-dim hover:text-paper"
              )}
            >
              {filter === t.id && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-ink-3 ring-1 ring-signal/30"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              {t.label}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] text-mute">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </span>
      </Reveal>

      <motion.div layout className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <ProjectCard p={p} i={0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function MoreProjects() {
  const [open, setOpen] = useState(false);
  const count = moreProjects.reduce((n, g) => n + g.projects.length, 0);

  return (
    <div className="mt-14">
      <Reveal className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-dim">
          Additional projects <span className="font-mono text-mute">({count})</span>
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="more-projects"
            className="rounded-lg border border-line px-3 py-1.5 text-sm text-dim transition-colors hover:text-paper"
          >
            {open ? "Hide list" : "Show all"}
          </button>
          <a
            href="https://github.com/Yash151005?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm text-dim transition-colors hover:text-paper"
          >
            All repositories
            <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Reveal>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="more-projects"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pt-2 lg:grid-cols-3">
              {moreProjects.map((g) => (
                <div key={g.label}>
                  <div className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-signal">{g.label}</div>
                  <ul className="divide-y divide-line border-y border-line">
                    {g.projects.map((p) => (
                      <li key={p.title}>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block py-3 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2 text-sm font-medium text-paper/90 group-hover:text-paper">
                            {p.title}
                            <ArrowUpRight className="shrink-0 text-mute transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                          </div>
                          <p className="mt-0.5 text-xs leading-relaxed text-dim">{p.summary}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="Projects"
      title="AI, data science & software work"
      intro={`${projectCount} projects across agentic AI, machine learning, computer vision and full-stack software, from raw data to deployed product.`}
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
            <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-6">
              {featured.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
              {featured.github && (
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 text-sm text-dim transition-colors hover:text-paper"
                >
                  <FaGithub className="h-4 w-4" /> Source
                </a>
              )}
            </div>
          </div>
          <div className="min-w-0">
            <PipelineVisual />
          </div>
        </article>
      </Reveal>

      <ProjectGrid />

      <MoreProjects />
    </Section>
  );
}
