'use client';
import Chip from '@/components/Chip';
import { CERTIFICATIONS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Award } from 'lucide-react';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="pb-section" id="about-me">
            <div className="container" ref={container}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-thin mb-12 slide-up-and-fade max-w-[820px]">
                    I believe in a user centered design approach, ensuring that
                    every project I work on is tailored to meet the specific
                    needs of its users.
                </h2>

                <p className="pb-3 border-b font-mono text-xs text-primary tracking-widest slide-up-and-fade">
                    {'// THIS IS ME'}
                </p>

                <div className="grid md:grid-cols-12 mt-9">
                    <div className="md:col-span-5">
                        <p className="text-3xl md:text-4xl font-anton slide-up-and-fade">
                            Hi, I&apos;m Nathan.
                        </p>
                    </div>
                    <div className="md:col-span-7">
                        <div className="text-base text-muted-foreground max-w-[450px]">
                            <p className="slide-up-and-fade">
                                I&apos;m a software developer dedicated to
                                turning ideas into creative solutions. I
                                specialize in creating seamless and intuitive
                                user experiences.
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                My approach focuses on creating scalable,
                                high-performing solutions tailored to both user
                                needs and business objectives. By prioritizing
                                performance, accessibility, and responsiveness,
                                I strive to deliver experiences that not only
                                engage users but also drive tangible results.
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                Outside of shipping features, I care about the
                                small details — clean commit history, honest
                                code reviews, and documentation that saves the
                                next developer (often future me) a headache.
                            </p>

                            <div className="mt-8 slide-up-and-fade">
                                <p className="font-mono text-xs text-muted-foreground mb-3 uppercase tracking-widest">
                                    {'// Certifications'}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {CERTIFICATIONS.map((cert) => (
                                        <Chip
                                            key={cert.name}
                                            className="text-foreground gap-1.5"
                                        >
                                            <Award
                                                size={14}
                                                className="text-primary"
                                            />
                                            {cert.name}
                                            <span className="text-muted-foreground">
                                                &middot; {cert.year}
                                            </span>
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
