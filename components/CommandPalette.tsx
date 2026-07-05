'use client';
import {
    ARTICLES,
    GENERAL_INFO,
    PROJECTS,
    RESUME_URL,
    SOCIAL_LINKS,
} from '@/lib/data';
import { cn } from '@/lib/utils';
import {
    Download,
    ExternalLink,
    FolderGit2,
    Github,
    Home,
    Linkedin,
    Mail,
    Moon,
    Newspaper,
    Twitter,
    User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Command {
    id: string;
    label: string;
    group: string;
    icon: typeof Home;
    keywords?: string;
    action: () => void;
}

const SOCIAL_ICONS: Record<string, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
};

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const close = () => {
        setIsOpen(false);
        setQuery('');
        setActiveIndex(0);
    };

    const navigate = (href: string) => {
        close();
        if (href.startsWith('/#')) {
            router.push('/');
            requestAnimationFrame(() => {
                setTimeout(() => {
                    document
                        .getElementById(href.slice(2))
                        ?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            });
        } else {
            router.push(href);
        }
    };

    const commands = useMemo<Command[]>(() => {
        const nav: Command[] = [
            {
                id: 'home',
                label: 'Home',
                group: 'Navigate',
                icon: Home,
                action: () => navigate('/'),
            },
            {
                id: 'about',
                label: 'About Me',
                group: 'Navigate',
                icon: User,
                action: () => navigate('/#about-me'),
            },
            {
                id: 'experience',
                label: 'Experience',
                group: 'Navigate',
                icon: FolderGit2,
                action: () => navigate('/#my-experience'),
            },
            {
                id: 'projects',
                label: 'Projects',
                group: 'Navigate',
                icon: FolderGit2,
                action: () => navigate('/#selected-projects'),
            },
            {
                id: 'articles',
                label: 'Articles',
                group: 'Navigate',
                icon: FolderGit2,
                action: () => navigate('/#articles'),
            },
            {
                id: 'contact',
                label: 'Contact',
                group: 'Navigate',
                icon: Mail,
                action: () => navigate('/#contact'),
            },
        ];

        const projects: Command[] = PROJECTS.map((project) => ({
            id: `project-${project.slug}`,
            label: `View project: ${project.title}`,
            group: 'Projects',
            icon: ExternalLink,
            keywords: project.techStack.join(' '),
            action: () => navigate(`/projects/${project.slug}`),
        }));

        const articles: Command[] = ARTICLES.map((article) => ({
            id: `article-${article.slug}`,
            label: `Read article: ${article.title}`,
            group: 'Articles',
            icon: Newspaper,
            keywords: article.tags.join(' '),
            action: () => navigate(`/articles/${article.slug}`),
        }));

        const socials: Command[] = SOCIAL_LINKS.map((link) => ({
            id: `social-${link.name}`,
            label: `Open ${link.name}`,
            group: 'Links',
            icon: SOCIAL_ICONS[link.name] || ExternalLink,
            action: () => {
                close();
                window.open(link.url, '_blank', 'noopener,noreferrer');
            },
        }));

        const actions: Command[] = [
            {
                id: 'resume',
                label: 'Download resume',
                group: 'Actions',
                icon: Download,
                action: () => {
                    close();
                    const a = document.createElement('a');
                    a.href = RESUME_URL;
                    a.download = '';
                    a.click();
                },
            },
            {
                id: 'email',
                label: 'Email Nathan',
                group: 'Actions',
                icon: Mail,
                action: () => {
                    close();
                    window.location.href = `mailto:${GENERAL_INFO.email}`;
                },
            },
            {
                id: 'theme',
                label: 'Toggle theme',
                group: 'Actions',
                icon: Moon,
                action: () => {
                    const isLight =
                        document.documentElement.classList.contains('light');
                    document.documentElement.classList.toggle(
                        'light',
                        !isLight,
                    );
                    localStorage.setItem('theme', !isLight ? 'light' : 'dark');
                    window.dispatchEvent(new Event('themechange'));
                    close();
                },
            },
        ];

        return [...nav, ...projects, ...articles, ...socials, ...actions];
    }, [router]);

    const filtered = useMemo(() => {
        if (!query.trim()) return commands;
        const q = query.toLowerCase();
        return commands.filter(
            (c) =>
                c.label.toLowerCase().includes(q) ||
                c.group.toLowerCase().includes(q) ||
                c.keywords?.toLowerCase().includes(q),
        );
    }, [commands, query]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsOpen((v) => !v);
                return;
            }
            if (e.key === 'Escape' && isOpen) {
                close();
            }
        };

        const handleOpenEvent = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('open-command-palette', handleOpenEvent);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('open-command-palette', handleOpenEvent);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [isOpen]);

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    useEffect(() => {
        listRef.current
            ?.querySelector(`[data-index="${activeIndex}"]`)
            ?.scrollIntoView({ block: 'nearest' });
    }, [activeIndex]);

    const handleInputKeydown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            filtered[activeIndex]?.action();
        }
    };

    if (!isOpen) return null;

    let lastGroup = '';

    return (
        <div className="fixed inset-0 z-[7] flex items-start justify-center pt-[15vh] px-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={close}
                aria-hidden
            />

            <div
                role="dialog"
                aria-label="Command palette"
                className="relative w-full max-w-lg overflow-hidden rounded-lg border border-primary/30 bg-background"
            >
                <div className="flex items-center gap-3 border-b border-primary/20 bg-primary/[0.04] px-4 py-3.5">
                    <span className="font-mono text-primary">{'>'}</span>
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleInputKeydown}
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        ESC
                    </kbd>
                </div>

                <div
                    ref={listRef}
                    className="max-h-[50vh] overflow-y-auto p-2 font-mono text-sm"
                >
                    {filtered.length === 0 && (
                        <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                            No commands found.
                        </p>
                    )}

                    {filtered.map((command, index) => {
                        const showGroupLabel = command.group !== lastGroup;
                        lastGroup = command.group;
                        const Icon = command.icon;

                        return (
                            <div key={command.id}>
                                {showGroupLabel && (
                                    <p className="mt-2 mb-1 px-3 text-[10px] uppercase tracking-widest text-muted-foreground first:mt-0">
                                        {command.group}
                                    </p>
                                )}
                                <button
                                    data-index={index}
                                    onClick={command.action}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors',
                                        index === activeIndex
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-foreground hover:bg-foreground/5',
                                    )}
                                >
                                    <Icon size={14} className="shrink-0" />
                                    <span className="truncate">
                                        {command.label}
                                    </span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
