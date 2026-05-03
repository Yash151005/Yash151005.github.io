"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { IconArrowLeft, IconDownload } from "@tabler/icons-react";
import { useState } from "react";

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Yash_Pakale_Resume.pdf';
    link.click();
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <AnimatedGradientBackground />
      
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 backdrop-blur-md bg-background/50 border-b border-white/10">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <IconArrowLeft size={20} />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Resume
        </h1>
        <ThemeToggle />
      </nav>

      {/* PDF Viewer */}
      <div className="relative z-10 pt-24 pb-12 h-screen">
        <div className="max-w-6xl mx-auto px-4 h-full flex flex-col">
          {/* Toolbar */}
          <motion.div 
            className="flex items-center justify-between mb-4 p-4 bg-white/5 rounded-lg border border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-foreground/70 text-sm">
              {isLoading ? "Loading resume..." : "Resume loaded"}
            </p>
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg transition-all"
            >
              <IconDownload size={18} />
              Download
            </motion.button>
          </motion.div>

          {/* PDF Container */}
          <motion.div 
            className="flex-1 rounded-lg overflow-hidden border border-white/10 bg-white/5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <iframe
              src="/resume.pdf"
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
              style={{ border: 'none' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
