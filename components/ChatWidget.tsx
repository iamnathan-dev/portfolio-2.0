'use client';
import { cn } from '@/lib/utils';
import { Bot, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
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

        const history: Message[] = [...messages, { role: 'user', content: trimmed }];
        setMessages([...history, { role: 'assistant', content: '' }]);
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
                    'fixed bottom-[136px] right-5 md:right-8 z-[4] flex h-[70vh] max-h-[520px] w-[calc(100vw-2.5rem)] origin-bottom-right flex-col overflow-hidden rounded-lg border border-primary/30 bg-background shadow-[0_0_60px_-15px] shadow-primary/30 transition-all duration-300 sm:w-[380px]',
                    isOpen
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none',
                )}
            >
                <div className="flex items-center justify-between border-b border-primary/20 bg-primary/[0.04] px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#ff5f56]" />
                        <span className="size-2 rounded-full bg-[#ffbd2e]" />
                        <span className="size-2 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="font-mono text-xs text-primary tracking-wide">
                        ask-nathan.ts
                    </span>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat"
                        className="text-muted-foreground transition-colors hover:text-primary"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div
                    ref={scrollRef}
                    className="flex-1 space-y-3 overflow-y-auto px-4 py-4 font-mono text-sm"
                >
                    {messages.length === 0 && (
                        <div>
                            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                                <span className="text-primary">$</span> Hi, I&apos;m
                                Nathan&apos;s AI assistant. Ask me anything about his
                                work.
                            </p>
                            <div className="flex flex-col gap-2">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => sendMessage(s)}
                                        className="rounded border border-border px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
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
                                'max-w-[85%]',
                                m.role === 'user' && 'ml-auto',
                            )}
                        >
                            <p
                                className={cn(
                                    'whitespace-pre-wrap rounded-md px-3 py-2 text-xs leading-relaxed',
                                    m.role === 'user'
                                        ? 'bg-primary text-black'
                                        : 'border border-border text-foreground',
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
                            </p>
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
                        className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isStreaming || !input.trim()}
                        aria-label="Send message"
                        className="flex size-9 shrink-0 items-center justify-center rounded border border-primary/40 text-primary transition-colors hover:bg-primary hover:text-black disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
                    >
                        <Send size={14} />
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChatWidget;
