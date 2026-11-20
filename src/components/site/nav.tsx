"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { EASE, useLocalTime } from "./primitives";
import { cn } from "@/lib/utils";

const sections = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "recognition", label: "Recognition" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const time = useLocalTime(profile.timezone);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-signal"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-ink/75 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="group flex items-center gap-3 text-sm font-medium tracking-tight">
            <span className="grid h-7 w-7 place-items-center border border-line font-mono text-[11px] transition-colors group-hover:border-signal group-hover:text-signal">
              YP
            </span>
            <span className="hidden sm:inline">Yash Pakale</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "relative px-3 py-1.5 text-[13px] text-dim transition-colors hover:text-paper",
                  active === s.id && "text-paper"
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-[17px] h-px bg-signal"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[11px] tabular-nums text-dim lg:inline">
              PUNE {time ?? "--:--:--"} IST
            </span>
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 border border-line px-2.5 py-1 font-mono text-[11px] text-dim transition-colors hover:border-paper/40 hover:text-paper md:flex"
              aria-label="Open command menu"
            >
              <kbd className="font-mono">Ctrl</kbd>
              <span className="text-mute">+</span>
              <kbd className="font-mono">K</kbd>
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden bg-paper px-3.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-signal sm:inline-block"
            >
              Résumé
            </a>
            <button
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={cn("h-px w-5 bg-paper transition-transform duration-300", open && "translate-y-[3.5px] rotate-45")} />
              <span className={cn("h-px w-5 bg-paper transition-transform duration-300", open && "-translate-y-[3.5px] -rotate-45")} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden border-t border-line md:hidden"
              aria-label="Mobile"
            >
              <ul className="px-5 py-6">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2 text-3xl font-medium tracking-tight"
                    >
                      <span className="font-mono text-[11px] text-signal">0{i + 1}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-paper px-4 py-2 text-sm font-medium text-ink"
                  >
                    Résumé ↗
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

type Command = { label: string; hint: string; group: string; run: () => void };

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback((id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), []);
  const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const commands: Command[] = useMemo(
    () => [
      ...sections.map((s) => ({ label: `Go to ${s.label}`, hint: `#${s.id}`, group: "Navigate", run: () => go(s.id) })),
      {
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setToast("Email copied");
        },
      },
      { label: "Open résumé", hint: "PDF", group: "Actions", run: () => openUrl(profile.resume) },
      { label: "Send an email", hint: "mailto", group: "Actions", run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: "GitHub", hint: "@Yash151005", group: "Links", run: () => openUrl(profile.github) },
      { label: "LinkedIn", hint: "in/yash-pakale", group: "Links", run: () => openUrl(profile.linkedin) },
    ],
    [go]
  );

  const filtered = commands.filter((c) => (c.label + c.hint + c.group).toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && filtered[index]) {
      filtered[index].run();
      onClose();
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/70 px-4 pt-[18vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              role="dialog"
              aria-label="Command menu"
              className="w-full max-w-lg border border-line bg-ink-2 shadow-2xl shadow-black/60"
              initial={{ y: 12, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <span className="font-mono text-xs text-signal">&gt;</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  placeholder="Type a command or search…"
                  className="h-12 w-full bg-transparent text-sm text-paper outline-none placeholder:text-mute"
                />
                <kbd className="font-mono text-[10px] text-mute">ESC</kbd>
              </div>
              <ul className="max-h-80 overflow-y-auto p-1.5">
                {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-dim">No results.</li>}
                {filtered.map((c, i) => (
                  <li key={c.label}>
                    <button
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => {
                        c.run();
                        onClose();
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors",
                        i === index ? "bg-ink-3 text-paper" : "text-dim"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-16 font-mono text-[10px] uppercase tracking-wider text-mute">{c.group}</span>
                        {c.label}
                      </span>
                      <span className="font-mono text-[11px] text-mute">{c.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-mute">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 border border-line bg-ink-2 px-4 py-2 font-mono text-xs text-paper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <span className="mr-2 text-signal">✓</span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
