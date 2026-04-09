"use client";
import { motion, useInView, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight, MessageCircle, Lock, Cpu, Database, Layout, ShieldCheck, Terminal } from "lucide-react";
import ResumeModal from "@/components/ResumeModal";

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
    title: "MILESTONEVAULT",
    subtitle: "Web3 Decentralized Escrow Platform",
    description: "Intelligent milestone-based project funding dApp that secures transactions via Ethereum Smart Contracts. Features automated fund release upon proof-of-work validation, multi-role dashboards (Stakeholder/Admin/Creator), and real-time wallet tracking on the Sepolia testnet.",
    link: "https://github.com/yashbhosale8105/HS-2026-114-Hackstomp26.git",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    tags: ["Solidity", "Hardhat", "Next.js", "Ether.js"],
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
    title: "SOLARTERRAIN",
    subtitle: "Solar Suitability Assessment Platform",
    description: "Comprehensive web app for assessing solar panel suitability across India. Features ML-based suitability scoring, an interactive map, AI-powered chatbot, and downloadable PDF reports.",
    link: "https://github.com/yashbhosale8105/SolarTerrain",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
    tags: ["FastAPI", "React.js", "ML", "Python"],
  },
  {
    number: "05",
    title: "TRANSPLANTCARE",
    subtitle: "Transplant Care Management System",
    description: "Multi-user Python application streamlining organ transplant coordination. Connects admins, donors & patients through separate dashboards with blood-type compatibility matching and automated email alerts.",
    link: "https://github.com/yashbhosale8105/TransplantCare",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1992&auto=format&fit=crop",
    tags: ["Python", "MySQL", "Tkinter"],
  },
];

const achievements = [
  {
    id: "hacknova",
    title: "HACKNOVA 12H NATIONAL HACKATHON",
    status: "RUNNER UP (AI/ML TRACK)",
    venue: "Shivajirao S. Jondhale College",
    date: "MARCH 2026",
    description: "Secured the 2nd position among 50+ teams by developing an innovative AI solution for the hackathon's AI/ML track.",
    team: "TEAM NEXUS",
    certificate: "/achievements/cert_hacknova.jpg"
  },
  {
    id: "nakshatra",
    title: "NAKSHATRA: A TECH HACKATHON",
    status: "TOP 8 FINALIST (FINTECH)",
    venue: "A.P. Shah Institute of Technology",
    date: "APRIL 2026",
    description: "Secured a position in the Top 8 Finalists for the FinTech track. Developed 'SAHILoan', an end-to-end decentralized lending platform featuring automated loan approvals and transparent blockchain-based repayment tracking.",
    team: "TEAM NEXUS",
    certificate: "/achievements/cert_nakshatra.jpg"
  },
  {
    id: "hackstomp",
    title: "HACKSTOMP 2026",
    status: "24H INNOVATION CHALLENGE",
    venue: "Universal SkillTech University",
    date: "2026",
    description: "Engaged in a 24-hour rapid prototyping marathon, building high-impact technological solutions under pressure.",
    team: "DUMB CODERS",
    certificate: "/achievements/cert_hackstomp.jpg"
  },
  {
    id: "dataweb",
    title: "DATAWEB HACKATHON",
    status: "PARTICIPANT",
    venue: "A.P. Shah Institute of Technology",
    date: "2025",
    description: "Participated in an intensive data-focused hackathon, collaborating on system implementation and logic design.",
    team: "TEAM NEXUS",
    certificate: "/achievements/cert_dataweb.jpg"
  },
  {
    id: "innov8",
    title: "INNOV8 3.0 HACKATHON",
    status: "PARTICIPANT",
    venue: "Terna Engineering College",
    date: "MARCH 2025",
    description: "Collaborated on a 2-day development cycle during the Avalon Techfest, focusing on innovative problem solving.",
    team: "BYTE FORCE",
    certificate: "/achievements/cert_innov8.jpg"
  }
];

const skillData = [
  { name: "LANGUAGES", skills: ["Python", "JavaScript", "SQL", "C", "C++"] },
  { name: "FRONTEND", skills: ["React.js", "Next.js", "HTML5"] },
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
function RevealSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1],
        scale: { duration: 1, ease: "easeOut" }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnetic Button Effect ─── */
function MagneticButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x: x * 0.3, y: y * 0.3 });
    }
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("HOME");
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Loading Simulation
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadPercent(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 800);
            return 100;
          }
          return prev + Math.random() * 8;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Track active section for sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all sections that are currently intersecting the trigger zone
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Sort by current viewport position: we want the section closest to the top of the 'reading zone'
          const active = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          setActiveSection(active.target.id.toUpperCase());
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.5], 
        rootMargin: "-10% 0px -40% 0px"
      }
    );

    ["home", "skills", "achievements", "projects", "resume", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[500] bg-white flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <div className="relative w-full max-w-sm">
              <div className="flex justify-between items-end mb-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black tracking-[0.3em] text-[#FF3000] uppercase">Initializing_Node</p>
                  <p className="text-2xl font-black uppercase tracking-tighter">Yash_Portfolio.exe</p>
                </div>
                <p className="text-4xl font-black text-neutral-200">{Math.round(loadPercent)}%</p>
              </div>
              <div className="h-1 bg-neutral-100 overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#FF3000]"
                  style={{ width: `${loadPercent}%` }}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["KERNEL", "DATA_LAYERS", "ASSET_REGISTRY", "ANIMATION_ENGINE"].map((module, i) => (
                  <span key={module} className={`text-[8px] font-bold tracking-widest uppercase border border-neutral-200 px-2 py-0.5 ${loadPercent > (i + 1) * 25 ? 'bg-black text-white border-black' : 'text-neutral-300 animate-pulse'}`}>
                    {module}
                  </span>
                ))}
              </div>
            </div>
            {/* Background decorative elements */}
            <div className="absolute inset-0 swiss-grid-pattern opacity-10 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`min-h-screen bg-white text-black font-['Inter','Helvetica_Neue',sans-serif] swiss-noise relative overflow-x-hidden transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="tech-scanline" />
      
      {/* ── Progress Bar ── */}
      <motion.div
        className="fixed top-14 left-0 right-0 h-1 bg-[#FF3000] z-[101] origin-left"
        style={{ scaleX }}
      />

      {/* ── REAL-TIME SYSTEM SCANNER (Laser Effect) ── */}
      <div className="fixed inset-0 pointer-events-none z-[110] overflow-hidden">
        <motion.div
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3000]/30 to-transparent shadow-[0_0_15px_rgba(255,30,0,0.3)]"
        />
      </div>

      {/* ── SECTION INDICATOR (Vertical, Far Right) ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 group/sidebar">
        <div className="absolute top-0 bottom-0 w-[1px] bg-black/10 right-[3px] group-hover/sidebar:bg-black/20 transition-colors" />
        {["HOME", "SKILLS", "ACHIEVEMENTS", "PROJECTS", "RESUME", "CONTACT"].map((sec) => (
          <div key={sec} className="relative flex flex-col items-center">
             <motion.span 
              className={`absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black tracking-[0.2em] whitespace-nowrap transition-all duration-300 pointer-events-none pr-2 ${activeSection === sec ? 'opacity-100 text-[#FF3000]' : 'opacity-0'}`}
              initial={false}
              animate={{ x: activeSection === sec ? 0 : 10 }}
            >
              {sec}
            </motion.span>
            <div className={`relative w-2 h-2 rounded-full border-2 transition-all duration-500 cursor-pointer ${activeSection === sec ? 'bg-[#FF3000] border-[#FF3000] scale-125 shadow-[0_0_10px_rgba(255,48,0,0.5)]' : 'bg-white border-black/20 hover:border-black/50'} z-10`} />
          </div>
        ))}
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

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
      <section id="home" className="pt-14 min-h-screen border-b-2 border-black grid grid-cols-1 lg:grid-cols-12">

        {/* Left: Big name */}
        <div className="lg:col-span-8 border-r-2 border-black p-12 lg:p-16 flex flex-col justify-between swiss-grid-pattern relative overflow-hidden">
          {/* Floating background elements */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 text-[#FF3000] z-0"
          >
            <Cpu className="w-32 h-32" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.05, 0.15, 0.05] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-40 left-10 text-black z-0"
          >
            <Database className="w-24 h-24" />
          </motion.div>

          <div className="pt-8 relative z-10">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-8">
              — Data Science & Engineering Portfolio
            </p>
            <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-none tracking-tighter uppercase">
              <motion.span
                className="block glitch-text"
                data-text="Yash"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Yash
              </motion.span>
              <motion.span
                className="block text-[#FF3000] glitch-text"
                data-text="Bhosale"
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
              { n: "5", label: "Projects" },
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
              <div className="grid grid-cols-2">
                <MagneticButton className="h-full">
                  <a
                    href="#projects"
                    className="font-black uppercase text-sm tracking-widest text-center py-4 bg-black text-white hover:bg-[#FF3000] transition-colors duration-150 border-r-2 border-black flex items-center justify-center h-full"
                  >
                    Work →
                  </a>
                </MagneticButton>
                <MagneticButton className="h-full">
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="font-black uppercase text-sm tracking-widest text-center py-4 bg-white text-black hover:bg-black hover:text-white transition-colors duration-150 flex items-center justify-center gap-2 w-full h-full"
                  >
                    <Lock className="w-4 h-4" />
                    CV
                  </button>
                </MagneticButton>
              </div>
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
                    className="border-r-2 border-b-2 border-black last:border-r-0 p-8 group hover:bg-black hover:text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-white/80 backdrop-blur-md shadow-sm"
                  >
                    <p className="text-[#FF3000] group-hover:text-[#FF3000] font-black text-xs tracking-widest uppercase mb-6">
                      0{i + 1}.
                    </p>
                    <h3 className="font-black text-base uppercase tracking-tight mb-6 group-hover:text-white transition-colors duration-300">{cat.name}</h3>
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

      {/* ── ACHIEVEMENTS ── */}
      <RevealSection id="achievements" className="py-24 border-b-2 border-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col mb-16 px-4 border-l-4 border-[#FF3000]">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-2">03. Recognition</p>
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">Achievements_</h2>
            <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase">Hackathons Participated & Won</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Winning Photo */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative group overflow-hidden bg-neutral-100 aspect-[4/5] lg:aspect-[3/4] border-2 border-black">
                <Image
                  src="/achievements/group.jpg"
                  alt="HackNova Runner Up Team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#FF3000] text-white px-4 py-2 font-black tracking-widest text-xs uppercase shadow-xl">
                  RUNNER UP WINNERS
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <p className="text-white font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                    Captured: National Level Hackathon Victory with Team Nexus.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Log */}
            <div className="lg:col-span-6 space-y-4">
              {achievements.map((item) => (
                <div 
                  key={item.id}
                  className="group relative bg-white border-2 border-black p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-[10px] font-black tracking-widest uppercase text-[#FF3000] mb-1">{item.status}</h4>
                      <h3 className="text-xl font-bold uppercase tracking-tighter leading-tight">{item.title}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 font-mono">{item.date}</span>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100 border-dashed">
                    <div className="flex items-center gap-2">
                       <span className="text-[8px] font-black uppercase text-neutral-400 tracking-widest">Venue:</span>
                       <span className="text-[8px] font-black uppercase text-black">{item.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[8px] font-black uppercase text-neutral-400 tracking-widest">Team:</span>
                       <span className="text-[8px] font-black uppercase text-black">{item.team}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── PROJECTS ── */}
      <section id="projects" className="border-b-2 border-black">
        <div className="border-b-2 border-black p-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-2">04. Selected Work</p>
          <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter">Projects</h2>
        </div>

        {projects.map((project, i) => (
          <RevealSection key={i}>
            <div className={`grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black ${i % 2 === 1 ? '' : ''}`}>
              {/* Image */}
              <div className={`lg:col-span-7 relative overflow-hidden border-r-2 border-black group/img ${i % 2 === 1 ? 'lg:order-2' : ''}`} style={{ minHeight: '420px' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover/img:grayscale-0 group-hover/img:scale-110 transition-all duration-700 ease-in-out"
                />
                {/* Red overlay number */}
                <div className="absolute top-6 left-6 bg-[#FF3000] text-white font-black text-2xl px-4 py-2 z-10">
                  {project.number}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className={`lg:col-span-5 p-10 flex flex-col justify-between swiss-grid-pattern relative ${i % 2 === 1 ? 'lg:order-1 border-r-2 border-black' : ''}`}>
                <div className="relative z-10">
                  <p className="text-xs tracking-widest uppercase font-bold text-neutral-500 mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#FF3000] rounded-full animate-pulse" />
                    {project.subtitle}
                  </p>
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-6 group-hover:text-[#FF3000] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="w-12 h-1 bg-[#FF3000] mb-6" />
                  <p className="text-sm leading-relaxed text-neutral-600 mb-8">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-black uppercase tracking-widest border-2 border-black px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  className="flex items-center justify-between border-2 border-black px-6 py-4 font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300 group/btn w-full rounded-xl overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Open Repository
                    <Terminal className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </span>
                  <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-150 relative z-10" />
                  <div className="absolute inset-0 bg-[#FF3000] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                </a>
              </div>
            </div>
          </RevealSection>
        ))}
      </section>

      {/* ── EDUCATION & CERTIFICATIONS ── */}
      <section id="resume" className="border-b-2 border-black">
        <div className="border-b-2 border-black p-10">
          <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-2">05. Background</p>
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

      {/* ── CONTACT ── */}
      <footer id="contact" className="border-t-2 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Big CTA */}
          <div className="lg:col-span-8 border-r-2 border-black p-12 lg:p-24 flex flex-col items-start justify-center swiss-grid-pattern">
            <p className="text-xs font-bold tracking-widest uppercase text-[#FF3000] mb-6">06. Contact</p>
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
    </>
  );
}
