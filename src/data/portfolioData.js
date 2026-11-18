/**
 * PORTFOLIO DATA - LE DUY
 * 
 * Centralized profile configuration, real-world systems,
 * verified social matrix, and technical capabilities.
 */

export const personalInfo = {
  name: "Le Duy",
  fullName: "Le Duy",
  role: "Backend Engineer • Computer Vision & AI Integrations • Creative Technologist",
  roleShort: "Full-Stack IT Engineer & Creative Technologist",
  titleSuffix: "Designing high-performance backend systems, computer vision pipelines, and modern interactive digital experiences.",
  subRoleQuote: "ENGINEERING RESILIENT ARCHITECTURES // CRAFTING TACTILE EXPERIENCES",
  avatarUrl: "/images/duy-portrait.png",
  location: "Tra Vinh Ward, Vinh Long Province, Vietnam",
  timezone: "Asia/Ho_Chi_Minh",
  timezoneLabel: "Vinh Long, VN • GMT+7",
  education: "Graduated Engineer in Information Technology (IT Engineer)",
  status: "OPEN FOR FLAGSHIP COLLABORATIONS",
  email: "leduytctv2019@gmail.com",

  bioShort: "IT Engineer based in Vinh Long Province, Vietnam. I architect resilient backend microservices, deploy edge computer vision AI pipelines, and direct cinematic multimedia content.",

  bioLong: [
    "As an Information Technology Engineer, my core focus is building distributed backend architectures, high-concurrency API gateways, and real-time inference systems. I bridge classical database optimizations with modern ONNX Runtime and Gemini Agentic tool-calling workflows.",
    "Beyond software engineering, I maintain a disciplined visual and acoustic practice. Utilizing Adobe Photoshop, Illustrator, Premiere Pro, and After Effects, I engineer comprehensive design systems, typography hierarchy, and color-calibrated 4K motion edits.",
    "Trilingual communicator operating across Vietnamese (Native), English (Technical & Professional), and Chinese (Conversational). Outside production hours, I explore landscape photography with natural optics, mix harmonic 128 BPM electronic music on DJ decks, and follow FC Barcelona's Blaugrana tactical ethos."
  ],

  languages: [
    { name: "Vietnamese", level: "Native / Mother Tongue", code: "VIE" },
    { name: "English", level: "Professional & Technical Working", code: "ENG" },
    { name: "Chinese", level: "Conversational & Engineering Syntax", code: "ZHO" }
  ],

  interests: [
    {
      id: "djing",
      title: "DJing & Electronic Audio",
      desc: "Harmonic mixing, 128 BPM beatmatching, rhythmic synthesis, and high-energy electronic soundscapes.",
      meta: "128 BPM • Dual Decks • Harmonic Mix",
      tag: "Acoustic Engineering"
    },
    {
      id: "photography",
      title: "Landscape Photography",
      desc: "Capturing organic depth, golden hour horizons, and geometric environmental compositions.",
      meta: "f/1.8 • ISO 100 • RAW 35mm",
      tag: "Optical Geometry"
    },
    {
      id: "barcelona",
      title: "FC Barcelona",
      desc: "Lifelong Culér following the Blaugrana philosophy of positional play, creative freedom, and shared identity.",
      meta: "Més que un club // 1899",
      tag: "Blaugrana Spirit"
    }
  ],

  // Real, credible developer production metrics
  realMetrics: [
    { label: "AI Inference Latency", value: "< 180", unit: "ms", detail: "InsightFace ONNX Runtime" },
    { label: "Architecture Core", value: "REST / WS", unit: "dual", detail: "FastAPI + Express Gateways" },
    { label: "Production Stacks", value: "Node • Python", unit: "poly", detail: "TypeScript, FastAPI, Redis" },
    { label: "Visual Tool Mastery", value: "Adobe Suite", unit: "4K", detail: "PS, AI, PR, AE Direction" }
  ],

  // 4 Primary Verified Social Matrix (2x2 Grid)
  socialsList: [
    {
      id: "facebook",
      name: "Facebook",
      username: "Le Duy",
      handle: "facebook.com/leduy",
      url: "https://www.facebook.com/share/1F5YrEn9Jb/?mibextid=wwXIfr",
      color: "#1877F2",
      badge: "Verified Profile",
      desc: "Professional network updates, engineering insights, and tech community."
    },
    {
      id: "locket",
      name: "Locket",
      username: "ledi04",
      handle: "locket.cam/ledi04",
      url: "https://locket.cam/ledi04",
      color: "#FFB800",
      badge: "Realtime Widget",
      desc: "Live candid moments and behind-the-scenes engineering snapshots."
    },
    {
      id: "instagram",
      name: "Instagram",
      username: "@leduy1104",
      handle: "@leduy1104",
      url: "https://www.instagram.com/leduy1104?mdxt=MWdscm55MnNnMjZpbw%3D%3D&utm_source=qr",
      color: "#E1306C",
      badge: "Visual Feed",
      desc: "Landscape photography snapshots, graphic design art, and creative reels."
    },
    {
      id: "tiktok",
      name: "TikTok",
      username: "@lee_duy04",
      handle: "@lee_duy04",
      url: "https://www.tiktok.com/@lee_duy04?_r=1&_t=ZS-9BKZrrsUP4f",
      color: "#00F2FE",
      badge: "Motion Media",
      desc: "Short-form tech demos, video color grading showcases, and DJ sessions."
    }
  ]
}

export const skillCategories = [
  {
    id: "backend",
    name: "Backend & Systems Architecture",
    description: "High-throughput API microservices, distributed caching, and transactional database schemas.",
    icon: "Server",
    skills: [
      { name: "Node.js / Express / TypeScript", tag: "Primary Runtime", output: "RESTful & GraphQL API Gateways" },
      { name: "FastAPI / Python", tag: "Async Core", output: "High-speed AI Microservices" },
      { name: "PostgreSQL & MongoDB", tag: "Data Layer", output: "ACID Transactions & Document Store" },
      { name: "Redis Caching & PubSub", tag: "In-Memory", output: "Sub-millisecond Session & Rate Limiter" },
      { name: "Docker & Containerization", tag: "DevOps", output: "Reproducible Multi-stage Deployments" },
      { name: "OAuth2, JWT & API Security", tag: "SecOps", output: "RBAC, Token Rotation & Webhook Auth" }
    ]
  },
  {
    id: "ai-vision",
    name: "Computer Vision & Agentic AI",
    description: "Production edge inference, real-time facial feature vectorization, and LLM Tool Calling pipelines.",
    icon: "Cpu",
    skills: [
      { name: "InsightFace & ArcFace", tag: "Face Biometrics", output: "512-dimensional Feature Embeddings" },
      { name: "ONNX Runtime & OpenCV", tag: "Edge Inference", output: "Hardware-accelerated Frame Processing" },
      { name: "Gemini AI Tool Calling", tag: "Agentic LLM", output: "Autonomous Function Orchestration" },
      { name: "WebSockets Stream Ingestion", tag: "Real-time", output: "Low-latency Binary Camera Feeds" }
    ]
  },
  {
    id: "creative",
    name: "Visual Identity & Motion Production",
    description: "End-to-end creative direction, vector design systems, and broadcast-standard video post-production.",
    icon: "Palette",
    skills: [
      { name: "Adobe Photoshop", tag: "Pixel Master", output: "Photo Compositing, Retouching & Key Art" },
      { name: "Adobe Illustrator", tag: "Vector Geometry", output: "Identity Systems, Logos & Iconography" },
      { name: "Adobe Premiere Pro", tag: "Narrative Edit", output: "4K Timeline Pacing & Beat Synchronization" },
      { name: "Adobe After Effects", tag: "Kinetic Motion", output: "VFX, UI Interactions & Dynamic Typography" }
    ]
  }
]

// Real-world flagship projects
export const projectShowcase = [
  {
    id: "ai-attendance",
    name: "AI Face Recognition Biometric Attendance System",
    category: "AI & Computer Vision",
    filter: "ai",
    badge: "PRODUCTION READY",
    status: "ACTIVE TELEMETRY",
    image: "/images/project-cyberstream.svg",
    summary: "Real-time facial verification attendance system engineered with FastAPI, InsightFace ArcFace 512-d embeddings, ONNX Runtime acceleration, and React WebSockets.",
    focus: "Solves anti-spoofing liveness detection and sub-180ms multi-camera facial verification with transactional attendance record logging.",
    tech: ["FastAPI", "Python", "InsightFace", "ONNX Runtime", "OpenCV", "React 19", "WebSockets", "PostgreSQL"],
    metrics: [
      { label: "Verification Latency", val: "< 180ms" },
      { label: "Vector Dimension", val: "512-D" },
      { label: "False Match Rate", val: "< 0.001%" }
    ],
    liveUrl: "https://github.com/leduy",
    githubUrl: "https://github.com/leduy"
  },
  {
    id: "gemini-ecommerce",
    name: "Autonomous E-Commerce with Gemini AI Agent Tool Calling",
    category: "Full-Stack & Agentic AI",
    filter: "platform",
    badge: "FLAGSHIP APPLICATION",
    status: "AGENT ONLINE",
    image: "/images/project-aurapay.svg",
    summary: "Full-stack e-commerce engine integrated with Gemini API function calling for natural language product querying, dynamic cart synthesis, and inventory fulfillment.",
    focus: "Implements structured tool-calling schema, Redis cart caching, secure payment simulation, and multi-tenant catalog search.",
    tech: ["Node.js", "Express", "Gemini 2.5 API", "MongoDB", "Redis", "React 19", "Tailwind CSS v4"],
    metrics: [
      { label: "Agent Reasoning", val: "Zero-Shot" },
      { label: "Cart Cache", val: "< 2ms Redis" },
      { label: "Tool Schema", val: "JSON Strict" }
    ],
    liveUrl: "https://github.com/leduy",
    githubUrl: "https://github.com/leduy"
  },
  {
    id: "microservices-gateway",
    name: "High-Concurrency Microservices API Gateway",
    category: "Systems & Cloud Infrastructure",
    filter: "backend",
    badge: "DISTRIBUTED CORE",
    status: "99.99% UPTIME",
    image: "/images/project-nexus.svg",
    summary: "Distributed Node.js microservices gateway handling centralized authentication, dynamic rate limiting with token bucket algorithms, and Redis event caching.",
    focus: "Architected around zero-trust JWT validation, asynchronous worker queue dispatching, and Dockerized multi-service orchestration.",
    tech: ["Node.js", "TypeScript", "Redis Cluster", "PostgreSQL", "Docker", "Nginx", "JWT OAuth2"],
    metrics: [
      { label: "Rate Limiter", val: "Token Bucket" },
      { label: "Auth Verification", val: "RS256" },
      { label: "Container Orchestration", val: "Docker Compose" }
    ],
    liveUrl: "https://github.com/leduy",
    githubUrl: "https://github.com/leduy"
  },
  {
    id: "creative-direction-suite",
    name: "Cinematic Motion & Brand Identity Direction",
    category: "Creative Direction & VFX",
    filter: "creative",
    badge: "BROADCAST QUALITY",
    status: "MASTERED 4K",
    image: "/images/project-quantum.svg",
    summary: "Multidisciplinary creative production encompassing futuristic vector design identities, 4K color-graded commercial reels, and beat-synchronized motion graphics.",
    focus: "Delivering unified brand aesthetic across digital surfaces, strict typography hierarchy, LUT color calibration, and dynamic video pacing.",
    tech: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "After Effects", "DaVinci LUTs"],
    metrics: [
      { label: "Export Standard", val: "ProRes 4K" },
      { label: "Audio Alignment", val: "128 BPM" },
      { label: "Vector Grid", val: "Pixel Perfect" }
    ],
    liveUrl: "https://github.com/leduy",
    githubUrl: "https://github.com/leduy"
  }
]
