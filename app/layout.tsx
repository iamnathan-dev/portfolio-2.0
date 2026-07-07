import type { Metadata, Viewport } from 'next';
import { Anton, JetBrains_Mono, Roboto_Flex } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Footer from '@/components/Footer';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import ParticleBackground from '@/components/ParticleBackground';
import GridBackground from '@/components/GridBackground';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTop from '@/components/ScrollToTop';
import ChatWidget from '@/components/ChatWidget';
import ColorPaletteToggle from '@/components/ColorPaletteToggle';
import CommandPalette from '@/components/CommandPalette';
import Preloader from '../components/Preloader';
import LenisScrollSync from '@/components/LenisScrollSync';
import StickyEmail from './_components/StickyEmail';
import { GENERAL_INFO, SITE_URL, SOCIAL_LINKS } from '@/lib/data';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

const antonFont = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-anton',
});

const robotoFlex = Roboto_Flex({
    weight: ['100', '400', '500', '600', '700', '800'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
});

const jetbrainsMono = JetBrains_Mono({
    weight: ['400', '500'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-mono',
});

const TITLE = 'Nathaniel Joseph - Frontend & Mobile Developer';
const DESCRIPTION =
    'Portfolio of Nathaniel Joseph, a frontend and mobile developer specializing in React, Next.js, and React Native — building fast, accessible, high-performance web and mobile products.';

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: TITLE,
        template: '%s | Nathaniel Joseph',
    },
    description: DESCRIPTION,
    keywords: [
        'Nathaniel Joseph',
        'Frontend Developer',
        'Mobile Developer',
        'React Developer',
        'Next.js Developer',
        'React Native Developer',
        'Software Engineer Portfolio',
        'Full-Stack Developer Nigeria',
    ],
    authors: [{ name: 'Nathaniel Joseph', url: SITE_URL }],
    creator: 'Nathaniel Joseph',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        images: [
            {
                url: '/images/og-image.png',
                width: 1200,
                height: 630,
                alt: TITLE,
            },
        ],
        url: SITE_URL,
        siteName: TITLE,
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: ['/images/og-image.png'],
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0d0d0d',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const personJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Nathaniel Joseph',
        url: SITE_URL,
        jobTitle: 'Frontend & Mobile Developer',
        email: GENERAL_INFO.email,
        sameAs: SOCIAL_LINKS.map((link) => link.url),
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{
    var s=localStorage.getItem('theme');
    var t=s||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
    var isLight=t==='light';
    if(isLight)document.documentElement.classList.add('light');

    var PALETTES={
        green:{dark:['140 100% 47%','0 0% 13%'],light:['140 65% 32%','0 0% 100%']},
        cyan:{dark:['193 100% 50%','0 0% 13%'],light:['193 85% 30%','0 0% 100%']},
        purple:{dark:['270 95% 65%','0 0% 13%'],light:['270 75% 38%','0 0% 100%']},
        orange:{dark:['30 100% 55%','0 0% 13%'],light:['30 90% 35%','0 0% 100%']},
        pink:{dark:['330 95% 62%','0 0% 13%'],light:['330 80% 38%','0 0% 100%']},
        red:{dark:['0 90% 60%','0 0% 13%'],light:['0 75% 40%','0 0% 100%']}
    };
    var p=localStorage.getItem('palette')||'green';
    var pal=PALETTES[p]||PALETTES.green;
    var variant=isLight?pal.light:pal.dark;
    document.documentElement.style.setProperty('--primary',variant[0]);
    document.documentElement.style.setProperty('--primary-foreground',variant[1]);
}catch(e){}})();`,
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personJsonLd),
                    }}
                />
            </head>
            <GoogleAnalytics gaId="G-MHLY1LNGY5" />
            <Script id="hotjar" strategy="afterInteractive">
                {`(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6380611,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
            </Script>
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} ${jetbrainsMono.variable} antialiased`}
                suppressHydrationWarning
            >
                <ReactLenis
                    root
                    options={{
                        lerp: 0.1,
                        duration: 1.4,
                        autoRaf: false,
                    }}
                >
                    <LenisScrollSync />
                    {/* <a
                        href="https://forms.gle/t73XYJgWD5cJNr6e8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 block bg-black text-center z-[1] text-sm py-2 hover:text-primary transition-all"
                    >
                        Frontend dev? I&apos;ll help you polish your resume —
                        completely free.
                    </a> */}
                    <Navbar />
                    <main>{children}</main>
                    <Footer />

                    <CustomCursor />
                    <Preloader />
                    <ScrollProgressIndicator />
                    <GridBackground />
                    <ParticleBackground />
                    <StickyEmail />
                    <ScrollToTop />
                    <ColorPaletteToggle />
                    <ChatWidget />
                    <CommandPalette />
                </ReactLenis>
            </body>
        </html>
    );
}
