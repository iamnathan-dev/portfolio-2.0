'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const counter = { value: 0 };

            const tl = gsap.timeline({
                defaults: { ease: 'power1.inOut' },
            });

            tl.from('.preloader-line', {
                autoAlpha: 0,
                y: 10,
                stagger: 0.06,
                duration: 0.2,
            });

            tl.to(
                counter,
                {
                    value: 100,
                    duration: 0.6,
                    ease: 'power2.inOut',
                    onUpdate: () => {
                        const rounded = Math.round(counter.value);
                        if (percentRef.current) {
                            percentRef.current.textContent = `${rounded}%`;
                        }
                        if (barRef.current) {
                            barRef.current.style.width = `${rounded}%`;
                        }
                    },
                },
                '+=0.05',
            );

            tl.to('.preloader-ready', {
                autoAlpha: 1,
                duration: 0.15,
            });

            tl.to('.preloader-item', {
                y: '100%',
                duration: 0.3,
                stagger: 0.04,
                delay: 0.15,
            })
                .to('.preloader-content', { autoAlpha: 0, duration: 0.25 }, '<0.1')
                .to(preloaderRef.current, { autoAlpha: 0, duration: 0.25 }, '<0.15');
        },
        { scope: preloaderRef },
    );

    return (
        <div className="fixed inset-0 z-[6] flex" ref={preloaderRef}>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>
            <div className="preloader-item h-full w-[10%] bg-background"></div>

            <div className="preloader-content absolute inset-0 z-[1] flex flex-col items-center justify-center font-mono">
                <p className="preloader-line text-xs sm:text-sm text-muted-foreground mb-4 tracking-wide">
                    <span className="text-primary">$</span> booting{' '}
                    <span className="text-foreground">nathaniel.dev</span>
                    <span className="animate-pulse text-primary">_</span>
                </p>

                <p className="preloader-line text-5xl sm:text-7xl font-anton leading-none mb-8">
                    N<span className="text-primary">.</span>J
                </p>

                <div className="preloader-line flex items-center gap-3">
                    <div className="h-1 w-[160px] sm:w-[220px] rounded-full bg-border overflow-hidden">
                        <div
                            ref={barRef}
                            className="h-full w-0 rounded-full bg-primary"
                        />
                    </div>
                    <span
                        ref={percentRef}
                        className="w-10 text-xs text-primary tabular-nums"
                    >
                        0%
                    </span>
                </div>

                <p className="preloader-ready mt-4 text-xs text-primary tracking-[0.3em] opacity-0">
                    SYSTEM READY
                </p>
            </div>
        </div>
    );
};

export default Preloader;
