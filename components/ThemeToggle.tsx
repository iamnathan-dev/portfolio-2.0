'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState<boolean | null>(null);

    useEffect(() => {
        const sync = () =>
            setIsLight(document.documentElement.classList.contains('light'));

        sync();
        window.addEventListener('themechange', sync);
        return () => window.removeEventListener('themechange', sync);
    }, []);

    const toggleTheme = () => {
        const next = !isLight;
        setIsLight(next);
        document.documentElement.classList.toggle('light', next);
        localStorage.setItem('theme', next ? 'light' : 'dark');
        window.dispatchEvent(new Event('themechange'));
    };

    if (isLight === null) {
        return <div className="size-11" aria-hidden />;
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            className="size-11 rounded-full border border-border flex items-center justify-center transition-colors hover:border-primary hover:text-primary"
        >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
};

export default ThemeToggle;
