const GITHUB_USERNAME = 'iamnathan-dev';
const ACCENT_COLOR = '00893a';
const INACTIVE_DAY_COLOR = '#2a2a2a';

export async function GET() {
    try {
        const res = await fetch(
            `https://ghchart.rshah.org/${ACCENT_COLOR}/${GITHUB_USERNAME}`,
            { next: { revalidate: 60 * 60 * 6 } },
        );

        if (!res.ok) {
            return new Response('Failed to load contribution graph', {
                status: 502,
            });
        }

        const svg = (await res.text()).replaceAll('#EEEEEE', INACTIVE_DAY_COLOR);

        return new Response(svg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=21600',
            },
        });
    } catch {
        return new Response('Failed to load contribution graph', {
            status: 502,
        });
    }
}
