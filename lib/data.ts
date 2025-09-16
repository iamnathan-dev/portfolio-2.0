import { IProject } from '@/types';

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
        thumbnail: '/projects/thumbnail/delve.jpeg',
        longThumbnail: '/projects/long/delve.png',
        images: [
            '/projects/images/delve-1.png',
            '/projects/images/delve-2.png',
        ],
    },
    {
        title: 'BrandDrive',
        slug: 'brandDrive',
        techStack: [
            'React',
            'Redux',
            'Ionic',
            'Tailwind CSS',
            'React-hook-form',
            'debouncing',
            'Api Integration',
        ],
        thumbnail: '/projects/thumbnail/branddrive.png',
        longThumbnail: '/projects/long/brand-drive.jpg',
        images: [
            '/projects/images/brand-drive-1.png',
            '/projects/images/brand-drive-2.png',
        ],
        liveUrl: 'https://branddrive.co/',
        year: 2024,
        description: `BrandDrive is a seamless bookkeeping, smart payments, AI insights, and e-commerce solutions—everything your business needs in one platform.`,
        role: `As the frontend developer in a team of ten, I: <br/>
        - Built new frontend components using React, Redux, RTK Query, and Tailwind CSS.<br/>
        - Developed dynamic filtering logic for the product search page with admin-configurable parameters.<br/>
        - Integrated multi-language support with React i18n, including RTL handling.<br/>
        - Delivered a responsive, user-friendly interface in collaboration with the UI/UX designer.`,
    },
    {
        title: 'Unique Kids House',
        slug: 'unique-kids-house',
        techStack: ['Next.js', 'Tailwind CSS', 'Vercel'],
        thumbnail: '/projects/thumbnail/unique-kids-house.png',
        longThumbnail: '/projects/long/unique-kids-house.jpg',
        images: [
            '/projects/images/resume-roaster-1.png',
            '/projects/images/resume-roaster-2.png',
            '/projects/images/resume-roaster-3.png',
        ],
        liveUrl: 'https://www.unique-kids-house.com.ng/',
        year: 2023,
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
        techStack: [
            'React.js',
            'Redux',
            'Tailwind CSS',
            'React i18n',
            'GPT-04',
        ],
        thumbnail: '/projects/thumbnail/oversabi.png',
        longThumbnail: '/projects/long/property-pro.jpg',
        images: [
            '/projects/images/property-pro-1.png',
            '/projects/images/property-pro-2.png',
            '/projects/images/property-pro-3.png',
        ],
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
];

export const MY_EXPERIENCE = [
    {
        title: 'Software Engineer',
        company: '9lives - Contract',
        duration: 'Aug 2025 - Present',
    },
    {
        title: 'Software Developer',
        company: 'HNG Tech - Seasonal',
        duration: 'Jul 2024 - Present',
    },
    {
        title: 'Frontend Engineer',
        company: 'ExamCrush - Contract',
        duration: 'Jul 2025 - Aug 2025',
    },
    {
        title: 'Frontend Developer',
        company: 'BrandDrive',
        duration: 'Oct 2024 - Mar 2025',
    },
    {
        title: 'Frontend Developer',
        company: 'Grit Inforemd Media',
        duration: 'May 2022 - Jul 2023',
    },
    {
        title: 'Frontend Developer',
        company: 'GPRS Innovation Hub - Internship',
        duration: 'Jun 2021 - Apr 2022',
    },
];
