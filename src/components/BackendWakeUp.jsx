import { useState, useEffect } from 'react';
import { getBackendStatus, subscribeToBackendStatus, wakeUpBackend } from '../api/api';

const BackendWakeUp = ({ children }) => {
    const [status, setStatus] = useState(getBackendStatus());
    const [dots, setDots] = useState('');

    useEffect(() => {
        // Subscribe to status changes
        const unsubscribe = subscribeToBackendStatus(setStatus);

        // Immediately try to wake up backend on mount
        wakeUpBackend();

        return unsubscribe;
    }, []);

    // Animate the dots
    useEffect(() => {
        if (status !== 'waking') return;

        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, [status]);

    // Show overlay only when waking
    if (status !== 'waking') {
        return children;
    }

    return (
        <>
            {children}
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center"
                style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-bg) 95%, transparent)',
                    backdropFilter: 'blur(8px)'
                }}
            >
                <div
                    className="text-center p-8 rounded-2xl max-w-md mx-4"
                    style={{
                        background: `linear-gradient(135deg, 
              color-mix(in srgb, var(--color-bg) 90%, var(--color-primary)) 0%,
              color-mix(in srgb, var(--color-bg) 95%, var(--color-secondary)) 100%)`,
                        border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                        boxShadow: '0 0 60px color-mix(in srgb, var(--color-primary) 15%, transparent)'
                    }}
                >
                    {/* Animated spinner */}
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div
                            className="absolute inset-0 rounded-full border-2 animate-spin"
                            style={{
                                borderColor: 'color-mix(in srgb, var(--color-border) 30%, transparent)',
                                borderTopColor: 'var(--color-primary)',
                                animationDuration: '1.5s'
                            }}
                        />
                        <div
                            className="absolute inset-2 rounded-full border-2 animate-spin"
                            style={{
                                borderColor: 'color-mix(in srgb, var(--color-border) 20%, transparent)',
                                borderBottomColor: 'var(--color-secondary)',
                                animationDuration: '2s',
                                animationDirection: 'reverse'
                            }}
                        />
                        <div
                            className="absolute inset-4 rounded-full animate-pulse"
                            style={{
                                backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                            }}
                        />
                    </div>

                    {/* Title */}
                    <h2
                        className="text-xl font-mono tracking-widest mb-3"
                        style={{ color: 'var(--color-text)' }}
                    >
                        INITIALIZING{dots.padEnd(3, '\u00A0')}
                    </h2>

                    {/* Description */}
                    <p
                        className="text-sm mb-4 leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        The server is waking up from sleep mode.
                        <br />
                        This may take up to 30-50 seconds.
                    </p>

                    {/* Progress bar */}
                    <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--color-border) 30%, transparent)' }}
                    >
                        <div
                            className="h-full rounded-full animate-pulse"
                            style={{
                                background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
                                animation: 'loading-bar 2s ease-in-out infinite'
                            }}
                        />
                    </div>

                    {/* Subtle hint */}
                    <p
                        className="text-[10px] mt-4 opacity-50 font-mono"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        FREE TIER COLD START - PLEASE WAIT
                    </p>
                </div>
            </div>

            {/* Inline styles for animation */}
            <style>{`
        @keyframes loading-bar {
          0%, 100% { width: 20%; margin-left: 0; }
          50% { width: 60%; margin-left: 40%; }
        }
      `}</style>
        </>
    );
};

export default BackendWakeUp;
