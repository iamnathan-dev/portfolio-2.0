import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Experiences from './_components/Experiences';
import Skills from './_components/Skills';
import ProjectList from './_components/ProjectList';
import TechMarquee from './_components/TechMarquee';

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <TechMarquee />
            <AboutMe />
            <Skills />
            <Experiences />
            <ProjectList />
        </div>
    );
}
