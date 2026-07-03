'use client';
import { useEffect, useState, type CSSProperties } from 'react';

interface Particle {
    left: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

const PARTICLE_COUNT = 45;

const ParticleBackground = () => {
    const [particles, setParticles] = useState<Particle[] | null>(null);

    useEffect(() => {
        setParticles(
            Array.from({ length: PARTICLE_COUNT }, () => ({
                left: Math.random() * 100,
                size: Math.random() * 2 + 1,
                duration: Math.random() * 10 + 10,
                delay: Math.random() * -20,
                opacity: Math.random() * 0.6 + 0.2,
            })),
        );
    }, []);

    if (!particles) return null;

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            aria-hidden
        >
            {particles.map((p, i) => (
                <span
                    key={i}
                    className="absolute top-0 rounded-full bg-foreground animate-particle-fall"
                    style={
                        {
                            left: `${p.left}%`,
                            width: p.size,
                            height: p.size,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                            '--particle-opacity': p.opacity,
                        } as CSSProperties
                    }
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
