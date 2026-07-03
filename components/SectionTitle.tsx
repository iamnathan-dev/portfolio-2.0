import { ReactNode } from 'react';
import { SectionFlower } from './icons';
import { cn } from '@/lib/utils';

interface Props {
    icon?: ReactNode;
    className?: string;
    classNames?: {
        container?: string;
        title?: string;
        icon?: string;
    };
    title: string;
}

const SectionTitle = ({ icon, title, className, classNames }: Props) => {
    return (
        <div className={cn('mb-8', className, classNames?.container)}>
            <div className="flex items-center gap-4">
                <span className="relative flex size-8 shrink-0 items-center justify-center rounded border border-border">
                    <span className="pointer-events-none absolute -top-px -left-px h-2 w-2 border-l border-t border-primary/70" />
                    <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-primary/70" />
                    {icon ? (
                        icon
                    ) : (
                        <SectionFlower
                            width={16}
                            className={cn(
                                'animate-spin duration-7000',
                                classNames?.icon,
                            )}
                        />
                    )}
                </span>
                <h2
                    className={cn(
                        'font-mono text-base uppercase leading-none tracking-wide',
                        classNames?.title,
                    )}
                >
                    {title}
                </h2>
            </div>
            <span className="mt-4 block h-px w-full bg-gradient-to-r from-primary/40 via-border to-transparent" />
        </div>
    );
};

export default SectionTitle;
