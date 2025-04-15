"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  index?: number;
}

export function AnimatedCard({
  className,
  children,
  index = 0,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 } 
      }}
      className={cn(
        "rounded-lg border shadow-sm backdrop-blur-sm overflow-hidden relative",
        className
      )}
      style={{
        backgroundColor: "hsl(var(--card))",
        color: "hsl(var(--card-foreground))",
        borderColor: "hsla(var(--border), 0.4)"
      }}
      {...props}
    >
      <div 
        className="absolute top-0 h-[1px] w-full animate-shimmer"
        style={{
          background: "linear-gradient(to right, transparent, hsla(var(--primary), 0.1), transparent)"
        }}
      />
      {children}
    </motion.div>
  );
} 