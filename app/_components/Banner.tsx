'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import CodeEditor from '@/components/CodeEditor';
import Counter from '@/components/Counter';
import LiveClock from '@/components/LiveClock';
import Magnetic from '@/components/Magnetic';
import ScrambleText from '@/components/ScrambleText';
import { GENERAL_INFO, RESUME_URL } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Download } from 'lucide-react';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROLES = [
    'Frontend Engineer',
    'Mobile Developer',
    'Full-Stack Builder',
    'UI Craftsman',
];

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // snap the HUD corner brackets into place on load
    useGSAP(() => {
        gsap.from('.hud-corner', {
            opacity: 0,
            scale: 0.4,
            duration: 0.7,
            stagger: 0.08,
            delay: 0.2,
            ease: 'back.out(2.5)',
        });
    });

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />

            {/* HUD frame */}
            <span className="hud-corner pointer-events-none absolute top-6 left-4 sm:left-6 h-6 w-6 border-l border-t border-border" />
            <span className="hud-corner pointer-events-none absolute top-6 right-4 sm:right-6 h-6 w-6 border-r border-t border-border" />
            <span className="hud-corner pointer-events-none absolute bottom-6 left-4 sm:left-6 h-6 w-6 border-l border-b border-border" />
            <span className="hud-corner pointer-events-none absolute bottom-6 right-4 sm:right-6 h-6 w-6 border-r border-b border-border" />

            {/* status readout, tucked inside the bottom-left corner */}
            <div className="pointer-events-none absolute bottom-10 left-10 sm:left-14 z-[1] hidden sm:flex items-center gap-2 font-mono text-[11px] text-muted-foreground tracking-wider">
                <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>
                ABUJA, NG <LiveClock className="text-primary" />
            </div>

            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px]">
                    <div className="slide-up-and-fade mb-5 inline-flex items-center gap-2 rounded-full border border-border pl-2 pr-3.5 py-1.5">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-primary" />
                        </span>
                        <span className="font-mono text-xs text-muted-foreground tracking-wide">
                            AVAILABLE_FOR_WORK
                        </span>
                    </div>
                    <h1 className="banner-title slide-up-and-fade leading-[.95] text-5xl sm:text-6xl lg:text-[64px] font-anton">
                        <span className="text-primary">SOFTWARE</span>
                        <br /> <span className="ml-4">DEVELOPER</span>
                    </h1>
                    <p className="slide-up-and-fade mt-4 font-mono text-sm sm:text-base text-muted-foreground">
                        <span className="text-primary">{'>'}</span>{' '}
                        <ScrambleText
                            words={ROLES}
                            className="text-foreground"
                        />
                        <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-primary align-middle" />
                    </p>
                    <p className="banner-description slide-up-and-fade mt-3 text-base sm:text-lg text-muted-foreground">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            Nathan
                        </span>
                        . A creative Software Developer with 4+ years of
                        experience building high-performance, scalable
                        web and mobile products — from pixel-perfect UI to the
                        APIs that power it.
                    </p>
                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <Magnetic className="banner-button slide-up-and-fade inline-block">
                            <Button
                                as="link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={GENERAL_INFO.linkedinProfile}
                                variant="primary"
                            >
                                Hire Me
                            </Button>
                        </Magnetic>
                        <Magnetic className="banner-button slide-up-and-fade inline-block">
                            <a
                                href={RESUME_URL}
                                download
                                className="group flex h-12 items-center gap-2 rounded-sm border border-primary/40 px-6 font-anton text-lg uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-black"
                            >
                                <Download
                                    size={16}
                                    className="transition-transform group-hover:translate-y-0.5"
                                />
                                Resume
                            </a>
                        </Magnetic>
                    </div>
                </div>

                <div className="hidden xl:block relative z-[1] w-[420px] shrink-0 slide-up-and-fade">
                    <CodeEditor />
                </div>

                <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                    <div className="slide-up-and-fade">
                        <Counter
                            value={4}
                            suffix="+"
                            className="text-2xl sm:text-3xl font-anton text-primary mb-1"
                        />
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                            Years of Experience
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <Counter
                            value={50}
                            suffix="+"
                            delay={0.1}
                            className="text-2xl sm:text-3xl font-anton text-primary mb-1"
                        />
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
                            Completed Projects
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <Counter
                            value={15}
                            suffix="K+"
                            delay={0.2}
                            className="text-2xl sm:text-3xl font-anton text-primary mb-1"
                        />
                        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">Hours Worked</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
