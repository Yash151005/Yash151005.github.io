"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { AnimatedCard } from "@/components/ui/animated-cards";
import { Sparkles } from "@/components/ui/sparkles";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram, IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import { BackgroundGradientCard } from "@/components/ui/background-gradient-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ContentCard } from "@/components/ui/content-card";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 100 } 
  }
};

// Game Component
const GameContent = ({ score, setScore, onGameEnd }: { score: number; setScore: (s: number) => void; onGameEnd: () => void }) => {
  const [shield, setShield] = useState({ x: 150, y: 250 });
  const [bugs, setBugs] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [gameTime, setGameTime] = useState(30);
  const gameRef = useRef(null);
  const scoreRef = useRef(score);
  const bugsRef = useRef<Array<{ id: number; x: number; y: number }>>([]);

  // Update refs when props/state change
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    bugsRef.current = bugs;
  }, [bugs]);

  useEffect(() => {
    if (gameTime <= 0) {
      onGameEnd();
      return;
    }
    const timer = setInterval(() => setGameTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [gameTime, onGameEnd]);

  useEffect(() => {
    const spawnBug = () => {
      const newBug = {
        id: Math.random(),
        x: Math.random() * 280,
        y: -20
      };
      setBugs(prev => [...prev, newBug]);
    };
    const spawn = setInterval(spawnBug, 500);
    return () => clearInterval(spawn);
  }, []);

  useEffect(() => {
    const moveBugs = setInterval(() => {
      setBugs(prev => {
        const updated = prev.map(bug => ({ ...bug, y: bug.y + 5 })).filter(bug => bug.y < 300);
        return updated;
      });
    }, 50);
    return () => clearInterval(moveBugs);
  }, []);

  // Separate collision detection
  useEffect(() => {
    const checkCollisions = setInterval(() => {
      bugsRef.current.forEach(bug => {
        const dist = Math.hypot(bug.x - shield.x, bug.y - shield.y);
        if (dist < 30) {
          setScore(scoreRef.current + 10);
          setBugs(b => b.filter(b => b.id !== bug.id));
        }
      });
    }, 50);
    return () => clearInterval(checkCollisions);
  }, [shield, setScore]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setShield({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={gameRef}
      className="relative w-full h-80 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg overflow-hidden border border-indigo-500/20 cursor-none"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-indigo-500" style={{ top: `${i * 50}px` }} />
        ))}
      </div>

      {/* Score and Time */}
      <div className="absolute top-4 left-4 z-10 text-indigo-300 font-bold">
        <p>Score: {score}</p>
        <p>Time: {gameTime}s</p>
      </div>

      {/* Shield */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400 shadow-lg"
        style={{ left: shield.x - 16, top: shield.y - 16 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full rounded-full border-2 border-indigo-200 animate-pulse" />
      </motion.div>

      {/* Bugs */}
      {bugs.map(bug => (
        <motion.div
          key={bug.id}
          className="absolute w-6 h-6 text-lg"
          style={{ left: bug.x, top: bug.y }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🐛
        </motion.div>
      ))}

      {/* Game Over Screen */}
      {gameTime === 0 && (
        <motion.div
          className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-4xl font-bold text-indigo-300 mb-4">Game Over!</p>
          <p className="text-2xl text-slate-300">Final Score: {score}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const navigationItems = [
    { title: "About", href: "#about" },
    { title: "Skills", href: "#skills" },
    { title: "Accomplishments", href: "#accomplishments" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
  ];

  const skillCategories = [
    {
      title: "AI & Machine Learning",
      skills: ["Machine Learning", "Computer Vision", "YOLO (Object Detection)", "Bias & Fairness Analysis", "Model Evaluation", "Feature Engineering", "Data Preprocessing"],
      icon: "🧠",
    },
    {
      title: "Full-Stack & Web Development",
      skills: ["React.js", "Node.js", "RESTful APIs", "HTML & CSS", "Bootstrap", "Authentication Systems", "Real-time Data Handling"],
      icon: "🌐",
    },
    {
      title: "Programming, Data & Tools",
      skills: ["Python", "JavaScript", "SQL", "MongoDB", "MySQL", "Git & GitHub", "Docker", "Jupyter Notebook"],
      icon: "⚙️",
    },
  ];

  const projects = [
    {
      category: "🤖 AI / Machine Learning Projects",
      items: [
        {
          title: "AutoFix AI",
          description: "Vehicle Damage Detection & Cost Estimation System. An end-to-end computer vision system that detects vehicle exterior damage from images and estimates repair costs in real time. Designed as a production-oriented AI pipeline from image upload to actionable insights.",
          techStack: "YOLO, Computer Vision, Python, Model Deployment",
          github: "https://github.com/yash151005/AutoFix-AI",
          bgImage: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
          title: "SafeRoute.AI",
          description: "ML-Based Route Safety Scoring System. A machine learning system that analyzes crime data, temporal patterns, and environmental factors to generate real-time safety scores for navigation routes, enabling safer decision-making.",
          techStack: "Machine Learning, Data Engineering, Python, APIs",
          github: "https://github.com/yash151005/SafeRoute-AI",
          bgImage: "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
          title: "ReliefReach AI",
          description: "Disaster Response Intelligence Platform. An AI-powered platform designed for governments and NGOs to predict disaster impact and optimize resource allocation using satellite data, weather inputs, and ground reports.",
          techStack: "Predictive ML, Data Pipelines, Cloud-Ready Architecture",
          github: "https://github.com/yash151005/ReliefReach-AI",
          bgImage: "https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
          title: "BiasScope",
          description: "AI Bias & Fairness Analysis Tool. A specialized tool that evaluates machine learning models for bias across demographic groups using industry-standard fairness metrics and provides actionable insights through visual analytics.",
          techStack: "ML Evaluation, Statistics, Fairness Metrics, Python",
          github: "https://github.com/yash151005/BiasScope",
          bgImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
      ]
    },
    {
      category: "🌐 Full-Stack / Web Engineering Projects",
      items: [
        {
          title: "TeamSync",
          description: "Smart Hackathon Team Discovery Platform. A mobile-first full-stack platform that intelligently matches hackathon participants based on skills, roles, and interests. Includes secure OTP-based authentication and real-time availability matching.",
          techStack: "React, Node.js, Recommendation Systems, Auth",
          github: "https://github.com/yash151005/TeamSync",
          bgImage: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
          title: "Freelance Bidding Platform",
          description: "Intelligent Auction-Based Marketplace. A full-stack freelance marketplace implementing an intelligent bidding algorithm that automatically selects optimal bids based on multiple criteria beyond price.",
          techStack: "MERN Stack, Algorithms, REST APIs",
          github: "https://github.com/yash151005/Freelance-Bidding-Platform",
          bgImage: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
      ]
    }
  ];

  const accomplishments = [
    {
      title: "🥇 1st Place - AIForge Hackathon 2024",
      description: "Won 1st Place at AIForge Hackathon, Vishwakarma Institute of Technology, Pune.",
      details: [
        "1st Prize Winner in the AIForge Hackathon",
        "Organized by: Vishwakarma Institute of Technology, Pune",
        "Demonstrated exceptional innovative problem-solving and technical execution"
      ],
      icon: "🥇",
      bgImage: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "🥈 2nd Place - Open Innovation Hackathon 2024",
      description: "Secured 2nd Place at Open Innovation Hackathon, GDCE PES's Modern College of Engineering, Pune.",
      details: [
        "2nd Prize Winner in the Open Innovation Hackathon",
        "Organized by: GDCE PES's Modern College of Engineering, Pune",
        "Showcased innovative solution design and team collaboration"
      ],
      icon: "🥈",
      bgImage: "https://images.pexels.com/photos/3184335/pexels-photo-3184335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "🌟 Top 10% - Mumbai Hacks 2024",
      description: "Among Top 10% of 5500+ Innovators at Mumbai Hacks, Mumbai.",
      details: [
        "Ranked in Top 10% Among 5500+ Innovators",
        "Event: Mumbai Hacks, Mumbai",
        "Demonstrated excellence in innovation and technical prowess among highly competitive participants"
      ],
      icon: "🌟",
      bgImage: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "State Level Online Quiz - Engineers' Day (2024)",
      description: "Secured 3rd Place in the State Level Online Quiz, part of Engineers' Day Celebrations.",
      details: [
        "Awarded 3rd place in the State Level Online Quiz",
        "Conducted by the Institution of Engineers (India), Latur",
        "Branch: Third Year Computer Engineering, Government Polytechnic, Solapur"
      ],
      icon: "🏆",
      bgImage: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Artificial Intelligence Bootcamp - C-DAC Pune (2024)",
      description: "Completed intensive AI training program at C-DAC Pune.",
      details: [
        "Gained a deeper understanding of Artificial Intelligence (AI) and Machine Learning through hands-on training",
        "Focused on applying AI skills to real-world challenges and scenarios",
        "Program Dates: September 23 - September 27, 2024",
        "Certification Issued: October 9, 2024"
      ],
      icon: "🤖",
      bgImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "GDG Gen AI Quiz (2024)",
      description: "Demonstrated excellence in AI knowledge.",
      details: [
        "Secured 2nd place in the GDG Gen AI Quiz",
        "Collaborated with a talented team to dive deeper into Generative AI concepts"
      ],
      icon: "🎯",
      bgImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <AnimatedGradientBackground className="min-h-screen">
      {/* Game Easter Egg Button */}
      <motion.button
        onClick={() => setShowGame(!showGame)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-slate-700 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-xl"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        title="Play Code Guardian Game!"
      >
        🎮
      </motion.button>

      {/* Game Modal */}
      {showGame && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && setShowGame(false)}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-indigo-500/30"
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-slate-300">
                ⚡ Code Guardian
              </h2>
              <motion.button
                onClick={() => setShowGame(false)}
                className="text-2xl hover:rotate-90 transition-transform"
                whileHover={{ scale: 1.2 }}
              >
                ✕
              </motion.button>
            </div>

            {!gameActive ? (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center">
                  <p className="text-indigo-200 mb-4">Click to dodge incoming bugs!</p>
                  <div className="text-6xl mb-4">🛡️</div>
                  <p className="text-slate-400 text-sm mb-4">Your Score: <span className="text-indigo-400 font-bold text-lg">{gameScore}</span></p>
                </div>

                <motion.button
                  onClick={() => {
                    setGameScore(0);
                    setGameActive(true);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-slate-700 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Game
                </motion.button>
              </motion.div>
            ) : (
              <GameContent 
                score={gameScore} 
                setScore={setGameScore} 
                onGameEnd={() => setGameActive(false)}
              />
            )}
          </motion.div>
        </motion.div>
      )}
      <header 
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b" 
        style={{ 
          backgroundColor: "hsla(var(--background), 0.7)",
          borderColor: "hsla(var(--border), 0.4)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Sparkles>
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-slate-700">YP</span>
                </Link>
              </Sparkles>
            </motion.div>

            {/* Desktop Nav */}
            <motion.nav 
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navigationItems.map((item, i) => (
                <Link 
                  key={i} 
                  href={item.href}
                  className="relative text-foreground/80 hover:text-foreground transition-colors group"
                >
                  {item.title}
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-indigo-600 to-slate-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </motion.nav>

            {/* Mobile Nav */}
            <motion.div
              className="md:hidden flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <div className="w-6 h-0.5 bg-foreground mb-1.5 transition-all" 
                  style={{ 
                    transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : '',
                    opacity: isMenuOpen ? '1' : '1'
                  }} 
                />
                <div className="w-6 h-0.5 bg-foreground mb-1.5 transition-all" 
                  style={{ opacity: isMenuOpen ? '0' : '1' }} 
                />
                <div className="w-6 h-0.5 bg-foreground transition-all" 
                  style={{ 
                    transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '',
                    opacity: isMenuOpen ? '1' : '1'
                  }} 
                />
              </button>
              <ThemeToggle className="ml-4" />
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 flex flex-col items-center text-center min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
        <Image
            src="https://images.pexels.com/photos/17866470/pexels-photo-17866470/free-photo-of-waterfall-in-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Waterfall in Forest"
            fill
            sizes="100vw"
            className="object-cover opacity-20 dark:opacity-10"
          priority
        />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <Sparkles className="w-full">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 via-indigo-500 to-slate-700 mb-8 mx-auto overflow-hidden shadow-2xl ring-4 ring-white/20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              viewport={{ once: false }}
            >
              {/* Profile photo placeholder */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl shadow-indigo-500/50 border-4 border-gradient-to-b from-indigo-400 to-cyan-400 ring-4 ring-indigo-500/30">
                <Image
                  src="/me.jpeg"
                  alt="Profile Photo"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-500/20 rounded-full pointer-events-none"></div>
              </div>

            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-200 to-cyan-300 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Yash Pakale
            </motion.h1>
            
            <motion.div 
              className="text-xl md:text-4xl font-bold mb-8 h-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.p
                className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-slate-500"
                animate={{ y: [-10, 0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                B.Tech Student in A.I. & D.S. | Innovator | Developer
              </motion.p>
            </motion.div>
            
            <motion.p 
              className="max-w-2xl text-lg md:text-xl text-foreground/70 mb-10 mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Passionate about building intelligent solutions. 🚀 Expert in Web Dev, AI & ML, Android Development
            </motion.p>
            
            <motion.div 
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a 
                href="#contact" 
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-slate-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Get in Touch
              </motion.a>
              <motion.a 
                href="#projects" 
                className="px-8 py-4 border-2 border-foreground/30 rounded-full font-semibold hover:bg-foreground/5 transition-all"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "hsl(var(--foreground))",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                📂 View Projects
              </motion.a>
            </motion.div>
          </Sparkles>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10] }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-foreground/40 flex justify-center pt-2 hover:border-foreground/80 transition-colors">
            <motion.div 
              className="w-1 h-2 bg-gradient-to-b from-foreground/60 to-foreground/20 rounded-full"
              animate={{ y: [0, 3] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 md:px-12 backdrop-blur-sm bg-gradient-to-b from-card/20 via-card/40 to-card/20 border-y border-indigo-500/20">
        {/* Accent Line */}
        <div className="absolute left-0 top-0 w-1 h-24 bg-gradient-to-b from-indigo-500 to-transparent"></div>
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <BackgroundGradientCard className="h-full hover:shadow-2xl hover:shadow-indigo-500/35 transition-all duration-300 border border-indigo-500/10 hover:border-indigo-500/40">
                <h3 className="text-2xl font-semibold mb-6 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-cyan-400">
                  <span className="mr-3 text-3xl">🎓</span> Education
                </h3>
                <div className="space-y-6">
                  <motion.div 
                    className="pb-4 border-b border-white/10"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="font-semibold text-lg">B.Tech AI & Data Science</h4>
                    <p className="text-foreground/70 text-sm">Vishwakarma Institute of IT, Pune</p>
                    <p className="text-foreground/60 text-xs">2024 – 2027 (Expected)</p>
                  </motion.div>
                  <motion.div 
                    className="pb-4 border-b border-white/10"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="font-semibold text-lg">Diploma in Computer Tech</h4>
                    <p className="text-foreground/70 text-sm">Government Polytechnic, Solapur</p>
                    <p className="text-foreground/60 text-xs">2021 – 2024</p>
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-lg">Senior Secondary</h4>
                    <p className="text-foreground/70 text-sm">Kai. Ravsaheb Patil Secondary School, Paranda</p>
                  </div>
                </div>
              </BackgroundGradientCard>
            </motion.div>
            <motion.div variants={itemVariants}>
              <SpotlightCard className="h-full hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 border border-indigo-500/10 hover:border-cyan-500/40">
                <h3 className="text-2xl font-semibold mb-6 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                  <span className="mr-3 text-3xl">👨‍💻</span> About Me
                </h3>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  A passionate developer with experience in web development, Android app development, and competitive programming. Currently pursuing B.Tech in Artificial Intelligence & Data Science at VIIT, Pune.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  My goal is to combine technical skills with innovative thinking to solve complex problems in the field of artificial intelligence and data science.
                </p>
              </SpotlightCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-background/60 via-indigo-950/20 to-background/40 backdrop-blur-md border-y border-indigo-500/20">
        {/* Accent Line */}
        <div className="absolute right-0 top-0 w-1 h-24 bg-gradient-to-b from-indigo-500 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-indigo-400 to-indigo-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {skillCategories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  className="h-full p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-indigo-900/40 hover:to-slate-900/60 rounded-2xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20"
                  whileHover={{
                    y: -5,
                    rotateX: 5,
                    rotateY: -5
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="font-semibold mb-4 flex items-center text-lg">
                    <span className="text-3xl mr-3 inline-block transform hover:scale-110 transition-transform">{category.icon}</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">{category.title}</span>
                  </h3>
                  <ul className="text-foreground/70 space-y-2">
                    {category.skills.map((skill, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-center group hover:text-foreground transition-colors"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 mr-2 group-hover:scale-150 transition-transform"></div>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6 md:px-12 backdrop-blur-sm bg-gradient-to-b from-card/40 via-card/20 to-card/40 border-y border-indigo-500/20">
        {/* Accent Line */}
        <div className="absolute left-0 top-0 w-1 h-24 bg-gradient-to-b from-indigo-500 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <div className="space-y-20">
            {projects.map((category, categoryIndex) => (
              <motion.div 
                key={categoryIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-slate-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
                  viewport={{ once: true }}
                >
                  {category.category}
                </motion.h3>
                {category.items.length > 0 ? (
                  <motion.div 
                    className="grid md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {category.items.map((project, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <ContentCard
                          className="min-h-[400px] group hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 overflow-hidden border border-indigo-500/10 hover:border-indigo-500/40 rounded-lg"
                          bgImage={project.bgImage}
                          overlayClassName="group-hover:from-background/98 group-hover:via-background/95 group-hover:to-background/90"
                        >
                          <motion.div 
                            className="flex h-full flex-col justify-end hover:bg-black/50 p-4 rounded-md"
                            whileHover={{ y: -10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          >
                            <h3 className="text-2xl font-bold mb-3 text-white line-clamp-2">{project.title}</h3>
                            <p className="text-white/95 mb-4 line-clamp-3 leading-relaxed">
                              {project.description}
                            </p>
                            <div className="mb-4">
                              <p className="text-white/80 text-sm mb-2 font-semibold">Tech Stack:</p>
                              <p className="text-white/75 text-xs">{project.techStack}</p>
                            </div>
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:text-blue-200 inline-flex items-center group/link transition-all"
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg className="w-5 h-5 mr-2 group-hover/link:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              View on GitHub
                              <svg
                                className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </motion.a>
                          </motion.div>
                        </ContentCard>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accomplishments Section */}
      <section id="accomplishments" className="relative py-32 px-6 md:px-12 backdrop-blur-sm bg-gradient-to-b from-background/40 via-indigo-950/20 to-background/60 border-y border-indigo-500/20">
        {/* Accent Line */}
        <div className="absolute right-0 top-0 w-1 h-24 bg-gradient-to-b from-indigo-500 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Awards & Accomplishments
          </motion.h2>
          <motion.div 
            className="grid sm:grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {accomplishments.map((accomplishment, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ContentCard
                  className="aspect-square hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group overflow-hidden border border-indigo-500/10 hover:border-cyan-500/40 rounded-lg"
                  bgImage={accomplishment.bgImage}
                  overlayClassName="group-hover:from-background/98 group-hover:via-background/95 group-hover:to-background/90"
                >
                  <motion.div 
                    className="flex h-full flex-col justify-end p-4 rounded-md"
                    whileHover={{ rotateZ: -1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start mb-3">
                      <motion.span 
                        className="text-4xl mr-2 flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {accomplishment.icon}
                      </motion.span>
                      <h3 className="text-lg font-bold text-white line-clamp-3 leading-tight">{accomplishment.title}</h3>
                    </div>
                    <p className="text-white/90 mb-2 text-xs line-clamp-2 leading-relaxed">
                      {accomplishment.description}
                    </p>
                    <ul className="space-y-1">
                      {accomplishment.details.slice(0, 2).map((detail, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start group/item hover:text-blue-300 transition-colors"
                          whileHover={{ x: 2 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 mr-2 mt-1 flex-shrink-0"></div>
                          <span className="text-white/80 text-xs line-clamp-2">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </ContentCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fun Game Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-slate-900/30 to-background/40 backdrop-blur-md border-y border-indigo-500/20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-slate-300 to-cyan-300">
              🎮 Ready for a Challenge?
            </h2>
            <p className="text-foreground/80 mb-8 text-lg">
              Test your reflexes with <span className="font-bold text-indigo-300">Code Guardian</span>! Dodge incoming bugs and rack up points. 🐛⚡
            </p>
            <motion.button
              onClick={() => setShowGame(true)}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-slate-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🎯 Play Code Guardian
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-background/40 via-indigo-950/30 to-background/60 backdrop-blur-md border-y border-indigo-500/20">
        {/* Accent Line */}
        <div className="absolute left-0 top-0 w-1 h-24 bg-gradient-to-b from-indigo-500 to-transparent"></div>
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-indigo-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <AnimatedCard className="p-8 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 border border-indigo-500/20 hover:border-indigo-500/50">
                <p className="text-foreground/80 mb-8 text-lg leading-relaxed">
                  I&apos;m always open to discussing new projects, opportunities, or partnerships. Let&apos;s connect!
                </p>
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center group cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-slate-700 rounded-full flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-indigo-500/50"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconMail className="text-white h-6 w-6" />
                    </motion.div>
                    <div>
                      <p className="text-foreground/60 text-sm">Email</p>
                      <p className="text-foreground/90 font-semibold">yeshmhaling0022@gmail.com</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center group cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 group-hover:shadow-lg group-hover:shadow-teal-500/50"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconPhone className="text-white h-6 w-6" />
                    </motion.div>
                    <div>
                      <p className="text-foreground/60 text-sm">Phone</p>
                      <p className="text-foreground/90 font-semibold">+91 82080 27577</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center group cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconMapPin className="text-white h-6 w-6" />
                    </motion.div>
                    <div>
                      <p className="text-foreground/60 text-sm">Location</p>
                      <p className="text-foreground/90 font-semibold">Pune, Maharashtra</p>
                    </div>
                  </motion.div>
                </div>
              </AnimatedCard>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col justify-center items-center md:items-end">
              <div className="w-full md:w-auto text-center md:text-right mb-8">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300">
                  Follow Me
                </h3>
                <p className="text-foreground/70 text-sm">Let&apos;s connect and collaborate</p>
              </div>
              <div className="flex gap-8 justify-center md:justify-end flex-wrap">
                {/* GitHub */}
                <motion.a 
                  href="https://github.com/Yash151005" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/50 group-hover:shadow-2xl border border-indigo-500/30 transition-all"
                    whileHover={{ rotate: 10 }}
                  >
                    <IconBrandGithub className="h-8 w-8 text-white group-hover:text-indigo-300 transition-colors" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-3 py-1.5 rounded-full text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none"
                    initial={{ opacity: 0, y: 0 }}
                    whileHover={{ opacity: 1, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    GitHub
                  </motion.div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a 
                  href="https://www.linkedin.com/in/yash-pakale-12a63a257" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-teal-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 group-hover:shadow-2xl border border-cyan-500/30 transition-all"
                    whileHover={{ rotate: 10 }}
                  >
                    <IconBrandLinkedin className="h-8 w-8 text-white group-hover:text-cyan-200 transition-colors" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-3 py-1.5 rounded-full text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none"
                    initial={{ opacity: 0, y: 0 }}
                    whileHover={{ opacity: 1, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    LinkedIn
                  </motion.div>
                </motion.a>

                {/* Instagram */}
                <motion.a 
                  href="https://www.instagram.com/yashpakale.swami" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-pink-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-pink-500/50 group-hover:shadow-2xl border border-pink-500/30 transition-all"
                    whileHover={{ rotate: 10 }}
                  >
                    <IconBrandInstagram className="h-8 w-8 text-white group-hover:text-pink-200 transition-colors" />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-3 py-1.5 rounded-full text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none"
                    initial={{ opacity: 0, y: 0 }}
                    whileHover={{ opacity: 1, y: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Instagram
                  </motion.div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 px-6 md:px-12 text-center backdrop-blur-sm border-t border-white/10 bg-gradient-to-b from-background/40 to-background/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.p 
          className="text-foreground/90 font-semibold text-sm md:text-base"
          whileHover={{ scale: 1.05 }}
        >
          © 2026 Yash Pakale. All rights reserved. | <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold">Built with Next.js & Framer Motion</span>
        </motion.p>
      </motion.footer>
    </AnimatedGradientBackground>
  );
}
