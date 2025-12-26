const OrbitRings = () => {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden" style={{ zIndex: 0 }}>
            {/* Ring 1 */}
            <div
                className="absolute rounded-full border border-dashed opacity-20"
                style={{
                    width: '120vh',
                    height: '120vh',
                    borderColor: 'var(--color-primary)',
                    animation: 'orbitRing 60s linear infinite'
                }}
            />

            {/* Ring 2 */}
            <div
                className="absolute rounded-full border border-dotted opacity-10"
                style={{
                    width: '90vh',
                    height: '90vh',
                    borderColor: 'var(--color-secondary, var(--color-primary))',
                    animation: 'orbitRing 40s linear infinite reverse'
                }}
            />

            {/* Ring 3 (Glowing) */}
            <div
                className="absolute rounded-full border opacity-20"
                style={{
                    width: '60vh',
                    height: '60vh',
                    borderColor: 'var(--color-primary)',
                    animation: 'slowRotate 30s linear infinite'
                }}
            />
        </div>
    );
};

export default OrbitRings;
