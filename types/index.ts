export type Next_Page_Url = string;
// UrlObject;
// | __next_route_internal_types__.StaticRoutes
// | __next_route_internal_types__.DynamicRoutes;

export type Variant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'no-color';

export interface ICaseStudy {
    problem: string;
    approach: string;
    impact: string;
}

export interface IProject {
    title: string;
    year: number;
    description: string;
    role: string;
    techStack: string[];
    // Omit when a real screenshot isn't ready yet — the UI reserves the space instead.
    thumbnail?: string;
    longThumbnail?: string;
    images: string[];
    slug: string;
    liveUrl?: string;
    sourceCode?: string;
    caseStudy?: ICaseStudy;
}
