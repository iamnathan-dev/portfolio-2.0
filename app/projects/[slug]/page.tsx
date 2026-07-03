import { notFound } from 'next/navigation';
import ProjectDetails from './_components/ProjectDetails';
import { PROJECTS, SITE_URL } from '@/lib/data';
import { stripHtml } from '@/lib/utils';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
    return PROJECTS.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
    const { slug } = await params;
    const project = PROJECTS.find((project) => project.slug === slug);

    if (!project) return {};

    const title = `${project.title} - ${project.techStack
        .slice(0, 3)
        .join(', ')}`;
    const description = stripHtml(project.description);
    const url = `${SITE_URL}/projects/${project.slug}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: 'article',
            images: [{ url: project.thumbnail }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [project.thumbnail],
        },
    };
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const project = PROJECTS.find((project) => project.slug === slug);

    if (!project) {
        return notFound();
    }

    return <ProjectDetails project={project} />;
};

export default Page;
