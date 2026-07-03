import { MY_STACK } from '@/lib/data';
import Image from 'next/image';

const ALL_TECH = Object.values(MY_STACK).flat();

const TechMarquee = () => {
    return (
        <div className="relative overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max gap-12 animate-marquee hover:[animation-play-state:paused]">
                {[...ALL_TECH, ...ALL_TECH].map((item, idx) => (
                    <div
                        key={`${item.name}-${idx}`}
                        className="flex items-center gap-2.5 shrink-0"
                    >
                        <Image
                            src={item.icon}
                            alt=""
                            aria-hidden
                            width={22}
                            height={22}
                            className="size-[22px] opacity-70"
                        />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechMarquee;
