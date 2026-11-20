export const profile = {
  name: "Yash Pakale",
  role: "AI Engineer & Data Scientist",
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
    "Turns messy raw data into validated, analysis-ready datasets by automating profiling, cleaning and schema checks.",
  stack: ["Python", "Machine Learning", "Data Pipelines", "Data Quality"],
};

/** AI, ML and data science work, shown first. */
export const projects: Project[] = [
  {
    slug: "autofix",
    title: "AutoFix AI",
    kind: "Computer Vision",
    summary: "Vehicle damage detection & repair-cost estimation",
    description: "A YOLO model finds and classifies exterior damage in a photo, then estimates the repair cost in real time.",
    stack: ["YOLO", "Python", "Deep Learning", "Deployment"],
    github: "https://github.com/yash151005/AutoFix-AI",
  },
  {
    slug: "saferoute",
    title: "SafeRoute.AI",
    kind: "Predictive ML",
    summary: "Real-time safety scoring for routes",
    description: "Scores routes using crime, time-of-day and environmental data, served through REST APIs.",
    stack: ["Python", "ML", "Data Engineering", "APIs"],
    github: "https://github.com/yash151005/SafeRoute-AI",
  },
  {
    slug: "reliefreach",
    title: "ReliefReach AI",
    kind: "Predictive ML",
    summary: "Disaster-impact prediction",
    description: "Combines satellite, weather and ground reports to forecast impact and prioritise relief resources.",
    stack: ["Forecasting", "Data Pipelines", "Cloud"],
    github: "https://github.com/yash151005/ReliefReach-AI",
  },
  {
    slug: "biasscope",
    title: "BiasScope",
    kind: "Responsible AI",
    summary: "Bias & fairness auditing for ML models",
    description: "Measures disparate impact and demographic parity across groups, with visual reports.",
    stack: ["Python", "Fairness Metrics", "Statistics", "Data Viz"],
    github: "https://github.com/yash151005/BiasScope",
  },
];

/** Engineering work, shown in a smaller secondary list. */
export const engineering: Project[] = [
  {
    slug: "teamsync",
    title: "TeamSync",
    kind: "Full-Stack",
    summary: "Skill-based hackathon teammate matching",
    description: "MERN platform with OTP auth and recommendation-based matching.",
    stack: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/yash151005/TeamSync",
  },
  {
    slug: "bidding",
    title: "Freelance Bidding Platform",
    kind: "Full-Stack",
    summary: "Multi-criteria auction marketplace",
    description: "Picks the best bid on price, quality, timeline and rating.",
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
  { year: "2024", place: "1st", title: "AIForge Hackathon", org: "VIT Pune" },
  { year: "2024", place: "2nd", title: "Open Innovation Hackathon", org: "PES's Modern College of Engineering" },
  { year: "2024", place: "Top 10%", title: "Mumbai Hacks", org: "Out of 5,500+ participants" },
  { year: "2024", place: "2nd", title: "GDG Generative AI Quiz", org: "Google Developer Groups" },
  { year: "2024", place: "3rd", title: "State-Level Engineers' Day Quiz", org: "Institution of Engineers (India)" },
  { year: "2024", place: "Cert.", title: "Artificial Intelligence Bootcamp", org: "C-DAC Pune" },
];

export const stack = [
  {
    label: "Machine Learning",
    items: ["Python", "Deep Learning", "Computer Vision", "YOLO", "Feature Engineering", "Model Evaluation", "Fairness Metrics"],
  },
  {
    label: "Data Science",
    items: ["Data Analysis", "Statistics", "Predictive Analytics", "ETL & Pipelines", "Data Visualization", "Jupyter", "SQL"],
  },
  {
    label: "Engineering",
    items: ["JavaScript", "React", "Node.js", "REST APIs", "MongoDB", "MySQL", "Docker", "Git"],
  },
];

export const education = [
  { period: "2024 – 2027", title: "B.Tech, Artificial Intelligence & Data Science", place: "VIIT, Pune" },
  { period: "2021 – 2024", title: "Diploma, Computer Technology", place: "Government Polytechnic, Solapur" },
];
