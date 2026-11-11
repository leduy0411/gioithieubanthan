/**
 * PORTFOLIO DATA - DUY
 * 
 * Lưu ý cho Duy: Toàn bộ dữ liệu cá nhân, kỹ năng, dự án và mạng xã hội
 * có thể dễ dàng cập nhật trực tiếp tại file này!
 */

export const personalInfo = {
  name: "Duy",
  fullName: "Nguyễn Văn Duy", /* [THAY ĐỔI: Họ và tên đầy đủ của bạn] */
  role: "BACKEND DEVELOPER",
  titleSuffix: "Building scalable, efficient and intelligent digital experiences.",
  avatarUrl: "/images/duy-portrait.svg", /* [THAY ĐỔI: Ảnh chân dung tham chiếu của bạn vào thư mục public/images/] */
  location: "Việt Nam (Open for Remote & Global Projects)",
  status: "AVAILABLE FOR OPPORTUNITIES",
  bioShort: "Tôi là Backend Developer chuyên sâu về thiết kế kiến trúc vi dịch vụ (Microservices), tối ưu hóa cơ sở dữ liệu lớn và xây dựng hệ thống phân tán chịu tải cao với độ trễ siêu thấp.",
  bioLong: [
    "Với niềm đam mê kiến trúc phần mềm hướng hiệu năng cao (High-performance Computing) và Clean Architecture, tôi tập trung giải quyết các bài toán phức tạp về concurrency, caching nhiều lớp và an toàn dữ liệu.",
    "Tôi không chỉ viết code để hệ thống chạy được, mà còn đảm bảo hệ thống có thể mở rộng (scale) mượt mà khi lượng traffic tăng đột biến, duy trì 99.99% uptime và chi phí hạ tầng tối ưu nhất."
  ],
  stats: [
    { label: "Năm Kinh Nghiệm", value: "3+", suffix: "" },
    { label: "Dự Án Hoàn Thành", value: "20+", suffix: "" },
    { label: "Uptime Hệ Thống", value: "99.99", suffix: "%" },
    { label: "Độ Trễ Giảm Thiểu", value: "-45", suffix: "%" }
  ],
  socials: {
    github: "https://github.com/duydev", /* [THAY ĐỔI: Link GitHub của bạn] */
    linkedin: "https://linkedin.com/in/duydev", /* [THAY ĐỔI: Link LinkedIn của bạn] */
    facebook: "https://facebook.com/duydev", /* [THAY ĐỔI: Link Facebook của bạn] */
    email: "duy.backend.dev@gmail.com", /* [THAY ĐỔI: Email liên hệ của bạn] */
    telegram: "https://t.me/duydev"
  }
}

export const skillCategories = [
  {
    id: "backend",
    name: "Backend Development",
    icon: "Server",
    skills: [
      { name: "Node.js / Express / NestJS", level: 92, tag: "Primary" },
      { name: "Python / FastAPI", level: 88, tag: "Primary" },
      { name: "Java / Spring Boot", level: 85, tag: "Core" },
      { name: "RESTful & GraphQL APIs", level: 95, tag: "Expert" },
      { name: "Microservices Architecture", level: 90, tag: "Architecture" },
      { name: "gRPC & Protocol Buffers", level: 82, tag: "High Perf" }
    ]
  },
  {
    id: "languages",
    name: "Programming Languages",
    icon: "Code2",
    skills: [
      { name: "TypeScript / JavaScript", level: 94, tag: "Daily" },
      { name: "Python", level: 90, tag: "Daily" },
      { name: "Java", level: 85, tag: "Advanced" },
      { name: "Go (Golang)", level: 80, tag: "Concurrent" },
      { name: "SQL (Complex Optimization)", level: 92, tag: "Database" }
    ]
  },
  {
    id: "database",
    name: "Database & Caching",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: 92, tag: "RDBMS" },
      { name: "MongoDB", level: 88, tag: "NoSQL" },
      { name: "Redis (Caching / Pub-Sub)", level: 95, tag: "In-Memory" },
      { name: "MySQL", level: 86, tag: "RDBMS" },
      { name: "Apache Kafka / RabbitMQ", level: 84, tag: "Message Broker" },
      { name: "Elasticsearch", level: 80, tag: "Search Engine" }
    ]
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    icon: "Cloud",
    skills: [
      { name: "Docker & Containerization", level: 90, tag: "DevOps" },
      { name: "Kubernetes (K8s)", level: 82, tag: "Orchestration" },
      { name: "AWS / Google Cloud (GCP)", level: 85, tag: "Cloud" },
      { name: "CI/CD (GitHub Actions)", level: 88, tag: "Automation" },
      { name: "Linux Server Administration", level: 86, tag: "System" }
    ]
  },
  {
    id: "frontend",
    name: "Frontend & Creative",
    icon: "Layout",
    skills: [
      { name: "React.js", level: 86, tag: "Modern UI" },
      { name: "Tailwind CSS", level: 92, tag: "Styling" },
      { name: "Three.js / WebGL", level: 78, tag: "3D Tech" },
      { name: "HTML5 / CSS3 / ESNext", level: 95, tag: "Standard" }
    ]
  }
]

export const projects = [
  {
    id: "nexus-core",
    title: "NexusCore – High-Throughput Microservices Engine",
    subtitle: "Enterprise Distributed Architecture",
    category: "Distributed Systems",
    description: "Hệ sinh thái vi dịch vụ xử lý 50,000+ RPS với độ trễ P99 < 15ms. Tích hợp Kafka event streaming, Redis distributed locking và kiến trúc CQRS phục vụ phân tích dữ liệu theo thời gian thực.",
    techStack: ["Node.js", "NestJS", "Apache Kafka", "Redis Cluster", "PostgreSQL", "Docker", "Kubernetes"],
    image: "/images/project-nexus.svg",
    previewGradient: "from-[#1558C9] to-[#030407]",
    stats: { rps: "50K+ req/s", latency: "14ms P99", uptime: "99.99%" },
    liveUrl: "https://demo-nexus.duydev.tech", /* [THAY ĐỔI: Link Demo thực tế của bạn] */
    githubUrl: "https://github.com/duydev/nexus-core", /* [THAY ĐỔI: Link GitHub của bạn] */
    featured: true
  },
  {
    id: "cyber-stream",
    title: "CyberStream – Real-Time Event & Metric Pipeline",
    subtitle: "High-Concurreny Data Pipeline",
    category: "Big Data & Streaming",
    description: "Hệ thống tổng hợp và phân tích log/metric từ hàng trăm node máy chủ trong thời gian thực. Hỗ trợ cảnh báo tự động qua Webhook, gRPC streaming và dashboard trực quan.",
    techStack: ["Go (Golang)", "FastAPI", "RabbitMQ", "ClickHouse", "Prometheus", "Grafana"],
    image: "/images/project-cyberstream.svg",
    previewGradient: "from-[#00D9FF] to-[#1558C9]",
    stats: { events: "10M+/day", alertTime: "< 500ms", compression: "78%" },
    liveUrl: "https://cyberstream.duydev.tech",
    githubUrl: "https://github.com/duydev/cyber-stream",
    featured: true
  },
  {
    id: "aura-pay",
    title: "AuraPay – Secure Payment & Webhook Gateway",
    subtitle: "Fintech Grade Security",
    category: "Fintech Security",
    description: "Cổng thanh toán bảo mật chuẩn PCI-DSS với cơ chế mã hóa bất đối xứng AES-256 & RSA, xác thực chữ ký số HMAC, chống tấn công Replay và tự động đối soát giao dịch ngân hàng.",
    techStack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "Stripe API", "MoMo API"],
    image: "/images/project-aurapay.svg",
    previewGradient: "from-[#1558C9] to-[#D4FF24]",
    stats: { security: "AES-256", successRate: "99.98%", fraudCheck: "0.02s" },
    liveUrl: "https://aurapay.duydev.tech",
    githubUrl: "https://github.com/duydev/aura-pay",
    featured: true
  },
  {
    id: "quantum-vault",
    title: "QuantumVault – Zero-Knowledge Cloud Storage API",
    subtitle: "Cryptographic Storage",
    category: "Cloud & Cryptography",
    description: "API lưu trữ file phân tán với mã hóa phía máy khách (Client-side Zero Knowledge Encryption). Tự động phân mảnh dữ liệu (Data Sharding) trên cụm S3 tương thích.",
    techStack: ["TypeScript", "Node.js", "AWS S3 / MinIO", "MongoDB", "CryptoJS", "Docker"],
    image: "/images/project-quantum.svg",
    previewGradient: "from-[#D4FF24] to-[#030407]",
    stats: { encryption: "Zero-Knowledge", redundancy: "3x Nodes", speed: "120MB/s" },
    liveUrl: "https://vault.duydev.tech",
    githubUrl: "https://github.com/duydev/quantum-vault",
    featured: false
  }
]

export const experiences = [
  {
    period: "2023 - HIỆN TẠI",
    role: "Senior Backend Developer",
    company: "Tech Architecture Labs", /* [THAY ĐỔI: Công ty hoặc Dự án của bạn] */
    description: "Chịu trách nhiệm thiết kế kiến trúc backend vi dịch vụ, lãnh đạo kỹ thuật cho nhóm core API, tối ưu hóa database queries và thiết lập quy trình triển khai CI/CD trên nền tảng Cloud.",
    skills: ["System Design", "Microservices", "Kafka", "PostgreSQL", "K8s"]
  },
  {
    period: "2021 - 2023",
    role: "Backend Engineer",
    company: "Digital Solutions Corp", /* [THAY ĐỔI: Công ty trước đây] */
    description: "Phát triển các RESTful APIs và Realtime services phục vụ hơn 200,000 người dùng hàng ngày. Tích hợp thanh toán, hệ thống xác thực JWT/OAuth2 và giám sát lỗi tự động.",
    skills: ["Node.js", "Express", "Redis", "Docker", "MongoDB"]
  },
  {
    period: "2018 - 2022",
    role: "Kỹ Sư Công Nghệ Thông Tin",
    company: "Đại Học Công Nghệ / Khoa Học Máy Tính", /* [THAY ĐỔI: Trường đại học của bạn] */
    description: "Tốt nghiệp chuyên ngành Công Nghệ Thông Tin. Nghiên cứu chuyên sâu về Thuật toán, Cấu trúc dữ liệu, Hệ điều hành, Mạng máy tính và An toàn bảo mật thông tin.",
    skills: ["Computer Science", "Algorithms", "Data Structures", "Database Systems"]
  }
]
