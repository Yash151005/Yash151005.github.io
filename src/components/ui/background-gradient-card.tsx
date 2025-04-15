import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BackgroundGradientCard = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 blur-xl transition duration-500",
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl",
          "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        )}
      />

      <div
        className={cn(
          "relative rounded-[calc(1.5rem-4px)] p-8",
          "bg-background/90 backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}; 