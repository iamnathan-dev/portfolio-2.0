import AboutMe from './_components/AboutMe';
import Articles from './_components/Articles';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import GithubActivity from './_components/GithubActivity';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';
import TechMarquee from './_components/TechMarquee';
import Testimonials from './_components/Testimonials';

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <TechMarquee />
            <AboutMe />
            <Skills />
            <Experiences />
            <ProjectList />
            <Articles />
            <Testimonials />
            <GithubActivity />
        </div>
    );
}
