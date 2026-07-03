import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import {
    BookMarked,
    Github,
    Linkedin,
    MoveUpRight,
    Twitter,
    UserRoundPlus,
} from 'lucide-react';
import Magnetic from './Magnetic';

interface ProfileStat {
    followers: number;
    public_repos: number;
}

const SOCIAL_ICONS: Record<string, typeof Github> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
};

const Footer = async () => {
    const repoStats = await fetch(
        'https://api.github.com/users/iamnathan-dev',
        {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        },
    );

    const { followers, public_repos } = (await repoStats.json()) as ProfileStat;
    const year = new Date().getFullYear();

    return (
        <footer
            className="relative pt-20 pb-8 border-t border-primary/20 overflow-hidden"
            id="contact"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_100%_at_50%_100%,black,transparent_75%)]"
            />
            <span className="pointer-events-none absolute top-6 left-4 sm:left-6 h-5 w-5 border-l-2 border-t-2 border-primary/40" />
            <span className="pointer-events-none absolute top-6 right-4 sm:right-6 h-5 w-5 border-r-2 border-t-2 border-primary/40" />

            <div className="container relative text-center">
                <p className="font-mono text-xs text-primary tracking-widest mb-3">
                    {'// GET IN TOUCH'}
                </p>
                <p className="text-base text-muted-foreground">
                    Have a project in mind?
                </p>

                <Magnetic className="inline-block mt-4 mb-10">
                    <a
                        href={`mailto:${GENERAL_INFO.email}`}
                        className="group inline-flex items-center gap-2 sm:gap-3 text-xl sm:text-4xl font-anton transition-colors hover:text-primary"
                    >
                        {GENERAL_INFO.email}
                        <MoveUpRight
                            size={26}
                            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </a>
                </Magnetic>

                <div className="flex items-center justify-center gap-3 mb-10">
                    {SOCIAL_LINKS.map((link) => {
                        const Icon = SOCIAL_ICONS[link.name];
                        return (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.name}
                                className="flex size-11 items-center justify-center rounded border border-border transition-colors hover:border-primary/60 hover:text-primary"
                            >
                                {Icon && <Icon size={18} />}
                            </a>
                        );
                    })}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8 font-mono text-xs text-muted-foreground">
                    <p>&copy; {year} Nathaniel Joseph. All rights reserved.</p>

                    <a
                        href="https://github.com/iamnathan-dev"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 transition-colors hover:text-primary"
                    >
                        <span className="flex items-center gap-1.5">
                            <UserRoundPlus size={14} /> {public_repos} repos
                        </span>
                        <span className="flex items-center gap-1.5">
                            <BookMarked size={14} /> {followers} followers
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
