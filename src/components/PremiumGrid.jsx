import { useEffect, useRef, useState } from 'react';

const PremiumGrid = () => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Dense grid with muted secondary color (desaturated version of primary)
    const gridColor = 'color-mix(in srgb, var(--color-primary) 60%, #666)'; // Muted version
    const revealColor = 'color-mix(in srgb, var(--color-primary) 80%, #fff)'; // Brighter reveal

    const baseGridStyle = {
        backgroundImage: `
      linear-gradient(${gridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
    `,
        backgroundSize: '25px 25px', // Much denser grid
    };

    const revealGridStyle = {
        backgroundImage: `
      linear-gradient(${revealColor} 1px, transparent 1px),
      linear-gradient(90deg, ${revealColor} 1px, transparent 1px)
    `,
        backgroundSize: '25px 25px', // Same density
    };

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

            {/* BASE GRID (Faint muted color, always visible) */}
            <div
                className="absolute inset-0"
                style={{
                    ...baseGridStyle,
                    opacity: 0.08, // Very subtle
                }}
            />

            {/* CURSOR REVEAL GRID (Brighter, revealed near cursor) */}
            <div
                className="absolute inset-0"
                style={{
                    ...revealGridStyle,
                    opacity: 0.4, // Brighter reveal
                    maskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 80%)`,
                    WebkitMaskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 80%)`,
                }}
            />

            {/* SECONDARY DOT PATTERN (Extra detail layer) */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, ${gridColor} 1px, transparent 1px)`,
                    backgroundSize: '25px 25px',
                    opacity: 0.03,
                }}
            />

            {/* CURSOR SPOTLIGHT GLOW */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    left: mousePos.x - 300,
                    top: mousePos.y - 300,
                    background: `radial-gradient(circle, color-mix(in srgb, var(--color-primary) 5%, transparent) 0%, transparent 60%)`,
                }}
            />

            {/* Edge vignette for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_center,transparent_0%,var(--color-bg)_100%)] pointer-events-none" />
        </div>
    );
};

export default PremiumGrid;
