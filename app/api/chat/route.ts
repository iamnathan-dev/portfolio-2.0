import { CERTIFICATIONS, GENERAL_INFO, MY_EXPERIENCE, MY_STACK, PROJECTS } from '@/lib/data';
import { stripHtml } from '@/lib/utils';

const GROQ_MODEL = 'llama-3.3-70b-versatile';
const MAX_HISTORY = 12;

function buildSystemPrompt() {
    const stack = Object.entries(MY_STACK)
        .map(([category, items]) => `${category}: ${items.map((i) => i.name).join(', ')}`)
        .join('\n');

    const experience = MY_EXPERIENCE.map((exp) => {
        const highlights = exp.highlights ? ` — ${exp.highlights.join(' ')}` : '';
        return `- ${exp.title} at ${exp.company} (${exp.duration})${highlights}`;
    }).join('\n');

    const certifications = CERTIFICATIONS.map(
        (cert) => `${cert.name} (${cert.year})`,
    ).join(', ');

    const projects = PROJECTS.map((project) => {
        const description = stripHtml(project.description, 220);
        return `- ${project.title} (${project.year}) — stack: ${project.techStack.join(', ')}. ${description}`;
    }).join('\n');

    return `You are the AI assistant embedded in Nathaniel Joseph's developer portfolio website. Visitors (often recruiters or fellow developers) ask you questions about Nathan. Answer accurately and warmly in the third person ("Nathan", "he"), based only on the information below. Keep answers concise — 2 to 4 sentences unless the visitor asks for more detail. If asked something you don't have information about, say so honestly rather than guessing. If asked how to get in touch, share his email: ${GENERAL_INFO.email}. If a question has nothing to do with Nathan or his work, politely redirect back to what you can help with.

## Skills
${stack}

## Experience
${experience}

## Certifications
${certifications}

## Selected projects
${projects}`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

export async function POST(req: Request) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return Response.json(
            {
                error: 'The AI assistant isn’t configured yet — ask the site owner to set GROQ_API_KEY.',
            },
            { status: 503 },
        );
    }

    let body: { messages?: { role: string; content: string }[] };
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (messages.length === 0) {
        return Response.json({ error: 'No message provided.' }, { status: 400 });
    }

    const trimmedHistory = messages
        .slice(-MAX_HISTORY)
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) }));

    let groqRes: Response;
    try {
        groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmedHistory],
                stream: true,
                temperature: 0.5,
                max_tokens: 500,
            }),
        });
    } catch {
        return Response.json(
            { error: 'Could not reach the AI service. Please try again shortly.' },
            { status: 502 },
        );
    }

    if (!groqRes.ok || !groqRes.body) {
        return Response.json(
            { error: 'The AI assistant is having trouble responding right now.' },
            { status: 502 },
        );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const upstream = groqRes.body;

    const stream = new ReadableStream({
        async start(controller) {
            const reader = upstream.getReader();
            let buffer = '';

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() ?? '';

                    for (const line of lines) {
                        const trimmed = line.trim();
                        if (!trimmed.startsWith('data:')) continue;

                        const data = trimmed.slice(5).trim();
                        if (data === '[DONE]') {
                            controller.close();
                            return;
                        }

                        try {
                            const json = JSON.parse(data);
                            const content = json.choices?.[0]?.delta?.content;
                            if (content) controller.enqueue(encoder.encode(content));
                        } catch {
                            // ignore malformed SSE chunk
                        }
                    }
                }
            } catch {
                // upstream stream errored mid-flight; end gracefully
            }

            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });
}
