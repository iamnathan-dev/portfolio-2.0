export interface ColorPalette {
    id: string;
    name: string;
    swatch: string;
    dark: { primary: string; primaryForeground: string };
    light: { primary: string; primaryForeground: string };
    // Degrees to rotate the (green-based) GitHub contribution graph image so
    // its accent matches this palette. Relative to green's ~140° hue.
    hueRotate: number;
}

export const DEFAULT_PALETTE_ID = 'green';

export const COLOR_PALETTES: ColorPalette[] = [
    {
        id: 'green',
        name: 'Matrix',
        swatch: '#00e676',
        dark: { primary: '140 100% 47%', primaryForeground: '0 0% 13%' },
        light: { primary: '140 65% 32%', primaryForeground: '0 0% 100%' },
        hueRotate: 0,
    },
    {
        id: 'cyan',
        name: 'Electric',
        swatch: '#00c8ff',
        dark: { primary: '193 100% 50%', primaryForeground: '0 0% 13%' },
        light: { primary: '193 85% 30%', primaryForeground: '0 0% 100%' },
        hueRotate: 53,
    },
    {
        id: 'purple',
        name: 'Neon',
        swatch: '#a855f7',
        dark: { primary: '270 95% 65%', primaryForeground: '0 0% 13%' },
        light: { primary: '270 75% 38%', primaryForeground: '0 0% 100%' },
        hueRotate: 130,
    },
    {
        id: 'orange',
        name: 'Amber',
        swatch: '#ff9500',
        dark: { primary: '30 100% 55%', primaryForeground: '0 0% 13%' },
        light: { primary: '30 90% 35%', primaryForeground: '0 0% 100%' },
        hueRotate: -110,
    },
    {
        id: 'pink',
        name: 'Magenta',
        swatch: '#fa42a3',
        dark: { primary: '330 95% 62%', primaryForeground: '0 0% 13%' },
        light: { primary: '330 80% 38%', primaryForeground: '0 0% 100%' },
        hueRotate: 190,
    },
    {
        id: 'red',
        name: 'Crimson',
        swatch: '#f53d3d',
        dark: { primary: '0 90% 60%', primaryForeground: '0 0% 13%' },
        light: { primary: '0 75% 40%', primaryForeground: '0 0% 100%' },
        hueRotate: -140,
    },
];

export function getPalette(id: string): ColorPalette {
    return COLOR_PALETTES.find((p) => p.id === id) ?? COLOR_PALETTES[0];
}

export function applyPalette(id: string) {
    if (typeof document === 'undefined') return;

    const palette = getPalette(id);
    const isLight = document.documentElement.classList.contains('light');
    const variant = isLight ? palette.light : palette.dark;

    document.documentElement.style.setProperty('--primary', variant.primary);
    document.documentElement.style.setProperty(
        '--primary-foreground',
        variant.primaryForeground,
    );
}
