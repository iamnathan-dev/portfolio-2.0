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

// TODO: replace with real quotes from clients/colleagues (e.g. LinkedIn recommendations).
// These are placeholders so the section renders — swap the text, name, and role for each.
export const TESTIMONIALS = [
    {
        quote: 'Add a real quote here — 1 to 3 sentences on what it was like working with Nathan.',
        name: 'Add name',
        role: 'Role, Company',
    },
    {
        quote: 'Add a second real testimonial here.',
        name: 'Add name',
        role: 'Role, Company',
    },
    {
        quote: 'Add a third real testimonial here.',
        name: 'Add name',
        role: 'Role, Company',
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

// TODO: replace with real articles. Each one gets its own page at
// /articles/[slug] — write the full piece in `content`.
export const ARTICLES: IArticle[] = [
    {
        title: 'Add your article title',
        slug: 'first-article',
        excerpt:
            'Add a 1-2 sentence summary of what this article covers and why it matters.',
        date: 'Add date',
        readTime: '5 min read',
        tags: ['React', 'Next.js'],
        content:
            'Replace this with the full article body. Write your real content here — it will render on this article’s own page.',
    },
    {
        title: 'Add a second article title',
        slug: 'second-article',
        excerpt: 'Add a summary for this article.',
        date: 'Add date',
        readTime: '4 min read',
        tags: ['TypeScript'],
        content: 'Replace this with the full article body for your second post.',
    },
    {
        title: 'Add a third article title',
        slug: 'third-article',
        excerpt: 'Add a summary for this article.',
        date: 'Add date',
        readTime: '6 min read',
        tags: ['Mobile', 'React Native'],
        content: 'Replace this with the full article body for your third post.',
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
        description: `BrandDrive is a seamless bookkeeping, smart payments, AI insights, and e-commerce solutions—everything your business needs in one platform.`,
        role: `As the frontend developer in a team of ten, I: <br/>
        - Built new frontend components using React, Redux, RTK Query, and Tailwind CSS.<br/>
        - Developed dynamic filtering logic for the product search page with admin-configurable parameters.<br/>
        - Integrated multi-language support with React i18n, including RTL handling.<br/>
        - Delivered a responsive, user-friendly interface in collaboration with the UI/UX designer.`,
    },
    {
        title: 'EpikCart',
        slug: 'epikcart',
        techStack: ['React.js', 'Tailwind CSS', 'Redux', 'React Hook Form'],
        images: [],
        liveUrl: 'https://demo.epikcart.siphertech.com/',
        year: 2025,
        description:
            'Resume Roaster is a web application designed to provide tailored resume feedback and professional writing services. Built with Next.js, PostgreSQL, Prisma, and Tailwind CSS, it integrates GPT-4 for AI-powered recommendations. The platform also includes peer-to-peer reviews with a points-based system, fostering a collaborative and engaging experience. Targeting freshers, experienced professionals, and programmers, it helps optimize resumes for job-specific success.',
        role: `As the sole developer and business owner, I:<br/>
        - Designed and developed the platform end-to-end using Next.js, PostgreSQL, Prisma, and Tailwind CSS.<br/>
        - Integrated GPT-4 for AI-driven feedback and insights.<br/>
        - Implemented complex SQL queries, including one to identify the top two resumes based on user points.`,
    },
    {
        title: 'Oversabi',
        slug: 'property-pro',
        techStack: ['Next.js', 'Tailwind CSS', 'GPT-4', 'React i18n'],
        images: [],
        liveUrl: 'https://buzz-six-lime.vercel.app/',
        year: 2023,
        description:
            'PropertyPro is a real estate management platform offering users a seamless experience to explore, manage, and view property listings. The application emphasizes accessibility and responsive design, ensuring a smooth interface across devices.',
        role: `As the frontend developer, I:<br/>
        - Built the frontend using React, Redux, RTK Query, Framer Motion, and Tailwind CSS.<br/>
        - Integrated dynamic state management for efficient handling of property data.<br/>
        - Implemented multi-language support with React i18n to cater to diverse audiences.<br/>
        - Enhanced user interaction with animations and transitions using Framer Motion.`,
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
