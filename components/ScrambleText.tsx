'use client';
import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#01';

interface Props {
    words: string[];
    className?: string;
    holdMs?: number;
}

const ScrambleText = ({ words, className, holdMs = 2200 }: Props) => {
    const [display, setDisplay] = useState(words[0]);
    const rafRef = useRef<number | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let cancelled = false;
        let wordIndex = 0;

        const scrambleTo = (target: string) =>
            new Promise<void>((resolve) => {
                const totalSteps = target.length * 3;
                let step = 0;

                const tick = () => {
                    if (cancelled) return resolve();

                    setDisplay(
                        target
                            .split('')
                            .map((char, i) => {
                                if (char === ' ') return ' ';
                                if (i < step / 3) return char;
                                return CHARS[
                                    Math.floor(Math.random() * CHARS.length)
                                ];
                            })
                            .join(''),
                    );

                    if (step >= totalSteps) {
                        setDisplay(target);
                        return resolve();
                    }
                    step++;
                    rafRef.current = requestAnimationFrame(tick);
                };

                tick();
            });

        const run = async () => {
            while (!cancelled) {
                await scrambleTo(words[wordIndex]);
                await new Promise<void>((resolve) => {
                    timeoutRef.current = setTimeout(resolve, holdMs);
                });
                wordIndex = (wordIndex + 1) % words.length;
            }
        };

        run();

        return () => {
            cancelled = true;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [words, holdMs]);

    return <span className={className}>{display}</span>;
};

export default ScrambleText;
