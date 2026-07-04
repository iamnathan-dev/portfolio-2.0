import Button from '@/components/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
    return (
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
            <span className="pointer-events-none absolute top-6 left-4 sm:left-6 h-6 w-6 border-l border-t border-border" />
            <span className="pointer-events-none absolute top-6 right-4 sm:right-6 h-6 w-6 border-r border-t border-border" />
            <span className="pointer-events-none absolute bottom-6 left-4 sm:left-6 h-6 w-6 border-l border-b border-border" />
            <span className="pointer-events-none absolute bottom-6 right-4 sm:right-6 h-6 w-6 border-r border-b border-border" />

            <div className="container text-center">
                <p className="mb-4 font-mono text-xs text-primary tracking-widest">
                    {'// ERROR'}
                </p>

                <h1 className="font-anton text-[110px] leading-none text-primary sm:text-[160px]">
                    404
                </h1>

                <div className="mx-auto mt-6 max-w-md rounded-md border border-border bg-foreground/[0.03] px-5 py-4 text-left font-mono text-xs sm:text-sm text-muted-foreground">
                    <p>
                        <span className="text-primary">$</span> locate
                        requested-page
                    </p>
                    <p className="mt-1">
                        bash: page not found — it may have moved, or never
                        existed.
                    </p>
                </div>

                <Button
                    as="link"
                    href="/"
                    variant="primary"
                    className="mt-9 inline-flex"
                >
                    <Home size={16} />
                    Back to home
                </Button>
            </div>
        </section>
    );
}
