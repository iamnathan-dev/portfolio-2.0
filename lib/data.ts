import { IProject } from '@/types';

export const SITE_URL = 'https://nameisblank.vercel.app';

// Drop your actual resume PDF at public/resume.pdf — this path just points to it.
export const RESUME_URL = '/resume.pdf';

export const GENERAL_INFO = {
    email: 'nathancodes05@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Nathan, I am reaching out to you because...',

    oldPortfolio: 'https://www.legacy.me.toinfinite.dev',
    upworkProfile:
        'https://www.upwork.com/freelancers/~01eef3ccc7348ee8f4?mp_source=share',
    linkedinProfile: 'https://www.linkedin.com/in/iamnathan-dev/',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/iamnathan-dev' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/iamnathan-dev' },
    { name: 'twitter', url: 'https://x.com/iamnathan_dev' },
];

export const TESTIMONIALS = [
    {
        quote: "His commitment to excellence stood out — he consistently delivered high-quality work on time and was always ready to lend a hand to the team. Nathaniel has a remarkable ability to solve complex frontend challenges efficiently, and I'm confident he'll exceed expectations in any role he takes on.",
        name: 'Stephen Adeniji',
        role: 'Frontend Engineer',
    },
    {
        quote: 'Nathaniel is a relentless frontend web developer. I had the opportunity to work with him on the Delve project during the HNG11 internship.',
        name: 'Faith Obi',
        role: 'Fullstack Web Developer',
    },
    {
        quote: "Nathaniel is a great team player — his dedication and willingness to contribute immensely to team projects is excellent. I highly recommend him for any frontend role, knowing he'll deliver way beyond expectations.",
        name: 'Chioma Okeke',
        role: 'Frontend Engineer, Minerva Technologies',
    },
];

export interface IArticle {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    // Omit until a real cover image is ready — the UI reserves the space instead.
    image?: string;
    // Full article body, rendered on its own page at /articles/[slug]. Supports
    // the same lightweight HTML (<br/>, <ul><li>) as project descriptions.
    content: string;
}

export const ARTICLES: IArticle[] = [
    {
        title: 'Why I Stopped Reaching for Global State on Every Project',
        slug: 'rethinking-state-management',
        excerpt:
            'Redux used to be my default on day one of every React project. After shipping a dozen of them, here’s the decision framework I actually use before adding a state library.',
        date: 'Feb 2026',
        readTime: '6 min read',
        tags: ['React', 'Next.js', 'State Management'],
        image: '/images/article-1.jpg',
        content: `
Every new React project used to start the same way for me: install Redux, set up a store, wire up RTK Query, and only then write the first component. It felt responsible — like I was building for scale from day one.<br/><br/>

After shipping projects like Delve and EpikCart, both of which leaned on Redux and RTK Query, and then building Resume Roaster with nothing but React's built-in state and SWR, I noticed something: the app without Redux shipped faster, had fewer bugs, and was easier to hand off. That forced me to actually think about when global state earns its complexity instead of defaulting to it.<br/><br/>

<strong>The questions I ask before reaching for a state library</strong><br/>
<ul>
<li>Is this state actually shared across unrelated parts of the tree, or am I just avoiding prop drilling three levels deep?</li>
<li>Does it need to survive a route change, or is it fine to reset when the user navigates away?</li>
<li>Is the "state" really server data in disguise? If so, it belongs in a data-fetching layer like SWR, not a client store.</li>
<li>Will more than two unrelated features need to read and write it independently?</li>
</ul>

If the answer to all four is yes, I reach for Zustand before Redux — it does the job with a fraction of the boilerplate, and I've used it in production on Lovla without regretting it once.<br/><br/>

<strong>Where I still use Redux</strong><br/>
On EpikCart, a multi-vendor storefront, cart state, filters, and auth all needed to be read and mutated from a dozen unrelated screens, with predictable, testable updates. That's a legitimate Redux use case — the middleware ecosystem and dev tools pay for themselves once the state graph is genuinely complex.<br/><br/>

<strong>The pattern that actually moved the needle</strong><br/>
Server state and client state are not the same problem, and treating them the same is where most unnecessary complexity comes from. Once I split "data the server owns" (fetched with SWR, cached, revalidated) from "state the UI owns" (form inputs, modals, toggles — usually just useState or a tiny Zustand slice), most components stopped needing a global store at all.<br/><br/>

The takeaway isn't "avoid Redux." It's that a state library is a cost you pay upfront for a benefit you might not need yet. Default to local state, promote it to shared state once two components actually fight over it, and only reach for a full store when the state graph itself — not your anxiety about future requirements — demands it.
        `.trim(),
    },
    {
        title: 'The Error Handling Layer I Add to Every Node.js API Now',
        slug: 'node-api-error-handling',
        excerpt:
            'Most production API bugs I’ve debugged weren’t logic errors — they were unhandled edge cases in how failures were reported. Here’s the error-handling layer I now build in on day one.',
        image: '/images/article-2.webp',
        date: 'Apr 2026',
        readTime: '7 min read',
        tags: ['Node.js', 'NestJS', 'API Design'],
        content: `
The first production incident I ever got paged for wasn't caused by bad business logic. It was a third-party API timing out, and our service had no idea what to do with that — it just crashed the request handler and took the whole endpoint down with it. Since then, I treat error handling as infrastructure, not something bolted on before launch.<br/><br/>

<strong>Three failure modes I plan for in every API</strong><br/>
<ul>
<li>Upstream dependency failures — a third-party API, a database, a queue — that are slow or degraded, not just erroring cleanly.</li>
<li>Malformed or unexpected input that passes basic validation but breaks a downstream assumption.</li>
<li>Partial failures in multi-step operations, where step two fails after step one already committed.</li>
</ul>

<strong>What I actually build</strong><br/>
On every NestJS or Express service now, before writing a single business endpoint, I set up a global exception filter that normalizes every error — validation, database, upstream, or unexpected — into the same response shape: a status code, a machine-readable error code, and a human-readable message. That consistency is what let a team I worked with at HNG Tech onboard new engineers without them guessing what shape an error would come back in.<br/><br/>

For upstream calls specifically, I wrap them with an explicit timeout rather than trusting the default client timeout, which is often either too long or nonexistent. A slow dependency should degrade the one feature that depends on it, not the whole process.<br/><br/>

<strong>Contract testing caught more bugs than logic testing did</strong><br/>
Rigorous contract testing with Postman — documenting exactly what each endpoint accepts and returns before the frontend team builds against it — caught more real integration bugs on recent projects than unit tests did. Most integration failures I've seen come from two services quietly disagreeing about a field's shape or nullability, not from broken logic inside either one.<br/><br/>

<strong>The habit that's easy to skip and shouldn't be</strong><br/>
Log the error with enough context to reproduce it — the input, the user, the upstream response — but never log or return the raw stack trace or database error to the client. I've seen a raw Postgres constraint violation message returned straight to a frontend once. It worked, technically. It also leaked the table's column names to anyone who sent a bad request.<br/><br/>

None of this is exotic. It's the unglamorous 20% of backend work that decides whether a 3am page is a five-minute fix or a two-hour investigation.
        `.trim(),
    },
    {
        title: 'What Shipping React Native Apps with Expo Actually Taught Me',
        slug: 'react-native-expo-lessons',
        excerpt:
            'After shipping several React Native apps with Expo across iOS and Android, the trade-offs that matter in production aren’t the ones most "React Native vs native" articles talk about.',
        date: 'Jun 2026',
        readTime: '6 min read',
        tags: ['React Native', 'Expo', 'Mobile'],
        image: '/images/article-3.jpg',
        content: `
When people ask whether React Native is "good enough" for production, they're usually asking the wrong question. After building and shipping several apps with Expo — from a coloring app with a custom touch-gesture canvas to cross-platform ecosystems handling speech transcription and third-party integrations — the real question is which slice of the app will need to drop closer to native, and whether your architecture makes that easy or painful.<br/><br/>

<strong>Where Expo has genuinely earned its reputation</strong><br/>
<ul>
<li>OTA updates through EAS meant shipping a critical fix without waiting on App Store review — invaluable the first time a production bug needs a same-day patch.</li>
<li>The managed workflow's build pipeline replaced what used to be days of Xcode and Gradle configuration with a CI/CD setup a frontend-focused team could actually maintain.</li>
<li>Config plugins now cover most native module needs that used to force an eject.</li>
</ul>

<strong>Where it still gets hard</strong><br/>
Custom gesture-heavy interactions — like an interactive coloring canvas with freehand drawing and fill-region logic on Lovla — push past what off-the-shelf components handle well. That's where I've had to reach for lower-level gesture and canvas APIs directly instead of trusting a high-level abstraction, and profile on an actual mid-range Android device, not just a simulator, because touch responsiveness gaps show up there first.<br/><br/>

<strong>The decision that mattered more than the framework choice</strong><br/>
On a recent cross-platform ecosystem, cutting development overhead by 40% while keeping native-level performance had less to do with React Native itself and more to do with establishing CI/CD pipelines and automated testing early. Getting to 99.9% crash-free sessions wasn't one big fix — it was catching regressions in a pipeline before they reached a device, consistently, over months.<br/><br/>

<strong>Third-party integrations are where the real friction lives</strong><br/>
Integrating services like speech transcription through Expo's module system worked well until an SDK expected native lifecycle hooks the managed workflow didn't expose cleanly. That's the pattern worth planning for: the happy path with Expo is smooth, but any native SDK with strong opinions about the app lifecycle needs evaluating before you commit to it, not after you've already built the feature around it.<br/><br/>

If I'm scoping a new mobile app today, I still default to Expo and React Native. But I scope for it explicitly — identifying up front which one or two features are likely to need native code, instead of discovering it three sprints in.
        `.trim(),
    },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'React Native',
            icon: '/logo/react.png',
        },
        {
            name: 'Ionic',
            icon: '/logo/ionic.svg',
        },
        {
            name: 'Vue',
            icon: '/logo/vue.svg',
        },
        {
            name: 'Nuxt',
            icon: '/logo/nuxt.svg',
        },
        {
            name: 'Redux',
            icon: '/logo/redux.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'GSAP',
            icon: '/logo/gsap.png',
        },
        {
            name: 'Framer Motion',
            icon: '/logo/framer-motion.png',
        },
        {
            name: 'Sass',
            icon: '/logo/sass.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'NestJS',
            icon: '/logo/nest.svg',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        },
        {
            name: 'Supabase',
            icon: '/logo/supabase.svg',
        },
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'GitHub',
            icon: '/logo/github.png',
            invertInLight: true,
        },
        // {
        //     name: 'Xcode',
        //     icon: '/logo/xcode.png',
        // },
        // {
        //     name: 'Postman',
        //     icon: '/logo/postman.png',
        // },
        {
            name: 'Vs Code',
            icon: '/logo/vscode.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
            invertInLight: true,
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: '9lives',
        slug: '9lives',
        liveUrl:
            'https://apps.apple.com/ng/app/9lives-social-productivity/id6752275333',
        thumbnail:
            'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/55/dc/9f/55dc9fc3-927c-5cb5-784c-c0b3d7ed91ea/AppIcon-0-0-1x_U007epad-0-1-85-220.png/1200x630wa.jpg',
        techStack: [],
        images: [],
        year: 2025,
        description:
            '9lives blends productivity and social accountability — notes, lists, and folders with AI-assisted note enhancement, flashcard conversion, and image-to-text scanning, plus a social layer for sharing progress and keeping daily streaks.',
        role: 'Software Engineer, contributing across both the web and mobile app — built authentication flows and worked on database optimization.',
        caseStudy: {
            problem: 'A productivity app and a social app usually pull in opposite directions — one wants a quiet, private workspace, the other wants activity worth sharing. 9lives set out to do both at once, across a web and a mobile app hitting the same backend, which meant auth and data access had to behave identically on both surfaces.',
            approach: 'Focused on the authentication layer — building login flows that work the same way whether a user is on web or mobile — and on database optimization as the note, folder, and streak data grew. That backend work sits underneath the AI-assisted features (note enhancement, flashcard generation, image-to-text scanning) and the social layer (progress sharing, streaks) that make up the rest of the product.',
            impact: 'Shipped as a live iOS app under Benekan Technologies, with an auth and data layer built to hold up consistently across both the web and mobile clients rather than diverging between platforms.',
        },
    },
    {
        title: 'Lovla',
        slug: 'lovla',
        liveUrl:
            'https://apps.apple.com/gb/app/lovla-couples-coloring-games/id6758548454',
        thumbnail:
            'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9c/10/e0/9c10e044-2dd6-7c45-92cb-f311e1839554/AppIcon-0-0-1x_U007epad-0-1-85-220.png/1200x630wa.png',
        techStack: ['React Native', 'Expo', 'Supabase', 'Zustand'],
        images: [],
        year: 2025,
        description:
            'Lovla turns personal photos into custom coloring pages that couples paint together in real time, with a private journal that builds into a shared library of finished art and memories.',
        role: 'Contributed to both the web and mobile app — built the mobile app with Expo and React Native, including the real-time collaborative coloring canvas and the palette system.',
        caseStudy: {
            problem: "Two people painting the same coloring page at once needs to actually feel synchronous, not like a shared file one person edits at a time — on top of turning an arbitrary user photo into paintable line art, and keeping that experience consistent across both a web and mobile app.",
            approach: "Built the mobile app cross-platform with Expo and React Native, with Supabase handling data and sync so both partners' strokes land on the same canvas without one side lagging or overwriting the other. Zustand held lightweight client state — active palette, in-progress strokes, saved works — rather than a heavier store, since the state graph didn't need Redux-level machinery. Also contributed to the companion web app so the coloring and journaling experience didn't diverge between platforms.",
            impact: 'Shipped as a live, subscription-based app that turns photos into coloring pages couples paint together in real time, with a private journal of finished art as a byproduct of actually using the product.',
        },
    },
    {
        title: 'ClinicSight',
        slug: 'clinicsight',
        liveUrl: 'https://useclinsight.com/',
        thumbnail: 'https://useclinsight.com/clinsight-favicon.svg',
        techStack: [],
        images: [],
        year: 2025,
        description:
            'Clinsight is an AI-powered platform that turns medical laboratory reports into clear, understandable explanations — patients upload a PDF or image of their results and get a structured breakdown with color-coded risk levels, plus optional review by qualified healthcare professionals. Ships as iOS and Android applications alongside the web app, already serving 1,000+ users.',
        role: 'Team lead for the iOS and Android application.',
        caseStudy: {
            problem: "Lab reports are dense and full of values that mean nothing to most patients without a medical background, so the core problem was making that data actually understandable — while being honest about the fact that an AI reading a lab report can be wrong, and this isn't a domain where 'probably right' is good enough. On top of that, whatever the AI produced (a plain-language summary, a risk level, suggested follow-up questions) had to show up identically on iOS and Android, not as two apps that happened to share a backend.",
            approach: "As team lead for the iOS and Android apps, owned getting both platforms to consistently implement the same result-interpretation flow: upload a lab report as a PDF or image, surface the AI's structured breakdown — a one-sentence bottom line, color-coded risk indicators (Low/Moderate/High), and context-aware suggested follow-up questions — and route flagged or uncertain results into review by a qualified healthcare professional rather than presenting the AI's read as final. That review loop isn't just a UI state; corrections doctors make feed back into improving the AI's accuracy, which meant the apps needed a real 'pending professional review' and 'corrected result' state, not just a single AI-verdict screen. Kept both platforms in feature parity release over release rather than letting one lag, since a mismatched risk reading between iOS and Android on health data isn't an acceptable inconsistency.",
            impact: "Shipped as two live production apps on the App Store and Google Play alongside the web product, part of a system already serving 1,000+ users — with a mobile experience trustworthy enough to carry medical risk indicators and route people to real clinicians when the AI isn't confident enough to be the last word.",
        },
    },
    {
        title: 'Ellum',
        slug: 'ellum',
        liveUrl: 'https://www.ellum.ai/',
        thumbnail: 'https://www.ellum.ai/ellum-banner.webp',
        techStack: [],
        images: [],
        year: 2025,
        description:
            'Ellum is a SaaS platform providing AI agents for social media management and marketing automation — generating content, scheduling posts across LinkedIn, Instagram, X, Facebook, and TikTok, and tracking real-time analytics while keeping brand guidelines consistent across a team.',
        role: 'Mobile Developer.',
        caseStudy: {
            problem: "Marketing and content teams don't manage social accounts from a desk — approvals, quick edits, and checking how a post is performing happen wherever the person happens to be. Ellum's core value is AI agents that generate on-brand content, keep a shared posting calendar, and route drafts through role-based approval before anything goes out; none of that is useful if it's locked to a browser tab someone has to be sitting in front of.",
            approach: "As mobile developer, worked on bringing that same workflow to a native mobile client — AI-assisted content generation, the shared scheduling calendar, and the team approval flow (assign roles, review drafts, approve or send back) — backed by the same AI agents that generate content from a central brand-guidelines profile, so a post drafted or approved from mobile is held to the same brand consistency as one done on web. Real-time analytics across the connected platforms (Facebook, Instagram, X, LinkedIn, TikTok) needed to be legible on a phone screen, not just a repurposed desktop dashboard.",
            impact: "Contributed to the mobile side of a platform that has connected accounts reaching 3.1M+ in aggregate audience, generated 1.5M+ pieces of content, and serves 450K+ clients — extending Ellum's AI-assisted content and approval workflow beyond the browser to wherever a team actually is when a post needs a decision.",
        },
    },
    {
        title: 'Evoolv',
        slug: 'evoolv',
        liveUrl: 'https://www.evoolv.com/',
        thumbnail: 'https://www.evoolv.com/evoolv.svg',
        techStack: [],
        images: [],
        year: 2025,
        description:
            'Evoolv is an electric vehicle marketplace for Nigeria, facilitating the purchasing and financing of EVs through an integrated platform.',
        role: '',
    },
    {
        title: 'Terminal Portfolio',
        slug: 'terminal-portfolio',
        liveUrl: 'https://blank-codes.xyz/',
        thumbnail: 'https://blank-codes.xyz/og-image.png',
        techStack: [],
        images: [],
        year: 2023,
        description:
            'My previous portfolio — a fully interactive terminal emulator instead of a static page. A scripted boot sequence and ASCII banner lead into a real command interpreter: `about` prints a JSON profile, `skills` and `experience` read like a `cat`\'d file and a `git log`, `projects` lists real project links, and `chat` holds a conversation as an AI version of me. A `ui` command swaps the whole thing for a retro GUI landing page for anyone who\'d rather not type.',
        role: 'Sole developer and designer.',
        caseStudy: {
            problem: "A static portfolio blurs into every other developer's site — same hero, same project grid, same about-me paragraph. The goal was something a technical visitor would actually engage with rather than skim past, without losing the core job of a portfolio: surfacing real projects and experience.",
            approach: "Built the entire landing experience as a simulated shell — a scripted boot sequence and ASCII banner feeding into a REPL-style command interpreter. Instead of static sections, visitors type `about`, `skills`, or `experience` and get back JSON-formatted profile data and a `git log`-styled career history; `projects` lists real, linked work. A `chat` command holds a conversation as an AI version of me, and a `ui` command drops into an entirely different retro GUI presentation for visitors who'd rather click than type.",
            impact: "Landed as a distinctive, fully interactive personal site that reads as a small piece of software in its own right — command history, a scripted boot sequence, an AI chat mode, and two different presentation modes behind one experience — rather than another static one-pager.",
        },
    },
    {
        title: 'Runwae',
        slug: 'runwae',
        liveUrl: 'https://www.runwae.io/',
        techStack: ['React', 'Node.js'],
        images: [],
        year: 2026,
        description:
            'Runwae streamlines group travel planning — friends collaboratively build itineraries, book flights and hotels together, and automatically split shared expenses, available on web, iOS, and Android.',
        role: 'Full-Stack Engineer — built the React frontend, Node.js backend, and real-time features.',
        caseStudy: {
            problem: 'Coordinating a group trip usually means a scattered mix of group chats, spreadsheets, and separate booking receipts — someone ends up manually reconciling who paid for what after the fact, with no single source of truth for the itinerary everyone actually agreed on.',
            approach: "Built the React frontend and Node.js backend, with real-time features so a group's itinerary, bookings, and expense splits stay in sync as multiple people edit them concurrently, instead of requiring someone to refresh and manually merge changes.",
            impact: 'Shipped as a live product across web and mobile that consolidates itinerary planning, group booking, and automatic expense splitting into one real-time experience, replacing the group-chat-plus-spreadsheet workflow most trips default to.',
        },
    },
    {
        title: 'Task Management API',
        slug: 'task-management-api',
        sourceCode: 'https://github.com/iamnathan-dev/task-management-api',
        thumbnail:
            'https://opengraph.githubassets.com/1/iamnathan-dev/task-management-api',
        techStack: ['TypeScript'],
        images: [],
        year: 2025,
        description: 'A backend REST API for managing tasks, built in TypeScript.',
        role: 'Sole developer.',
    },
    {
        title: 'Auth Microservice',
        slug: 'auth-microservice',
        sourceCode: 'https://github.com/iamnathan-dev/auth-microservice',
        thumbnail:
            'https://opengraph.githubassets.com/1/iamnathan-dev/auth-microservice',
        techStack: ['NestJS', 'TypeScript'],
        images: [],
        year: 2025,
        description:
            'A standalone authentication microservice built with NestJS and TypeScript.',
        role: 'Sole developer.',
    },
    {
        title: 'Express URL Shortener API',
        slug: 'express-url-shortener-api',
        sourceCode:
            'https://github.com/iamnathan-dev/express-url-shortener-api',
        thumbnail:
            'https://opengraph.githubassets.com/1/iamnathan-dev/express-url-shortener-api',
        techStack: ['Express.js', 'TypeScript', 'MongoDB', 'Redis', 'Docker'],
        images: [],
        year: 2025,
        description:
            'A URL shortener API handling 10,000+ redirects a day, with custom aliases, click analytics, rate limiting, and Redis caching in front of the hot redirect path.',
        role: 'Sole developer.',
        caseStudy: {
            problem: 'A URL shortener looks trivial until it has to survive real traffic — the redirect endpoint is the hot path and needs to stay fast under load, abuse and scraping need rate limiting, and every shortened link needs to track clicks without slowing the redirect itself down.',
            approach: 'Built on Express and TypeScript with controllers, services, models, and routes kept as separate layers so the URL-shortening logic stayed independent of HTTP handling. MongoDB stores the URL mappings and click data, while Redis sits in front as a cache for the hot redirect-lookup path, keeping the common case — resolving a short code — fast without hitting the database on every request. Rate-limiting middleware protects the creation endpoint from abuse, and the app ships with a Dockerfile and docker-compose setup so the API and Redis spin up together in one command.',
            impact: 'Handles over 10,000 redirects a day, with Redis caching absorbing the read load on top of the core shorten-and-redirect flow, plus custom aliases and click analytics.',
        },
    },
    {
        title: 'TeamFlow',
        slug: 'multi-tenant-saas-api',
        sourceCode: 'https://github.com/iamnathan-dev/multi-tenant-saas-api',
        thumbnail:
            'https://opengraph.githubassets.com/1/iamnathan-dev/multi-tenant-saas-api',
        techStack: [
            'Node.js',
            'Express.js',
            'TypeScript',
            'PostgreSQL',
            'Prisma',
            'Redis',
            'Docker',
        ],
        images: [],
        year: 2025,
        description:
            'TeamFlow is a production-grade multi-tenant SaaS backend for team collaboration platforms — organizations, projects, tasks, members, and permissions, with strict tenant-level data isolation.',
        role: 'Sole developer.',
        caseStudy: {
            problem: "A multi-tenant SaaS backend has to solve several hard problems at once: strict data isolation between organizations sharing the same database, an authorization model expressive enough for real permission checks rather than just 'admin vs. user', and enough operational maturity — audit logs, background jobs, rate limiting — to behave like something that could run in production rather than a CRUD demo.",
            approach: "Built on Node.js, Express, and TypeScript, with PostgreSQL and Prisma as the data layer and tenant isolation enforced at the organization boundary — users can belong to multiple organizations, but every query is scoped to one. Authorization combines role-based access control (Owner/Admin/Member) with permission-based checks (`project:create`, `task:update`, `member:invite`) enforced via middleware, instead of hardcoding role checks into every route. JWT access and refresh tokens handle sessions, with refresh token rotation and OAuth (Google, GitHub) as alternate entry points, plus per-device session tracking. Redis backs both a queue for background jobs — sending emails, cleaning expired tokens, audit logging — and a cache for permissions, memberships, and project lookups, since those get read far more often than they change. Webhooks with signed payloads and retries let external systems subscribe to events like `task.created`.",
            impact: 'A backend that demonstrates real production patterns end-to-end — tenant isolation, RBAC and PBAC, token rotation, queued background work, audit logging, and subscription-tier limits — rather than a simplified CRUD API.',
        },
    },
    {
        title: 'News Web Scrapper',
        slug: 'news-web-scrapper',
        sourceCode: 'https://github.com/iamnathan-dev/news-web-scrapper',
        thumbnail:
            'https://opengraph.githubassets.com/1/iamnathan-dev/news-web-scrapper',
        techStack: ['NestJS', 'TypeScript'],
        images: [],
        year: 2025,
        description:
            'A web scraper for aggregating news content, built with NestJS and TypeScript.',
        role: 'Sole developer.',
    },
];

export const CERTIFICATIONS = [
    { name: 'HNG 11 Finalist', year: '2024' },
    { name: 'Proficiency in Frontend Development', year: '2024' },
];

export const MY_EXPERIENCE = [
    {
        title: 'Mobile Developer',
        company: 'Runwae',
        duration: 'Jan 2026 - Present',
        highlights: [
            'Architected a cross-platform mobile ecosystem with React Native and Expo, cutting development overhead by 40% while keeping native-level performance.',
            'Established CI/CD pipelines and automated testing for the mobile stack, achieving 99.9% crash-free sessions.',
        ],
    },
    {
        title: 'Frontend Developer',
        company: 'Evoolv',
        duration: 'Nov 2025 - Feb 2026',
        highlights: [
            'Led UI/UX engineering standards, building a reusable component library and design system for the team.',
            'Engineered API orchestration layers, using Postman for rigorous contract testing and documentation.',
        ],
    },
    {
        title: 'Mobile Developer',
        company: '9lives',
        duration: 'Aug 2025 - Jan 2026',
        highlights: [
            'Scaled a cross-platform mobile ecosystem with React Native and Expo, accelerating time-to-market by 40%.',
            'Integrated APIs and third-party services via Expo, including speech transcription.',
        ],
    },
    {
        title: 'Frontend Developer',
        company: 'ExamCrush',
        duration: 'Jul 2025 - Aug 2025',
        highlights: [
            'Refactored and modernized legacy codebases, reducing technical debt by 20%.',
            'Introduced end-to-end automated testing with Vitest, cutting QA time by 30%.',
        ],
    },
    {
        title: 'Frontend Developer',
        company: 'BrandDrive',
        duration: 'Oct 2024 - Mar 2025',
        highlights: [
            'Deployed robust form handling with React Hook Form, reducing form bugs by 40%.',
            'Built interactive dashboards and modals with ShadCN UI and Zustand, boosting task completion by 20%.',
        ],
    },
    {
        title: 'Frontend Developer',
        company: 'HNG Tech',
        duration: 'Jul 2024 - Oct 2024',
        highlights: [
            'Mentored teams delivering frontend features for 1000+ users across 8-week sprints.',
            'Improved accessibility across 25+ screens to meet WCAG 2.1 AA, achieving a 100% Lighthouse accessibility score.',
        ],
    },
];
