import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
    turbopack: {
        // A stray /Users/mac/package-lock.json outside this project made
        // Next.js infer the wrong workspace root. Pin it explicitly.
        root: path.join(__dirname),
    },
};

export default nextConfig;
