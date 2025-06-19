import './ProjectsPage.css';
import {ProjectCard} from "../Card/ProjectCard.tsx";
import {Project, configData} from "../../config/config";

export const ProjectsPage = () => {
    const projects: Project[] = configData.projects;
    return (
        <>
            <h1>Projects</h1>
            <div className="projects-wrapper">
                {projects.map((project, key) => {
                    return (
                        <ProjectCard project={project} key={key}>
                            <>
                                <p>{project.description}</p>
                            </>
                        </ProjectCard>
                    );
                })}
            </div>
        </>
    );
}