const GridBackground = () => {
    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(hsl(var(--foreground)/0.06)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent_75%)]"
            aria-hidden
        />
    );
};

export default GridBackground;
