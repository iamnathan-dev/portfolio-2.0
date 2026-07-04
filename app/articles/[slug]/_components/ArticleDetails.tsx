'use client';
import parse from 'html-react-parser';
import ArrowAnimation from '@/components/ArrowAnimation';
import Chip from '@/components/Chip';
import TransitionLink from '@/components/TransitionLink';
import { IArticle } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowLeft, ImageOff } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
    article: IArticle;
}

gsap.registerPlugin(useGSAP);

const ArticleDetails = ({ article }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({ delay: 0.3 });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="relative pt-5 pb-14">
            <ArrowAnimation />
            <div className="container max-w-[720px] mx-auto" ref={containerRef}>
                <TransitionLink
                    back
                    href="/"
                    className="mb-12 inline-flex gap-2 items-center group h-12 font-mono text-sm tracking-wide"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
                    Back
                </TransitionLink>

                <div className="fade-in-later relative mb-8 aspect-video overflow-hidden rounded-lg border border-border/70 bg-muted">
                    <span className="pointer-events-none absolute -top-px -left-px z-10 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
                    <span className="pointer-events-none absolute -bottom-px -right-px z-10 h-4 w-4 border-b-2 border-r-2 border-primary/50" />
                    {article.image ? (
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            sizes="720px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center border border-dashed border-border/60">
                            <ImageOff
                                size={28}
                                className="text-muted-foreground/30"
                            />
                        </div>
                    )}
                </div>

                <div className="fade-in-later mb-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                    <span>{article.date}</span>
                    <span>&middot;</span>
                    <span>{article.readTime}</span>
                </div>

                <h1 className="fade-in-later mb-6 text-3xl md:text-4xl lg:text-5xl leading-tight font-anton">
                    {article.title}
                </h1>

                <div className="fade-in-later mb-10 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                        <Chip
                            key={tag}
                            className="font-mono text-[10px] uppercase tracking-wide border-primary/20"
                        >
                            {tag}
                        </Chip>
                    ))}
                </div>

                <div className="fade-in-later text-base leading-relaxed prose-xl markdown-text">
                    {parse(article.content)}
                </div>
            </div>
        </section>
    );
};

export default ArticleDetails;
