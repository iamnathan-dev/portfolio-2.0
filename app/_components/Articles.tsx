'use client';
import SectionTitle from '@/components/SectionTitle';
import Chip from '@/components/Chip';
import { ARTICLES } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Articles = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('.article-card', {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
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

    return (
        <section className="pb-section" id="articles">
            <div className="container" ref={containerRef}>
                <p className="font-mono text-xs text-primary mb-3 tracking-wider">
                    {'// WRITING'}
                </p>
                <SectionTitle
                    title="Articles"
                    classNames={{ title: 'font-mono tracking-widest' }}
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {ARTICLES.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/articles/${article.slug}`}
                            className="article-card group relative flex flex-col rounded-lg border border-border/70 bg-foreground/[0.03] p-6 transition-colors hover:border-primary/60"
                        >
                            <span className="pointer-events-none absolute -top-px -left-px z-10 h-4 w-4 border-l-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                            <span className="pointer-events-none absolute -bottom-px -right-px z-10 h-4 w-4 border-b-2 border-r-2 border-transparent transition-colors duration-300 group-hover:border-primary" />

                            <div className="relative mb-4 -mx-6 -mt-6 aspect-video overflow-hidden rounded-t-lg bg-muted">
                                {article.image ? (
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center border-b border-dashed border-border/60">
                                        <ImageOff
                                            size={20}
                                            className="text-muted-foreground/30"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                                <span>{article.date}</span>
                                <span>{article.readTime}</span>
                            </div>

                            <div className="mb-2 flex items-start justify-between gap-3">
                                <h3 className="font-anton text-xl leading-tight transition-colors group-hover:text-primary">
                                    {article.title}
                                </h3>
                                <ArrowUpRight
                                    size={18}
                                    className="mt-1 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                />
                            </div>

                            <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                                {article.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {article.tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        className="font-mono text-[10px] uppercase tracking-wide border-primary/20"
                                    >
                                        {tag}
                                    </Chip>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Articles;
