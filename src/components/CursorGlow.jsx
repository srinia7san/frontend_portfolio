import { useEffect, useRef, useState } from 'react';

const CursorGlow = () => {
    const glowRef = useRef(null);
    const trailRefs = useRef([]);
    const [isVisible, setIsVisible] = useState(false);
    const positions = useRef([]);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let animationId;
        const trailLength = 5;

        // Initialize positions array
        for (let i = 0; i < trailLength; i++) {
            positions.current[i] = { x: -100, y: -100 };
        }

        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);

            // Update main glow position
            if (glowRef.current) {
                glowRef.current.style.left = `${e.clientX}px`;
                glowRef.current.style.top = `${e.clientY}px`;
            }

            // Shift positions for trail effect
            for (let i = trailLength - 1; i > 0; i--) {
                positions.current[i] = { ...positions.current[i - 1] };
            }
            positions.current[0] = { x: e.clientX, y: e.clientY };

            // Update trail elements
            cancelAnimationFrame(animationId);
            animationId = requestAnimationFrame(() => {
                trailRefs.current.forEach((trail, i) => {
                    if (trail && positions.current[i]) {
                        trail.style.left = `${positions.current[i].x}px`;
                        trail.style.top = `${positions.current[i].y}px`;
                        trail.style.opacity = (1 - (i / trailLength)) * 0.3;
                        trail.style.transform = `translate(-50%, -50%) scale(${1 - (i / trailLength) * 0.5})`;
                    }
                });
            });
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(animationId);
        };
    }, [isVisible]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Main glow */}
            <div
                ref={glowRef}
                className="fixed pointer-events-none z-[9998] transition-opacity duration-300"
                style={{
                    width: '400px',
                    height: '400px',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, 
            color-mix(in srgb, var(--color-primary) 8%, transparent) 0%, 
            transparent 70%)`,
                    opacity: isVisible ? 1 : 0,
                    filter: 'blur(2px)'
                }}
            />

            {/* Trail dots */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    ref={el => trailRefs.current[i] = el}
                    className="fixed pointer-events-none z-[9997] rounded-full"
                    style={{
                        width: '8px',
                        height: '8px',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'var(--color-primary)',
                        opacity: 0,
                        transition: 'left 0.1s ease-out, top 0.1s ease-out'
                    }}
                />
            ))}
        </>
    );
};

export default CursorGlow;
