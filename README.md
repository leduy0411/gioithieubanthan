# DUY – FUTURISTIC INTERACTIVE DEVELOPER PORTFOLIO

Website Portfolio cá nhân cao cấp dành riêng cho **Duy – Backend Developer & Software Architect**, được thiết kế theo ngôn ngữ **Futuristic Technology, Premium Dark UI, Cyber Tech & Interactive 3D**.

---

## 🚀 Điểm Nhấn Dự Án

- **Hệ Thống Màu Nhận Diện Chuẩn 70-20-7**:
  - `70%` **Deep Space Black (#030407)** – Nền chính toàn bộ website, Navbar, Footer.
  - `20%` **Electric Blue (#1558C9)** – Viền công nghệ, ánh sáng neon, icon, nút bấm, gradient.
  - `7%` **Neon Lime (#D4FF24)** – Nút CTA chính, điểm nhấn năng lượng, chỉ báo active nav, status ping.
  - `3%` Màu phụ (#F5F7FA chữ trắng sáng, #9299A6 chữ phụ, #00D9FF Cyan accent).
- **Nhân Vật 3D Tương Tác (Three.js WebGL)**:
  - Nhân vật nam trẻ tuổi, mặc vest đen, áo sơ mi trắng, tư thế khoanh tay đĩnh đạc.
  - Tỷ lệ cơ thể cân đối tự nhiên (cổ vừa vặn, vai rộng, tay bắt chéo cân xứng).
  - Ánh sáng Cinematic 3-point: Key light xanh Electric Blue + Rim light vàng Neon Lime.
  - Hoạt ảnh Idle breathing (hít thở nhịp nhàng), Eyelid blinking (chớp mắt tự nhiên), và đầu xoay tracking theo chuyển động chuột của người dùng.
  - Chế độ Wireframe Toggle và Auto-rotate kiểm tra cấu trúc lưới 3D.
  - Tự động phát hiện và tải file `public/models/character.glb` nếu Duy bổ sung mô hình 3D riêng.
  - Cơ chế 2D Fallback mượt mà nếu thiết bị không bật WebGL.
- **Cyber HUD & Particle Background**:
  - Hệ thống hạt 3D (Three.js Particle System) bay bổng với hiệu ứng parallax theo chuột.
  - Mạng lưới CSS Animated Cyber Grid và hiệu ứng quét Hologram.
- **Màn Hình Tải Cyber (Loading Screen)**:
  - Khởi động hệ thống với thanh tiến trình gradient #1558C9 sang #D4FF24 và các dòng lệnh console.
- **Custom Cursor**:
  - Con trỏ laser chuyên biệt trên Desktop (vòng tròn Electric Blue + tâm ngắm Neon Lime), tự động tắt trên thiết bị cảm ứng di động.
- **Thiết Kế Responsive Đa Thiết Bị**:
  - Tối ưu cho Mobile (360px - 430px), Tablet, Laptop (1366x768) và Màn hình lớn (1920x1080).
  - Menu trượt (Mobile Glass Drawer) dễ thao tác bằng ngón tay.
- **Form Liên Hệ Xác Thực Thật**:
  - Kiểm tra tính hợp lệ dữ liệu trực tiếp (tên, email chuẩn, độ dài tin nhắn), hiệu ứng loading spinner và pháo hoa ăn mừng (`canvas-confetti`).
- **Sẵn Sàng Triển Khai Netlify**:
  - Tích hợp sẵn `netlify.toml` và `public/_redirects` giúp định tuyến SPA chuẩn xác, bảo mật HTTP headers và lưu cache tối ưu.

---

## 📁 Cấu Trúc Dự Án

```
web_gioithieubanthan/
│
├── public/
│   ├── _redirects              # Netlify SPA redirect
│   ├── favicon.svg             # Logo D chuẩn Cyber Tech
│   ├── models/                 # Thư mục chứa mô hình 3D (character.glb)
│   └── images/                 # Ảnh dự án và chân dung
│
├── src/
│   ├── components/
│   │   ├── Character3D.jsx     # Hệ thống 3D WebGL Avatar
│   │   ├── CustomCursor.jsx    # Con trỏ chuột tương tác
│   │   ├── CyberBackground.jsx # Background hạt 3D & Cyber grid
│   │   ├── LoadingScreen.jsx   # Màn hình chờ phong cách Cyber
│   │   ├── Navbar.jsx          # Thanh điều hướng Glassmorphism & Mobile Drawer
│   │   ├── SocialIcons.jsx     # Icon mạng xã hội Vector chuẩn
│   │   └── TechLogoD.jsx       # Logo cá nhân chữ D
│   │
│   ├── sections/
│   │   ├── HeroSection.jsx     # Hero 2 cột bất đối xứng
│   │   ├── AboutSection.jsx    # Giới thiệu & Triết lý kiến trúc
│   │   ├── SkillsSection.jsx   # Ma trận kỹ năng & Bộ lọc
│   │   ├── ProjectsSection.jsx # Dự án kiến trúc & Thước đo hiệu năng
│   │   ├── ExperienceSection.jsx # Timeline học tập & công tác
│   │   ├── ContactSection.jsx  # Form liên hệ & Kênh truyền tin
│   │   └── Footer.jsx          # Footer & Back-to-Top
│   │
│   ├── data/
│   │   └── portfolioData.js    # TẬP TRUNG TOÀN BỘ DỮ LIỆU CỦA BẠN TẠI ĐÂY
│   │
│   ├── styles/
│   │   └── globals.css         # CSS Variables & Hiệu ứng Cyber
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── netlify.toml                # Cấu hình Deploy Netlify
├── package.json
└── vite.config.js              # Cấu hình build & phân tách bundle
```

---

## 🛠️ Hướng Dẫn Tùy Chỉnh Cho Duy

### 1. Cập Nhật Thông Tin Cá Nhân & Dự Án
Mở file `src/data/portfolioData.js`:
- Thay đổi họ tên, email, liên kết mạng xã hội (GitHub, LinkedIn, Facebook).
- Thay đổi danh sách kỹ năng, điểm số thành thạo.
- Cập nhật thông tin các dự án thực tế và đường dẫn Live Demo/GitHub.

### 2. Bổ Sung / Thay Thế Mô Hình 3D
- Nếu bạn có file mô hình 3D dạng GLB/GLTF xuất từ Blender/Ready Player Me:
  - Đổi tên file thành `character.glb`.
  - Đặt vào thư mục `public/models/character.glb`.
  - Website sẽ tự động phát hiện và chuyển sang hiển thị mô hình của bạn!

### 3. Thay Thế Ảnh Chân Dung
- Đặt ảnh chân dung tham chiếu của bạn vào thư mục `public/images/duy-portrait.png` (hoặc `.svg`).

---

## 💻 Chạy Thử & Phát Triển

1. Cài đặt thư viện:
   ```bash
   npm install
   ```

2. Chạy môi trường phát triển (Dev server):
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại `http://localhost:5173/`.

3. Kiểm tra bản đóng gói sản phẩm (Production build):
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Hướng Dẫn Triển Khai Lên Netlify

1. Đẩy mã nguồn lên repository GitHub của bạn (`git init`, `git add .`, `git commit -m "feat: portfolio duy"`, `git push origin main`).
2. Đăng nhập vào [Netlify](https://www.netlify.app/).
3. Chọn **Add new site** > **Import an existing project** > Chọn GitHub repository của bạn.
4. Cấu hình build (đã được cấu hình tự động thông qua `netlify.toml`):
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
5. Nhấn **Deploy Site**. Sau khi hoàn tất, bạn có thể gán tên miền mong muốn như `duy-portfolio.netlify.app`.

---

## 🛠️ Hướng Dẫn Tùy Chỉnh Cho Duy

### 1. Cập Nhật Thông Tin Cá Nhân & Dự Án
Mở file `src/data/portfolioData.js`:
- Thay đổi họ tên, email, liên kết mạng xã hội (GitHub, LinkedIn, Facebook).
- Thay đổi danh sách kỹ năng, điểm số thành thạo.
- Cập nhật thông tin các dự án thực tế và đường dẫn Live Demo/GitHub.

### 2. Bổ Sung / Thay Thế Mô Hình 3D
- Nếu bạn có file mô hình 3D dạng GLB/GLTF xuất từ Blender/Ready Player Me:
  - Đổi tên file thành `character.glb`.
  - Đặt vào thư mục `public/models/character.glb`.
  - Website sẽ tự động phát hiện và chuyển sang hiển thị mô hình của bạn!

### 3. Thay Thế Ảnh Chân Dung
- Đặt ảnh chân dung tham chiếu của bạn vào thư mục `public/images/duy-portrait.png` (hoặc `.svg`).

---

## 💻 Chạy Thử & Phát Triển

1. Cài đặt thư viện:
   ```bash
   npm install
   ```

2. Chạy môi trường phát triển (Dev server):
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại `http://localhost:5173/`.

3. Kiểm tra bản đóng gói sản phẩm (Production build):
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Hướng Dẫn Triển Khai Lên Netlify

1. Đẩy mã nguồn lên repository GitHub của bạn (`git init`, `git add .`, `git commit -m "feat: portfolio duy"`, `git push origin main`).
2. Đăng nhập vào [Netlify](https://www.netlify.app/).
3. Chọn **Add new site** > **Import an existing project** > Chọn GitHub repository của bạn.
4. Cấu hình build (đã được cấu hình tự động thông qua `netlify.toml`):
   - **Build Command**: `npm run build`
   - **Publish directory**: `dist`
5. Nhấn **Deploy Site**. Sau khi hoàn tất, bạn có thể gán tên miền mong muốn như `duy-portfolio.netlify.app`.

#   g i o i t h i e u b a n t h a n 
 
 