"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

export const ResumeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-8 z-50 bg-background border border-white/10 rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-background/80 backdrop-blur">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Resume
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <IconX size={24} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Yash Pakale</h1>
                <p className="text-lg text-primary mb-4">AI & Data Science Undergraduate | ML Systems & Computer Vision Specialist</p>
                <p className="text-sm text-foreground/60">Pune, Maharashtra, India | yashpakale99@gmail.com | +91 82080 27577</p>
              </div>

              {/* Professional Summary */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Professional Summary</h3>
                <p className="text-foreground/80 leading-relaxed">
                  Artificial Intelligence and Data Science undergraduate with strong experience building production-grade ML systems, computer vision solutions, and full-stack applications. Proven ability to design scalable AI pipelines, REST APIs, and real-world systems using Python, YOLO, MERN stack, and cloud-ready architectures.
                </p>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Education</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-foreground">Vishwakarma Institute of Information Technology (VIIT)</h4>
                      <span className="text-xs text-foreground/60">2024 – 2027</span>
                    </div>
                    <p className="text-foreground/80">Bachelor of Technology in Artificial Intelligence & Data Science</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-foreground">Government Polytechnic Solapur</h4>
                      <span className="text-xs text-foreground/60">2021 – 2024</span>
                    </div>
                    <p className="text-foreground/80">Diploma in Computer Technology</p>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Programming Languages", skills: "Python, JavaScript, SQL, HTML, CSS" },
                    { title: "AI & Machine Learning", skills: "ML, Computer Vision, YOLO, Deep Learning, Model Evaluation, Feature Engineering" },
                    { title: "Web Development", skills: "React.js, Node.js, RESTful APIs, Express.js, Authentication, Responsive Design" },
                    { title: "Databases", skills: "MongoDB, MySQL, Query Optimization" },
                    { title: "Tools & Technologies", skills: "Git, GitHub, Docker, Postman, Jupyter, VS Code, CI/CD, Linux" },
                    { title: "Data Science", skills: "Data Analysis, Statistical Analysis, Data Pipelines, ETL, Visualization" },
                  ].map((skill, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="font-bold text-primary text-sm mb-2">{skill.title}</h4>
                      <p className="text-foreground/70 text-xs">{skill.skills}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Projects */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Featured Projects</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "AutoFix AI",
                      tech: "Python, YOLO, Computer Vision, ML",
                      desc: "Built end-to-end vehicle damage detection system using YOLO for automated insurance and repair assessment."
                    },
                    {
                      title: "SafeRoute.AI",
                      tech: "Python, ML, Data Engineering, REST APIs",
                      desc: "Developed ML-based route safety scoring system using crime, temporal, and environmental data."
                    },
                    {
                      title: "ReliefReach AI",
                      tech: "Python, Predictive ML, Cloud Architecture",
                      desc: "Designed AI-driven disaster response platform for impact prediction and resource optimization."
                    },
                    {
                      title: "TeamSync",
                      tech: "React.js, Node.js, MongoDB, REST APIs",
                      desc: "Developed full-stack hackathon team discovery platform with OTP-based authentication and skill-based matching."
                    },
                  ].map((project, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <h4 className="font-bold text-primary mb-1">{project.title}</h4>
                      <p className="text-xs text-purple-400 mb-2">{project.tech}</p>
                      <p className="text-foreground/70 text-sm">{project.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accomplishments */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">Accomplishments & Certifications</h3>
                <div className="space-y-2">
                  {[
                    "🥇 1st Place in AIForge Hackathon | Vishwakarma Institute of Technology",
                    "🥈 2nd place in Open Innovation Hackathon | GDCE PES",
                    "🥈 2nd Place, GDG Generative AI Quiz | Google Developer Groups",
                    "🥉 3rd Place, State-Level Engineers' Day Quiz | Institution of Engineers India",
                    "⭐ Top 10% Among 5500 Innovators | Mumbai Hacks",
                    "📜 Artificial Intelligence Bootcamp | C-DAC Pune",
                  ].map((achievement, idx) => (
                    <div key={idx} className="text-foreground/70 text-sm py-1">
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-3">Areas of Interest</h3>
                <div className="flex flex-wrap gap-2">
                  {["AI/ML", "Computer Vision", "NLP", "Full-Stack Development", "Cloud & DevOps", "System Design", "Open Source"].map((interest, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-foreground/80 text-xs font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-6 md:p-8 bg-background/80 backdrop-blur flex items-center justify-between">
              <p className="text-sm text-foreground/60">For more details, visit <span className="text-primary font-semibold">github.com/Yash151005</span></p>
              <a 
                href="/resume-viewer"
                className="text-sm px-4 py-2 bg-primary/20 border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors text-primary font-semibold"
              >
                View Full PDF →
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
