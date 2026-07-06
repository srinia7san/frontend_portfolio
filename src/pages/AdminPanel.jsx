import { useEffect, useState } from "react";
import {
  getSkills,
  getProjects,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  getResumeData,
  saveResume,
} from "../api/api.js";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resume, setResume] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [],
    education: [],
    certifications: [],
    linkedinUrl: "",
    githubUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    googleUrl: "",
    portfolioUrl: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, projectsRes] = await Promise.all([getSkills(), getProjects()]);
        setSkills(skillsRes.data.data);
        setProjects(projectsRes.data.data);

        // Fetch resume (may not exist yet)
        try {
          const resumeRes = await getResumeData();
          if (resumeRes.data.data) {
            setResume(resumeRes.data.data);
          }
        } catch (err) {
          console.log("No resume found, will create new one");
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ================= SKILLS ================= */
  const updateCategory = (i, value) => {
    const updated = [...skills];
    updated[i].category = value;
    setSkills(updated);
  };

  const updateSkillName = (ci, si, value) => {
    const updated = [...skills];
    updated[ci].skills[si].name = value;
    setSkills(updated);
  };

  const addSkillItem = (ci) => {
    const updated = [...skills];
    updated[ci].skills.push({ name: "" });
    setSkills(updated);
  };

  const addCategory = () => {
    setSkills([...skills, { category: "", skills: [] }]);
  };

  const deleteCategoryItem = async (i) => {
    const skill = skills[i];
    if (skill._id) await deleteSkill(skill._id);
    const updated = [...skills];
    updated.splice(i, 1);
    setSkills(updated);
  };

  /* ================= PROJECTS ================= */
  const updateProjectField = (i, field, value) => {
    const updated = [...projects];
    updated[i][field] = value;
    setProjects(updated);
  };

  const updateTechName = (pi, ti, value) => {
    const updated = [...projects];
    updated[pi].tech[ti].name = value;
    setProjects(updated);
  };

  const addTechItem = (pi) => {
    const updated = [...projects];
    updated[pi].tech.push({ name: "" });
    setProjects(updated);
  };

  const addProjectItem = () => {
    setProjects([...projects, { title: "", description: "", link: "", tech: [] }]);
  };

  const deleteProjectItem = async (i) => {
    const proj = projects[i];
    if (proj._id) await deleteProject(proj._id);
    const updated = [...projects];
    updated.splice(i, 1);
    setProjects(updated);
  };

  /* ================= RESUME ================= */
  const updateResumeField = (field, value) => {
    setResume({ ...resume, [field]: value });
  };

  // Experience handlers
  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, { company: "", role: "", duration: "", description: "" }]
    });
  };

  const updateExperience = (i, field, value) => {
    const updated = [...resume.experience];
    updated[i][field] = value;
    setResume({ ...resume, experience: updated });
  };

  const deleteExperience = (i) => {
    const updated = [...resume.experience];
    updated.splice(i, 1);
    setResume({ ...resume, experience: updated });
  };

  // Education handlers
  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, { institution: "", degree: "", year: "", grade: "" }]
    });
  };

  const updateEducation = (i, field, value) => {
    const updated = [...resume.education];
    updated[i][field] = value;
    setResume({ ...resume, education: updated });
  };

  const deleteEducation = (i) => {
    const updated = [...resume.education];
    updated.splice(i, 1);
    setResume({ ...resume, education: updated });
  };

  // Certification handlers
  const addCertification = () => {
    setResume({
      ...resume,
      certifications: [...resume.certifications, { name: "", issuer: "", year: "", link: "" }]
    });
  };

  const updateCertification = (i, field, value) => {
    const updated = [...resume.certifications];
    updated[i][field] = value;
    setResume({ ...resume, certifications: updated });
  };

  const deleteCertification = (i) => {
    const updated = [...resume.certifications];
    updated.splice(i, 1);
    setResume({ ...resume, certifications: updated });
  };

  /* ================= SAVE ================= */
  const saveAll = async () => {
    try {
      // Save skills
      for (let skill of skills) {
        if (skill._id) await updateSkill(skill._id, skill);
        else await addSkill(skill);
      }

      // Save projects
      for (let project of projects) {
        if (project._id) await updateProject(project._id, project);
        else await addProject(project);
      }

      // Save resume
      await saveResume(resume);

      alert("All changes saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  if (loading) return <p className="text-center mt-10" style={{ color: 'var(--color-text)' }}>Loading...</p>;

  const inputClass = "w-full px-3 py-2 rounded outline-none focus:ring-2 transition-all";
  const inputStyle = {
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)'
  };
  const btnGreen = "px-3 py-1 rounded transition-all";
  const btnGreenStyle = {
    border: '1px solid var(--color-primary)',
    color: 'var(--color-primary)'
  };
  const btnRed = "px-3 py-1 rounded transition-all";
  const btnRedStyle = {
    border: '1px solid #ef4444',
    color: '#ef4444'
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 font-mono"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex-1 text-center"
          style={{ color: 'var(--color-text)' }}>
          ▓▓ ADMIN TERMINAL ▓▓
        </h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm transition-all"
          style={{ border: '1px solid #ef4444', color: '#ef4444' }}
        >
          [ LOGOUT ]
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {["skills", "projects", "resume"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded uppercase tracking-wider transition-all"
            style={{
              border: '1px solid var(--color-primary)',
              backgroundColor: activeTab === tab ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab ? 'var(--color-bg)' : 'var(--color-text)'
            }}
          >
            {tab === "skills" && "🛠 Skills"}
            {tab === "projects" && "📁 Projects"}
            {tab === "resume" && "📄 Resume"}
          </button>
        ))}
      </div>

      {/* ========== SKILLS TAB ========== */}
      {activeTab === "skills" && (
        <div className="rounded p-4 space-y-4"
          style={{ border: '1px solid var(--color-border)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>🛠 Manage Skills</h2>
          {skills.map((cat, ci) => (
            <div key={ci} className="rounded p-3 space-y-2"
              style={{ border: '1px solid var(--color-border)' }}>
              <input
                className={inputClass}
                style={inputStyle}
                value={cat.category}
                onChange={(e) => updateCategory(ci, e.target.value)}
                placeholder="Category Name"
              />
              {cat.skills.map((skill, si) => (
                <input
                  key={si}
                  className={inputClass}
                  style={inputStyle}
                  value={skill.name}
                  onChange={(e) => updateSkillName(ci, si, e.target.value)}
                  placeholder="Skill Name"
                />
              ))}
              <div className="flex flex-wrap gap-2">
                <button onClick={() => addSkillItem(ci)} className={btnGreen} style={btnGreenStyle}>+ Skill</button>
                <button onClick={() => deleteCategoryItem(ci)} className={btnRed} style={btnRedStyle}>Delete Category</button>
              </div>
            </div>
          ))}
          <button onClick={addCategory} className={btnGreen} style={btnGreenStyle}>+ Add Category</button>
        </div>
      )}

      {/* ========== PROJECTS TAB ========== */}
      {activeTab === "projects" && (
        <div className="rounded p-4 space-y-4"
          style={{ border: '1px solid var(--color-border)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>📁 Manage Projects</h2>
          {projects.map((proj, pi) => (
            <div key={pi} className="rounded p-3 space-y-2"
              style={{ border: '1px solid var(--color-border)' }}>
              <input
                className={inputClass}
                style={inputStyle}
                value={proj.title}
                onChange={(e) => updateProjectField(pi, "title", e.target.value)}
                placeholder="Project Title"
              />
              <input
                className={inputClass}
                style={inputStyle}
                value={proj.link || ""}
                onChange={(e) => updateProjectField(pi, "link", e.target.value)}
                placeholder="Project Link (URL)"
              />
              <textarea
                className={`${inputClass} h-24`}
                style={inputStyle}
                value={proj.description}
                onChange={(e) => updateProjectField(pi, "description", e.target.value)}
                placeholder="Description"
              />
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Tech Stack:</p>
              {proj.tech.map((t, ti) => (
                <input
                  key={ti}
                  className={inputClass}
                  style={inputStyle}
                  value={t.name}
                  onChange={(e) => updateTechName(pi, ti, e.target.value)}
                  placeholder="Technology"
                />
              ))}
              <div className="flex flex-wrap gap-2">
                <button onClick={() => addTechItem(pi)} className={btnGreen} style={btnGreenStyle}>+ Tech</button>
                <button onClick={() => deleteProjectItem(pi)} className={btnRed} style={btnRedStyle}>Delete Project</button>
              </div>
            </div>
          ))}
          <button onClick={addProjectItem} className={btnGreen} style={btnGreenStyle}>+ Add Project</button>
        </div>
      )}

      {/* ========== RESUME TAB ========== */}
      {activeTab === "resume" && (
        <div className="rounded p-4 space-y-6"
          style={{ border: '1px solid var(--color-border)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>📄 Manage Resume</h2>

          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="text-lg pb-2" style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)' }}>Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className={inputClass} style={inputStyle} value={resume.fullName} onChange={(e) => updateResumeField("fullName", e.target.value)} placeholder="Full Name *" />
              <input className={inputClass} style={inputStyle} value={resume.title} onChange={(e) => updateResumeField("title", e.target.value)} placeholder="Job Title *" />
              <input className={inputClass} style={inputStyle} value={resume.email} onChange={(e) => updateResumeField("email", e.target.value)} placeholder="Email" />
              <input className={inputClass} style={inputStyle} value={resume.phone} onChange={(e) => updateResumeField("phone", e.target.value)} placeholder="Phone" />
              <input className={inputClass} style={inputStyle} value={resume.location} onChange={(e) => updateResumeField("location", e.target.value)} placeholder="Location" />
            </div>
            <textarea className={`${inputClass} h-24`} style={inputStyle} value={resume.summary} onChange={(e) => updateResumeField("summary", e.target.value)} placeholder="Professional Summary" />
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-lg pb-2" style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)' }}>🔗 Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className={inputClass} style={inputStyle} value={resume.githubUrl || ""} onChange={(e) => updateResumeField("githubUrl", e.target.value)} placeholder="GitHub URL" />
              <input className={inputClass} style={inputStyle} value={resume.linkedinUrl || ""} onChange={(e) => updateResumeField("linkedinUrl", e.target.value)} placeholder="LinkedIn URL" />
              <input className={inputClass} style={inputStyle} value={resume.twitterUrl || ""} onChange={(e) => updateResumeField("twitterUrl", e.target.value)} placeholder="Twitter/X URL" />
              <input className={inputClass} style={inputStyle} value={resume.instagramUrl || ""} onChange={(e) => updateResumeField("instagramUrl", e.target.value)} placeholder="Instagram URL" />
              <input className={inputClass} style={inputStyle} value={resume.googleUrl || ""} onChange={(e) => updateResumeField("googleUrl", e.target.value)} placeholder="Google/Portfolio Link" />
              <input className={inputClass} style={inputStyle} value={resume.portfolioUrl || ""} onChange={(e) => updateResumeField("portfolioUrl", e.target.value)} placeholder="Website/Portfolio URL" />
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h3 className="text-lg pb-2" style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)' }}>Experience</h3>
            {resume.experience.map((exp, i) => (
              <div key={i} className="rounded p-3 space-y-2" style={{ border: '1px solid var(--color-border)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input className={inputClass} style={inputStyle} value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="Company" />
                  <input className={inputClass} style={inputStyle} value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="Role" />
                  <input className={inputClass} style={inputStyle} value={exp.duration} onChange={(e) => updateExperience(i, "duration", e.target.value)} placeholder="Duration (e.g., 2020 - Present)" />
                </div>
                <textarea className={`${inputClass} h-16`} style={inputStyle} value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} placeholder="Description" />
                <button onClick={() => deleteExperience(i)} className={btnRed} style={btnRedStyle}>Delete</button>
              </div>
            ))}
            <button onClick={addExperience} className={btnGreen} style={btnGreenStyle}>+ Add Experience</button>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-lg pb-2" style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)' }}>Education</h3>
            {resume.education.map((edu, i) => (
              <div key={i} className="rounded p-3 space-y-2" style={{ border: '1px solid var(--color-border)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input className={inputClass} style={inputStyle} value={edu.institution} onChange={(e) => updateEducation(i, "institution", e.target.value)} placeholder="Institution" />
                  <input className={inputClass} style={inputStyle} value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} placeholder="Degree" />
                  <input className={inputClass} style={inputStyle} value={edu.year} onChange={(e) => updateEducation(i, "year", e.target.value)} placeholder="Year" />
                  <input className={inputClass} style={inputStyle} value={edu.grade || ""} onChange={(e) => updateEducation(i, "grade", e.target.value)} placeholder="Grade/GPA (optional)" />
                </div>
                <button onClick={() => deleteEducation(i)} className={btnRed} style={btnRedStyle}>Delete</button>
              </div>
            ))}
            <button onClick={addEducation} className={btnGreen} style={btnGreenStyle}>+ Add Education</button>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h3 className="text-lg pb-2" style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)' }}>Certifications</h3>
            {resume.certifications.map((cert, i) => (
              <div key={i} className="rounded p-3 space-y-2" style={{ border: '1px solid var(--color-border)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input className={inputClass} style={inputStyle} value={cert.name} onChange={(e) => updateCertification(i, "name", e.target.value)} placeholder="Certification Name" />
                  <input className={inputClass} style={inputStyle} value={cert.issuer || ""} onChange={(e) => updateCertification(i, "issuer", e.target.value)} placeholder="Issuing Organization" />
                  <input className={inputClass} style={inputStyle} value={cert.year || ""} onChange={(e) => updateCertification(i, "year", e.target.value)} placeholder="Year" />
                  <input className={inputClass} style={inputStyle} value={cert.link || ""} onChange={(e) => updateCertification(i, "link", e.target.value)} placeholder="Certificate Link (optional)" />
                </div>
                <button onClick={() => deleteCertification(i)} className={btnRed} style={btnRedStyle}>Delete</button>
              </div>
            ))}
            <button onClick={addCertification} className={btnGreen} style={btnGreenStyle}>+ Add Certification</button>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={saveAll}
        className="w-full sm:w-auto mx-auto block mt-6 px-6 py-3 rounded font-bold transition-all"
        style={{
          border: '2px solid var(--color-primary)',
          color: 'var(--color-primary)'
        }}
      >
        💾 SAVE ALL CHANGES
      </button>
    </div>
  );
};

export default AdminPanel;
