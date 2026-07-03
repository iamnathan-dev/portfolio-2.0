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
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 85%',
                    end: 'top 40%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from('.project-item', {
                y: 80,
                opacity: 0,
                stagger: 0.15,
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
