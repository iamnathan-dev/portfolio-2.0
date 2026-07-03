'use client';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 600);

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            className={cn(
                'fixed bottom-6 right-5 md:right-8 z-[4] size-11 rounded-full border border-border bg-background/80 backdrop-blur flex items-center justify-center transition-all duration-300 hover:border-primary hover:text-primary',
                visible
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none',
            )}
        >
            <ArrowUp size={18} />
        </button>
    );
};

export default ScrollToTop;
