import { useState } from 'react';
import { useTheme, themes } from '../context/ThemeContext';
import { Palette, X } from 'lucide-react';

const ThemeSwitcher = () => {
    const { currentTheme, switchTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Theme Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-[1000] p-3 rounded-full 
                   border-2 transition-all duration-300
                   hover:scale-110 active:scale-95
                   shadow-lg backdrop-blur-sm"
                style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: 'var(--color-primary)',
                    color: 'var(--color-primary)',
                    boxShadow: `0 0 20px color-mix(in srgb, var(--color-primary) 30%, transparent)`
                }}
                title="Switch Theme"
            >
                <Palette size={20} />
            </button>

            {/* Theme Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-[1001] backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Panel */}
                    <div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1002]
                       w-80 max-w-[90vw] rounded-lg p-6 border-2
                       shadow-2xl font-mono"
                        style={{
                            backgroundColor: 'var(--color-bg)',
                            borderColor: 'var(--color-primary)',
                            boxShadow: `0 0 50px color-mix(in srgb, var(--color-primary) 30%, transparent)`
                        }}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 pb-3 border-b"
                            style={{ borderColor: 'var(--color-border)' }}>
                            <h3 className="text-lg font-bold tracking-wider"
                                style={{ color: 'var(--color-primary)' }}>
                                [SELECT_THEME]
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded hover:opacity-70 transition-opacity"
                                style={{ color: 'var(--color-text-muted)' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Theme Options */}
                        <div className="space-y-3">
                            {Object.entries(themes).map(([key, theme]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        switchTheme(key);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full p-3 rounded border-2 flex items-center gap-3
                              transition-all duration-300 group
                              ${currentTheme === key ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
                                    style={{
                                        backgroundColor: currentTheme === key
                                            ? theme.colors.primaryDark + '30'
                                            : theme.colors.bg,
                                        borderColor: currentTheme === key
                                            ? theme.colors.primary
                                            : theme.colors.border,
                                        boxShadow: currentTheme === key
                                            ? `0 0 15px ${theme.colors.primary}40`
                                            : 'none'
                                    }}
                                >
                                    {/* Color Preview */}
                                    <div
                                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
                                        style={{
                                            backgroundColor: theme.colors.bg,
                                            borderColor: theme.colors.primary
                                        }}
                                    >
                                        {theme.icon}
                                    </div>

                                    {/* Theme Name */}
                                    <span
                                        className="flex-1 text-left font-bold tracking-wide"
                                        style={{ color: theme.colors.primary }}
                                    >
                                        {theme.name}
                                    </span>

                                    {/* Active Indicator */}
                                    {currentTheme === key && (
                                        <span
                                            className="w-2 h-2 rounded-full animate-pulse"
                                            style={{
                                                backgroundColor: theme.colors.primary,
                                                boxShadow: `0 0 10px ${theme.colors.primary}`
                                            }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-3 border-t text-center"
                            style={{ borderColor: 'var(--color-border)' }}>
                            <span className="text-xs tracking-wider"
                                style={{ color: 'var(--color-text-muted)' }}>
                                Theme saved automatically
                            </span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ThemeSwitcher;
