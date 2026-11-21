export const profile = {
  name: "Yash Pakale",
  role: "AI Engineer, Data Scientist & Software Developer",
  location: "Pune, India",
  timezone: "Asia/Kolkata",
  email: "yashpakale56@gmail.com",
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
  demo?: string;
  org?: string;
};

const gh = (repo: string) => `https://github.com/Yash151005/${repo}`;

export const featured: Project = {
  slug: "dataforge",
  title: "DataForge AI",
  kind: "Industry project",
  org: "Rubiscape",
  summary: "AI-powered data preparation pipeline",
  description:
    "Turns messy raw data into validated, model-ready datasets by automating profiling, cleaning and schema checks.",
  stack: ["Python", "Machine Learning", "Data Pipelines", "Data Quality"],
  github: gh("dataforge-ai"),
};

export type ProjectGroup = { id: string; label: string; focus: string; projects: Project[] };

/** Featured work, grouped by discipline. */
export const projectGroups: ProjectGroup[] = [
  {
    id: "ai",
    label: "AI Engineering",
    focus: "Agents · LLMs · RAG",
    projects: [
      {
        slug: "docmind",
        title: "DocMind",
        kind: "Document AI",
        summary: "Document-to-action engine",
        description: "Turns contracts, reports and notes into action items, red flags and key decisions.",
        stack: ["LLMs", "NLP", "Information Extraction"],
        github: gh("docmind"),
      },
      {
        slug: "complygenie",
        title: "ComplyGenie AI",
        kind: "RAG",
        summary: "BIS standards recommendation engine",
        description: "Retrieval-augmented system that identifies the BIS standards applicable to an Indian small business's products.",
        stack: ["RAG", "LLMs", "Vector Search"],
        github: gh("ComplyGenie-AI"),
      },
      {
        slug: "synapse",
        title: "Synapse",
        kind: "Agentic AI",
        summary: "Voice-first agent marketplace",
        description: "Decomposes a goal, dispatches specialist agents in parallel and settles payments in USDC on Stellar.",
        stack: ["Multi-Agent", "Voice", "Stellar"],
        github: gh("Synapse"),
      },
      {
        slug: "pipelinesage",
        title: "PipelineSage AI",
        kind: "DevSecOps",
        summary: "CI/CD triage assistant",
        description: "Triages pipeline failures, flags risky code, suggests fixes and scores release readiness.",
        stack: ["LLMs", "CI/CD", "Code Analysis"],
        github: gh("PipelineSage-AI"),
      },
    ],
  },
  {
    id: "ds",
    label: "Data Science & ML",
    focus: "Forecasting · Privacy · Fairness",
    projects: [
      {
        slug: "fedscore",
        title: "FedScore",
        kind: "Federated Learning",
        summary: "Privacy-preserving credit scoring",
        description: "Scores credit-invisible users on alternative data (UPI, telecom) without sharing raw data between institutions.",
        stack: ["Federated Learning", "Credit Risk", "Privacy"],
        github: gh("FedScore"),
      },
      {
        slug: "climaguard",
        title: "ClimaGuard AI",
        kind: "Forecasting",
        summary: "Hyperlocal climate early warning",
        description: "Ward-level flood, heatwave and landslide risk map with a 72-hour forecast.",
        stack: ["Time Series", "Geospatial", "Risk Modelling"],
        github: gh("ClimaGuard-AI"),
      },
      {
        slug: "fairnexa",
        title: "FairNexa",
        kind: "Responsible AI",
        summary: "Fairness & explainability audits",
        description: "Probes a model's API, measures bias across groups and generates the audit report.",
        stack: ["Fairness Metrics", "XAI", "Reporting"],
        github: gh("FairNexa"),
      },
      {
        slug: "gendata",
        title: "GenData-Insight",
        kind: "Synthetic Data",
        summary: "Synthetic data quality evaluator",
        description: "KS, JS divergence and Wasserstein tests, autoencoder checks, plus ML-utility and privacy scores.",
        stack: ["Statistics", "Autoencoders", "Privacy"],
        github: gh("GenData-Insight"),
      },
    ],
  },
  {
    id: "sw",
    label: "Software & Computer Vision",
    focus: "Products · Vision · Web",
    projects: [
      {
        slug: "terravoxis",
        title: "TerraVoxis",
        kind: "NASA Space Apps 2026",
        summary: "Earth Information Jukebox",
        description: "Sonifies Earth-observation data, turning satellite measurements into sound.",
        stack: ["Earth Observation", "Data Sonification", "Web"],
        github: gh("TerraVoxis"),
        demo: "https://yash151005.github.io/TerraVoxis/",
      },
      {
        slug: "karigartrust",
        title: "KarigarTrust",
        kind: "Agentic Ledger",
        summary: "Two-sided gold ledger for jewellers",
        description: "Tracks gold issued, returned, wasted and settled between jewellers and goldsmiths, verified by both parties.",
        stack: ["Agents", "Ledger", "Full-Stack"],
        github: gh("KarigarTrust"),
      },
      {
        slug: "autofix",
        title: "AutoFix AI",
        kind: "Computer Vision",
        summary: "Vehicle damage detection & repair-cost estimation",
        description: "End-to-end pipeline that detects exterior vehicle damage with YOLO and estimates the repair cost.",
        stack: ["YOLO", "Python", "Deep Learning"],
        github: gh("AutofixAI"),
      },
      {
        slug: "sentineliq",
        title: "SentinelIQ",
        kind: "Finspark 2026",
        summary: "Insider-threat monitoring",
        description: "Hybrid ML anomaly detection with a live risk dashboard, built for Bank of Maharashtra.",
        stack: ["Anomaly Detection", "Security", "Dashboards"],
        github: gh("SentinelIQ"),
      },
    ],
  },
];

export type MiniProject = { title: string; summary: string; github: string };

/** Additional projects, listed compactly. */
export const moreProjects: { label: string; projects: MiniProject[] }[] = [
  {
    label: "AI Engineering",
    projects: [
      { title: "LifeOS", summary: "Action agent that plans, seeks approval, executes and verifies using SQLite-backed tools.", github: gh("LifeOS") },
      { title: "TestGenie AI", summary: "Generates QA test cases from requirements across multiple LLM providers.", github: gh("TestGenie-AI") },
      { title: "MandatePay AI", summary: "Agentic commerce with spending limits, human approval and a hash-chained audit log.", github: gh("MandatePay-AI") },
      { title: "Dead Reckoning", summary: "Infers full specifications for undocumented industrial parts from physics and vision.", github: gh("Dead-Reckoning") },
      { title: "KaamSetu AI", summary: "Multilingual, voice-first support system for informal and migrant workers.", github: gh("KaamSetu") },
      { title: "Nagrik Sahayak", summary: "Multilingual GenAI assistant for accessing government services.", github: gh("Nagrik-Sahayak") },
      { title: "EngageAI", summary: "Detects customer life events from transactions and triggers personalized engagement.", github: gh("EngageAI") },
      { title: "SentinelAI", summary: "Grooming-risk detection and evidence correlation (Hac'KP 2026).", github: gh("SentinelAI") },
      { title: "DrugGPT", summary: "Explainable drug-repurposing engine with a full-stack React interface.", github: gh("DrugGpt") },
      { title: "PAAL", summary: "Public AI Access Layer between citizens and government services.", github: gh("PAAL") },
      { title: "KSP Crime Intel", summary: "Local conversational AI over a police crime database with Ollama and Llama 3 (KSP Datathon 2026).", github: gh("ksp-ai") },
    ],
  },
  {
    label: "Data Science & ML",
    projects: [
      { title: "MindMirror AI", summary: "Stress detection from facial cues (OpenCV) and voice features (librosa MFCC).", github: gh("MindMirror-AI") },
      { title: "GraminPulse", summary: "Cash-flow forecasting and repayment-risk scoring for rural micro-enterprises.", github: gh("GraminPulse") },
      { title: "StockPulse AI", summary: "Snowflake-native inventory health intelligence for hospitals and NGOs.", github: gh("StockPulse-AI") },
      { title: "KSP Analytics", summary: "Crime analytics with hotspot maps, network graphs and a local LLM.", github: gh("ksp-analytics") },
      { title: "Candidate Ranker", summary: "Ranks the top 100 candidates for a role out of 100,000 applicants.", github: gh("redrob-candidate-ranker") },
      { title: "VeriESG", summary: "ESG compliance verification with smart contracts and ML anomaly detection.", github: gh("VeriESG") },
      { title: "Indradhanu", summary: "Climate resilience platform linking health, marine and circular-economy data with LSTM forecasts.", github: gh("Indradhanu") },
      { title: "GreenChain", summary: "Tracks fleet emissions against India's baseline, grades drivers and issues carbon credits.", github: gh("GreenChain") },
      { title: "SafeRoute.AI", summary: "Real-time safety scoring and safer route suggestions for pedestrians and drivers.", github: gh("Real-Time-Route-Safety-Scoring-System-for-Pedestrians-or-Vehicles") },
    ],
  },
  {
    label: "Software & Computer Vision",
    projects: [
      { title: "RailGuard", summary: "Real-time railway anomaly detection using a rules and Llama 3 hybrid.", github: gh("RailGuard") },
      { title: "VisionGuard AI", summary: "Explainable OpenCV visual-inspection agent for images and video.", github: gh("VisionGuard-AI") },
      { title: "FocusGuard", summary: "Flask and MediaPipe student attention monitoring from a webcam.", github: gh("Student-Attention-Detection") },
      { title: "FaceChain", summary: "Face detection and reverse search with an immutable on-chain record.", github: gh("FaceChain") },
      { title: "Offline Face Auth", summary: "Offline face recognition and liveness detection for field staff (NHAI hackathon).", github: gh("NHAI") },
      { title: "Road Crack Detection", summary: "Flask web app that detects and catalogues road cracks from images.", github: gh("smart-road-crack-detectction-web-app") },
      { title: "ProvenanceX", summary: "Registers and verifies the source and edit history of photos, videos and files.", github: gh("PROVENANCEX") },
      { title: "RoadBid", summary: "Transparent road-repair tendering for officers, contractors and citizens.", github: gh("RoadBid") },
      { title: "Noted.", summary: "Converts symptom logs into doctor-ready timelines and PDF reports.", github: gh("Symptomline") },
      { title: "CareCircle", summary: "Shared medication and appointment manager for elderly care.", github: gh("CareCircle") },
      { title: "SteadyStep", summary: "Adaptive behavior-change coaching application.", github: gh("SteadyStep") },
      { title: "CLIMASCOPE", summary: "Evaluates whether available evidence supports a climate decision.", github: gh("CLIMASCOPE") },
      { title: "TeamSync", summary: "Mobile-first teammate discovery and matching for hackathons.", github: gh("TeamSync") },
      { title: "Freelance Bidding", summary: "Freelance marketplace with a weighted auction algorithm for bid selection.", github: gh("Freelance-bidding-platform") },
      { title: "AI Art Generator", summary: "Text-to-image generator supporting multiple diffusion models.", github: gh("ai-art-generator") },
    ],
  },
];

export const projectCount = 1 + projectGroups.reduce((n, g) => n + g.projects.length, 0) + moreProjects.reduce((n, g) => n + g.projects.length, 0);

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
  { place: "Cert.", title: "RAG & Agentic AI Professional Certificate", org: "IBM" },
  { place: "Cert.", title: "Full Stack Software Developer Professional Certificate", org: "IBM" },
];

export const stack = [
  {
    label: "AI Engineering",
    items: ["LLM Agents", "RAG", "Claude", "GPT", "Gemini", "Ollama", "Streamlit"],
  },
  {
    label: "Machine Learning & Data",
    items: ["TensorFlow", "PyTorch", "Keras", "scikit-learn", "OpenCV", "MediaPipe", "YOLO", "pandas", "NumPy", "SciPy", "Plotly", "Snowflake"],
  },
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C", "C++", "Kotlin", "PHP", "SQL"],
  },
  {
    label: "Web, Backend & Tools",
    items: ["React", "Next.js", "Angular", "Node.js", "Express", "Django", "Flask", "MongoDB", "MySQL", "SQLite", "Firebase", "GCP", "Git", "Linux", "Jenkins"],
  },
];

export const education = [
  { period: "2024 – 2027", title: "B.Tech, Artificial Intelligence & Data Science", place: "VIIT, Pune" },
  { period: "2021 – 2024", title: "Diploma, Computer Technology", place: "Government Polytechnic, Solapur" },
];
