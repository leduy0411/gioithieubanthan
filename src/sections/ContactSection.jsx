import React, { useState } from 'react'
import { personalInfo } from '../data/portfolioData'
import confetti from 'canvas-confetti'
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Terminal,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedStatus, setSubmittedStatus] = useState(null) // 'success' | 'error' | null

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = 'Vui lòng nhập tên của bạn'
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Tên phải có ít nhất 2 ký tự'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errs.email = 'Vui lòng nhập địa chỉ email'
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Email không hợp lệ (ví dụ: name@example.com)'
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Vui lòng nhập tiêu đề tin nhắn'
    }

    if (!formData.message.trim()) {
      errs.message = 'Vui lòng nhập nội dung tin nhắn'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Nội dung tin nhắn cần tối thiểu 10 ký tự'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmittedStatus(null)

    try {
      // Simulate asynchronous transmission protocol / backend webhook
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Trigger celebratory cyber confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1558C9', '#D4FF24', '#00D9FF', '#FFFFFF']
      })

      setSubmittedStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setSubmittedStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="cyber-badge-lime mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>COMMS_LINK // TRANSMISSION</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
          INITIATE <span className="text-[#1558C9] text-glow-blue">CONNECTION</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-[#9299A6] mb-8">
          Bạn đang có dự án kiến trúc mới hoặc cần tư vấn giải pháp backend chịu tải cao? Hãy gửi tin nhắn trực tiếp cho tôi.
        </p>
        <div className="w-16 h-1 bg-[#D4FF24] rounded-full shadow-[0_0_10px_#D4FF24]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Channels & Information */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="cyber-card p-6 sm:p-8 rounded-2xl flex flex-col gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Thông Tin Trực Tiếp
              </h3>
              <p className="text-sm text-[#9299A6]">
                Kênh liên lạc trực tiếp luôn sẵn sàng tiếp nhận yêu cầu từ đối tác và các nhà tuyển dụng công nghệ.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href={`mailto:${personalInfo.socials.email}`}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-[#070B14] border border-[#1B2638] hover:border-[#1558C9] transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#1558C9]/20 text-[#00D9FF] group-hover:text-[#D4FF24] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#9299A6] uppercase block">DIRECT EMAIL</span>
                  <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#00D9FF] transition-colors">
                    {personalInfo.socials.email}
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#070B14] border border-[#1B2638]">
                <div className="p-2.5 rounded-lg bg-[#1558C9]/20 text-[#00D9FF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#9299A6] uppercase block">LOCATION</span>
                  <span className="text-sm font-semibold text-[#F5F7FA]">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#070B14] border border-[#1B2638]">
                <div className="p-2.5 rounded-lg bg-[#D4FF24]/15 text-[#D4FF24]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-[#9299A6] uppercase block">RESPONSE TIME</span>
                  <span className="text-sm font-semibold text-[#D4FF24]">
                    Trong vòng 24 giờ làm việc
                  </span>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="pt-4 border-t border-[#1B2638]">
              <span className="text-xs font-mono text-[#9299A6] uppercase block mb-3">
                KẾT NỐI MẠNG XÃ HỘI
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="p-3 rounded-xl bg-[#070B14] border border-[#1B2638] text-[#9299A6] hover:text-white hover:border-[#1558C9] hover:bg-[#1558C9]/20 transition-all"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="p-3 rounded-xl bg-[#070B14] border border-[#1B2638] text-[#9299A6] hover:text-[#00D9FF] hover:border-[#1558C9] hover:bg-[#1558C9]/20 transition-all"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>

                <a
                  href={personalInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="p-3 rounded-xl bg-[#070B14] border border-[#1B2638] text-[#9299A6] hover:text-[#1558C9] hover:border-[#1558C9] hover:bg-[#1558C9]/20 transition-all"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form with Validation */}
        <div className="lg:col-span-7">
          <div className="cyber-card p-6 sm:p-8 rounded-2xl relative">
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Gửi Tin Nhắn Cho Duy
            </h3>
            <p className="text-sm text-[#9299A6] mb-6">
              Điền thông tin vào biểu mẫu bảo mật bên dưới để bắt đầu trao đổi.
            </p>

            {/* Submission Status Alerts */}
            {submittedStatus === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-[#D4FF24]/10 border border-[#D4FF24] text-[#D4FF24] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold">ĐÃ GỬI TIN NHẮN THÀNH CÔNG!</div>
                  <div className="text-xs text-[#F5F7FA] mt-0.5">
                    Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi lại bạn qua email trong thời gian sớm nhất.
                  </div>
                </div>
              </div>
            )}

            {submittedStatus === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500 text-red-400 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold">KHÔNG THỂ GỬI TIN NHẮN</div>
                  <div className="text-xs text-[#F5F7FA] mt-0.5">
                    Đã xảy ra sự cố truyền tin. Vui lòng thử lại hoặc gửi trực tiếp qua email: {personalInfo.socials.email}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-mono text-[#9299A6] uppercase mb-1.5">
                    HỌ VÀ TÊN <span className="text-[#D4FF24]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border text-[#F5F7FA] text-sm focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#1B2638] focus:border-[#1558C9]'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] text-red-400 mt-1 block font-mono">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-mono text-[#9299A6] uppercase mb-1.5">
                    EMAIL LIÊN HỆ <span className="text-[#D4FF24]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border text-[#F5F7FA] text-sm focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[#1B2638] focus:border-[#1558C9]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-400 mt-1 block font-mono">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-mono text-[#9299A6] uppercase mb-1.5">
                  TIÊU ĐỀ DỰ ÁN / YÊU CẦU <span className="text-[#D4FF24]">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Ví dụ: Hợp tác dự án Backend Microservices"
                  className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border text-[#F5F7FA] text-sm focus:outline-none transition-colors ${
                    errors.subject
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#1B2638] focus:border-[#1558C9]'
                  }`}
                />
                {errors.subject && (
                  <span className="text-[11px] text-red-400 mt-1 block font-mono">
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono text-[#9299A6] uppercase mb-1.5">
                  NỘI DUNG CHI TIẾT <span className="text-[#D4FF24]">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mô tả ngắn gọn về nhu cầu kỹ thuật hoặc quy mô hệ thống của bạn..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border text-[#F5F7FA] text-sm focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[#1B2638] focus:border-[#1558C9]'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] text-red-400 mt-1 block font-mono">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-lime w-full py-4 rounded-xl font-display font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#030407] border-t-transparent rounded-full animate-spin" />
                    <span>TRANSMITTING MESSAGE...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
