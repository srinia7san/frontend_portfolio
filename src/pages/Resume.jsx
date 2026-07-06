import React from 'react';
import SideBar from "../components/SideBar";

const Resume = () => {
    return (
        <div className="flex min-h-screen font-mono"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
            <SideBar />

            <div className="flex-1 p-6 md:p-8 h-screen relative flex flex-col">
                <div className="pb-6 mb-8"
                    style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-border) 50%, transparent)' }}>
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter flex items-center">
                            <span className="mr-3" style={{ color: 'var(--color-text)' }}>{">"}</span>
                            RESUME.PDF
                        </h1>
                        <a
                            href="/srinivasan_m_47.pdf"
                            download="srinivasan_m_47.pdf"
                            className="flex items-center gap-2 px-4 py-2 uppercase tracking-wider text-sm font-bold transition-all hover:scale-105"
                            style={{
                                border: '1px solid var(--color-primary)',
                                color: 'var(--color-primary)',
                                backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)'
                            }}
                        >
                            [ DOWNLOAD PDF ]
                        </a>
                    </div>
                </div>

                <div className="flex-1 w-full relative" style={{ border: '1px solid var(--color-border)' }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center -z-10" style={{ color: 'var(--color-text-muted)' }}>
                        <p className="mb-4">PDF Viewer</p>
                        <p className="text-sm">If it doesn't load, use the download button above.</p>
                        <p className="text-xs mt-2" style={{ color: 'var(--color-primary)' }}>Note: Place your 'srinivasan_m_47.pdf' in the public/ folder.</p>
                    </div>
                    
                    <iframe 
                        src="/srinivasan_m_47.pdf" 
                        title="Resume" 
                        className="w-full h-full z-10 relative bg-white/5"
                        style={{ border: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Resume;
