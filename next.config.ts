import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
    turbopack: {
        // A stray /Users/mac/package-lock.json outside this project made
        // Next.js infer the wrong workspace root. Pin it explicitly.
        root: path.join(__dirname),
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'opengraph.githubassets.com' },
            { protocol: 'https', hostname: '*.mzstatic.com' },
            { protocol: 'https', hostname: 'blank-codes.xyz' },
            { protocol: 'https', hostname: 'www.ellum.ai' },
            { protocol: 'https', hostname: 'www.evoolv.com' },
            { protocol: 'https', hostname: 'useclinsight.com' },
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;
