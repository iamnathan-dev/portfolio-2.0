import { notFound } from 'next/navigation';
import ArticleDetails from './_components/ArticleDetails';
import { ARTICLES, SITE_URL } from '@/lib/data';
import { stripHtml } from '@/lib/utils';
import { Metadata } from 'next';

export const generateStaticParams = async () => {
    return ARTICLES.map((article) => ({ slug: article.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
    const { slug } = await params;
    const article = ARTICLES.find((article) => article.slug === slug);

    if (!article) return {};

    const description = stripHtml(article.excerpt);
    const url = `${SITE_URL}/articles/${article.slug}`;
    const ogImage = article.image || '/images/og-image.png';

    return {
        title: article.title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title: article.title,
            description,
            url,
            type: 'article',
            images: [{ url: ogImage }],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description,
            images: [ogImage],
        },
    };
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const article = ARTICLES.find((article) => article.slug === slug);

    if (!article) {
        return notFound();
    }

    return <ArticleDetails article={article} />;
};

export default Page;
