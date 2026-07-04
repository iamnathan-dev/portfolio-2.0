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

        const syncFromStorage = () => {
            const current =
                localStorage.getItem(STORAGE_KEY) || DEFAULT_PALETTE_ID;
            setSelected(current);
            applyPalette(current);
        };

        window.addEventListener('themechange', syncFromStorage);
        window.addEventListener('palettechange', syncFromStorage);
        return () => {
            window.removeEventListener('themechange', syncFromStorage);
            window.removeEventListener('palettechange', syncFromStorage);
        };
    }, []);

    const selectPalette = (id: string) => {
        setSelected(id);
        localStorage.setItem(STORAGE_KEY, id);
        applyPalette(id);
        window.dispatchEvent(new Event('palettechange'));
    };

    return { selected, selectPalette };
}
