"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, MessageCircle } from "lucide-react";

/* ─── Data ─── */
const projects = [
  {
    number: "01",
    title: "LOOKIFY",
    subtitle: "AI Fashion Studio",
    description: "End-to-end AI fashion ecosystem combining Computer Vision, Deep Learning & KNN Recommendations. Features IDM-VTON virtual try-on on 44,000+ products — bridging product discovery and personal visualization.",
    link: "https://github.com/yashbhosale8105/Lookify",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop",
    tags: ["Python", "Flask", "IDM-VTON", "MySQL"],
  },
  {
    number: "02",
    title: "SOLARTERRAIN",
    subtitle: "Solar Suitability Assessment Platform",
    description: "Comprehensive web app for assessing solar panel suitability across India. Features ML-based suitability scoring, an interactive map, AI-powered chatbot, and downloadable PDF reports.",
    link: "https://github.com/yashbhosale8105/SolarTerrain",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    tags: ["FastAPI", "React.js", "ML", "Python"],
  },
  {
    number: "03",
    title: "CLEARTRACE",
    subtitle: "Intelligent Banking Investigation Assistant",
    description: "AI-powered banking security platform that detects UPI transaction fraud through anomaly scoring, validates physical cheques via Gemini Vision OCR, and generates detailed explainable investigation reports with recommended actions.",
    link: "https://github.com/yashbhosale8105/ClearTrace",
    // Real banking/fintech security photograph
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    tags: ["Google Gemini", "Flask", "GenAI"],
  },
  {
    number: "04",
    title: "TRANSPLANTCARE",
    subtitle: "Transplant Care Management System",
    description: "Multi-user Python application streamlining organ transplant coordination. Connects admins, donors & patients through separate dashboards with blood-type compatibility matching and automated email alerts.",
    link: "https://github.com/yashbhosale8105/TransplantCare",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1992&auto=format&fit=crop",
    tags: ["Python", "MySQL", "Tkinter"],
  },
];

const skillData = [
  { name: "LANGUAGES", skills: ["Python", "JavaScript", "SQL", "C", "C++"] },
  { name: "FRONTEND", skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5"] },
  { name: "BACKEND & DB", skills: ["Node.js", "Express.js", "MySQL", "RESTful APIs"] },
  { name: "TOOLS & AI", skills: ["Git", "GitHub", "Data Analysis", "Machine Learning"] },
];

const certifications = [
  { title: "GenAI Powered Data Analytics", issuer: "TATA" },
  { title: "Data Scientist: Statistics", issuer: "Simplilearn" },
  { title: "Python Full Stack Developer", issuer: "Eduskills" },
  { title: "Python Essentials", issuer: "Cisco" },
  { title: "DBMS Course", issuer: "Scaler" },
  { title: "Data Engineering Master", issuer: "Eduskills" },
  { title: "Software Engineering Simulation", issuer: "Accenture" },
  { title: "Data Analytics Simulation", issuer: "Deloitte" },
];

const education = [
  {
    degree: "BACHELOR OF ENGINEERING",
    field: "Computer Science (Data Science)",
    institution: "A.P. Shah Institute of Technology",
    detail: "Sem 3 · 10 CGPA",
    year: "2023–2027",
    badge: "ONGOING",
  },
  {
    degree: "HIGHER SECONDARY CERTIFICATE",
    field: "Science Stream",
    institution: "S.K. Somaiya College",
    detail: "Score: 80%",
    year: "2021–2023",
    badge: "80%",
  },
  {
    degree: "SECONDARY SCHOOL CERTIFICATE",
    field: "CBSE Board",
    institution: "Sri Ma Vidyalaya",
    detail: "Score: 91%",
    year: "–2021",
    badge: "91%",
  },
];

/* ─── Animated Section Wrapper ─── */
function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-['Inter','Helvetica_Neue',sans-serif] swiss-noise relative">

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b-2 border-black flex items-center justify-between px-8 h-14">
        <span className="font-black text-sm tracking-widest uppercase">Yash Bhosale</span>
        <div className="flex items-center gap-0">
          {["Skills", "Projects", "Resume"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-bold tracking-widest uppercase px-6 py-4 border-l-2 border-black hover:bg-black hover:text-white transition-colors duration-150"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="pt-14 min-h-screen border-b-2 border-black grid grid-cols-1 lg:grid-cols-12">

        {/* Left: Big name */}
        <div className="lg:col-span-8 border-r-2 border-black p-12 lg:p-16 flex flex-col justify-between swiss-grid-pattern">
          <div className="pt-8">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-8">
              — Data Science & Engineering Portfolio
            </p>
            <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-none tracking-tighter uppercase">
              <motion.span
                className="block"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Yash
              </motion.span>
              <motion.span
                className="block text-[#FF3000]"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                Bhosale
              </motion.span>
            </h1>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-3 border-t-2 border-black mt-12"
          >
            {[
              { n: "4", label: "Projects" },
              { n: "10", label: "CGPA" },
              { n: "8+", label: "Certifications" },
            ].map((stat) => (
              <div key={stat.label} className="border-r-2 border-black last:border-r-0 p-6 group hover:bg-[#FF3000] hover:text-white transition-colors duration-150">
                <div className="text-5xl font-black">{stat.n}</div>
                <div className="text-xs tracking-widest uppercase font-bold mt-1 opacity-60 group-hover:opacity-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Info card */}
        <div className="lg:col-span-4 p-12 flex flex-col justify-between swiss-dots">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-xs tracking-widest uppercase font-bold border-b-2 border-black pb-4 mb-8">
              01. About
            </p>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
              Data Science & Engineering
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600 mb-8 border-l-4 border-[#FF3000] pl-4">
              Third-year B.E. student specializing in Data Science at A.P. Shah Institute of Technology, Anand Nagar. I thrive at the intersection of complex algorithms and real-world problem solving.
            </p>
            <div className="flex flex-col gap-0 border-2 border-black">
              <a
                href="#projects"
                className="font-black uppercase text-sm tracking-widest text-center py-4 bg-black text-white hover:bg-[#FF3000] transition-colors duration-150"
              >
                View Work →
              </a>
              <a
                href="https://github.com/yashbhosale8105"
                target="_blank"
                className="font-bold uppercase text-sm tracking-widest text-center py-4 hover:bg-black hover:text-white transition-colors duration-150 border-t-2 border-black"
              >
                Github ↗
              </a>
            </div>
          </motion.div>

          <div className="mt-8">
            <p className="text-xs tracking-widest uppercase font-bold text-neutral-400 mb-2">Location</p>
            <p className="font-black text-sm">Mumbai, India</p>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="border-b-2 border-black">
        <RevealSection>
          <div className="grid grid-cols-12 border-b-2 border-black">
            <div className="col-span-12 lg:col-span-3 p-10 border-r-2 border-black swiss-diagonal flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-4">02. Technical</p>
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">Tech<br />Arsenal</h2>
              </div>
              <p className="text-xs text-neutral-500 mt-8">4 Categories · 18 Technologies</p>
            </div>

            <div className="col-span-12 lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-full">
                {skillData.map((cat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="border-r-2 border-b-2 border-black last:border-r-0 p-8 group hover:bg-black hover:text-white transition-colors duration-150"
                  >
                    <p className="text-[#FF3000] group-hover:text-[#FF3000] font-black text-xs tracking-widest uppercase mb-6">
                      0{i + 1}.
                    </p>
                    <h3 className="font-black text-base uppercase tracking-tight mb-6">{cat.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, j) => (
                        <span
                          key={j}
                          className="text-xs font-bold uppercase tracking-wide border-2 border-current px-2 py-1 hover:bg-[#FF3000] hover:border-[#FF3000] hover:text-white transition-colors duration-150 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="border-b-2 border-black">
        <div className="border-b-2 border-black p-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-2">03. Selected Work</p>
          <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter">Projects</h2>
        </div>

        {projects.map((project, i) => (
          <RevealSection key={i}>
            <div className={`grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black ${i % 2 === 1 ? '' : ''}`}>
              {/* Image */}
              <div className={`lg:col-span-7 relative overflow-hidden border-r-2 border-black ${i % 2 === 1 ? 'lg:order-2' : ''}`} style={{ minHeight: '420px' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Red overlay number */}
                <div className="absolute top-6 left-6 bg-[#FF3000] text-white font-black text-2xl px-4 py-2">
                  {project.number}
                </div>
              </div>

              {/* Content */}
              <div className={`lg:col-span-5 p-10 flex flex-col justify-between swiss-grid-pattern ${i % 2 === 1 ? 'lg:order-1 border-r-2 border-black' : ''}`}>
                <div>
                  <p className="text-xs tracking-widest uppercase font-bold text-neutral-500 mb-3">{project.subtitle}</p>
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-6">{project.title}</h3>
                  <div className="w-12 h-1 bg-[#FF3000] mb-6" />
                  <p className="text-sm leading-relaxed text-neutral-600 mb-8">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-black uppercase tracking-widest border-2 border-black px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  className="flex items-center justify-between border-2 border-black px-6 py-4 font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-colors duration-150 group w-full"
                >
                  Open Repository
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-150" />
                </a>
              </div>
            </div>
          </RevealSection>
        ))}
      </section>

      {/* ── EDUCATION & CERTIFICATIONS ── */}
      <section id="resume" className="border-b-2 border-black">
        <div className="border-b-2 border-black p-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-2">04. Background</p>
          <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter">Resume</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border-black">

          {/* Education */}
          <div className="border-r-2 border-black">
            <div className="border-b-2 border-black p-8">
              <h3 className="font-black uppercase text-2xl tracking-tight">Education</h3>
            </div>
            {education.map((edu, i) => (
              <RevealSection key={i}>
                <div className="border-b-2 border-black p-8 group hover:bg-[#F2F2F2] transition-colors duration-150">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-black tracking-widest uppercase text-[#FF3000]">{edu.year}</span>
                    <span className="text-xs font-black tracking-widest uppercase border-2 border-black px-2 py-0.5 group-hover:bg-[#FF3000] group-hover:border-[#FF3000] group-hover:text-white transition-colors duration-150">
                      {edu.badge}
                    </span>
                  </div>
                  <h4 className="font-black text-lg uppercase tracking-tight leading-tight mb-1">{edu.degree}</h4>
                  <p className="text-sm font-bold text-neutral-600 mb-1">{edu.field}</p>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">{edu.institution}</p>
                  <div className="w-8 h-0.5 bg-[#FF3000]" />
                  <p className="text-xs text-neutral-500 mt-3 font-medium">{edu.detail}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <div className="border-b-2 border-black p-8">
              <h3 className="font-black uppercase text-2xl tracking-tight">Certifications</h3>
            </div>
            {certifications.map((cert, i) => (
              <RevealSection key={i}>
                <div className="border-b-2 border-black px-8 py-5 flex items-center justify-between group hover:bg-black hover:text-white transition-colors duration-150">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-[#FF3000] group-hover:text-[#FF3000]">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span className="font-bold text-sm uppercase tracking-wide">{cert.title}</span>
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 ml-4 flex-shrink-0">
                    {cert.issuer}
                  </span>
                </div>
              </RevealSection>
            ))}
          </div>

        </div>
      </section>

      {/* ── FOOTER / CONTACT ── */}
      <footer className="border-b-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* CTA Big Text */}
          <div className="lg:col-span-8 border-r-2 border-black p-12 lg:p-16 swiss-dots">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-6">05. Contact</p>
            <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
              Let&apos;s<br />Work.
            </h2>
            <a
              href="https://wa.me/919137553025"
              target="_blank"
              className="inline-flex items-center gap-4 bg-[#FF3000] text-white font-black uppercase text-sm tracking-widest px-8 py-5 hover:bg-black transition-colors duration-150"
            >
              Contact Me <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>

          {/* Social links */}
          <div className="lg:col-span-4 flex flex-col">
            {[
              { label: "GitHub", href: "https://github.com/yashbhosale8105", icon: Github },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/yash-bhosale-23b9a8274/", icon: Linkedin },
              { label: "Email", href: "mailto:yashbhosale8105@gmail.com", icon: Mail },
            ].map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                className="flex items-center justify-between border-b-2 border-black px-8 py-6 group hover:bg-[#FF3000] hover:text-white transition-colors duration-150"
              >
                <span className="font-black uppercase tracking-widest text-sm">{label}</span>
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-150" />
              </a>
            ))}

            <div className="p-8 mt-auto">
              <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">
                © 2024 Yash Bhosale<br />
                Built with precision.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}
