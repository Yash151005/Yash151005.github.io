"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Site-wide interactive layer: scroll progress, card spotlight, back-to-top. */
export function Effects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // One listener drives the mouse-follow glow on every .card.
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.(".card") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-signal to-signal-2"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            whileHover={{ y: -3 }}
            className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-ink-2/90 text-dim shadow-lg shadow-black/40 backdrop-blur-md transition-colors hover:border-signal/60 hover:text-paper"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
