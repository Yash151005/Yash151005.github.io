"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { EASE } from "./primitives";
import { cn } from "@/lib/utils";

const sections = [
  { id: "work", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "recognition", label: "Awards" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
          scrolled || open ? "border-line/80 bg-ink/80 backdrop-blur-xl" : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-signal to-signal-2 text-xs font-bold text-ink">
              YP
            </span>
            <span className="hidden sm:inline">Yash Pakale</span>
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-line bg-ink-2/70 p-1 md:flex" aria-label="Primary">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[13px] text-dim transition-colors hover:text-paper",
                  active === s.id && "text-paper"
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-ink-3"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                {s.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-1 rounded-md border border-line px-2 py-1 font-mono text-[11px] text-mute transition-colors hover:text-paper lg:flex"
              aria-label="Open command menu"
            >
              <kbd className="font-mono">Ctrl</kbd>
              <kbd className="font-mono">K</kbd>
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg bg-paper px-3.5 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-white sm:inline-block"
            >
              Résumé
            </a>
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
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
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden border-t border-line md:hidden"
              aria-label="Mobile"
            >
              <ul className="px-5 py-4">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} onClick={() => setOpen(false)} className="block py-2.5 text-base font-medium">
                      {s.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-lg bg-paper px-4 py-2 text-sm font-medium text-ink"
                  >
                    Résumé
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
      { label: "Send a message", hint: "contact form", group: "Actions", run: () => go("contact") },
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
              className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-ink-2 shadow-2xl shadow-black/60"
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
                        "flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors",
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
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-lg border border-line bg-ink-2 px-4 py-2 font-mono text-xs text-paper"
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
