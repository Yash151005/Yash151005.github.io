"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklesProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
  backgroundColor?: string;
  minSize?: number;
  maxSize?: number;
  quantity?: number;
  speed?: number;
}

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

interface SparkleType {
  id: string;
  size: number;
  color: string;
  originX: number;
  originY: number;
  opacity: number;
  createdAt: number;
}

export function Sparkles({
  id,
  className,
  children,
  backgroundColor = "transparent",
  minSize = 10,
  maxSize = 20,
  quantity = 20,
  speed = 0.5,
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<SparkleType[]>([]);
  const prefersReducedMotion = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkleCounter = useRef(0);
  const colors = useRef([
    "#FFD700", // Gold
    "#E6E6FA", // Lavender
    "#87CEFA", // Light Sky Blue
    "#00FFFF", // Cyan
    "#9370DB", // Medium Purple
  ]);

  const createSparkle = useCallback((container: HTMLDivElement): SparkleType => {
    const { width, height } = container.getBoundingClientRect();
    sparkleCounter.current += 1;
    const timestamp = Date.now();
    return {
      id: `sparkle-${timestamp}-${sparkleCounter.current}`,
      size: random(minSize, maxSize),
      color: colors.current[random(0, colors.current.length - 1)],
      originX: random(0, width),
      originY: random(0, height),
      opacity: Math.random(),
      createdAt: timestamp,
    };
  }, [minSize, maxSize]);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion.current) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const initialSparkles = Array.from({ length: quantity }, () => createSparkle(container));
    setSparkles(initialSparkles);
    
    const intervalId = setInterval(() => {
      setSparkles(currentSparkles => {
        const now = Date.now();
        const isTimeToRemove = (s: SparkleType) => now - s.createdAt > 1500;
        const updatedSparkles = currentSparkles.filter(s => !isTimeToRemove(s));
        return [...updatedSparkles, createSparkle(container)];
      });
    }, 300);
    
    return () => clearInterval(intervalId);
  }, [quantity, createSparkle]);

  useAnimationFrame(() => {
    if (prefersReducedMotion.current) return;
    
    setSparkles(currentSparkles => 
      currentSparkles.map(sparkle => ({
        ...sparkle,
        originY: sparkle.originY - speed,
        opacity: Math.max(0, 1 - (Date.now() - sparkle.createdAt) / 1500)
      }))
    );
  });

  return (
    <div
      ref={containerRef}
      id={id}
      className={cn("relative inline-block", className)}
      style={{ background: backgroundColor }}
    >
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: sparkle.originX,
            top: sparkle.originY,
            opacity: sparkle.opacity,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={sparkle.color}
            />
          </svg>
        </motion.div>
      ))}
      {children}
    </div>
  );
} 