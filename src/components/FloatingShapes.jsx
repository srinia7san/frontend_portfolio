import { useMemo } from 'react';

const FloatingShapes = () => {
    const shapes = useMemo(() => {
        return Array.from({ length: 8 }).map((_, i) => ({
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            size: Math.random() * 50 + 30, // Larger shapes
            delay: Math.random() * 5,
            duration: Math.random() * 20 + 15, // Slower, majestic movement
            type: i === 0 ? 'globe' : i % 3 === 0 ? 'cube' : i % 3 === 1 ? 'pyramid' : 'torus',
            color: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary, var(--color-primary))'
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            {shapes.map((shape, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        left: shape.left,
                        top: shape.top,
                        width: `${shape.size}px`,
                        height: `${shape.size}px`,
                        perspective: '1000px',
                        animation: `floatCode ${shape.duration}s ease-in-out infinite alternate`,
                        animationDelay: `${shape.delay}s`
                    }}
                >
                    <div
                        className="w-full h-full relative"
                        style={{
                            transformStyle: 'preserve-3d',
                            animation: `rotateCube ${shape.duration}s linear infinite`
                        }}
                    >
                        {/* WIREFRAME CUBE */}
                        {shape.type === 'cube' && (
                            <>
                                {[0, 90, 180, 270].map((deg) => (
                                    <div key={`y-${deg}`} className="absolute inset-0 border border-current opacity-40 bg-[length:10px_10px] bg-[radial-gradient(currentColor_1px,transparent_1px)]"
                                        style={{ transform: `rotateY(${deg}deg) translateZ(${shape.size / 2}px)`, color: shape.color }}></div>
                                ))}
                                {[90, -90].map((deg) => (
                                    <div key={`x-${deg}`} className="absolute inset-0 border border-current opacity-40 bg-[length:10px_10px] bg-[radial-gradient(currentColor_1px,transparent_1px)]"
                                        style={{ transform: `rotateX(${deg}deg) translateZ(${shape.size / 2}px)`, color: shape.color }}></div>
                                ))}
                            </>
                        )}

                        {/* WIREFRAME PYRAMID */}
                        {shape.type === 'pyramid' && (
                            <>
                                <div className="absolute inset-0 border-2 border-current opacity-50" style={{ transform: 'rotateX(30deg) translateZ(10px)', color: shape.color }}></div>
                                <div className="absolute inset-0 border-2 border-current opacity-50" style={{ transform: 'rotateY(90deg) rotateX(30deg) translateZ(10px)', color: shape.color }}></div>
                                <div className="absolute inset-0 border-2 border-current opacity-50" style={{ transform: 'rotateY(180deg) rotateX(30deg) translateZ(10px)', color: shape.color }}></div>
                                <div className="absolute inset-0 border-2 border-current opacity-50" style={{ transform: 'rotateY(-90deg) rotateX(30deg) translateZ(10px)', color: shape.color }}></div>
                            </>
                        )}

                        {/* WIREFRAME GLOBE */}
                        {shape.type === 'globe' && (
                            <>
                                {[...Array(6)].map((_, idx) => (
                                    <div key={`lat-${idx}`} className="absolute inset-0 rounded-full border border-current opacity-40"
                                        style={{
                                            transform: `rotateY(${idx * 30}deg)`,
                                            color: shape.color
                                        }}></div>
                                ))}
                                <div className="absolute inset-0 rounded-full border border-current opacity-40" style={{ transform: 'rotateX(90deg)', color: shape.color }}></div>
                                <div className="absolute inset-0 rounded-full border border-current opacity-40" style={{ transform: 'rotateX(0deg)', color: shape.color }}></div>
                            </>
                        )}

                        {/* WIREFRAME TORUS (Simulated with rotating circles) */}
                        {shape.type === 'torus' && (
                            <>
                                {[...Array(8)].map((_, idx) => (
                                    <div key={`torus-${idx}`} className="absolute inset-0 rounded-full border border-current opacity-40"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            transform: `rotateY(${idx * 22.5}deg) translateX(${shape.size * 0.3}px)`,
                                            color: shape.color
                                        }}></div>
                                ))}
                            </>
                        )}

                    </div>
                </div>
            ))}
        </div>
    );
};

export default FloatingShapes;
