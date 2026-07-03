'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ReactNode, useRef } from 'react';

interface Props {
    children: ReactNode;
    strength?: number;
    className?: string;
}

const Magnetic = ({ children, strength = 0.4, className }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        (context, contextSafe) => {
            const el = ref.current;
            if (!el || !contextSafe) return;

            const handleMouseMove = contextSafe((e: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(el, {
                    x: x * strength,
                    y: y * strength,
                    duration: 0.4,
                    ease: 'power3.out',
                });
            });

            const handleMouseLeave = contextSafe(() => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.4)',
                });
            });

            el.addEventListener('mousemove', handleMouseMove);
            el.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                el.removeEventListener('mousemove', handleMouseMove);
                el.removeEventListener('mouseleave', handleMouseLeave);
            };
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

export default Magnetic;
