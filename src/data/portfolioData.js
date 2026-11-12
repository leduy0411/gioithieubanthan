/**
 * PORTFOLIO DATA - DUY
 * 
 * Centralized profile configuration, social media matrix,
 * creative disciplines, and technical skills.
 */

export const personalInfo = {
  name: "Le Duy",
  fullName: "Le Duy",
  role: "Backend Developer • Graphic Designer • Video Editor",
  roleShort: "IT Engineer & Multidisciplinary Creator",
  titleSuffix: "Engineering robust backend architectures and crafting compelling visual & cinematic digital experiences.",
  subRoleQuote: "ENGINEERING SCALABLE SYSTEMS // CRAFTING TIMELESS VISUALS",
  avatarUrl: "/images/duy-portrait.png",
  location: "Tra Vinh Ward, Vinh Long Province, Vietnam",
  education: "Graduated Engineer in Information Technology (IT Engineer)",
  status: "OPEN FOR COLLABORATIONS & OPPORTUNITIES",
  email: "leduytctv2019@gmail.com",

  bioShort: "I am an Information Technology Engineer based in Tra Vinh Ward, Vinh Long Province, Vietnam. I bridge the worlds of robust backend software architecture, high-impact graphic design, and cinematic video editing.",

  bioLong: [
    "Holding a degree in Information Technology, I specialize in designing scalable backend services, high-concurrency APIs, and resilient database architectures. My engineering foundation ensures speed, security, and rock-solid uptime.",
    "Beyond pure code, I operate as a multidisciplinary visual artist. Through Adobe Photoshop, Illustrator, Premiere Pro, and After Effects, I produce brand identity systems, modern UI visuals, and dynamic motion video content with professional color grading.",
    "I communicate fluently across Vietnamese (Native), English, and Chinese. In my leisure time, you will find me capturing landscape photography, mixing tracks on the DJ deck, or passionately supporting FC Barcelona."
  ],

  languages: [
    { name: "Vietnamese", level: "Native / Bilingual", proficiency: 100 },
    { name: "English", level: "Professional Working", proficiency: 85 },
    { name: "Chinese", level: "Conversational & Technical", proficiency: 75 }
  ],

  interests: [
    {
      id: "photography",
      title: "Landscape Photography",
      desc: "Capturing scenic vistas, golden hours, and natural depth with precise framing & color science.",
      icon: "Camera",
      tag: "Visual Art"
    },
    {
      id: "djing",
      title: "DJing & Electronic Music",
      desc: "Blending rhythms, beatmatching, harmonic mixing, and crafting energetic soundscapes.",
      icon: "Disc",
      tag: "Sound & Vibe"
    },
    {
      id: "barcelona",
      title: "FC Barcelona",
      desc: "Proud supporter of the legendary Blaugrana spirit — Més que un club.",
      icon: "ShieldAlert",
      tag: "Football Passion",
      isBlaugrana: true
    }
  ],

  stats: [
    { label: "Engineering Disciplines", value: "3", suffix: " Core" },
    { label: "Completed Projects", value: "25", suffix: "+" },
    { label: "Languages Spoken", value: "3", suffix: " Global" },
    { label: "System Reliability", value: "99.99", suffix: "%" }
  ],

  // 5 Platforms STRICTLY wired up as mandated
  socialsList: [
    {
      id: "facebook",
      name: "Facebook",
      username: "Le Duy",
      handle: "@facebook/share",
      url: "https://www.facebook.com/share/1F5YrEn9Jb/?mibextid=wwXIfr",
      color: "#1877F2",
      glowColor: "rgba(24, 119, 242, 0.5)",
      badge: "Official Profile",
      desc: "Connect for professional updates, personal life, and tech community networking."
    },
    {
      id: "locket",
      name: "Locket",
      username: "ledi04",
      handle: "locket.cam/ledi04",
      url: "https://locket.cam/ledi04",
      color: "#FFB020",
      glowColor: "rgba(255, 176, 32, 0.55)",
      badge: "Live Widget Moments",
      desc: "Real-time candid photo sharing directly to the home screen widget."
    },
    {
      id: "instagram",
      name: "Instagram",
      username: "@leduy1104",
      handle: "@leduy1104",
      url: "https://www.instagram.com/leduy1104?mdxt=MWdscm55MnNnMjZpbw%3D%3D&utm_source=qr",
      color: "#E1306C",
      glowColor: "rgba(225, 48, 108, 0.5)",
      badge: "Visuals & Stories",
      desc: "Landscape photography snapshots, aesthetic lifestyle, and creative design reels."
    },
    {
      id: "tiktok",
      name: "TikTok",
      username: "@lee_duy04",
      handle: "@lee_duy04",
      url: "https://www.tiktok.com/@lee_duy04?_r=1&_t=ZS-9BKZrrsUP4f",
      color: "#00F2FE",
      glowColor: "rgba(0, 242, 254, 0.5)",
      badge: "Short-Form Video",
      desc: "Creative video edits, tech snippets, DJ sessions, and lifestyle clips."
    },
    {
      id: "gmail",
      name: "Gmail",
      username: "leduytctv2019@gmail.com",
      handle: "leduytctv2019@gmail.com",
      url: "mailto:leduytctv2019@gmail.com",
      color: "#EA4335",
      glowColor: "rgba(234, 67, 53, 0.5)",
      badge: "Direct Contact",
      desc: "Primary business inbox for backend engineering, design, or video projects."
    }
  ],

  socials: {
    facebook: "https://www.facebook.com/share/1F5YrEn9Jb/?mibextid=wwXIfr",
    locket: "https://locket.cam/ledi04",
    instagram: "https://www.instagram.com/leduy1104?mdxt=MWdscm55MnNnMjZpbw%3D%3D&utm_source=qr",
    tiktok: "https://www.tiktok.com/@lee_duy04?_r=1&_t=ZS-9BKZrrsUP4f",
    email: "leduytctv2019@gmail.com"
  }
}

export const skillCategories = [
  {
    id: "backend",
    name: "Backend Engineering",
    icon: "Server",
    skills: [
      { name: "Node.js / Express / NestJS", level: 92, tag: "Primary" },
      { name: "RESTful & GraphQL API Architecture", level: 95, tag: "Architecture" },
      { name: "PostgreSQL, MongoDB & Redis Cache", level: 90, tag: "Databases" },
      { name: "Microservices & Distributed Systems", level: 88, tag: "Systems" },
      { name: "Authentication, OAuth2 & API Security", level: 92, tag: "Security" },
      { name: "Docker Containerization & CI/CD", level: 85, tag: "DevOps" }
    ]
  },
  {
    id: "design",
    name: "Graphic Design",
    icon: "Palette",
    skills: [
      { name: "Adobe Photoshop (Photo Retouching & Compositing)", level: 94, tag: "Mastery" },
      { name: "Adobe Illustrator (Vector Branding & Logos)", level: 90, tag: "Vector" },
      { name: "Brand Identity Systems & Typography", level: 88, tag: "Branding" },
      { name: "Social Media Campaign Visuals & Posters", level: 95, tag: "Creative" },
      { name: "UI/UX Layout & Cyberpunk Aesthetic Direction", level: 92, tag: "Interface" }
    ]
  },
  {
    id: "video",
    name: "Video Editing",
    icon: "Video",
    skills: [
      { name: "Adobe Premiere Pro (Timeline & Narrative Assembly)", level: 95, tag: "Core Tool" },
      { name: "Adobe After Effects (Motion Graphics & VFX)", level: 88, tag: "Motion" },
      { name: "Cinematic Color Grading & LUT Calibration", level: 90, tag: "Color" },
      { name: "Audio Mastering, SFX & Beat Synchronization", level: 92, tag: "Audio" },
      { name: "Short-Form Edits (TikTok, Reels & Event Highlights)", level: 96, tag: "Viral Media" }
    ]
  }
]

export const creativeShowcase = [
  {
    title: "High-Throughput Microservice Engine",
    category: "Backend Engineering",
    desc: "Robust Node.js & Redis distributed gateway handling 20,000+ RPS with low latency P99.",
    tech: ["Node.js", "Redis", "PostgreSQL", "Docker"]
  },
  {
    title: "Cyberpunk Cybernetic Visual Identity",
    category: "Graphic Design",
    desc: "Futuristic neon brand guide, custom typography, social media assets, and vector key art.",
    tech: ["Photoshop", "Illustrator", "Brand Identity"]
  },
  {
    title: "Cinematic Landscape & Rhythm Sync",
    category: "Video Editing",
    desc: "High-octane short-form video edit featuring color-graded 4K footage synced to electronic beats.",
    tech: ["Premiere Pro", "After Effects", "Sound Sync"]
  }
]
