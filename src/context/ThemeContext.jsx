import { createContext, useContext, useState, useEffect } from 'react';

// Theme definitions with dual-tone colors
export const themes = {
    matrix: {
        name: 'Matrix Green',
        icon: '🟢',
        colors: {
            bg: '#000000',
            bgSecondary: '#0a0a0a',
            primary: '#22c55e',
            primaryDark: '#166534',
            primaryLight: '#007e2eff',
            secondary: '#00ff11ff', // Cyan
            secondaryDark: '#ffffffff',
            text: '#ffffffff',
            textMuted: '#166534',
            border: '#166534',
            accent: '#22c55e',
        }
    },
    cyberpunk: {
        name: 'Cyberpunk Blue',
        icon: '🔵',
        colors: {
            bg: '#0a0a1a',
            bgSecondary: '#0f0f2a',
            primary: '#3b82f6',
            primaryDark: '#1e40af',
            primaryLight: '#60a5fa',
            secondary: '#ec4899', // Pink
            secondaryDark: '#db2777',
            text: '#ffffffff',
            textMuted: '#1e40af',
            border: '#1e40af',
            accent: '#3b82f6',
        }
    },
    amber: {
        name: 'Amber Terminal',
        icon: '🟠',
        colors: {
            bg: '#0d0d0d',
            bgSecondary: '#1a1a1a',
            primary: '#f59e0b',
            primaryDark: '#92400e',
            primaryLight: '#fbbf24',
            secondary: '#eab308', // Yellow
            secondaryDark: '#ca8a04',
            text: '#ffffffff',
            textMuted: '#92400e',
            border: '#92400e',
            accent: '#f59e0b',
        }
    },
    light: {
        name: 'Light Mode',
        icon: '☀️',
        colors: {
            bg: '#f5f5f5',
            bgSecondary: '#ffffff',
            primary: '#16a34a',
            primaryDark: '#15803d',
            primaryLight: '#22c55e',
            secondary: '#16a34a', // Same as primary for light mode
            secondaryDark: '#15803d',
            text: '#1f2937',
            textMuted: '#000000ff',
            border: '#d1d5db',
            accent: '#16a34a',
        }
    },
    purple: {
        name: 'Midnight Purple',
        icon: '🟣',
        colors: {
            bg: '#0f0720',
            bgSecondary: '#1a0f30',
            primary: '#a855f7',
            primaryDark: '#7c3aed',
            primaryLight: '#c084fc',
            secondary: '#ec4899', // Magenta
            secondaryDark: '#db2777',
            text: '#ffffffff',
            textMuted: '#7c3aed',
            border: '#7c3aed',
            accent: '#a855f7',
        }
    }
};

// Create context
const ThemeContext = createContext();

// Theme Provider component
export const ThemeProvider = ({ children }) => {
    // Initialize from localStorage synchronously to prevent flash
    const [currentTheme, setCurrentTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('portfolio-theme');
            return saved && themes[saved] ? saved : 'light';
        }
        return 'light';
    });

    // Apply theme CSS variables
    useEffect(() => {
        const theme = themes[currentTheme];
        const root = document.documentElement;

        // Set CSS custom properties
        root.style.setProperty('--color-bg', theme.colors.bg);
        root.style.setProperty('--color-bg-secondary', theme.colors.bgSecondary);
        root.style.setProperty('--color-primary', theme.colors.primary);
        root.style.setProperty('--color-primary-dark', theme.colors.primaryDark);
        root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
        root.style.setProperty('--color-secondary', theme.colors.secondary);
        root.style.setProperty('--color-secondary-dark', theme.colors.secondaryDark);
        root.style.setProperty('--color-text', theme.colors.text);
        root.style.setProperty('--color-text-muted', theme.colors.textMuted);
        root.style.setProperty('--color-border', theme.colors.border);
        root.style.setProperty('--color-accent', theme.colors.accent);

        // Set body background
        document.body.style.backgroundColor = theme.colors.bg;

        // Save to localStorage
        localStorage.setItem('portfolio-theme', currentTheme);
    }, [currentTheme]);

    const switchTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
        }
    };

    const value = {
        currentTheme,
        theme: themes[currentTheme],
        themes,
        switchTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook to use theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
