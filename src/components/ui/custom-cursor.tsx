"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      // Handle mouse leave if needed
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] w-3 h-3 rounded-full bg-gradient-to-r from-primary to-purple-500 mix-blend-lighten"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          type: "spring",
          damping: 15,
          mass: 0.05,
          stiffness: 800,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className="pointer-events-none fixed z-[9998] w-8 h-8 rounded-full border-2 border-primary/50 mix-blend-lighten"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          damping: 12,
          mass: 0.15,
          stiffness: 600,
        }}
      />
    </>
  );
};
