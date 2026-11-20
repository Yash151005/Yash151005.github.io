"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { featured, projects } from "@/lib/data";
import { ArrowUpRight, EASE, Reveal, SectionHeader, Serif } from "./primitives";
import { cn } from "@/lib/utils";

const stages = ["Ingest", "Profile", "Clean", "Validate", "Ready"];

const rawRows = [
  ["cust_id", "region", "spend", "joined"],
  ["1042", "pune ", "12,400", "2023/04/11"],
  ["1043", "NULL", "—", "11-04-23"],
  ["1043", "Mumbai", "8100", "2023-04-11"],
  ["1045", "PUNE", "n/a", "Apr 12 23"],
];
const cleanRows = [
  ["cust_id", "region", "spend", "joined"],
  ["1042", "Pune", "12400.0", "2023-04-11"],
  ["1043", "Mumbai", "8100.0", "2023-04-11"],
  ["1045", "Pune", "9850.0*", "2023-04-12"],
];

function PipelineVisual() {
  return (
    <div className="relative flex h-full flex-col justify-between gap-8 border border-line bg-ink-2 p-5 font-mono text-[10.5px] md:p-7">
      <div className="flex items-center justify-between text-mute">
        <span>dataforge://pipeline/run_0193</span>
        <span className="flex items-center gap-2 text-green-400/90">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> passing
        </span>
      </div>

      <div className="relative flex items-center justify-between">
        <div className="absolute inset-x-2 top-1/2 h-px -translate-y-1/2 bg-line" />
        <motion.div
          className="absolute left-2 top-1/2 h-px -translate-y-1/2 bg-signal"
          initial={{ width: 0 }}
          whileInView={{ width: "calc(100% - 1rem)" }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
        />
        {stages.map((s, i) => (
          <motion.div
            key={s}
            className="relative z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.45, duration: 0.4 }}
          >
            <span className="grid h-6 w-6 place-items-center border border-line bg-ink-2 text-[9px] text-paper">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[9.5px] uppercase tracking-wider text-dim">{s}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { title: "raw.csv", rows: rawRows, bad: true },
          { title: "ready.parquet", rows: cleanRows, bad: false },
        ].map((t) => (
          <div key={t.title} className="min-w-0 overflow-hidden border border-line">
            <div className="border-b border-line bg-ink-3 px-2.5 py-1.5 text-mute">{t.title}</div>
            <table className="w-full table-fixed">
              <tbody>
                {t.rows.map((r, ri) => (
                  <tr key={ri} className={cn("border-b border-line/60 last:border-0", ri === 0 && "text-mute")}>
                    {r.map((c, ci) => {
                      const flagged = t.bad && ri > 0 && /NULL|—|n\/a|pune |PUNE|11-04|Apr|8100$/.test(c);
                      return (
                        <td
                          key={ci}
                          className={cn(
                            "truncate px-2 py-1 text-paper/80",
                            ri === 0 && "text-mute",
                            flagged && "text-signal",
                            t.bad && ri === 3 && "line-through decoration-signal/60"
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

      <div className="flex flex-wrap gap-x-6 gap-y-1 text-mute">
        <span>
          <span className="text-signal">●</span> type coercion
        </span>
        <span>
          <span className="text-signal">●</span> dedup
        </span>
        <span>
          <span className="text-signal">●</span> imputation
        </span>
        <span>
          <span className="text-signal">●</span> schema checks
        </span>
      </div>
    </div>
  );
}

export function Work() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="work" className="mx-auto max-w-[1400px] scroll-mt-14 px-5 pt-32 md:px-10 md:pt-44">
      <SectionHeader
        index="01"
        label="Selected work"
        title={
          <>
            Systems I&apos;ve designed, <Serif className="text-dim">trained</Serif> and shipped.
          </>
        }
        aside={<span className="hidden sm:inline">{projects.length + 1} projects</span>}
      />

      {/* Featured */}
      <Reveal>
        <article className="grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-12">
          <div className="flex min-w-0 flex-col md:col-span-5">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
              <span className="bg-signal px-2 py-0.5 text-ink">Featured</span>
              <span className="text-dim">
                {featured.kind} · {featured.org}
              </span>
            </div>
            <h3 className="mt-6 text-5xl font-medium tracking-[-0.045em] md:text-6xl">{featured.title}</h3>
            <p className="mt-3 font-serif text-2xl italic text-dim">{featured.summary}</p>
            <p className="mt-8 max-w-md leading-relaxed text-paper/75">{featured.description}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {featured.stack.map((s) => (
                <li key={s} className="border border-line px-2.5 py-1 font-mono text-[11px] text-dim">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 md:col-span-7">
            <PipelineVisual />
          </div>
        </article>
      </Reveal>

      {/* Index */}
      <div className="mt-24 md:mt-32">
        <Reveal className="mb-4 hidden grid-cols-12 gap-6 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mute md:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-4">Project</span>
          <span className="col-span-4">What it does</span>
          <span className="col-span-2">Discipline</span>
          <span className="col-span-1 text-right">Code</span>
        </Reveal>
        <ul className="border-t border-line">
          {projects.map((p, i) => {
            const isOpen = open === p.slug;
            return (
              <motion.li
                key={p.slug}
                className="border-b border-line"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.04 }}
              >
                  <button
                    onClick={() => setOpen(isOpen ? null : p.slug)}
                    aria-expanded={isOpen}
                    className="group relative isolate grid w-full grid-cols-12 items-baseline gap-x-6 gap-y-2 py-7 text-left md:py-8"
                  >
                    <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                    <span className="col-span-2 font-mono text-[11px] text-mute transition-colors group-hover:text-signal md:col-span-1 md:pl-2">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="col-span-10 text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:col-span-4 md:text-[2rem]">
                      {p.title}
                    </span>
                    <span className="col-span-10 col-start-3 text-sm text-dim md:col-span-4 md:col-start-auto md:text-[15px]">
                      {p.summary}
                    </span>
                    <span className="col-span-10 col-start-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute md:col-span-2 md:col-start-auto">
                      {p.kind}
                    </span>
                    <span className="absolute right-2 top-8 font-mono text-lg text-dim transition-transform duration-300 md:static md:col-span-1 md:text-right">
                      <span className={cn("inline-block transition-transform duration-500", isOpen && "rotate-45 text-signal")}>
                        +
                      </span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-12 gap-6 pb-10">
                          <div className="col-span-12 md:col-span-6 md:col-start-6">
                            <p className="max-w-xl leading-relaxed text-paper/80">{p.description}</p>
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                              <ul className="flex flex-wrap gap-2">
                                {p.stack.map((s) => (
                                  <li key={s} className="border border-line px-2.5 py-1 font-mono text-[11px] text-dim">
                                    {s}
                                  </li>
                                ))}
                              </ul>
                              {p.github && (
                                <a
                                  href={p.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/l inline-flex items-center gap-2 text-sm text-paper"
                                >
                                  <span className="link-underline">View source on GitHub</span>
                                  <ArrowUpRight className="text-signal transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
