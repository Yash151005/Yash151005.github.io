"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal className="flex items-center gap-4 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
        <span className="text-signal">{index}</span>
        <span>{label}</span>
        <span className="h-px flex-1 bg-line" />
        {aside}
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

export function Serif({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-serif font-normal italic tracking-[-0.01em]", className)}>{children}</span>;
}

export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={cn("h-3.5 w-3.5", className)} aria-hidden="true">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}
