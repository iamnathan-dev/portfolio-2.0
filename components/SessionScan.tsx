'use client';
import { ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SessionInfo {
    os: string;
    browser: string;
    screen: string;
    timezone: string;
    connection: string | null;
    ping: number | null;
}

interface NetworkInformation {
    effectiveType?: string;
}

const MIN_SCAN_MS = 1400;

function detectOS(ua: string) {
    if (/windows/i.test(ua)) return 'Windows';
    if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
    if (/mac os x/i.test(ua)) return 'macOS';
    if (/android/i.test(ua)) return 'Android';
    if (/linux/i.test(ua)) return 'Linux';
    return 'Unknown OS';
}

function detectBrowser(ua: string) {
    if (/edg\//i.test(ua)) return 'Edge';
    if (/firefox|fxios/i.test(ua)) return 'Firefox';
    if (/chrome|crios/i.test(ua)) return 'Chrome';
    if (/safari/i.test(ua)) return 'Safari';
    return 'Unknown browser';
}

async function measurePing() {
    const start = performance.now();
    try {
        await fetch('/api/ping', { cache: 'no-store' });
        return Math.round(performance.now() - start);
    } catch {
        return null;
    }
}

const SessionScan = () => {
    const [scanning, setScanning] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [info, setInfo] = useState<SessionInfo | null>(null);
    const [clock, setClock] = useState('');

    useEffect(() => {
        let cancelled = false;

        Promise.all([
            measurePing(),
            new Promise((resolve) => setTimeout(resolve, MIN_SCAN_MS)),
        ]).then(([ping]) => {
            if (cancelled) return;

            const ua = navigator.userAgent;
            const connection = (
                navigator as Navigator & { connection?: NetworkInformation }
            ).connection;

            setInfo({
                os: detectOS(ua),
                browser: detectBrowser(ua),
                screen: `${window.screen.width}×${window.screen.height}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                connection: connection?.effectiveType
                    ? connection.effectiveType.toUpperCase()
                    : null,
                ping,
            });
            setScanning(false);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (scanning) return;

        const tick = () =>
            setClock(
                new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
            );

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [scanning]);

    return (
        <div className="slide-up-and-fade w-full max-w-[360px]">
            <p className="mb-1.5 font-mono text-[10px] tracking-wider text-primary">
                {scanning ? '// SCANNING_SESSION' : '// SESSION_SCAN'}
            </p>

            <div className="flex items-center gap-3 rounded-full border border-border py-1.5 pl-1.5 pr-2">
                <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Cpu
                        size={14}
                        className={
                            scanning
                                ? 'animate-spin text-primary'
                                : 'text-primary'
                        }
                    />
                </div>

                <div className="min-w-0 flex-1">
                    {scanning || !info ? (
                        <p className="truncate font-mono text-[11px] text-muted-foreground">
                            Fingerprinting your device
                            <span className="animate-pulse">...</span>
                        </p>
                    ) : (
                        <>
                            <p className="truncate text-xs font-medium leading-tight">
                                {info.browser} on {info.os}
                            </p>
                            <p className="truncate font-mono text-[10px] text-muted-foreground">
                                {info.ping !== null
                                    ? `${info.ping}ms round-trip`
                                    : 'offline'}
                            </p>
                        </>
                    )}
                </div>

                {!scanning && info && (
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        aria-label={
                            expanded
                                ? 'Hide session details'
                                : 'Show session details'
                        }
                        aria-expanded={expanded}
                        className="flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                        {expanded ? (
                            <ChevronUp size={13} />
                        ) : (
                            <ChevronDown size={13} />
                        )}
                    </button>
                )}
            </div>

            {expanded && info && (
                <div className="mt-2 overflow-hidden rounded-xl border border-border p-3 font-mono text-[11px]">
                    <dl className="grid grid-cols-2 gap-y-1.5">
                        <dt className="text-muted-foreground">Screen</dt>
                        <dd className="text-right text-foreground">
                            {info.screen}
                        </dd>
                        <dt className="text-muted-foreground">Timezone</dt>
                        <dd className="text-right text-foreground">
                            {info.timezone}
                        </dd>
                        <dt className="text-muted-foreground">Local time</dt>
                        <dd className="text-right text-primary">{clock}</dd>
                        <dt className="text-muted-foreground">Connection</dt>
                        <dd className="text-right text-foreground">
                            {info.connection ?? 'N/A'}
                        </dd>
                        <dt className="text-muted-foreground">Latency</dt>
                        <dd className="text-right text-foreground">
                            {info.ping !== null ? `${info.ping}ms` : 'N/A'}
                        </dd>
                    </dl>
                </div>
            )}
        </div>
    );
};

export default SessionScan;
