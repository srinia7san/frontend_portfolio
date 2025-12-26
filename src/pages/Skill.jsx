import SideBar from "../components/SideBar";
import DecryptedText from "../components/Decrypting";
import HomeParicles from "../components/HomeParicles";
import { getSkills } from "../api/api";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Skill = () => {
  const [skillData, setSkillData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(res => {
        setSkillData(res.data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen font-mono overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <SideBar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner text="LOADING SKILLS MATRIX..." />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-mono overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>

      <SideBar />

      <div className="flex-1 p-8 overflow-y-auto h-screen relative">

        {/* Background Particles */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <HomeParicles />
        </div>

        <div className="relative z-10">

          {/* Header */}
          <div className="max-w-7xl mx-auto mb-10 pb-6 relative"
            style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter flex items-center">
              <span className="mr-3" style={{ color: 'var(--color-text)' }}>&gt;</span>

              <DecryptedText
                text="AREAS OF EXPERTISE"
                speed={15}
                maxIterations={100}
                characters="101001010010  "
                className=""
                parentClassName="all-letters"
                encryptedClassName=""
                animateOn="view"
                revealDirection="start"
                style={{ color: 'var(--color-text)' }}
              />

              <span className="animate-pulse ml-3 inline-block w-3 h-8 align-middle"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  boxShadow: '0 0 10px var(--color-primary)'
                }}></span>
            </h1>
            <p className="mt-2 text-lg" style={{ color: 'var(--color-text-muted)' }}>
              // Initializing technical stack protocols...
            </p>
          </div>

          {/* Grid Layout */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 pb-10">
            {skillData.map((section) => (
              <div
                key={section._id}
                className="group relative backdrop-blur-sm rounded-sm p-6 transition-all duration-300"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-bg) 80%, transparent)',
                  border: '1px solid var(--color-border)'
                }}
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors"
                  style={{ borderColor: 'transparent' }}></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors"
                  style={{ borderColor: 'transparent' }}></div>

                {/* Card Header */}
                <div className="flex items-center gap-3 mb-6 pb-4"
                  style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-border) 30%, transparent)' }}>
                  <div className="p-2 transition-colors"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)' }}>
                    {"◉"}
                  </div>
                  <h3 className="font-bold text-lg uppercase tracking-wider"
                    style={{ color: 'var(--color-primary)' }}>
                    {section.category}
                  </h3>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-3">
                  {section.skills.map((skill) => (
                    <span
                      key={skill._id}
                      className="px-2 py-1 text-sm font-bold transition-all cursor-crosshair hover:scale-105"
                      style={{
                        color: 'var(--color-primary)',
                        border: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)',
                        backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)'
                      }}
                    >
                      [{skill.name}]
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skill;
