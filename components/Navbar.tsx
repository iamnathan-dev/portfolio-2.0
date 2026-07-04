'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MoveUpRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { COLOR_PALETTES } from '@/lib/colorPalettes';
import { useColorPalette } from '@/hooks/useColorPalette';
import ThemeToggle from './ThemeToggle';

const MENU_LINKS = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About Me',
        url: '/#about-me',
    },
    {
        name: 'Experience',
        url: '/#my-experience',
    },
    {
        name: 'Projects',
        url: '/#selected-projects',
    },
    {
        name: 'Articles',
        url: '/#articles',
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { selected, selectPalette } = useColorPalette();

    return (
        <>
            <div className="sticky top-0 z-[4]">
                <Link
                    href="/"
                    className="absolute top-5 left-5 md:left-10 z-[2] font-mono text-sm tracking-wider"
                >
                    N<span className="text-primary">.</span>J
                </Link>

                <button
                    onClick={() =>
                        window.dispatchEvent(
                            new Event('open-command-palette'),
                        )
                    }
                    aria-label="Open command palette"
                    className="hidden sm:flex absolute top-5 right-36 md:right-44 z-[2] items-center gap-1.5 rounded border border-border px-2.5 h-11 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                    <Search size={14} />
                    <kbd className="text-[10px]">⌘K</kbd>
                </button>

                <div className="absolute top-5 right-20 md:right-28 z-[2]">
                    <ThemeToggle />
                </div>

                <div className="absolute top-5 right-5 md:right-10 z-[2] flex items-center gap-2.5">
                    <button
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className="group relative size-11 rounded border border-border transition-colors hover:border-primary/60"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="pointer-events-none absolute -top-px -left-px h-2.5 w-2.5 border-l border-t border-primary/70" />
                        <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-primary/70" />
                        <span
                            className={cn(
                                'inline-block w-1/2 h-0.5 bg-primary rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px] ',
                                {
                                    'rotate-45 -translate-y-1/2': isMenuOpen,
                                    'md:group-hover:rotate-12': !isMenuOpen,
                                },
                            )}
                        ></span>
                        <span
                            className={cn(
                                'inline-block w-1/2 h-0.5 bg-primary rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px] ',
                                {
                                    '-rotate-45 -translate-y-1/2': isMenuOpen,
                                    'md:group-hover:-rotate-12': !isMenuOpen,
                                },
                            )}
                        ></span>
                    </button>
                </div>
            </div>

            <div
                className={cn(
                    'overlay fixed inset-0 z-[2] bg-black/70 transition-all duration-150',
                    {
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[720px] max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-[3] overflow-hidden gap-y-14 border-l border-primary/20',
                    'flex flex-col lg:justify-center py-10',
                    { 'translate-x-0': isMenuOpen },
                )}
            >
                <div
                    className={cn(
                        'fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] bg-background-light duration-700 delay-150 z-[-1]',
                        {
                            'translate-x-0': isMenuOpen,
                        },
                    )}
                ></div>

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[linear-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.05)_1px,transparent_1px)] bg-[size:32px_32px]"
                />

                <span className="pointer-events-none absolute top-6 left-6 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
                <span className="pointer-events-none absolute bottom-6 left-6 h-4 w-4 border-l-2 border-b-2 border-primary/50" />

                <div className="absolute top-0 inset-x-0 flex items-center justify-between border-b border-primary/20 bg-primary/[0.03] px-6 py-4">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#ff5f56]" />
                        <span className="size-2 rounded-full bg-[#ffbd2e]" />
                        <span className="size-2 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="font-mono text-xs text-primary tracking-wide">
                        menu.ts
                    </span>
                </div>

                <div className="grow flex md:items-center w-full max-w-[420px] mx-8 sm:mx-auto">
                    <div className="flex gap-14 lg:justify-between max-lg:flex-col w-full">
                        <div className="max-lg:order-2">
                            <p className="font-mono text-sm text-muted-foreground mb-6 md:mb-9 tracking-widest">
                                {'// SOCIAL'}
                            </p>
                            <ul className="space-y-4">
                                {SOCIAL_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xl capitalize transition-colors hover:text-primary hover:underline"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="">
                            <p className="font-mono text-sm text-muted-foreground mb-6 md:mb-9 tracking-widest">
                                {'// MENU'}
                            </p>
                            <ul className="space-y-4">
                                {MENU_LINKS.map((link, idx) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => {
                                                router.push(link.url);
                                                setIsMenuOpen(false);
                                            }}
                                            className="group text-2xl sm:text-3xl font-anton flex items-center gap-4"
                                        >
                                            <span className="flex size-4 items-center justify-center rounded-full bg-primary/15 border border-primary/40 transition-all group-hover:scale-[180%] group-hover:bg-primary">
                                                <MoveUpRight
                                                    size={9}
                                                    className="scale-0 text-black group-hover:scale-100 transition-all"
                                                />
                                            </span>
                                            {link.name}
                                            <span className="font-mono text-xs text-primary/60 transition-colors group-hover:text-primary">
                                                {(idx + 1)
                                                    .toString()
                                                    .padStart(2, '0')}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-[420px] mx-8 sm:mx-auto space-y-8">
                    <div>
                        <p className="font-mono text-sm text-muted-foreground mb-4 tracking-widest">
                            {'// ACCENT COLOR'}
                        </p>
                        <div className="flex gap-3">
                            {COLOR_PALETTES.map((palette) => (
                                <button
                                    key={palette.id}
                                    onClick={() => selectPalette(palette.id)}
                                    aria-label={`${palette.name} accent color`}
                                    aria-pressed={selected === palette.id}
                                    className={cn(
                                        'flex size-9 items-center justify-center rounded-full border-2 transition-colors',
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
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="font-mono text-sm text-muted-foreground mb-4 tracking-widest">
                            {'// GET IN TOUCH'}
                        </p>
                        <a
                            href={`mailto:${GENERAL_INFO.email}`}
                            className="text-lg transition-colors hover:text-primary hover:underline"
                        >
                            {GENERAL_INFO.email}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
