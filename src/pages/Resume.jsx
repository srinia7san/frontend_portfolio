import React, { useState, useEffect } from 'react';
import SideBar from "../components/SideBar";
import DecryptedText from "../components/Decrypting";
import { getResumeData, downloadResumeFile } from "../api/api";
import {
    Download,
    Briefcase,
    GraduationCap,
    Award,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    ExternalLink
} from 'lucide-react';

const Resume = () => {
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            setLoading(true);
            const res = await getResumeData();
            setResume(res.data.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch resume:", err);
            setError("Resume data not found. Please add resume data from the admin panel.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await downloadResumeFile();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'resume.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Failed to download resume:", err);
            alert("Resume file not available for download.");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen font-mono"
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
                <SideBar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-pulse text-xl" style={{ color: 'var(--color-text)' }}>
                        {">"} Loading resume data...
                    </div>
                </div>
            </div>
        );
    }

    if (error || !resume) {
        return (
            <div className="flex min-h-screen font-mono"
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
                <SideBar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg mb-4" style={{ color: 'var(--color-text-muted)' }}>{error}</p>
                        <button
                            onClick={handleDownload}
                            className="px-6 py-3 transition-all"
                            style={{
                                border: '1px solid var(--color-primary)',
                                color: 'var(--color-primary)'
                            }}
                        >
                            [ TRY DOWNLOAD PDF ]
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen font-mono"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <SideBar />

            <div className="flex-1 p-6 md:p-8 overflow-y-auto min-h-screen relative">
                <div className="max-w-4xl mx-auto pb-20 md:pb-8">

                    {/* Header */}
                    <div className="pb-6 mb-8"
                        style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter flex items-center">
                                    <span className="mr-3" style={{ color: 'var(--color-text)' }}>{">"}</span>
                                    <DecryptedText
                                        text="RESUME.SYS"
                                        speed={15}
                                        maxIterations={100}
                                        characters="01010101001100010"
                                        className=""
                                        parentClassName="all-letters"
                                        encryptedClassName=""
                                        animateOn="view"
                                        revealDirection="start"
                                    />
                                    <span className="animate-pulse ml-3 inline-block w-3 h-8 align-middle"
                                        style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }}></span>
                                </h1>
                                <p className="mt-2 text-lg" style={{ color: 'var(--color-text-muted)' }}>
                                    // Executing profile data retrieval...
                                </p>
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 uppercase tracking-wider text-sm font-bold transition-all"
                                style={{
                                    border: '1px solid var(--color-primary)',
                                    color: 'var(--color-primary)'
                                }}
                            >
                                <Download className="w-4 h-4" />
                                [ DOWNLOAD PDF ]
                            </button>
                        </div>
                    </div>

                    {/* Profile Header */}
                    <div className="p-6 mb-8 transition-all"
                        style={{ border: '1px solid var(--color-border)' }}>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>{resume.fullName}</h2>
                        <p className="text-lg mb-4" style={{ color: 'var(--color-primary)' }}>{resume.title}</p>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                            {resume.email && (
                                <a href={`mailto:${resume.email}`} className="flex items-center gap-2 transition-colors">
                                    <Mail className="w-4 h-4" />
                                    {resume.email}
                                </a>
                            )}
                            {resume.phone && (
                                <span className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {resume.phone}
                                </span>
                            )}
                            {resume.location && (
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {resume.location}
                                </span>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-4">
                            {resume.githubUrl && (
                                <a href={resume.githubUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 transition-colors"
                                    style={{ color: 'var(--color-text-muted)' }}>
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                            {resume.linkedinUrl && (
                                <a href={resume.linkedinUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 transition-colors"
                                    style={{ color: 'var(--color-text-muted)' }}>
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                        </div>

                        {/* Summary */}
                        {resume.summary && (
                            <div className="mt-6 pt-4"
                                style={{ borderTop: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                                <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                    <span className="mr-2" style={{ color: 'var(--color-border)' }}>{">>"}</span>
                                    {resume.summary}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Experience Section */}
                    {resume.experience && resume.experience.length > 0 && (
                        <div className="mb-8">
                            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 uppercase tracking-wider"
                                style={{ color: 'var(--color-primary)' }}>
                                <Briefcase className="w-5 h-5" />
                                [ EXPERIENCE ]
                            </h3>
                            <div className="space-y-4">
                                {resume.experience.map((exp, index) => (
                                    <div key={exp._id || index} className="p-4 transition-all"
                                        style={{ border: '1px solid var(--color-border)' }}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                            <div>
                                                <h4 className="font-bold" style={{ color: 'var(--color-text)' }}>{exp.role}</h4>
                                                <p style={{ color: 'var(--color-primary)' }}>{exp.company}</p>
                                            </div>
                                            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{exp.duration}</span>
                                        </div>
                                        {exp.description && (
                                            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education Section */}
                    {resume.education && resume.education.length > 0 && (
                        <div className="mb-8">
                            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 uppercase tracking-wider"
                                style={{ color: 'var(--color-primary)' }}>
                                <GraduationCap className="w-5 h-5" />
                                [ EDUCATION ]
                            </h3>
                            <div className="space-y-4">
                                {resume.education.map((edu, index) => (
                                    <div key={edu._id || index} className="p-4 transition-all"
                                        style={{ border: '1px solid var(--color-border)' }}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                            <div>
                                                <h4 className="font-bold" style={{ color: 'var(--color-text)' }}>{edu.degree}</h4>
                                                <p style={{ color: 'var(--color-primary)' }}>{edu.institution}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{edu.year}</span>
                                                {edu.grade && <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{edu.grade}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications Section */}
                    {resume.certifications && resume.certifications.length > 0 && (
                        <div className="mb-8">
                            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 uppercase tracking-wider"
                                style={{ color: 'var(--color-primary)' }}>
                                <Award className="w-5 h-5" />
                                [ CERTIFICATIONS ]
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {resume.certifications.map((cert, index) => (
                                    <div key={cert._id || index} className="p-3 transition-all"
                                        style={{ border: '1px solid var(--color-border)' }}>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{cert.name}</span>
                                            {cert.link && (
                                                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                                                </a>
                                            )}
                                        </div>
                                        {(cert.issuer || cert.year) && (
                                            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                                                {cert.issuer}{cert.issuer && cert.year ? ' • ' : ''}{cert.year}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Resume;
