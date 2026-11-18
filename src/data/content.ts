/**
 * =======================================================================
 * SOURCE OF TRUTH (NGUỒN SỰ THẬT DUY NHẤT)
 * src/data/content.ts
 *
 * Toàn bộ thông tin cá nhân, dự án, kỹ năng, sở thích và đường dẫn.
 * Mọi component trong ứng dụng BẮT BUỘC đọc dữ liệu từ file này.
 * =======================================================================
 */

export interface ProjectMetric {
  label: string
  value: string
  isSimulatedOrArchitecture?: boolean
}

export interface ProjectItem {
  id: string
  title: string
  category: 'AI & VISION' | 'AGENTIC' | 'BACKEND' | 'VISUALS'
  categoryLabel: string
  summary: string
  architectureFocus: string
  techStack: string[]
  metrics: ProjectMetric[]
  previewType: 'biometric-scanner' | 'agentic-pipeline' | 'rate-limiter' | 'color-waveform'
  liveUrl: string | null // null nếu chưa có URL thực tế -> disable nút có tooltip
  githubUrl: string | null // null nếu chưa có URL thực tế -> disable nút có tooltip
  previewImage: string
}

export interface SkillItem {
  name: string
  tag: string
  productionOutput: string
}

export interface SkillCategory {
  id: 'backend' | 'ai-vision' | 'creative'
  title: string
  stationCode: string
  description: string
  skills: SkillItem[]
}

export interface HobbyItem {
  id: 'djing' | 'photography' | 'barcelona'
  title: string
  subtitle: string
  description: string
  telemetry: string
  badgeText: string
  accentColor: string
}

export interface SocialChannel {
  id: 'facebook' | 'locket' | 'instagram' | 'tiktok'
  name: string
  handle: string
  url: string
  color: string
  badge: string
  description: string
}

export const content = {
  // ─────────────────────────────────────────────────────────────────
  // ASTRONAUT DOSSIER // THÔNG TIN CÁ NHÂN & CĂN CỨ TRẠM
  // ─────────────────────────────────────────────────────────────────
  identity: {
    callsign: 'LE DUY.',
    fullName: 'Lê Duy',
    roles: [
      'Backend Systems Architect',
      'Computer Vision & ArcFace AI Engineer',
      'Creative Technologist & Visual Director',
      '4K Motion Designer & Video Editor',
    ],
    primaryRoleShort: 'IT Engineer • Backend Systems Architect • Creative Technologist',
    missionFocus: 'Distributed Backends, Edge Computer Vision & 4K Visual Direction',
    missionStatus: 'ALL SYSTEMS NOMINAL // OPEN FOR COLLABORATION',
    originBase: 'Tra Vinh Ward, Vinh Long Province, Vietnam',
    locationShort: 'Tra Vinh, Vinh Long, VN',
    timezone: 'Asia/Ho_Chi_Minh',
    timezoneLabel: 'Vinh Long • GMT+7',
    avatarUrl: '/images/duy-portrait.png',
    avatarCutoutUrl: '/images/duy-portrait-cutout.png',
    avatarSvgUrl: '/images/duy-portrait.svg',
    education: {
      degree: 'Kỹ sư Công nghệ Thông tin (IT Engineer)',
      institution: 'Đại học Trà Vinh (Tra Vinh University)',
      status: 'Graduated / Certified Engineer',
    },
    languages: [
      { name: 'Vietnamese', level: 'Native / Mother Tongue', code: 'VIE' },
      { name: 'English', level: 'Professional & Technical Working', code: 'ENG' },
      { name: 'Chinese', level: 'Conversational & Syntax Technical', code: 'ZHO' },
    ],
    email: 'leduytctv2019@gmail.com',
  },

  // ─────────────────────────────────────────────────────────────────
  // MISSION DOSSIER // TIỂU SỬ NGẮN GỌN (3 ĐOẠN SÚC TÍCH)
  // ─────────────────────────────────────────────────────────────────
  bio: [
    'Tốt nghiệp Kỹ sư Công nghệ Thông tin tại Đại học Trà Vinh, tôi chuyên sâu vào thiết kế kiến trúc backend phân tán, cổng API thông lượng cao và hệ thống suy luận thời gian thực.',
    'Tôi dung hợp giữa các kỹ thuật tối ưu hóa cơ sở dữ liệu truyền thống (PostgreSQL, MongoDB, Redis) với các pipeline xử lý AI cận biên (FastAPI, InsightFace ArcFace 512-d, ONNX Runtime) và điều phối tác tử tự động hóa (Gemini Tool Calling).',
    'Song hành cùng code, tôi duy trì tư duy thị giác và thẩm mỹ âm học khắt khe qua bộ công cụ Adobe Creative Suite (Photoshop, Illustrator, Premiere Pro, After Effects) để tạo nên các hệ thống nhận diện thương hiệu và ấn phẩm video chuyển động chuẩn 4K.',
  ],

  // ─────────────────────────────────────────────────────────────────
  // METRICS CÔNG VIỆC THẬT (Áp quy tắc số liệu thật: không tự phong 99.99%)
  // ─────────────────────────────────────────────────────────────────
  dossierMetrics: [
    {
      label: 'AI Inference Latency',
      value: '< 180 ms',
      detail: 'InsightFace ONNX Runtime (Kiểm thử thực tế)',
      isSimulated: false,
    },
    {
      label: 'Vector Embeddings',
      value: '512-D',
      detail: 'ArcFace Biometric Architecture (Chuẩn toán học)',
      isSimulated: false,
    },
    {
      label: 'Polyglot Core',
      value: 'Node • Python',
      detail: 'TypeScript, FastAPI, Redis, PostgreSQL',
      isSimulated: false,
    },
    {
      label: 'Visual Output',
      value: 'ProRes 4K',
      detail: 'Color-calibrated timeline, 128 BPM beat sync',
      isSimulated: false,
    },
  ],

  // ─────────────────────────────────────────────────────────────────
  // 4 DỰ ÁN THỰC TẾ (ORBITAL PAYLOADS)
  // Lưu ý: Đặt TODO_... rõ ràng cho các link chưa có repo cụ thể
  // ─────────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'ai-attendance',
      title: 'AI Face Recognition Biometric Attendance System',
      category: 'AI & VISION',
      categoryLabel: 'Computer Vision & Biometrics',
      summary:
        'Hệ thống điểm danh sinh trắc học khuôn mặt thời gian thực sử dụng FastAPI, InsightFace ArcFace trích xuất đặc trưng 512 chiều, tăng tốc suy luận bằng ONNX Runtime và truyền phát khung hình qua WebSockets.',
      architectureFocus:
        'Triển khai thuật toán chống giả mạo khuôn mặt (anti-spoofing liveness), vector search nhận diện đa luồng và ghi log điểm danh bất đồng bộ vào cơ sở dữ liệu giao dịch.',
      techStack: [
        'FastAPI',
        'Python',
        'InsightFace',
        'ONNX Runtime',
        'OpenCV',
        'React 19',
        'WebSockets',
        'PostgreSQL',
      ],
      metrics: [
        { label: 'Inference Time', value: '< 180ms', isSimulatedOrArchitecture: false },
        { label: 'Feature Vector', value: '512-D ArcFace', isSimulatedOrArchitecture: false },
        { label: 'Liveness Check', value: 'SIMULATED', isSimulatedOrArchitecture: true },
      ],
      previewType: 'biometric-scanner',
      // TODO_AI_ATTENDANCE_LIVE_URL: Thay bằng URL triển khai live thực tế nếu có
      liveUrl: null,
      // TODO_AI_ATTENDANCE_GITHUB_URL: Thay bằng URL repo GitHub cụ thể (e.g. https://github.com/leduy/face-attendance)
      githubUrl: 'https://github.com/leduy',
      previewImage: '/images/project-cyberstream.svg',
    },
    {
      id: 'gemini-ecommerce',
      title: 'Autonomous E-Commerce with Gemini AI Agent Tool Calling',
      category: 'AGENTIC',
      categoryLabel: 'Agentic LLM & E-Commerce Core',
      summary:
        'Hệ thống thương mại điện tử tích hợp Gemini API Function Calling cho phép người dùng tìm kiếm sản phẩm bằng ngôn ngữ tự nhiên, tác tử AI tự động trích xuất tham số lọc, tạo giỏ hàng và đồng bộ kho hàng.',
      architectureFocus:
        'Thiết kế JSON Schema nghiêm ngặt cho Function Calling, bộ đệm giỏ hàng Redis tốc độ cao và kiến trúc cơ sở dữ liệu MongoDB phục vụ đa chi nhánh.',
      techStack: [
        'Node.js',
        'Express',
        'Gemini 2.5 API',
        'MongoDB',
        'Redis',
        'React 19',
        'Tailwind CSS v4',
      ],
      metrics: [
        { label: 'Tool Schema', value: 'JSON Strict', isSimulatedOrArchitecture: false },
        { label: 'Redis Cart Cache', value: '< 2ms', isSimulatedOrArchitecture: false },
        { label: 'Agent Reasoning', value: 'SIMULATED', isSimulatedOrArchitecture: true },
      ],
      previewType: 'agentic-pipeline',
      // TODO_GEMINI_ECOMMERCE_LIVE_URL: Thay bằng URL demo thực tế
      liveUrl: null,
      // TODO_GEMINI_ECOMMERCE_GITHUB_URL: Thay bằng link repo GitHub cụ thể
      githubUrl: 'https://github.com/leduy',
      previewImage: '/images/project-aurapay.svg',
    },
    {
      id: 'microservices-gateway',
      title: 'High-Concurrency Microservices API Gateway',
      category: 'BACKEND',
      categoryLabel: 'Distributed Cloud Systems',
      summary:
        'Cổng API Gateway phân tán xây dựng trên Node.js/TypeScript, xử lý xác thực bảo mật OAuth2/JWT tập trung, thuật toán Token Bucket giới hạn tần suất truy cập (rate limiting) và hàng đợi tác vụ nền.',
      architectureFocus:
        'Kiến trúc Zero-Trust với khóa RS256 xoay vòng, bộ đệm phiên Redis Cluster chịu lỗi và đóng gói container độc lập bằng Docker Compose.',
      techStack: [
        'Node.js',
        'TypeScript',
        'Redis Cluster',
        'PostgreSQL',
        'Docker',
        'RS256 JWT',
        'Nginx',
      ],
      metrics: [
        { label: 'Algorithm', value: 'Token Bucket', isSimulatedOrArchitecture: false },
        { label: 'Key Format', value: 'RS256 Asymmetric', isSimulatedOrArchitecture: false },
        { label: 'Orchestration', value: 'Docker Compose', isSimulatedOrArchitecture: false },
      ],
      previewType: 'rate-limiter',
      // TODO_GATEWAY_LIVE_URL: Thay bằng URL live nếu có
      liveUrl: null,
      // TODO_GATEWAY_GITHUB_URL: Thay bằng link repo GitHub cụ thể
      githubUrl: 'https://github.com/leduy',
      previewImage: '/images/project-nexus.svg',
    },
    {
      id: 'creative-direction-suite',
      title: 'Cinematic Motion & Brand Identity Direction',
      category: 'VISUALS',
      categoryLabel: 'Motion VFX & Creative Systems',
      summary:
        'Bộ sưu tập nhận diện thương hiệu số và hậu kỳ video chuẩn điện ảnh 4K: từ bản vẽ vector typography, ấn phẩm đồ họa đến dựng nhịp timeline khớp với từng nhịp bass âm nhạc 128 BPM.',
      architectureFocus:
        'Hệ thống lưới đồ họa chuẩn xác (pixel-perfect grid), hiệu chỉnh màu sắc LUT chuyên nghiệp và diễn hoạt đồ họa chuyển động VFX không gián đoạn.',
      techStack: [
        'Adobe Photoshop',
        'Adobe Illustrator',
        'Adobe Premiere Pro',
        'Adobe After Effects',
        'DaVinci LUTs',
      ],
      metrics: [
        { label: 'Master Output', value: 'ProRes 4K', isSimulatedOrArchitecture: false },
        { label: 'Acoustic Lock', value: '128 BPM', isSimulatedOrArchitecture: false },
        { label: 'Vector Geometry', value: 'Infinite 8K', isSimulatedOrArchitecture: false },
      ],
      previewType: 'color-waveform',
      // TODO_CREATIVE_SHOWCASE_URL: Thay bằng Behance / Google Drive portfolio URL nếu có
      liveUrl: null,
      githubUrl: 'https://github.com/leduy',
      previewImage: '/images/project-quantum.svg',
    },
  ] as ProjectItem[],

  // ─────────────────────────────────────────────────────────────────
  // KỸ NĂNG & NĂNG LỰC (3 CỘT, KHÔNG DÙNG THANH %)
  // ─────────────────────────────────────────────────────────────────
  skillCategories: [
    {
      id: 'backend',
      title: 'Backend & Systems Architecture',
      stationCode: 'LAB-01 // CLOUD SYSTEMS',
      description:
        'Kiến trúc vi dịch vụ thông lượng cao, bộ nhớ đệm phân tán và bảo mật tầng dữ liệu chuẩn ACID.',
      skills: [
        {
          name: 'Node.js / Express / TypeScript',
          tag: 'Primary Core',
          productionOutput: 'RESTful & GraphQL API Gateways',
        },
        {
          name: 'FastAPI / Python',
          tag: 'High-speed Async',
          productionOutput: 'Async AI Inference Microservices',
        },
        {
          name: 'PostgreSQL & MongoDB',
          tag: 'Persistence Layer',
          productionOutput: 'ACID Transaction Schemas & Document Stores',
        },
        {
          name: 'Redis Caching & PubSub',
          tag: 'In-Memory',
          productionOutput: 'Sub-millisecond Session & Token Bucket Rate Limiter',
        },
        {
          name: 'Docker & Containerization',
          tag: 'DevOps / Infra',
          productionOutput: 'Multi-stage Reproducible Builds',
        },
        {
          name: 'OAuth2, RS256 JWT & SecOps',
          tag: 'Security Protocol',
          productionOutput: 'RBAC Authorization & Webhook Cryptographic Verification',
        },
      ],
    },
    {
      id: 'ai-vision',
      title: 'Computer Vision & Agentic AI',
      stationCode: 'LAB-02 // NEURAL & EDGE',
      description:
        'Triển khai mô hình thị giác máy tính tại biên và điều phối tác tử trí tuệ nhân tạo tương tác theo ngữ cảnh.',
      skills: [
        {
          name: 'InsightFace & ArcFace',
          tag: 'Biometrics Core',
          productionOutput: '512-dimensional Facial Feature Embeddings',
        },
        {
          name: 'ONNX Runtime & OpenCV',
          tag: 'Inference Engine',
          productionOutput: 'Hardware-accelerated Multi-stream Frame Ingestion',
        },
        {
          name: 'Gemini AI Tool Calling',
          tag: 'Agentic LLM',
          productionOutput: 'Autonomous Function & JSON Schema Orchestration',
        },
        {
          name: 'WebSockets Binary Streaming',
          tag: 'Low-latency Realtime',
          productionOutput: 'Real-time Camera Feed Synchronization',
        },
      ],
    },
    {
      id: 'creative',
      title: 'Visual Identity & Motion Production',
      stationCode: 'LAB-03 // OPTICAL & ACOUSTIC',
      description:
        'Định hình bản sắc thương hiệu số, typography có chiều sâu và sản xuất video điện ảnh 4K nhịp điệu cao.',
      skills: [
        {
          name: 'Adobe Photoshop',
          tag: 'Raster Mastery',
          productionOutput: 'Photo Retouching, Compositing & Key Visuals',
        },
        {
          name: 'Adobe Illustrator',
          tag: 'Vector Precision',
          productionOutput: 'Brand Identity Systems, Logos & Iconography',
        },
        {
          name: 'Adobe Premiere Pro',
          tag: 'Narrative Edit',
          productionOutput: '4K Timeline Pacing & Acoustic Beat Alignment',
        },
        {
          name: 'Adobe After Effects',
          tag: 'Kinetic Motion',
          productionOutput: 'VFX Compositing, UI Animation & Kinetic Typography',
        },
      ],
    },
  ] as SkillCategory[],

  // ─────────────────────────────────────────────────────────────────
  // BEYOND CODE // SỞ THÍCH CÁ NHÂN (3 THẺ MICRO-BENTO TỐI GIẢN)
  // ─────────────────────────────────────────────────────────────────
  hobbies: [
    {
      id: 'djing',
      title: 'DJing & Electronic Audio',
      subtitle: 'Acoustic Momentum & Synthesis',
      description:
        'Khả năng hòa âm (harmonic mixing), căn nhịp chuẩn xác (beatmatching) và điều khiển năng lượng âm học qua các set nhạc điện tử nhịp độ 128 BPM.',
      telemetry: '128 BPM LOCKED // DUAL DECKS',
      badgeText: 'ELECTRONIC SOUND',
      accentColor: '#38BDF8',
    },
    {
      id: 'photography',
      title: 'Landscape Photography',
      subtitle: 'Optical Depth & Natural Horizons',
      description:
        'Quan sát không gian tự nhiên bằng ống kính quang học, bắt trọn khoảnh khắc hoàng hôn và hình học môi trường với màu sắc được hiệu chỉnh chuẩn RAW.',
      telemetry: 'f/1.8 • ISO 100 • RAW 35mm',
      badgeText: 'NATURAL OPTICS',
      accentColor: '#F59E0B',
    },
    {
      id: 'barcelona',
      title: 'FC Barcelona',
      subtitle: 'Positional Tactical Ethos',
      description:
        'Niềm đam mê trung thành với triết lý bóng đá vị nghệ thuật Blaugrana — tính đồng đội, kỷ luật vị trí và tự do sáng tạo trong không gian hẹp.',
      telemetry: 'Més que un club // 1899',
      badgeText: 'CULÉR // BLAUGRANA',
      accentColor: '#A50044',
    },
  ] as HobbyItem[],

  // ─────────────────────────────────────────────────────────────────
  // DIRECT UPLINK // MA TRẬN 4 KÊNH LIÊN HỆ ĐÃ XÁC MINH (2X2 GRID)
  // ─────────────────────────────────────────────────────────────────
  socials: [
    {
      id: 'facebook',
      name: 'Facebook',
      // Lưu ý: Prompt đề xuất fb.com/leduy; URL thực trong repo là share link:
      handle: 'fb.com/leduy',
      url: 'https://www.facebook.com/share/1F5YrEn9Jb/?mibextid=wwXIfr',
      color: '#1877F2',
      badge: 'Official Profile',
      description: 'Mạng lưới nghề nghiệp, cập nhật công nghệ và kết nối cộng đồng kỹ thuật.',
    },
    {
      id: 'locket',
      name: 'Locket',
      handle: 'locket.cam/ledi04',
      url: 'https://locket.cam/ledi04',
      color: '#FFB800',
      badge: 'Live Widget',
      description: 'Khoảnh khắc chân thực đời thường và góc nhìn hậu trường kỹ thuật qua widget.',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@leduy1104',
      url: 'https://www.instagram.com/leduy1104?mdxt=MWdscm55MnNnMjZpbw%3D%3D&utm_source=qr',
      color: '#E1306C',
      badge: 'Visual Stream',
      description: 'Kho ảnh chụp phong cảnh, tác phẩm thiết kế đồ họa và video sáng tạo ngắn.',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@lee_duy04',
      url: 'https://www.tiktok.com/@lee_duy04?_r=1&_t=ZS-9BKZrrsUP4f',
      color: '#00F2FE',
      badge: 'Motion Media',
      description: 'Video ngắn trình diễn công nghệ, clip âm nhạc điện tử và chỉnh màu phim.',
    },
  ] as SocialChannel[],
} as const
