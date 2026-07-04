'use client';
import { applyPalette, DEFAULT_PALETTE_ID } from '@/lib/colorPalettes';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'palette';

export function useColorPalette() {
    const [selected, setSelected] = useState(DEFAULT_PALETTE_ID);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) || DEFAULT_PALETTE_ID;
        setSelected(stored);
        applyPalette(stored);

        const handleThemeChange = () => {
            const current =
                localStorage.getItem(STORAGE_KEY) || DEFAULT_PALETTE_ID;
            applyPalette(current);
        };

        window.addEventListener('themechange', handleThemeChange);
        return () =>
            window.removeEventListener('themechange', handleThemeChange);
    }, []);

    const selectPalette = (id: string) => {
        setSelected(id);
        localStorage.setItem(STORAGE_KEY, id);
        applyPalette(id);
    };

    return { selected, selectPalette };
}
