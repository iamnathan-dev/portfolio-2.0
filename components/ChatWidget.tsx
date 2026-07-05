'use client';
import { cn } from '@/lib/utils';
import { Bot, CheckCheck, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    time: string;
}

function now() {
    return new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
}

const SUGGESTIONS = [
    "What's Nathan's tech stack?",
    'Tell me about the Delve project',
    'How can I contact Nathan?',
];

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const sendMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || isStreaming) return;

        const history: Message[] = [
            ...messages,
            { role: 'user', content: trimmed, time: now() },
        ];
        setMessages([...history, { role: 'assistant', content: '', time: now() }]);
        setInput('');
        setError(null);
        setIsStreaming(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history }),
            });

            if (!res.ok || !res.body) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.error || 'Something went wrong.');
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                accumulated += decoder.decode(value, { stream: true });
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        role: 'assistant',
                        content: accumulated,
                        time: updated[updated.length - 1].time,
                    };
                    return updated;
                });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong.');
            setMessages((prev) => prev.slice(0, -1));
        } finally {
            setIsStreaming(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen((v) => !v)}
                aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
                className="fixed bottom-20 right-5 md:right-8 z-[4] size-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur transition-all hover:border-primary hover:text-primary flex items-center justify-center"
            >
                {!isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
                    </span>
                )}
                {isOpen ? <X size={18} /> : <Bot size={18} />}
            </button>

            <div
                role="dialog"
                aria-label="Chat with Nathan's AI assistant"
                aria-hidden={!isOpen}
                className={cn(
                    'fixed bottom-[136px] right-5 md:right-8 z-[4] flex h-[70vh] max-h-[520px] w-[calc(100vw-2.5rem)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-primary/30 bg-background transition-all duration-300 sm:w-[380px]',
                    isOpen
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none',
                )}
            >
                <div className="flex items-center gap-2.5 border-b border-primary/20 bg-primary/[0.05] px-4 py-3">
                    <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15">
                        <Bot size={16} className="text-primary" />
                        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-background bg-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-tight">
                            Nathan&apos;s AI Assistant
                        </p>
                        <p className="font-mono text-[10px] tracking-wide text-primary">
                            online
                        </p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat"
                        className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)] bg-[size:16px_16px] px-3.5 py-4 text-sm"
                >
                    {messages.length === 0 && (
                        <div className="flex flex-col items-start">
                            <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border/70 bg-muted/60 px-3.5 py-2.5 leading-relaxed">
                                👋 Hi, I&apos;m Nathan&apos;s AI assistant. Ask me
                                anything about his work.
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => sendMessage(s)}
                                        className="rounded-full border border-primary/30 bg-primary/[0.06] px-3 py-1.5 text-left text-xs text-primary transition-colors hover:bg-primary/15"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={cn(
                                'flex flex-col',
                                m.role === 'user' ? 'items-end' : 'items-start',
                            )}
                        >
                            <div
                                className={cn(
                                    'max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-relaxed',
                                    m.role === 'user'
                                        ? 'rounded-br-sm bg-primary text-primary-foreground'
                                        : 'rounded-bl-sm border border-border/70 bg-muted/60 text-foreground',
                                )}
                            >
                                {m.content ||
                                    (isStreaming && i === messages.length - 1 && (
                                        <span className="inline-flex gap-1">
                                            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                                            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                                            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                                        </span>
                                    ))}
                            </div>
                            <div className="mt-1 flex items-center gap-1 px-1 font-mono text-[10px] text-muted-foreground/50">
                                <span>{m.time}</span>
                                {m.role === 'user' && (
                                    <CheckCheck
                                        size={12}
                                        className="text-primary/70"
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    {error && (
                        <p className="text-xs text-destructive">{error}</p>
                    )}
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(input);
                    }}
                    className="flex items-center gap-2 border-t border-border p-3"
                >
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about Nathan..."
                        disabled={isStreaming}
                        className="flex-1 rounded-full border border-border/70 bg-muted/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isStreaming || !input.trim()}
                        aria-label="Send message"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                    >
                        <Send size={14} />
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChatWidget;
