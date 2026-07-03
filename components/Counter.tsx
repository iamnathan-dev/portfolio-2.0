'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface Props {
    value: number;
    suffix?: string;
    className?: string;
    delay?: number;
}

const Counter = ({ value, suffix = '', className, delay = 0 }: Props) => {
    const ref = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const counter = { value: 0 };

            gsap.to(counter, {
                value,
                duration: 1.6,
                delay,
                ease: 'power2.out',
                onUpdate: () => {
                    if (ref.current) {
                        ref.current.textContent = `${Math.round(counter.value)}${suffix}`;
                    }
                },
            });
        },
        { scope: ref },
    );

    return (
        <h5 ref={ref} className={className}>
            0{suffix}
        </h5>
    );
};

export default Counter;
