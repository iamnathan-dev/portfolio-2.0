'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('.experience-item', {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section" id="my-experience">
            <div className="container" ref={containerRef}>
                <SectionTitle title="My Experience" />

                <div className="grid gap-8">
                    {MY_EXPERIENCE.map((item, index) => {
                        const isActive = item.duration
                            .toLowerCase()
                            .includes('present');

                        return (
                        <div
                            key={index}
                            className="experience-item group relative flex items-start gap-4 sm:gap-6 pb-8 pl-4 border-b border-l-2 border-border last:border-b-0 last:pb-0 transition-colors hover:border-l-primary"
                        >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded border border-border font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary">
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <div>
                                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-wide">
                                    {item.company}
                                    {isActive && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-2 py-0.5 text-primary">
                                            <span className="relative flex size-1.5">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                                            </span>
                                            ACTIVE
                                        </span>
                                    )}
                                </div>
                                <p className="text-2xl sm:text-3xl font-anton leading-none mt-2 mb-2 transition-colors group-hover:text-primary">
                                    {item.title}
                                </p>
                                <p className="font-mono text-xs text-muted-foreground tracking-wide">
                                    {item.duration}
                                </p>
                                {item.highlights && (
                                    <ul className="mt-4 space-y-2 max-w-[560px]">
                                        {item.highlights.map((point) => (
                                            <li
                                                key={point}
                                                className="flex gap-2 text-sm text-muted-foreground"
                                            >
                                                <ChevronRight
                                                    size={16}
                                                    className="shrink-0 mt-0.5 text-primary"
                                                />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
