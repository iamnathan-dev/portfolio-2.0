'use client';
import { useEffect, useRef, useState } from 'react';

type Token = { text: string; className?: string };

const KEYWORD = 'text-[#c586c0]';
const TYPE_NAME = 'text-[#4ec9b0]';
const PROP = 'text-[#9cdcfe]';
const STR = 'text-[#ce9178]';
const BOOL = 'text-[#569cd6]';

const LINES: Token[][] = [
    [
        { text: 'interface', className: KEYWORD },
        { text: ' ' },
        { text: 'Developer', className: TYPE_NAME },
        { text: ' {' },
    ],
    [
        { text: '  ' },
        { text: 'name', className: PROP },
        { text: ': ' },
        { text: 'string', className: TYPE_NAME },
        { text: ';' },
    ],
    [
        { text: '  ' },
        { text: 'roles', className: PROP },
        { text: ': ' },
        { text: 'string[]', className: TYPE_NAME },
        { text: ';' },
    ],
    [
        { text: '  ' },
        { text: 'stack', className: PROP },
        { text: ': ' },
        { text: 'string[]', className: TYPE_NAME },
        { text: ';' },
    ],
    [
        { text: '  ' },
        { text: 'available', className: PROP },
        { text: ': ' },
        { text: 'boolean', className: TYPE_NAME },
        { text: ';' },
    ],
    [{ text: '}' }],
    [],
    [
        { text: 'const', className: KEYWORD },
        { text: ' nathan: ' },
        { text: 'Developer', className: TYPE_NAME },
        { text: ' = {' },
    ],
    [
        { text: '  ' },
        { text: 'name', className: PROP },
        { text: ': ' },
        { text: '"Nathaniel Joseph"', className: STR },
        { text: ',' },
    ],
    [
        { text: '  ' },
        { text: 'roles', className: PROP },
        { text: ': [' },
        { text: '"Frontend"', className: STR },
        { text: ', ' },
        { text: '"Mobile"', className: STR },
        { text: ', ' },
        { text: '"Full-Stack"', className: STR },
        { text: '],' },
    ],
    [
        { text: '  ' },
        { text: 'stack', className: PROP },
        { text: ': [' },
        { text: '"React"', className: STR },
        { text: ', ' },
        { text: '"Next.js"', className: STR },
        { text: ', ' },
        { text: '"React Native"', className: STR },
        { text: '],' },
    ],
    [
        { text: '  ' },
        { text: 'available', className: PROP },
        { text: ': ' },
        { text: 'true', className: BOOL },
        { text: ',' },
    ],
    [{ text: '};' }],
    [],
    [
        { text: 'export', className: KEYWORD },
        { text: ' ' },
        { text: 'default', className: KEYWORD },
        { text: ' nathan;' },
    ],
];

const lineLength = (line: Token[]) =>
    line.reduce((sum, t) => sum + t.text.length, 0);

const TOTAL_STEPS =
    LINES.reduce((sum, line) => sum + lineLength(line), 0) + LINES.length - 1;

const TYPE_MS = 32;
const ERASE_MS = 9;
const HOLD_FULL_MS = 2200;
const HOLD_EMPTY_MS = 500;

function revealLines(step: number): Token[][] {
    let remaining = step;
    const result: Token[][] = [];

    for (const line of LINES) {
        if (remaining <= 0) {
            result.push([]);
            continue;
        }

        const len = lineLength(line);

        if (remaining >= len) {
            result.push(line);
            remaining -= len + 1; // + newline step
        } else {
            let left = remaining;
            const tokens: Token[] = [];

            for (const t of line) {
                if (left <= 0) break;
                if (t.text.length <= left) {
                    tokens.push(t);
                    left -= t.text.length;
                } else {
                    tokens.push({ text: t.text.slice(0, left), className: t.className });
                    left = 0;
                }
            }

            result.push(tokens);
            remaining = 0;
        }
    }

    return result;
}

const CodeEditor = () => {
    const [step, setStep] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let direction: 'typing' | 'erasing' = 'typing';
        let current = 0;

        const schedule = (fn: () => void, ms: number) => {
            timeoutRef.current = setTimeout(() => {
                if (document.hidden) {
                    const resume = () => {
                        document.removeEventListener(
                            'visibilitychange',
                            resume,
                        );
                        fn();
                    };
                    document.addEventListener('visibilitychange', resume);
                    return;
                }
                fn();
            }, ms);
        };

        const tick = () => {
            if (direction === 'typing') {
                current += 1;
                setStep(current);

                if (current >= TOTAL_STEPS) {
                    schedule(() => {
                        direction = 'erasing';
                        tick();
                    }, HOLD_FULL_MS);
                    return;
                }
                schedule(tick, TYPE_MS);
            } else {
                current -= 1;
                setStep(current);

                if (current <= 0) {
                    schedule(() => {
                        direction = 'typing';
                        tick();
                    }, HOLD_EMPTY_MS);
                    return;
                }
                schedule(tick, ERASE_MS);
            }
        };

        schedule(tick, TYPE_MS);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const lines = revealLines(step);
    let cursorLine = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) cursorLine = i;
    }

    return (
        <div className="relative w-full rounded-lg border border-border bg-[#0d1117] overflow-hidden">
            <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-l-2 border-t-2 border-primary/60" />
            <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-primary/60" />

            <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-3">
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="size-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-[#9cdcfe]">
                    <span className="rounded-[3px] bg-[#3178c6] px-1 text-[9px] font-bold text-white">
                        TS
                    </span>
                    developer.ts
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                    <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                    </span>
                    LIVE
                </div>
            </div>

            <div className="flex px-2 py-4 font-mono text-[13px] leading-6">
                <div className="select-none pr-4 text-right text-white/20">
                    {LINES.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                <div className="flex-1 overflow-hidden">
                    {lines.map((tokens, i) => (
                        <div key={i} className="whitespace-pre text-[#d4d4d4]">
                            {tokens.map((t, j) => (
                                <span key={j} className={t.className}>
                                    {t.text}
                                </span>
                            ))}
                            {i === cursorLine && (
                                <span className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] animate-pulse bg-primary align-middle" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
