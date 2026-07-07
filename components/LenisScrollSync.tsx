'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useLenis } from 'lenis/react';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

const LenisScrollSync = () => {
    const lenis = useLenis(() => {
        ScrollTrigger.update();
    });

    useEffect(() => {
        if (!lenis) return;

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, [lenis]);

    return null;
};

export default LenisScrollSync;
