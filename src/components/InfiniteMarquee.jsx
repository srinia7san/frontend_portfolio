const InfiniteMarquee = ({
    text = "FULL STACK DEVELOPER • CREATIVE CODER • UI/UX ENTHUSIAST • OPEN SOURCE • ",
    speed = 30,
    direction = "left",
    className = ""
}) => {
    // Duplicate the text 4 times for seamless loop
    const repeatedText = Array(4).fill(text).join('');

    return (
        <div
            className={`marquee-container overflow-hidden whitespace-nowrap ${className}`}
            style={{
                maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)'
            }}
        >
            <div
                className="marquee-content inline-block"
                style={{
                    animation: `marquee-scroll ${speed}s linear infinite`,
                    animationDirection: direction === 'right' ? 'reverse' : 'normal'
                }}
            >
                <span
                    className="text-sm md:text-base font-mono tracking-[0.3em] uppercase"
                    style={{
                        color: 'color-mix(in srgb, var(--color-primary) 30%, transparent)',
                    }}
                >
                    {repeatedText}
                </span>
            </div>
            <div
                className="marquee-content inline-block"
                style={{
                    animation: `marquee-scroll ${speed}s linear infinite`,
                    animationDirection: direction === 'right' ? 'reverse' : 'normal'
                }}
                aria-hidden="true"
            >
                <span
                    className="text-sm md:text-base font-mono tracking-[0.3em] uppercase"
                    style={{
                        color: 'color-mix(in srgb, var(--color-primary) 30%, transparent)',
                    }}
                >
                    {repeatedText}
                </span>
            </div>
        </div>
    );
};

export default InfiniteMarquee;
