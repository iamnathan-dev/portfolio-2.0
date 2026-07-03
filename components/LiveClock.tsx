'use client';
import { useEffect, useState } from 'react';

interface Props {
    timeZone?: string;
    className?: string;
}

const LiveClock = ({ timeZone = 'Africa/Lagos', className }: Props) => {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const update = () => {
            setTime(
                new Intl.DateTimeFormat('en-GB', {
                    timeZone,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                }).format(new Date()),
            );
        };

        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [timeZone]);

    if (!time) return null;

    return <span className={className}>{time}</span>;
};

export default LiveClock;
