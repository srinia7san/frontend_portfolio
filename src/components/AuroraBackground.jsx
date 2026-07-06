import { useEffect, useRef } from 'react';

const AuroraBackground = () => {
    const blobRefs = useRef([]);

    useEffect(() => {
        // Subtle mouse parallax for blobs
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            blobRefs.current.forEach((blob, i) => {
                if (blob) {
                    const speed = (i + 1) * 0.02;
                    const x = (clientX - centerX) * speed;
                    const y = (clientY - centerY) * speed;
                    blob.style.transform = `translate(${x}px, ${y}px)`;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            {/* Base dark gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse at 50% 50%, 
            color-mix(in srgb, var(--color-bg) 90%, var(--color-primary)) 0%, 
            var(--color-bg) 70%)`
                }}
            />

            {/* Aurora blob 1 - Top left */}
            <div
                ref={el => blobRefs.current[0] = el}
                className="absolute aurora-blob"
                style={{
                    width: '60vw',
                    height: '60vh',
                    top: '-20%',
                    left: '-10%',
                    background: `radial-gradient(ellipse at center, 
            color-mix(in srgb, var(--color-primary) 25%, transparent) 0%, 
            transparent 70%)`,
                    filter: 'blur(60px)',
                    animation: 'auroraFloat1 20s ease-in-out infinite',
                    opacity: 0.6
                }}
            />

            {/* Aurora blob 2 - Top right */}
            <div
                ref={el => blobRefs.current[1] = el}
                className="absolute aurora-blob"
                style={{
                    width: '50vw',
                    height: '50vh',
                    top: '-10%',
                    right: '-15%',
                    background: `radial-gradient(ellipse at center, 
            color-mix(in srgb, var(--color-secondary, var(--color-primary)) 20%, transparent) 0%, 
            transparent 70%)`,
                    filter: 'blur(80px)',
                    animation: 'auroraFloat2 25s ease-in-out infinite',
                    opacity: 0.5
                }}
            />

            {/* Aurora blob 3 - Bottom center */}
            <div
                ref={el => blobRefs.current[2] = el}
                className="absolute aurora-blob"
                style={{
                    width: '70vw',
                    height: '40vh',
                    bottom: '-15%',
                    left: '20%',
                    background: `radial-gradient(ellipse at center, 
            color-mix(in srgb, var(--color-primary) 15%, transparent) 0%, 
            transparent 60%)`,
                    filter: 'blur(100px)',
                    animation: 'auroraFloat3 30s ease-in-out infinite',
                    opacity: 0.4
                }}
            />

            {/* Mesh gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(at 40% 20%, color-mix(in srgb, var(--color-primary) 8%, transparent) 0px, transparent 50%),
            radial-gradient(at 80% 0%, color-mix(in srgb, var(--color-primary) 5%, transparent) 0px, transparent 50%),
            radial-gradient(at 0% 50%, color-mix(in srgb, var(--color-primary) 6%, transparent) 0px, transparent 50%),
            radial-gradient(at 80% 50%, color-mix(in srgb, var(--color-primary) 4%, transparent) 0px, transparent 50%),
            radial-gradient(at 0% 100%, color-mix(in srgb, var(--color-primary) 7%, transparent) 0px, transparent 50%),
            radial-gradient(at 80% 100%, color-mix(in srgb, var(--color-primary) 5%, transparent) 0px, transparent 50%),
            radial-gradient(at 0% 0%, color-mix(in srgb, var(--color-primary) 4%, transparent) 0px, transparent 50%)
          `,
                    animation: 'meshShift 20s ease-in-out infinite alternate'
                }}
            />

            {/* Noise texture overlay for depth */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay'
                }}
            />
        </div>
    );
};

export default AuroraBackground;
