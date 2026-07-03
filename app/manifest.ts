import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Nathaniel Joseph - Frontend & Mobile Developer',
        short_name: 'Nathaniel Joseph',
        description:
            'Portfolio of Nathaniel Joseph, a frontend and mobile developer specializing in React, Next.js, and React Native.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0d0d0d',
        theme_color: '#0d0d0d',
        icons: [
            {
                src: '/icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    };
}
