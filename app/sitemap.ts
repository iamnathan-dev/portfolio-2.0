import type { MetadataRoute } from 'next';
import { PROJECTS, SITE_URL } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
        url: `${SITE_URL}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        ...projectEntries,
    ];
}
