"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { AnimatedCard } from "@/components/ui/animated-cards";
import { Sparkles } from "@/components/ui/sparkles";
import { ThemeToggle } from "@/components/theme-toggle";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import { BackgroundGradientCard } from "@/components/ui/background-gradient-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ContentCard } from "@/components/ui/content-card";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { title: "About", href: "#about" },
    { title: "Skills", href: "#skills" },
    { title: "Accomplishments", href: "#accomplishments" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
  ];

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C", "JAVA", "SQL", "CPP", "JavaScript", "Python"],
      icon: "💻",
    },
    {
      title: "Web Development",
      skills: ["HTML", "Bootstrap", "Android App Development", "SDLC"],
      icon: "🌐",
    },
    {
      title: "Soft Skills",
      skills: ["Positive Attitude", "Time Management", "Teamwork", "Adaptability", "Competitive Programming"],
      icon: "🧠",
    },
  ];

  const projects = [
    {
      title: "E-Logistics Web Application",
      description: "Developed an innovative logistics web application to revolutionize transportation services, built with PHP, HTML, CSS, Bootstrap, and managed through phpMyAdmin. Features include user sign-up, login, shipment tracking, and the ability for users to join as delivery personnel.",
      tags: ["PHP", "HTML", "CSS", "Bootstrap", "phpMyAdmin"],
      link: "#",
      bgImage: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "Fitness Trainer Web App",
      description: "Developed a dynamic web application using Node.js, MongoDB, HTML, and CSS, serving as a bridge between fitness trainers and users. Trainers can create and manage fitness plans, specifying details and pricing. Users can browse, view descriptions, and purchase plans.",
      tags: ["Node.js", "MongoDB", "HTML", "CSS"],
      link: "#",
      bgImage: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      title: "SOS App",
      description: "Developed an Android application in Java and XML for emergency response. SOS App allows users to add emergency contacts and activate an SOS feature by shaking their phone to instantly share location with trusted contacts. Customizable alert settings ensure swift assistance in emergencies.",
      tags: ["Android", "Java", "XML"],
      link: "#",
      bgImage: "https://images.pexels.com/photos/3957616/pexels-photo-3957616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const accomplishments = [
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
    },
    {
      title: "Coding Premier League 2024",
      description: "Demonstrated coding excellence in competitive environment.",
      details: [
        "Actively participated in the Coding Premier League organized by the Coding Forum at VIIT",
        "Gained hands-on experience in coding and competitive problem-solving"
      ],
      icon: "💻",
      bgImage: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <AnimatedGradientBackground className="min-h-screen">
      {/* Navigation */}
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
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">YP</span>
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
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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
      <section className="relative pt-32 pb-20 px-6 md:px-12 flex flex-col items-center text-center min-h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
        <Image
            src="https://images.pexels.com/photos/17866470/pexels-photo-17866470/free-photo-of-waterfall-in-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Waterfall in Forest"
            fill
            className="object-cover opacity-20 dark:opacity-10"
          priority
        />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <Sparkles className="w-full">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6 mx-auto overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {/* Profile photo placeholder */}
              <Image
                src="/img.jpg"
                alt="Profile Photo"
                width={128}
                height={128}
                className="object-cover"
                priority
              />

            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Yash Pakale
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-3xl text-foreground/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              B.Tech Student in A.I. & D.S.
            </motion.h2>
            
            <motion.p 
              className="max-w-2xl text-lg text-foreground/70 mb-8 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A passionate developer with experience in web development, Android app development, and competitive programming. Currently pursuing B.Tech in Artificial Intelligence & Data Science at VIIT, Pune.
            </motion.p>
            
            <motion.div 
              className="flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:opacity-90 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
              <motion.a 
                href="#projects" 
                className="px-6 py-3 border rounded-md transition"
                style={{ borderColor: "hsl(var(--border))" }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "hsl(var(--accent))",
                  color: "hsl(var(--accent-foreground))"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>
          </Sparkles>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-foreground/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-foreground/50 rounded-full animate-[float_2s_ease-in-out_infinite]"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-12 backdrop-blur-sm bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <BackgroundGradientCard className="h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🎓</span> Education
              </h3>
              <div className="mb-6">
                <h4 className="font-medium">Vishwakarma Institute of Information Technology, Pune</h4>
                <p className="text-foreground/70">B.Tech in A.I. & D.S.</p>
                <p className="text-foreground/70">2024 - 2027</p>
                <p className="text-foreground/70">Pursuing</p>
              </div>
              <div className="mb-6">
                <h4 className="font-medium">Government Polytechnic Solapur</h4>
                <p className="text-foreground/70">Diploma in Computer Technology</p>
                <p className="text-foreground/70">2021 - 2024</p>
                <p className="text-foreground/70">Percentage: 91.89</p>
              </div>
              <div className="mb-6">
                <h4 className="font-medium">Kai. Ravsaheb Patil Secondary School Paranda</h4>
                <p className="text-foreground/70">Senior Secondary</p>
                <p className="text-foreground/70">Percentage: 91.40</p>
              </div>
            </BackgroundGradientCard>
            <SpotlightCard className="h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">👨‍💻</span> About Me
              </h3>
              <p className="text-foreground/70 mb-4">
                A passionate developer with experience in web development, Android app development, and competitive programming. Currently pursuing B.Tech in Artificial Intelligence & Data Science at VIIT, Pune.
              </p>
              <p className="text-foreground/70">
                My goal is to combine technical skills with innovative thinking to solve complex problems in the field of artificial intelligence and data science.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 md:px-12 bg-background/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Skills
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <AnimatedCard
                key={index}
                index={index}
                className="p-6"
              >
                <h3 className="font-semibold mb-4 flex items-center">
                  <span className="text-2xl mr-2">{category.icon}</span>
                  {category.title}
                </h3>
                <ul className="text-foreground/70 space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-2"></div>
                      {skill}
          </li>
                  ))}
                </ul>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 md:px-12 backdrop-blur-sm bg-card/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ContentCard
                key={index}
                className="min-h-[400px]"
                bgImage={project.bgImage}
              >
                <div className="flex h-full flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-white/90 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    className="text-white hover:text-blue-200 inline-flex items-center group"
                  >
                    View Project 
                    <svg 
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </ContentCard>
            ))}
          </div>
        </div>
      </section>

      {/* Accomplishments Section */}
      <section id="accomplishments" className="py-20 px-6 md:px-12 backdrop-blur-sm bg-card/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Accomplishments
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {accomplishments.map((accomplishment, index) => (
              <ContentCard
                key={index}
                className="min-h-[400px]"
                bgImage={accomplishment.bgImage}
                overlayClassName="group-hover:from-background/95 group-hover:via-background/95 group-hover:to-background"
              >
                <div className="flex h-full flex-col justify-end hover:bg-black/75 p-2 rounded-md">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{accomplishment.icon}</span>
                    <h3 className="text-2xl font-bold text-white">{accomplishment.title}</h3>
                  </div>
                  <p className="text-white/90 mb-4">
                    {accomplishment.description}
                  </p>
                  <ul className="space-y-2">
                    {accomplishment.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-white mr-2 mt-2"></div>
                        <span className="text-white/80">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ContentCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-12 bg-background/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedCard className="p-6">
              <p className="text-foreground/70 mb-6">
                I&apos;m always open to discussing new projects, opportunities, or partnerships.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <IconMail className="text-white h-5 w-5" />
                  </div>
                  <span className="text-foreground/70">yeshmhaling0022@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <IconPhone className="text-white h-5 w-5" />
                  </div>
                  <span className="text-foreground/70">+91 82080 27577</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <IconMapPin className="text-white h-5 w-5" />
                  </div>
                  <span className="text-foreground/70">Pune, Maharashtra</span>
                </div>
              </div>
            </AnimatedCard>
            <div className="flex flex-col gap-6 md:justify-center items-center md:items-end">
              <h3 className="text-xl font-semibold mb-2 md:text-right w-full">Connect With Me</h3>
              <div className="flex gap-4">
                <motion.a 
                  href="https://github.com/Yash151005" 
          target="_blank"
          rel="noopener noreferrer"
                  className="w-12 h-12 bg-card hover:bg-accent rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconBrandGithub className="h-6 w-6" />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/yash-pakale-12a63a257" 
          target="_blank"
          rel="noopener noreferrer"
                  className="w-12 h-12 bg-card hover:bg-accent rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconBrandLinkedin className="h-6 w-6" />
                </motion.a>
                <motion.a 
                  href="https://twitter.com" 
          target="_blank"
          rel="noopener noreferrer"
                  className="w-12 h-12 bg-card hover:bg-accent rounded-full flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconBrandTwitter className="h-6 w-6" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-8 px-6 md:px-12 text-center backdrop-blur-sm border-t"
        style={{ 
          color: "hsla(var(--foreground), 0.6)",
          borderColor: "hsla(var(--border), 0.4)"
        }}
      >
        <p>© {new Date().getFullYear()} Yash Pakale. All rights reserved.</p>
      </footer>
    </AnimatedGradientBackground>
  );
}
