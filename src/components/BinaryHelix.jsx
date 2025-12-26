import { useEffect, useRef } from 'react';

const BinaryHelix = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = 300;
        let height = canvas.height = 600;

        // Resize handler
        const handleResize = () => {
            // Adjust size based on viewport - keep it as a side element
            // We'll keep fixed size for the helix rendering calculation
        };
        window.addEventListener('resize', handleResize);

        // Helix properties
        let time = 0;
        const strands = 2; // Double helix
        const particlesPerStrand = 25;
        const speed = 0.02;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#00ff00';
            ctx.font = '14px monospace';

            time += speed;

            for (let i = 0; i < particlesPerStrand; i++) {
                const y = (i / particlesPerStrand) * height; // Distribute vertically

                for (let s = 0; s < strands; s++) {
                    // Calculate x and z positions for helix
                    // Offset each strand by PI (180 degrees)
                    const angle = (y * 0.02) + time + (s * Math.PI);
                    const radius = 60 + Math.sin(time * 0.5 + y * 0.01) * 20; // Pulsing radius

                    const x = width / 2 + Math.cos(angle) * radius;

                    // Z-index simulation (size and opacity)
                    const z = Math.sin(angle); // -1 to 1
                    const size = 10 + z * 4;
                    const opacity = 0.3 + (z + 1) / 2 * 0.7; // 0.3 to 1.0

                    ctx.globalAlpha = opacity;
                    ctx.font = `${size}px monospace`;

                    // Random binary char, changes occasionally
                    const char = Math.random() > 0.5 ? '1' : '0';

                    // Draw the connection line (base pairs)
                    if (s === 0) {
                        const x2 = width / 2 + Math.cos(angle + Math.PI) * radius;
                        ctx.beginPath();
                        ctx.strokeStyle = ctx.fillStyle;
                        ctx.lineWidth = 0.5;
                        ctx.globalAlpha = 0.1;
                        ctx.moveTo(x, y);
                        ctx.lineTo(x2, y);
                        ctx.stroke();
                    }

                    ctx.globalAlpha = opacity;
                    ctx.fillText(char, x, y);
                }
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="fixed right-10 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
            <canvas ref={canvasRef} className="opacity-60" />
        </div>
    );
};

export default BinaryHelix;
