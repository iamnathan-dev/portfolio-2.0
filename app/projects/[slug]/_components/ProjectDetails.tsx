'use client';
import parse from 'html-react-parser';
import ArrowAnimation from '@/components/ArrowAnimation';
import Chip from '@/components/Chip';
import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, ExternalLink, Github, ImageOff } from 'lucide-react';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Props {
    project: IProject;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();

    useEffect(() => {
        lenis?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    }, [lenis, project.slug]);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({
                delay: 0.5,
            });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    // blur info div and make it smaller on scroll
    useGSAP(
        () => {
            if (window.innerWidth < 992) return;

            gsap.to('#info', {
                filter: 'blur(3px)',
                autoAlpha: 0,
                scale: 0.9,
                // position: 'sticky',
                scrollTrigger: {
                    trigger: '#info',
                    start: 'bottom bottom',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.5,
                },
            });
        },
        { scope: containerRef },
    );

    // parallax effect on images
    useGSAP(
        () => {
            gsap.utils
                .toArray<HTMLDivElement>('#images .parallax-image')
                .forEach((img, i) => {
                    gsap.fromTo(
                        img,
                        { yPercent: -8 },
                        {
                            yPercent: 8,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: img.parentElement,
                                start: () => (i ? 'top bottom' : 'top 50%'),
                                end: 'bottom top',
                                scrub: true,
                            },
                        },
                    );
                });
        },
        { scope: containerRef },
    );

    return (
        <section className="pt-5 pb-14">
            <div className="container" ref={containerRef}>
                <TransitionLink
                    back
                    href="/"
                    className="mb-16 inline-flex gap-2 items-center group h-12 font-mono text-sm tracking-wide"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
                    Back
                </TransitionLink>

                <div
                    className="top-0 min-h-[calc(100svh-100px)] flex"
                    id="info"
                >
                    <div className="relative w-full">
                        <div className="flex items-start gap-4 mx-auto mb-10 max-w-[635px]">
                            <h1 className="fade-in-later opacity-0 text-3xl md:text-4xl lg:text-5xl leading-none font-anton overflow-hidden">
                                <span className="inline-block">
                                    {project.title}
                                </span>
                            </h1>

                            <div className="fade-in-later opacity-0 flex gap-2 mt-1">
                                {project.sourceCode && (
                                    <a
                                        href={project.sourceCode}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        aria-label="View source code"
                                        className="hover:text-primary"
                                    >
                                        <Github size={24} />
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        aria-label="View live project"
                                        className="hover:text-primary"
                                    >
                                        <ExternalLink size={24} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="max-w-[635px] space-y-6 pb-20 mx-auto">
                            <div className="fade-in-later">
                                <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                                    Year
                                </p>

                                <div className="text-base">{project.year}</div>
                            </div>
                            <div className="fade-in-later">
                                <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                                    Tech & Technique
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <Chip key={tech}>{tech}</Chip>
                                    ))}
                                </div>
                            </div>
                            {project.caseStudy ? (
                                <>
                                    <div className="fade-in-later">
                                        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                                            The Problem
                                        </p>
                                        <div className="text-base">
                                            {project.caseStudy.problem}
                                        </div>
                                    </div>
                                    <div className="fade-in-later">
                                        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                                            The Approach
                                        </p>
                                        <div className="text-base">
                                            {project.caseStudy.approach}
                                        </div>
                                    </div>
                                    <div className="fade-in-later">
                                        <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                                            The Impact
                                        </p>
                                        <div className="text-base">
                                            {project.caseStudy.impact}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="fade-in-later">
                                    <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                                        Description
                                    </p>

                                    <div className="text-base prose-xl markdown-text">
                                        {parse(project.description)}
                                    </div>
                                </div>
                            )}
                            {project.role && (
                                <div className="fade-in-later">
                                    <p className="font-mono text-xs text-primary uppercase tracking-widest mb-2">
                                        My Role
                                    </p>

                                    <div className="text-base">
                                        {parse(project.role)}
                                    </div>
                                </div>
                            )}
                        </div>

                        <ArrowAnimation />
                    </div>
                </div>

                <div
                    className="fade-in-later relative flex flex-col gap-2 max-w-[800px] mx-auto"
                    id="images"
                >
                    {project.images.length === 0 &&
                        (project.thumbnail ? (
                            <div className="group relative w-full aspect-[750/400] bg-background-light rounded-md overflow-hidden border border-border/70">
                                <Image
                                    src={project.thumbnail}
                                    alt={`${project.title} preview`}
                                    fill
                                    sizes="(max-width: 800px) 100vw, 800px"
                                    className="parallax-image scale-110 object-cover"
                                    loading="lazy"
                                />
                                <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-l-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                                <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-r-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                                <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                                <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                            </div>
                        ) : (
                            <div className="flex w-full items-center justify-center border border-dashed border-border/60 rounded-md aspect-[750/400]">
                                <ImageOff
                                    size={28}
                                    className="text-muted-foreground/30"
                                />
                            </div>
                        ))}
                    {project.images.map((image, idx) => (
                        <div
                            key={image}
                            className="group relative w-full aspect-[750/400] bg-background-light rounded-md overflow-hidden border border-border/70"
                        >
                            <Image
                                src={image}
                                alt={`${project.title} screenshot ${idx + 1}`}
                                fill
                                sizes="(max-width: 800px) 100vw, 800px"
                                className="parallax-image scale-110 object-cover"
                                loading="lazy"
                            />
                            <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-l-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                            <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-r-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                            <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                            <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
                            <a
                                href={image}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={`Open ${project.title} screenshot ${idx + 1} in a new tab`}
                                className="absolute top-4 right-4 bg-background/70 text-foreground size-11 rounded-md inline-flex justify-center items-center transition-all opacity-0 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100 focus-visible:opacity-100"
                            >
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;
