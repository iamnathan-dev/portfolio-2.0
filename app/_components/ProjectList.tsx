'use client';
import SectionTitle from '@/components/SectionTitle';
import { PROJECTS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';
import Project from './Project';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('.project-item', {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 95%',
                    toggleActions: 'play none none none',
                },
            });
        },
        { scope: gridRef },
    );

    return (
        <section className="pb-section" id="selected-projects">
            <div className="container">
                <p className="font-mono text-xs text-primary mb-3 tracking-wider">
                    {'// '}
                    {PROJECTS.length.toString().padStart(2, '0')} builds
                    indexed
                </p>
                <SectionTitle
                    title="PROJECTS I'VE WORKED ON"
                    classNames={{ title: 'font-mono tracking-widest' }}
                />

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    ref={gridRef}
                >
                    {PROJECTS.map((project, index) => (
                        <Project
                            index={index}
                            project={project}
                            key={project.slug}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
