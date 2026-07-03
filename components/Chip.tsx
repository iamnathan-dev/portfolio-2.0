import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

const Chip = ({ children, className }: Props) => {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground leading-none',
                className,
            )}
        >
            {children}
        </span>
    );
};

export default Chip;
