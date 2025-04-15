import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";

export const SpotlightCard = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-3xl border border-border/[0.2] bg-background/90 p-8 backdrop-blur-xl transition-all",
          className
        )}
      >
        {children}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsla(var(--accent)/.15), transparent 40%)`,
          }}
        />
      </div>
    </div>
  );
}; 