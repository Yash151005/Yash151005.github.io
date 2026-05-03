"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full"
            />
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </>
  );
};
