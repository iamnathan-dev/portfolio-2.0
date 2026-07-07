'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_STACK } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const slideUpEl =
                containerRef.current?.querySelectorAll('.slide-up');

            if (!slideUpEl?.length) return;

            gsap.fromTo(
                '.slide-up',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    stagger: 0.03,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                },
            );
        },
        { scope: containerRef },
    );

    return (
        <section id="my-stack" ref={containerRef}>
            <div className="container">
                <SectionTitle title="My Stack" />

                <div className="space-y-12">
                    {Object.entries(MY_STACK).map(([key, value]) => (
                        <div className="grid sm:grid-cols-12" key={key}>
                            <div className="sm:col-span-4">
                                <p className="slide-up font-mono text-sm text-primary leading-none tracking-widest">
                                    [ {key.toUpperCase()} ]
                                </p>
                            </div>

                            <div className="sm:col-span-8 flex gap-x-6 gap-y-4 flex-wrap">
                                {value.map((item) => (
                                    <div
                                        className="slide-up flex gap-2.5 items-center leading-none rounded-full border border-border pl-2.5 pr-4 py-2 transition-colors hover:border-primary/50"
                                        key={item.name}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={`${item.name} logo`}
                                            width="20"
                                            height="20"
                                            className={cn(
                                                'size-5',
                                                'invertInLight' in item &&
                                                    item.invertInLight &&
                                                    '[html.light_&]:invert',
                                            )}
                                        />
                                        <span className="font-mono text-xs tracking-wide">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
