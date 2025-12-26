import { useState, useEffect, useRef, useMemo } from "react";
import TopBar from "../components/TopBar";
import CenterBars from "../components/CenterBars";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { getResumeData } from "../api/api";

const Home = () => {
  const [socials, setSocials] = useState({
    github: "", linkedin: "", twitter: "", instagram: "", portfolio: ""
  });
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await getResumeData();
        if (res.data?.data) {
          setSocials({
            github: res.data.data.githubUrl || "",
            linkedin: res.data.data.linkedinUrl || "",
            twitter: res.data.data.twitterUrl || "",
            instagram: res.data.data.instagramUrl || "",
            portfolio: res.data.data.portfolioUrl || ""
          });
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
    { key: "github", url: socials.github, icon: FaGithub, label: "GitHub" },
    { key: "linkedin", url: socials.linkedin, icon: FaLinkedin, label: "LinkedIn" },
    { key: "twitter", url: socials.twitter, icon: FaTwitter, label: "Twitter" },
    { key: "instagram", url: socials.instagram, icon: FaInstagram, label: "Instagram" },
    { key: "portfolio", url: socials.portfolio, icon: FaGlobe, label: "Portfolio" },
  ];
  const activeLinks = socialLinks.filter(link => link.url);

  // Memoize stars so they don't regenerate on every render
  const stars = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4
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
      {/* LAYER 1: INFINITE HORIZON GRID */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[200%] h-[200%] left-[-50%]"
          style={{
            background: `
              linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 6%, transparent) 1px, transparent 1px),
              linear-gradient(color-mix(in srgb, var(--color-primary) 6%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'rotateX(75deg) translateY(-50%)',
            transformOrigin: 'center center',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 100%, black 20%, transparent 70%)'
          }}
        />
      </div>

      {/* LAYER 2: SUBTLE STARS */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      {/* LAYER 3: SUBTLE PERSPECTIVE LINES */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-full h-px top-1/2"
          style={{
            background: `linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)`,
            opacity: 0.2
          }} />
      </div>

      {/* CLEAN BORDER */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, var(--color-primary), var(--color-secondary), transparent)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, var(--color-secondary), var(--color-primary), transparent)` }} />
        <div className="absolute top-0 left-0 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, transparent, var(--color-primary), var(--color-secondary), transparent)` }} />
        <div className="absolute top-0 right-0 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, transparent, var(--color-secondary), var(--color-primary), transparent)` }} />

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t border-l" style={{ borderColor: 'var(--color-primary)' }} />
        <div className="absolute top-2 right-2 w-6 h-6 border-t border-r" style={{ borderColor: 'var(--color-secondary)' }} />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l" style={{ borderColor: 'var(--color-secondary)' }} />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r" style={{ borderColor: 'var(--color-primary)' }} />
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

          {/* Glass backdrop */}
          <div className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, 
                   color-mix(in srgb, var(--color-bg) 95%, var(--color-primary)) 0%,
                   color-mix(in srgb, var(--color-bg) 98%, var(--color-secondary)) 100%)`,
              backdropFilter: 'blur(8px)',
              border: '1px solid color-mix(in srgb, var(--color-primary) 12%, transparent)'
            }} />

          {/* Content */}
          <div className="relative z-20">
            <div className="w-full mb-8">
              <TopBar />
            </div>

            <div className="w-full flex justify-center">
              <CenterBars />
            </div>

            {/* Social Links */}
            {activeLinks.length > 0 && (
              <div className="mt-12">
                <div className="flex flex-wrap justify-center gap-6">
                  {activeLinks.map(({ key, url, icon: Icon, label }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center transition-transform duration-300 hover:scale-110"
                    >
                      <div className="p-4 rounded-xl transition-all duration-300"
                        style={{
                          border: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)',
                          backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)'
                        }}>
                        <Icon size={22} style={{ color: 'var(--color-text-muted)' }} />
                      </div>
                      <span className="mt-2 text-[10px] uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity"
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

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-3 text-[10px] font-mono opacity-40"
            style={{ color: 'var(--color-text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-primary)' }} />
            <span>ONLINE</span>
            <span>•</span>
            <span>v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
