import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import DecryptedText from "../components/Decrypting";
import { getProjects } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        const projects = res?.data?.data;
        if (Array.isArray(projects)) {
          setProjectData(projects);
        } else {
          setProjectData([]);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjectData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen font-mono"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <SideBar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner text="ACCESSING PROJECTS..." />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-mono"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <SideBar />

      <div className="flex-1 p-8 overflow-y-auto h-screen relative">
        {/* HEADER */}
        <div className="max-w-6xl mx-auto mb-12 pb-6"
          style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter flex items-center">
            <span className="mr-3" style={{ color: 'var(--color-text)' }}>&gt;</span>

            <DecryptedText
              text="PROJECTS.LOG"
              speed={15}
              maxIterations={100}
              characters="101001010010  "
              className=""
              parentClassName="all-letters"
              encryptedClassName=""
              animateOn="view"
              revealDirection="start"
            />

            <span className="animate-pulse ml-3 inline-block w-3 h-8 align-middle"
              style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }} />
          </h1>

          <p className="mt-2 text-lg" style={{ color: 'var(--color-text-muted)' }}>
            // Executing retrieval of deployed applications...
            <br />
            // Loading automation scripts...
          </p>
        </div>

        {/* PROJECTS GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          {projectData.map((project) => (
            <div
              key={project._id}
              className="group relative p-8 transition-all duration-300 flex flex-col"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)'
              }}
            >
              {/* CORNERS */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors"
                style={{ borderColor: 'transparent' }} />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors"
                style={{ borderColor: 'transparent' }} />

              {/* ICON */}
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <FolderGit2 className="w-24 h-24" style={{ color: 'var(--color-border)' }} />
              </div>

              {/* TITLE */}
              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 transition-colors"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                      border: '1px solid var(--color-border)'
                    }}>
                    {"o"}
                  </div>

                  <h3 className="text-xl font-bold tracking-wider uppercase"
                    style={{ color: 'var(--color-primary)' }}>
                    {project.title || "Untitled Project"}
                  </h3>
                </div>

                <div className="p-2 transition-colors cursor-pointer"
                  style={{ color: 'var(--color-text-muted)' }}>
                  <a href={project.link}><ArrowUpRight className="w-5 h-5" /></a>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="relative z-10 mb-8 leading-relaxed text-md"
                style={{ color: 'var(--color-text-muted)' }}>
                <span className="mr-2" style={{ color: 'var(--color-border)' }}>&gt;&gt;</span>
                {project.description || "No description available."}
              </p>

              {/* TECH STACK */}
              <div className="relative z-10 mt-auto flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech._id}
                    className="px-2 py-1 text-xs font-bold uppercase transition-all cursor-default"
                    style={{
                      color: 'var(--color-primary)',
                      border: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)',
                      backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)'
                    }}
                  >
                    [{tech.name}]
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
