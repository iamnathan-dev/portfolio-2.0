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
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Delve',
        slug: 'delve',
        liveUrl: 'https://delve.fun/',
        year: 2024,
        description: `
    A fun language learning platform that elevates your experience through interactive 3D challenges and engaging content. <br/> <br/>
    
    Key Features:<br/>
    <ul>
      <li>🤖 AI-Generated Conversations: Simulated dialogue practice for real-world vocabulary building</li>
      <li>📊 Progress Dashboard: Tracks learning history and surfaces dynamic lessons based on it</li>
      <li>🎮 Interactive 3D Challenges: Immersive language exercises powered by Three.js</li>
      <li>🛠️ Service Showcase: Dynamic service display with synchronized sliders</li>
      <li>✍️ Blog Management: SEO-optimized blog with categorization, search, and dynamic meta tags</li>
      <li>🛒 Product Catalog: Organized course and resource display with advanced filtering</li>
      <li>📱 Fully Responsive: Seamless experience across all device sizes</li>
      <li>⚡ Fast Performance: Optimized Next.js frontend with ISR for rapid load times</li>
    </ul><br/>
    
    Technical Highlights:
    <ul>
      <li>Built synchronized slider logic with Swiper.js for engaging service showcases</li>
      <li>Customized Payload CMS for intuitive management of blogs, services, and products</li>
      <li>Developed reusable UI components with shadcn and Tailwind CSS for consistent design</li>
      <li>Implemented efficient data fetching with Next.js ISR and SWR for dynamic content</li>
      <li>Integrated Three.js for interactive 3D learning challenges</li>
    </ul>
  `,
        role: `
    Full-Stack Developer <br/>
    Owned the entire development lifecycle:
    <ul>
      <li>✅ Backend: Configured Payload CMS with custom collections for services, blogs, and products</li>
      <li>🎨 Frontend: Built responsive UI components using Tailwind CSS and shadcn</li>
      <li>🔄 State Management: Used Zustand for client-side state and SWR for data fetching/caching</li>
      <li>🖥️ CMS Customization: Designed admin interfaces for content editors</li>
      <li>🚀 Deployment: Set up CI/CD pipeline for Vercel hosting</li>
      <li>🧩 Third-Party Integration: Added Swiper.js for sliders and Three.js for 3D challenges</li>
    </ul>
  `,
        caseStudy: {
            problem:
                'Language-learning content tends to feel flat and disengaging, and the team needed a CMS flexible enough for non-technical staff to manage blogs, services, and course content on their own — without every change requiring a developer, and without sacrificing room for rich, interactive lesson experiences.',
            approach:
                'Built the platform end-to-end on Next.js with ISR for fast, SEO-friendly page loads, and customized Payload CMS with dedicated collections for blogs, services, and products so editors could manage content independently through a tailored admin interface. Zustand handled client-side state while SWR managed data fetching and caching. On the experience side, Three.js powered interactive 3D language challenges and Swiper.js drove synchronized service carousels, with shadcn and Tailwind CSS keeping the UI consistent throughout.',
            impact:
                'Shipped as a live production platform at delve.fun, with a CMS-driven content pipeline that lets non-technical editors publish and update blogs, services, and course material without developer involvement — while interactive 3D challenges and fast ISR-powered pages keep the learning experience itself fast and engaging.',
        },
        techStack: [
            'Next.js',
            'Three.js',
            'Tailwind CSS',
            'shadcn',
            'Zustand',
            'React Hook Form',
            'SWR',
            'Swiper.js',
            'Payload CMS',
        ],
        images: [],
    },
    {
        title: 'Resume Roaster',
        slug: 'resume-roaster',
        techStack: ['Next.js', 'PostgreSQL', 'GPT-4', 'Tailwind CSS'],
        images: [],
        liveUrl: 'https://resume-roaster.vercel.app/',
        year: 2024,
        description:
            'Resume Roaster is a web application designed to provide tailored resume feedback and professional writing services. Built with Next.js, PostgreSQL, Prisma, and Tailwind CSS, it integrates GPT-4 for AI-powered recommendations. The platform also includes peer-to-peer reviews with a points-based system, fostering a collaborative and engaging experience. Targeting freshers, experienced professionals, and programmers, it helps optimize resumes for job-specific success.',
        role: `As the sole developer and business owner, I:<br/>
        - Designed and developed the platform end-to-end using Next.js, PostgreSQL, Prisma, and Tailwind CSS.<br/>
        - Integrated GPT-4 for AI-driven feedback and insights.<br/>
        - Implemented complex SQL queries, including one to identify the top two resumes based on user points.`,
        caseStudy: {
            problem:
                'Generic resume advice — templates and one-size-fits-all checklists — rarely tells a candidate what\'s actually wrong with their specific resume, and professional human review is expensive and slow. Freshers and career-changers in particular had no fast, affordable way to get specific, actionable feedback before applying.',
            approach:
                'Built the platform solo, end-to-end, on Next.js, PostgreSQL, and Prisma, with GPT-4 integrated to generate structured, section-by-section feedback instead of generic commentary. Added a peer-to-peer review layer with a points-based incentive system so users could exchange feedback on each other\'s resumes and earn credits toward AI-powered rewrites, keeping the platform useful even before it had a large paying user base. Wrote the SQL layer directly, including a query to surface the top two highest-rated resumes per experience bracket for a leaderboard feature.',
            impact:
                'Shipped and deployed to production as a live, publicly usable tool at resume-roaster.vercel.app, pairing AI feedback with a self-sustaining peer-review loop — giving freshers and professionals fast, specific resume feedback without paying a human reviewer or waiting days for a response.',
        },
    },
    {
        title: 'EpikCart',
        slug: 'epikcart',
        techStack: ['React.js', 'Tailwind CSS', 'Redux', 'React Hook Form'],
        images: [],
        liveUrl: 'https://demo.epikcart.siphertech.com/',
        year: 2025,
        description:
            'EpikCart is a multi-vendor e-commerce storefront demo built to showcase product discovery, cart management, and checkout at scale — with admin-configurable filtering and multi-language support for a global vendor base.',
        role: `As the frontend developer in a team of ten, I: <br/>
        - Built new frontend components using React, Redux, RTK Query, and Tailwind CSS.<br/>
        - Developed dynamic filtering logic for the product search page with admin-configurable parameters.<br/>
        - Integrated multi-language support with React i18n, including RTL handling.<br/>
        - Delivered a responsive, user-friendly interface in collaboration with the UI/UX designer.`,
        caseStudy: {
            problem:
                'A multi-vendor storefront needs product filtering flexible enough for admins to reconfigure per category without a redeploy, cart and checkout state that stays consistent across dozens of unrelated screens, and a UI that reads naturally in more than one language and text direction — three requirements that are easy to get right individually and hard to get right together.',
            approach:
                'As the frontend developer on a ten-person team, I built new UI components in React and Tailwind CSS, and implemented dynamic filtering logic for the product search page driven entirely by admin-configurable parameters rather than hardcoded filter sets. Redux held the shared cart, filter, and auth state that a dozen unrelated screens needed to read and mutate consistently, while React Hook Form handled validated checkout and account forms. Multi-language support, including full RTL handling for right-to-left locales, was wired in with React i18n.',
            impact:
                'Delivered a responsive, production-ready storefront experience in close collaboration with the UI/UX designer, with filtering and cart logic robust enough to support a genuinely multi-vendor, multi-language catalog rather than a single hardcoded storefront.',
        },
    },
    {
        title: 'Oversabi',
        slug: 'property-pro',
        techStack: ['Next.js', 'Tailwind CSS', 'GPT-4', 'React i18n'],
        images: [],
        liveUrl: 'https://buzz-six-lime.vercel.app/',
        year: 2023,
        description:
            'Oversabi is a real estate management platform offering users a seamless experience to explore, manage, and view property listings. The application emphasizes accessibility and responsive design, ensuring a smooth interface across devices.',
        role: `As the frontend developer, I:<br/>
        - Built the frontend using React, Redux, RTK Query, Framer Motion, and Tailwind CSS.<br/>
        - Integrated dynamic state management for efficient handling of property data.<br/>
        - Implemented multi-language support with React i18n to cater to diverse audiences.<br/>
        - Enhanced user interaction with animations and transitions using Framer Motion.`,
        caseStudy: {
            problem:
                'Property listings involve dense, filterable data — price, location, amenities, availability — that needs to stay fast and legible on mobile, while serving a user base spread across regions that don\'t all read the same language.',
            approach:
                'Built the frontend using React, Redux, RTK Query, Framer Motion, and Tailwind CSS, with dynamic state management keeping property data — filters, saved listings, comparison views — in sync as users browsed. Framer Motion powered transitions between listing and detail views to keep the experience feeling responsive rather than jumpy on slower connections, and React i18n added multi-language support so the platform wasn\'t limited to a single-language audience.',
            impact:
                'Shipped a production real estate platform where property discovery stays fast and accessible on mobile, with multi-language support and animated transitions that make browsing dense listing data feel considerably lighter than a typical property portal.',
        },
    },
    {
        title: 'HNG Boilerplate',
        slug: 'hng-boilerplate',
        techStack: ['Next.js', 'TypeScript', 'ESLint', 'Prettier', 'Husky'],
        images: [],
        year: 2024,
        description:
            'An open-source frontend starter built during the HNG internship to give teams a fast, consistent way to spin up new projects. Ships with a documented library of reusable components and design patterns, plus linting, formatting, and best-practice tooling baked in from the start.',
        role: `As the maintainer, I:<br/>
        - Built and documented reusable components and design patterns for the starter kit.<br/>
        - Integrated linting, formatting, and best practices for rapid onboarding.<br/>
        - Supported adoption by multiple teams during the HNG internship for faster setup and consistent code quality.`,
        caseStudy: {
            problem:
                'Every new project during the HNG internship started with the same setup tax — linting config, formatting rules, component patterns, git hooks — repeated from scratch by every team, which meant inconsistent code quality and the first few days of every cohort spent re-solving already-solved problems.',
            approach:
                'Built and maintained an open-source Next.js and TypeScript starter with a documented library of reusable components and design patterns, plus ESLint, Prettier, and Husky pre-commit hooks configured out of the box so a new team could enforce code quality from commit one instead of retrofitting it later. Documentation covered the components themselves, not just the setup, so teams could actually discover and reuse what was already built instead of rewriting it.',
            impact:
                'Adopted by multiple teams during the HNG internship, cutting new-project setup time from days to under an hour and giving otherwise independent cohorts a consistent baseline of code quality and component reuse.',
        },
    },
    {
        title: 'Lovla',
        slug: 'lovla',
        techStack: ['React Native', 'Expo', 'Supabase', 'Zustand'],
        images: [],
        year: 2025,
        description:
            'Lovla is a cross-platform mobile coloring app built with Expo and React Native. It centers on an interactive coloring canvas with touch-gesture support, letting users select colors, fill regions, and draw freely on a clean, responsive interface optimized for mobile.',
        role: `As the developer, I:<br/>
        - Built the mobile application using Expo and React Native, ensuring cross-platform compatibility for iOS and Android.<br/>
        - Implemented an interactive coloring canvas with touch gestures for selecting colors, filling regions, and freehand drawing.<br/>
        - Designed a clean, responsive UI optimized for mobile devices.<br/>
        - Integrated a customizable color palette system.`,
        caseStudy: {
            problem:
                'Coloring apps are simple in concept but unforgiving in execution on mobile — freehand drawing and fill-region interactions need to feel instant under touch, and doing that across both iOS and Android from one codebase without native-level lag is a real constraint, not a given.',
            approach:
                'Built cross-platform with Expo and React Native for iOS/Android parity, backing the app with Supabase for data and Zustand for lightweight client state rather than a heavier store, since the state graph — active palette, canvas history, saved works — didn\'t need Redux-level machinery. The interactive coloring canvas needed lower-level gesture and touch handling beyond what standard components offered, to keep fill-region and freehand drawing responsive rather than laggy on mid-range Android devices, which is where performance problems tend to surface first.',
            impact:
                'Shipped a smooth, cross-platform coloring experience with a responsive touch canvas and a customizable color palette system, proving that gesture-heavy custom interactions are achievable in a managed Expo workflow without dropping to bare React Native.',
        },
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
