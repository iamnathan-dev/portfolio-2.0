'use client';
import { getPalette } from '@/lib/colorPalettes';
import { useColorPalette } from '@/hooks/useColorPalette';

const GithubContributionGraph = () => {
    const { selected } = useColorPalette();
    const hueRotate = getPalette(selected).hueRotate;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/api/contribution-graph"
            alt="Nathaniel Joseph's GitHub contribution graph"
            className="w-full min-w-[600px] transition-[filter] duration-300"
            style={{ filter: `hue-rotate(${hueRotate}deg)` }}
            loading="lazy"
        />
    );
};

export default GithubContributionGraph;
