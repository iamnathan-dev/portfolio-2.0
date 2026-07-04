import GithubContributionGraph from '@/components/GithubContributionGraph';
import SectionTitle from '@/components/SectionTitle';

interface GithubEvent {
    id: string;
    type: string;
    repo: { name: string };
    created_at: string;
}

const EVENT_LABELS: Record<string, string> = {
    PushEvent: 'Pushed to',
    CreateEvent: 'Created',
    PullRequestEvent: 'Opened a PR in',
    IssuesEvent: 'Opened an issue in',
    WatchEvent: 'Starred',
    ForkEvent: 'Forked',
    PublicEvent: 'Made public',
    ReleaseEvent: 'Released in',
};

function formatEvent(event: GithubEvent) {
    const label = EVENT_LABELS[event.type] || event.type.replace('Event', '');
    const repo = event.repo.name.split('/')[1] || event.repo.name;
    return { label, repo };
}

function timeAgo(dateStr: string) {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
}

const GITHUB_USERNAME = 'iamnathan-dev';

const GithubActivity = async () => {
    let events: GithubEvent[] = [];

    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events/public`,
            { next: { revalidate: 60 * 30 } },
        );
        if (res.ok) {
            const data = await res.json();
            events = Array.isArray(data) ? data.slice(0, 5) : [];
        }
    } catch {
        events = [];
    }

    return (
        <section className="pb-section" id="github-activity">
            <div className="container">
                <p className="font-mono text-xs text-primary mb-3 tracking-wider">
                    {'// LIVE FROM GITHUB'}
                </p>
                <SectionTitle
                    title="Recent Activity"
                    classNames={{ title: 'font-mono tracking-widest' }}
                />

                <div className="relative rounded-lg border border-border overflow-hidden">
                    <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-l-2 border-t-2 border-primary/50" />
                    <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-primary/50" />

                    <div className="overflow-x-auto p-4 sm:p-6">
                        <GithubContributionGraph />
                    </div>

                    {events.length > 0 && (
                        <div className="border-t border-border divide-y divide-border">
                            {events.map((event) => {
                                const { label, repo } = formatEvent(event);
                                return (
                                    <div
                                        key={event.id}
                                        className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 font-mono text-xs"
                                    >
                                        <span className="text-muted-foreground">
                                            {label}{' '}
                                            <span className="text-foreground">
                                                {repo}
                                            </span>
                                        </span>
                                        <span className="shrink-0 text-muted-foreground/60">
                                            {timeAgo(event.created_at)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GithubActivity;
