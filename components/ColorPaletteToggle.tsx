'use client';
import { COLOR_PALETTES } from '@/lib/colorPalettes';
import { cn } from '@/lib/utils';
import { useColorPalette } from '@/hooks/useColorPalette';
import { Palette } from 'lucide-react';
import { useState } from 'react';

const ColorPaletteToggle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { selected, selectPalette } = useColorPalette();

    return (
        <>
            <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Change accent color"
                aria-expanded={isOpen}
                className="fixed bottom-[136px] right-5 md:right-8 z-[4] size-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur transition-all hover:border-primary hover:text-primary flex items-center justify-center"
            >
                <Palette size={18} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[4]"
                        onClick={() => setIsOpen(false)}
                        aria-hidden
                    />
                    <div
                        role="dialog"
                        aria-label="Accent color settings"
                        className="fixed bottom-[192px] right-5 md:right-8 z-[5] w-56 rounded-lg border border-primary/30 bg-background p-4"
                    >
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            {'// Accent Color'}
                        </p>
                        <div className="grid grid-cols-3 gap-2.5">
                            {COLOR_PALETTES.map((palette) => (
                                <button
                                    key={palette.id}
                                    onClick={() => {
                                        selectPalette(palette.id);
                                        setIsOpen(false);
                                    }}
                                    aria-label={`${palette.name} accent color`}
                                    aria-pressed={selected === palette.id}
                                    className={cn(
                                        'flex flex-col items-center gap-1.5 rounded-md border p-2 transition-colors',
                                        selected === palette.id
                                            ? 'border-primary'
                                            : 'border-transparent hover:border-border',
                                    )}
                                >
                                    <span
                                        className="size-6 rounded-full border border-white/10"
                                        style={{
                                            backgroundColor: palette.swatch,
                                        }}
                                    />
                                    <span className="font-mono text-[9px] text-muted-foreground">
                                        {palette.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ColorPaletteToggle;
