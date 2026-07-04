import Chip from '@/components/Chip';
import { cn } from '@/lib/utils';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ImageOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface Props {
    index: number;
    project: IProject;
}

gsap.registerPlugin(useGSAP);

const Project = ({ index, project }: Props) => {
    const externalLinkSVGRef = useRef<SVGSVGElement>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const { context, contextSafe } = useGSAP(() => {}, {
        scope: externalLinkSVGRef,
        revertOnUpdate: true,
    });

    const handleMouseEnter = contextSafe?.(() => {
        const arrowLine = externalLinkSVGRef.current?.querySelector(
            '#arrow-line',
        ) as SVGPathElement;
        const arrowCurb = externalLinkSVGRef.current?.querySelector(
            '#arrow-curb',
        ) as SVGPathElement;
        const box = externalLinkSVGRef.current?.querySelector(
            '#box',
        ) as SVGPathElement;

        gsap.set(box, {
            opacity: 0,
            strokeDasharray: box?.getTotalLength(),
            strokeDashoffset: box?.getTotalLength(),
        });
        gsap.set(arrowLine, {
            opacity: 0,
            strokeDasharray: arrowLine?.getTotalLength(),
            strokeDashoffset: arrowLine?.getTotalLength(),
        });
        gsap.set(arrowCurb, {
            opacity: 0,
            strokeDasharray: arrowCurb?.getTotalLength(),
            strokeDashoffset: arrowCurb?.getTotalLength(),
        });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        tl.to(externalLinkSVGRef.current, {
            autoAlpha: 1,
        })
            .to(box, {
                opacity: 1,
                strokeDashoffset: 0,
            })
            .to(
                arrowLine,
                {
                    opacity: 1,
                    strokeDashoffset: 0,
                },
                '<0.2',
            )
            .to(arrowCurb, {
                opacity: 1,
                strokeDashoffset: 0,
            })
            .to(
                externalLinkSVGRef.current,
                {
                    autoAlpha: 0,
                },
                '+=1',
            );
    });

    const handleMouseLeave = contextSafe?.(() => {
        context.kill();
    });

    const isExternal = Boolean(project.liveUrl);
    const href = project.liveUrl || `/projects/${project.slug}`;

    return (
        <Link
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="project-item group relative block rounded-lg border border-border/70 bg-foreground/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* HUD corner brackets */}
            <span className="pointer-events-none absolute -top-px -left-px z-10 h-4 w-4 border-l-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
            <span className="pointer-events-none absolute -top-px -right-px z-10 h-4 w-4 border-r-2 border-t-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
            <span className="pointer-events-none absolute -bottom-px -left-px z-10 h-4 w-4 border-b-2 border-l-2 border-transparent transition-colors duration-300 group-hover:border-primary" />
            <span className="pointer-events-none absolute -bottom-px -right-px z-10 h-4 w-4 border-b-2 border-r-2 border-transparent transition-colors duration-300 group-hover:border-primary" />

            <div className="relative overflow-hidden aspect-[3/2] bg-muted">
                {project.thumbnail ? (
                    <>
                        {!isImageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-foreground/[0.06]">
                                <Loader2
                                    size={22}
                                    className="animate-spin text-muted-foreground/50"
                                />
                            </div>
                        )}
                        <Image
                            src={project.thumbnail}
                            alt={`${project.title} preview`}
                            width="600"
                            height="400"
                            className={cn(
                                'w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105',
                                isImageLoaded ? 'opacity-100' : 'opacity-0',
                            )}
                            loading="lazy"
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center border border-dashed border-border/60">
                        <ImageOff
                            size={22}
                            className="text-muted-foreground/30"
                        />
                    </div>
                )}

                {/* tech grid overlay */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(hsl(var(--primary)/0.16)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.16)_1px,transparent_1px)] bg-[size:22px_22px]"
                />

                {/* shine sweep */}
                <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[400%]" />

                <span className="absolute top-3 left-3 rounded border border-primary/30 bg-background/80 backdrop-blur px-2 py-1 font-mono text-[10px] text-primary">
                    {project.year}
                </span>
            </div>

            <div className="relative p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-muted-foreground">
                    <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                    </span>
                    {(index + 1).toString().padStart(2, '0')}
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 leading-none">
                    <h4 className="text-xl sm:text-2xl font-anton transition-colors group-hover:text-primary">
                        {project.title}
                    </h4>
                    <span className="text-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            ref={externalLinkSVGRef}
                        >
                            <path
                                id="box"
                                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                            ></path>
                            <path id="arrow-line" d="M10 14 21 3"></path>
                            <path id="arrow-curb" d="M15 3h6v6"></path>
                        </svg>
                    </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <Chip
                            key={tech}
                            className="font-mono text-[10px] uppercase tracking-wide border-primary/20"
                        >
                            {tech}
                        </Chip>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default Project;
