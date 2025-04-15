import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export const ContentCard = ({
  children,
  className,
  bgImage,
  overlayClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  bgImage?: string;
  overlayClassName?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className={cn(
        "group relative min-h-[300px] overflow-hidden rounded-3xl",
        className
      )}
    >
      {bgImage && (
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background transition-all duration-300",
          overlayClassName
        )}
      />
      <div className="relative z-10 h-full p-8">
        {children}
      </div>
    </motion.div>
  );
}; 