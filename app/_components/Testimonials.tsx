'use client';
import SectionTitle from '@/components/SectionTitle';
import { TESTIMONIALS } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Quote } from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.testimonial-card',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
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
        <section className="pb-section" id="testimonials">
            <div className="container" ref={containerRef}>
                <p className="font-mono text-xs text-primary mb-3 tracking-wider">
                    {'// WHAT PEOPLE SAY'}
                </p>
                <SectionTitle
                    title="Testimonials"
                    classNames={{ title: 'font-mono tracking-widest' }}
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {TESTIMONIALS.map((testimonial, i) => (
                        <div
                            key={i}
                            className="testimonial-card relative flex h-full flex-col rounded-lg border border-border/70 bg-foreground/[0.03] p-6"
                        >
                            <Quote
                                size={20}
                                className="mb-4 shrink-0 text-primary/50"
                            />
                            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>
                            <div className="mt-auto font-mono text-xs">
                                <p className="text-foreground">
                                    {testimonial.name}
                                </p>
                                <p className="text-muted-foreground">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
