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

    return (
        <Link
            href={`/projects/${project.slug}`}
            className="project-item group relative flex items-center gap-4 sm:gap-6 py-6 pl-4 border-b border-l-2 border-border last:border-b-0 transition-colors hover:border-l-primary"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="hidden sm:flex size-8 shrink-0 items-center justify-center rounded border border-border font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary">
                {(index + 1).toString().padStart(2, '0')}
            </span>

            <div className="relative shrink-0 overflow-hidden rounded-lg aspect-[3/2] w-14 sm:w-20 bg-muted">
                {project.thumbnail ? (
                    <>
                        {!isImageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-foreground/[0.06]">
                                <Loader2
                                    size={14}
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
                            size={14}
                            className="text-muted-foreground/30"
                        />
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p className="font-mono text-xs text-muted-foreground tracking-wide">
                    {project.year}
                </p>

                <div className="mt-1 flex items-center justify-between gap-3 leading-none">
                    <h4 className="truncate text-xl sm:text-2xl font-anton transition-colors group-hover:text-primary">
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

                {project.description && (
                    <p className="mt-1.5 max-w-xl line-clamp-2 text-sm text-muted-foreground">
                        {project.description}
                    </p>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
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
