'use client';
import Button from '@/components/Button';
import SectionTitle from '@/components/SectionTitle';
import { GENERAL_INFO, RESUME_URL } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { AlertTriangle, Check, Copy, Download, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface RoleFitBreakdown {
    skillsMatch: number;
    experienceMatch: number;
    projectRelevance: number;
    seniorityFit: number;
}

interface RoleFitResult {
    score: number;
    verdict: string;
    breakdown: RoleFitBreakdown;
    breakdownMax: RoleFitBreakdown;
    highlights: string[];
    considerations: string[];
    pitch: string;
    contactEmail: string;
}

const BREAKDOWN_LABELS: Record<keyof RoleFitBreakdown, string> = {
    skillsMatch: 'Skills match',
    experienceMatch: 'Experience level',
    projectRelevance: 'Project relevance',
    seniorityFit: 'Seniority fit',
};

const SAMPLE_ROLES = [
    {
        label: 'Frontend Engineer',
        text: 'We are hiring a Frontend Engineer to build fast, accessible web interfaces with React and Next.js, work closely with designers to ship pixel-perfect UI, and help modernize our component library and design system.',
    },
    {
        label: 'React Native Developer',
        text: 'Looking for a React Native Developer to build and maintain a cross-platform mobile app on iOS and Android using Expo, integrate third-party APIs, and improve app stability and release pipelines.',
    },
    {
        label: 'Full-Stack Developer',
        text: 'Seeking a Full-Stack Developer comfortable across a Next.js/React frontend and a Node.js backend, who can own features end-to-end, work with SQL/NoSQL databases, and ship to production independently.',
    },
];

const CIRCUMFERENCE = 2 * Math.PI * 42;

const ScoreGauge = ({ score }: { score: number }) => {
    const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

    return (
        <div className="relative flex size-28 shrink-0 items-center justify-center">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    strokeWidth="8"
                    className="stroke-border"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-out"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="font-anton text-3xl text-primary">
                    {score}
                    <span className="text-lg">%</span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    ATS Score
                </span>
            </div>
        </div>
    );
};

const RoleFitAnalyzer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<RoleFitResult | null>(null);
    const [copied, setCopied] = useState(false);

    useGSAP(
        () => {
            gsap.from('.role-fit-reveal', {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        },
        { scope: containerRef },
    );

    const analyze = async () => {
        if (!jobDescription.trim() || loading) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch('/api/role-fit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(
                    data.error ?? 'Something went wrong. Please try again.',
                );
                return;
            }

            setResult(data);
        } catch {
            setError('Could not reach the analyzer. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyPitch = async () => {
        if (!result) return;
        try {
            await navigator.clipboard.writeText(result.pitch);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard unavailable — silently ignore
        }
    };

    return (
        <section className="pb-section" id="role-fit">
            <div className="container" ref={containerRef}>
                <p className="role-fit-reveal font-mono text-xs text-primary mb-3 tracking-wider">
                    {'// FOR RECRUITERS & HIRING MANAGERS'}
                </p>
                <SectionTitle
                    title="Is Nathan Right For Your Role?"
                    icon={<Sparkles size={16} />}
                    classNames={{ title: 'font-mono tracking-widest' }}
                    className="role-fit-reveal"
                />

                <p className="role-fit-reveal mb-6 max-w-2xl text-muted-foreground">
                    Paste a job description below and get an instant, honest
                    breakdown of how Nathan&apos;s real experience maps to it —
                    no scheduling a call required.
                </p>

                <div className="role-fit-reveal grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                            {SAMPLE_ROLES.map((role) => (
                                <button
                                    key={role.label}
                                    onClick={() => setJobDescription(role.text)}
                                    className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                                >
                                    Try: {role.label}
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description or key requirements here..."
                            rows={8}
                            className="w-full resize-none rounded-lg border border-border bg-foreground/[0.02] p-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        />

                        <Button
                            as="button"
                            variant="primary"
                            onClick={analyze}
                            loading={loading}
                            disabled={!jobDescription.trim() || loading}
                            className="mt-4 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Analyze Fit
                        </Button>

                        {error && (
                            <p className="mt-3 font-mono text-xs text-destructive">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="border border-border bg-foreground/[0.02] p-6">
                        {!result && !loading && (
                            <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center text-muted-foreground">
                                <Sparkles
                                    size={22}
                                    className="mb-3 text-primary/50"
                                />
                                <p className="max-w-[240px] text-sm">
                                    Your results will appear here — score,
                                    reasons, and a ready-to-send summary.
                                </p>
                            </div>
                        )}

                        {loading && (
                            <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 text-center">
                                <span className="relative flex size-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex size-3 rounded-full bg-primary" />
                                </span>
                                <p className="font-mono text-xs text-muted-foreground">
                                    Comparing against real experience
                                    <span className="animate-pulse">...</span>
                                </p>
                            </div>
                        )}

                        {result && !loading && (
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center gap-4">
                                    <ScoreGauge score={result.score} />
                                    <div>
                                        <p className="font-anton text-xl uppercase leading-tight">
                                            {result.verdict}
                                        </p>
                                        <p className="font-mono text-[11px] text-muted-foreground">
                                            Scored against real roles, skills
                                            &amp; projects
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {(
                                        Object.keys(BREAKDOWN_LABELS) as Array<
                                            keyof RoleFitBreakdown
                                        >
                                    ).map((key) => {
                                        const value = result.breakdown[key];
                                        const max = result.breakdownMax[key];
                                        const pct = max
                                            ? Math.round((value / max) * 100)
                                            : 0;

                                        return (
                                            <div
                                                key={key}
                                                className="flex items-center gap-3"
                                            >
                                                <span className="w-[110px] shrink-0 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                                                    {BREAKDOWN_LABELS[key]}
                                                </span>
                                                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                                                    <span
                                                        className="block h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
                                                        style={{
                                                            width: `${pct}%`,
                                                        }}
                                                    />
                                                </span>
                                                <span className="w-10 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                                                    {value}/{max}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <ul className="flex flex-col gap-2">
                                    {result.highlights.map((point, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-muted-foreground"
                                        >
                                            <Check
                                                size={14}
                                                className="mt-0.5 shrink-0 text-primary"
                                            />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {result.considerations.length > 0 && (
                                    <ul className="flex flex-col gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-3">
                                        {result.considerations.map(
                                            (point, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                                >
                                                    <AlertTriangle
                                                        size={14}
                                                        className="mt-0.5 shrink-0 text-amber-500"
                                                    />
                                                    <span>{point}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                )}

                                <div className="relative rounded-lg border border-border/70 bg-background/50 p-4">
                                    <p className="pr-8 text-sm italic text-foreground">
                                        &ldquo;{result.pitch}&rdquo;
                                    </p>
                                    <button
                                        onClick={copyPitch}
                                        aria-label="Copy pitch to clipboard"
                                        className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                                    >
                                        {copied ? (
                                            <Check size={12} />
                                        ) : (
                                            <Copy size={12} />
                                        )}
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        as="link"
                                        href={`mailto:${result.contactEmail ?? GENERAL_INFO.email}`}
                                        variant="primary"
                                        className="text-sm"
                                    >
                                        Email Nathan
                                    </Button>
                                    <a
                                        href={RESUME_URL}
                                        download
                                        className="group flex h-11 items-center gap-2 rounded-sm border border-primary/40 px-5 font-anton text-sm uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-black"
                                    >
                                        <Download
                                            size={14}
                                            className="transition-transform group-hover:translate-y-0.5"
                                        />
                                        Resume
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoleFitAnalyzer;
