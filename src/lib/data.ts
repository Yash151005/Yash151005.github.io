export const profile = {
  name: "Yash Pakale",
  role: "AI Engineer & Full-Stack Developer",
  location: "Pune, India",
  timezone: "Asia/Kolkata",
  email: "yashpakale99@gmail.com",
  phone: "+91 82080 27577",
  resume: "/resume.pdf",
  github: "https://github.com/Yash151005",
  linkedin: "https://www.linkedin.com/in/yash-pakale-12a63a257",
  instagram: "https://www.instagram.com/yashpakale.swami",
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  description: string;
  stack: string[];
  github?: string;
  org?: string;
};

export const featured: Project = {
  slug: "dataforge",
  title: "DataForge AI",
  kind: "Industry project",
  org: "Rubiscape",
  summary: "AI-powered data preparation pipeline",
  description:
    "An AI-driven data preparation pipeline built with Rubiscape. It takes messy raw data and turns it into reliable, analysis-ready datasets, automating the cleaning and validation work that usually slows down every analytics team.",
  stack: ["Machine Learning", "Data Pipelines", "Data Quality", "Python"],
};

export const projects: Project[] = [
  {
    slug: "autofix",
    title: "AutoFix AI",
    kind: "Computer Vision",
    summary: "Vehicle damage detection & repair-cost estimation",
    description:
      "End-to-end vision pipeline: a YOLO model finds exterior damage in a photo, classifies it, and turns that into a repair-cost estimate in real time. It covers the whole path from image upload to a result someone can act on.",
    stack: ["YOLO", "Python", "Computer Vision", "Model Deployment"],
    github: "https://github.com/yash151005/AutoFix-AI",
  },
  {
    slug: "saferoute",
    title: "SafeRoute.AI",
    kind: "Machine Learning",
    summary: "Real-time safety scoring for navigation routes",
    description:
      "Scores routes by combining crime records, time-of-day patterns and environmental signals, so a navigation choice can weigh safety as well as distance.",
    stack: ["Python", "Machine Learning", "Data Engineering", "APIs"],
    github: "https://github.com/yash151005/SafeRoute-AI",
  },
  {
    slug: "reliefreach",
    title: "ReliefReach AI",
    kind: "Predictive ML",
    summary: "Disaster-impact prediction for governments & NGOs",
    description:
      "Combines satellite, weather and on-the-ground reports to forecast where a disaster will hit hardest and where relief resources should go first.",
    stack: ["Predictive Modelling", "Data Pipelines", "Cloud Architecture"],
    github: "https://github.com/yash151005/ReliefReach-AI",
  },
  {
    slug: "biasscope",
    title: "BiasScope",
    kind: "Responsible AI",
    summary: "Bias & fairness auditing for ML models",
    description:
      "Audits trained models for bias across demographic groups using industry-standard fairness metrics, then explains the gaps through visual reports.",
    stack: ["Python", "Fairness Metrics", "Statistics", "Visual Analytics"],
    github: "https://github.com/yash151005/BiasScope",
  },
  {
    slug: "teamsync",
    title: "TeamSync",
    kind: "Full-Stack",
    summary: "Skill-based hackathon teammate matching",
    description:
      "A mobile-first platform that matches hackathon participants by skills, roles and interests, with OTP-based authentication and live availability.",
    stack: ["React", "Node.js", "Recommendation", "OTP Auth"],
    github: "https://github.com/yash151005/TeamSync",
  },
  {
    slug: "bidding",
    title: "Freelance Bidding Platform",
    kind: "Full-Stack",
    summary: "Auction marketplace with multi-criteria bid selection",
    description:
      "A MERN marketplace whose bidding algorithm automatically selects the best bid on multiple criteria, not just the lowest price.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/yash151005/Freelance-Bidding-Platform",
  },
];

export const publications = [
  {
    title: "Student Attention Detection System: Real-Time Classroom Engagement Monitoring Using Computer Vision and Deep Learning",
    venue: "IEEE Xplore",
    area: "Computer Vision · Deep Learning",
    link: "https://ieeexplore.ieee.org/document/11735961",
  },
  {
    title: "Brain Frequency Analysis for Concentration Level Prediction",
    venue: "IEEE Xplore",
    area: "Signal Processing · Machine Learning",
    link: "https://ieeexplore.ieee.org/document/11747711/",
  },
];

export const recognition = [
  { year: "2024", place: "1st", title: "AIForge Hackathon", org: "Vishwakarma Institute of Technology, Pune" },
  { year: "2024", place: "2nd", title: "Open Innovation Hackathon", org: "PES's Modern College of Engineering, Pune" },
  { year: "2024", place: "Top 10%", title: "Mumbai Hacks", org: "Out of 5,500+ participants" },
  { year: "2024", place: "2nd", title: "GDG Gen AI Quiz", org: "Google Developer Groups" },
  { year: "2024", place: "3rd", title: "State Level Quiz, Engineers' Day", org: "Institution of Engineers (India), Latur" },
  { year: "2024", place: "Cert.", title: "Artificial Intelligence Bootcamp", org: "C-DAC Pune" },
];

export const stack = [
  {
    label: "AI / ML",
    items: ["Python", "Machine Learning", "Computer Vision", "YOLO", "Feature Engineering", "Model Evaluation", "Bias & Fairness", "Jupyter"],
  },
  {
    label: "Web",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "REST APIs", "Auth Systems", "HTML & CSS"],
  },
  {
    label: "Data & Infra",
    items: ["SQL", "MySQL", "MongoDB", "Docker", "Git & GitHub", "Real-time Data"],
  },
];

export const education = [
  { period: "2024 — 2027", title: "B.Tech, Artificial Intelligence & Data Science", place: "Vishwakarma Institute of Information Technology, Pune" },
  { period: "2021 — 2024", title: "Diploma, Computer Technology", place: "Government Polytechnic, Solapur" },
  { period: "Before 2021", title: "Secondary School", place: "Kai. Ravsaheb Patil Secondary School, Paranda" },
];
