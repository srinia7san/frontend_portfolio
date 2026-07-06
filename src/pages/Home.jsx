import { useState, useEffect, useRef, useMemo } from "react";
import TopBar from "../components/TopBar";
import CenterBars from "../components/CenterBars";
import AuroraBackground from "../components/AuroraBackground";
import InfiniteMarquee from "../components/InfiniteMarquee";
import CursorGlow from "../components/CursorGlow";
import FloatingShapes from "../components/FloatingShapes";
import OrbitRings from "../components/OrbitRings";
import BinaryHelix from "../components/BinaryHelix";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { getResumeData } from "../api/api";
import PremiumGrid from "../components/PremiumGrid";

const Home = () => {
  const [socials, setSocials] = useState({
    github: "https://github.com/srinia7san?tab=repositories",
    linkedin: "https://www.linkedin.com/in/srinivasan-m-0aa2a3260",
    twitter: "",
    instagram: "",
    portfolio: ""
  });
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await getResumeData();
        if (res.data?.data) {
          setSocials(prev => ({
            ...prev,
            // Keep hardcoded values if API returns empty, or overwrite if needed.
            // User requested hardcoded specific links, so we PRIORITIZE hardcoded.
            twitter: res.data.data.twitterUrl || "",
            instagram: res.data.data.instagramUrl || "",
            portfolio: res.data.data.portfolioUrl || ""
          }));
        }
      } catch (err) {
        console.error("Failed to fetch social links", err);
      }
    };
    fetchSocials();
  }, []);

  // Mouse tracking with direct DOM manipulation (no React re-renders)
  useEffect(() => {
    let animationId;
    const handleMouseMove = (e) => {
      if (contentRef.current && containerRef.current) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(() => {
          const rect = containerRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
          const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
          // Direct DOM manipulation - no state update, no re-render
          contentRef.current.style.transform = `rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const socialLinks = [
    { key: "github", url: "https://github.com/srinia7san?tab=repositories", icon: FaGithub, label: "GitHub" },
    { key: "linkedin", url: "https://www.linkedin.com/in/srinivasan-m-0aa2a3260", icon: FaLinkedin, label: "LinkedIn" },
    { key: "twitter", url: socials.twitter, icon: FaTwitter, label: "Twitter" },
    { key: "instagram", url: socials.instagram, icon: FaInstagram, label: "Instagram" },
    { key: "portfolio", url: socials.portfolio, icon: FaGlobe, label: "Portfolio" },
  ];
  const activeLinks = socialLinks.filter(link => link.url);

  // Memoize enhanced particles with varied properties
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 8,
      duration: Math.random() * 5 + 6,
      opacity: Math.random() * 0.4 + 0.1
    })), []
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg)',
        perspective: '1500px'
      }}
    >
      {/* LAYER 0: FILM GRAIN OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05]" style={{ zIndex: 50, mixBlendMode: 'overlay' }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* LAYER 1: AURORA BACKGROUND */}
      <AuroraBackground />

      {/* LAYER 2: ORBIT RINGS */}
      <OrbitRings />

      {/* LAYER 3: FLOATING 3D SHAPES */}
      <FloatingShapes />

      {/* LAYER 3.5: BINARY HELIX - UNIQUE VISUAL */}
      <BinaryHelix />

      {/* LAYER 4: CURSOR GLOW EFFECT */}
      <CursorGlow />

      {/* LAYER 5: PREMIUM INFINITE GRID (REPLACES OLD GRID) */}
      <PremiumGrid />

      {/* LAYER 6: ENHANCED FLOATING PARTICLES */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: i % 3 === 0
                ? 'var(--color-primary)'
                : i % 3 === 1
                  ? 'var(--color-primary-light, var(--color-primary))'
                  : 'var(--color-secondary, var(--color-primary))',
              animation: `particleFloat ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: particle.opacity,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* LAYER 7: SUBTLE PERSPECTIVE LINES */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 3 }}>
        <div className="absolute w-full h-px top-1/2"
          style={{
            background: `linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)`,
            opacity: 0.15
          }} />
        {/* Vertical line */}
        <div className="absolute h-full w-px left-1/2"
          style={{
            background: `linear-gradient(180deg, transparent 0%, var(--color-primary) 50%, transparent 100%)`,
            opacity: 0.08
          }} />
      </div>

      {/* CLEAN BORDER with gradient animation */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, var(--color-primary), var(--color-secondary, var(--color-primary)), transparent)`,
            animation: 'borderGradientRotate 8s linear infinite',
            backgroundSize: '200% 100%'
          }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, var(--color-secondary, var(--color-primary)), var(--color-primary), transparent)`,
            animation: 'borderGradientRotate 8s linear infinite reverse',
            backgroundSize: '200% 100%'
          }} />
        <div className="absolute top-0 left-0 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, transparent, var(--color-primary), var(--color-secondary, var(--color-primary)), transparent)` }} />
        <div className="absolute top-0 right-0 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, transparent, var(--color-secondary, var(--color-primary)), var(--color-primary), transparent)` }} />

        {/* Animated corner accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 transition-all duration-300 hover:w-12 hover:h-12"
          style={{ borderColor: 'var(--color-primary)', opacity: 0.8 }} />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 transition-all duration-300"
          style={{ borderColor: 'var(--color-secondary, var(--color-primary))', opacity: 0.8 }} />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 transition-all duration-300"
          style={{ borderColor: 'var(--color-secondary, var(--color-primary))', opacity: 0.8 }} />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 transition-all duration-300"
          style={{ borderColor: 'var(--color-primary)', opacity: 0.8 }} />
      </div>

      {/* MARQUEE LAYER - Behind main content */}
      <div className="fixed top-1/2 left-0 right-0 pointer-events-none" style={{ zIndex: 4, transform: 'translateY(-50%)' }}>
        <InfiniteMarquee
          text="FULL STACK DEVELOPER • CREATIVE CODER • UI/UX ENTHUSIAST • ARCHITECT • "
          speed={40}
        />
      </div>

      {/* MAIN CONTENT WITH SMOOTH 3D TILT */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 py-8"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      >
        <div className="relative w-full max-w-4xl mx-auto p-8 sm:p-12">

          {/* CLEAN FLAT CARD - No Glows */}
          <div className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-primary)',
              opacity: 0.95
            }} />

          {/* No animated border gradient overlay - removed for zero glow */}

          {/* Content */}
          <div className="relative z-20">
            <div className="w-full mb-8">
              <TopBar />
            </div>

            <div className="w-full flex justify-center">
              <CenterBars />
            </div>

            {/* Social Links with magnetic hover effect */}
            {activeLinks.length > 0 && (
              <div className="mt-12">
                <div className="flex flex-wrap justify-center gap-6">
                  {activeLinks.map(({ key, url, icon: Icon, label }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center transition-all duration-300 hover:scale-110 glitch-hover"
                    >
                      <div className="p-4 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                        style={{
                          border: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)',
                          backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)',
                          boxShadow: '0 0 20px color-mix(in srgb, var(--color-primary) 0%, transparent)',
                        }}>
                        <Icon size={22} style={{ color: 'var(--color-text-muted)' }}
                          className="group-hover:text-[var(--color-primary)] transition-colors duration-300" />
                      </div>
                      <span className="mt-2 text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:tracking-[0.3em]"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-3 text-[10px] font-mono opacity-40 hover:opacity-70 transition-opacity duration-300"
            style={{ color: 'var(--color-text-muted)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: 'var(--color-primary)',
                boxShadow: '0 0 10px var(--color-primary)'
              }} />
            <span className="tracking-widest">SYSTEM ONLINE</span>
            <span>•</span>
            <span>v4.0</span>
            <span>•</span>
            <span className="tracking-wider">GOD MODE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
