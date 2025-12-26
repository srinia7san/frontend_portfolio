import React, { useState, useEffect } from 'react';
import SideBar from "../components/SideBar";
import DecryptedText from "../components/Decrypting";
import { getResumeData } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { User, MapPin, Terminal, Coffee, Cpu } from 'lucide-react';

const About = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getResumeData();
                setProfile(res.data.data);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen font-mono"
                style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
                <SideBar />
                <div className="flex-1 flex items-center justify-center">
                    <LoadingSpinner text="DECRYPTING BIO..." />
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen font-mono"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <SideBar />

            <div className="flex-1 p-6 md:p-12 overflow-y-auto min-h-screen relative flex flex-col justify-center">
                <div className="max-w-4xl mx-auto w-full">

                    {/* Header */}
                    <div className="mb-12 pb-6"
                        style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter flex items-center mb-4">
                            <span className="mr-3" style={{ color: 'var(--color-text)' }}>{">"}</span>
                            <DecryptedText
                                text="WHO_AM_I?"
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
                                style={{
                                    backgroundColor: 'var(--color-primary)',
                                    boxShadow: '0 0 10px var(--color-primary)'
                                }}></span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column - Stats/Info */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="p-6 transition-all"
                                style={{
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)'
                                }}>
                                <User className="w-12 h-12 mb-4" style={{ color: 'var(--color-primary)' }} />
                                <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                                    {profile?.fullName || "Unknown User"}
                                </h2>
                                <p className="text-sm" style={{ color: 'var(--color-primary)' }}>
                                    {profile?.title || "Developer"}
                                </p>
                            </div>

                            <div className="p-6 transition-all"
                                style={{
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)'
                                }}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                                        <span style={{ color: 'var(--color-primary)' }}>
                                            {profile?.location || "Unknown Location"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Terminal className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                                        <span style={{ color: 'var(--color-primary)' }}>Full Stack</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Coffee className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
                                        <span style={{ color: 'var(--color-primary)' }}>Fuel: Coffee</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Bio */}
                        <div className="md:col-span-2 pl-0 md:pl-8"
                            style={{ borderLeft: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-xl leading-relaxed mb-6 font-bold"
                                    style={{ color: 'var(--color-primary-light)' }}>
                                    "{profile?.summary || "System initialization..."}"
                                </p>

                                <div className="space-y-4 leading-relaxed"
                                    style={{ color: 'var(--color-text-muted)' }}>
                                    <p>
                                        <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{">"}</span>
                                        {" "}As a passionate developer, I build accessible, pixel-perfect, and performant web experiences.
                                    </p>
                                    <p>
                                        <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{">"}</span>
                                        {" "}I enjoy turning complex problems into simple, beautiful, and intuitive designs.
                                    </p>
                                    <p>
                                        <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{">"}</span>
                                        {" "}When I'm not pushing pixels, you'll find me exploring new technologies.
                                    </p>
                                </div>

                                {/* <div className="mt-8 pt-8 flex gap-4"
                                    style={{ borderTop: '1px solid color-mix(in srgb, var(--color-border) 30%, transparent)' }}>
                                    <div className="flex-1 p-4 text-center transition-colors"
                                        style={{ border: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                                        <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                                            {profile?.experience?.length || 0}
                                        </h3>
                                        <p className="text-xs uppercase tracking-widest"
                                            style={{ color: 'var(--color-primary)' }}>Roles</p>
                                    </div>
                                    <div className="flex-1 p-4 text-center transition-colors"
                                        style={{ border: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                                        <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                                            {profile?.education?.length || 0}
                                        </h3>
                                        <p className="text-xs uppercase tracking-widest"
                                            style={{ color: 'var(--color-primary)' }}>Education</p>
                                    </div>
                                    <div className="flex-1 p-4 text-center transition-colors"
                                        style={{ border: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                                        <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                                            {profile?.certifications?.length || 0}
                                        </h3>
                                        <p className="text-xs uppercase tracking-widest"
                                            style={{ color: 'var(--color-primary)' }}>Certs</p> */}
                                    {/* </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;
