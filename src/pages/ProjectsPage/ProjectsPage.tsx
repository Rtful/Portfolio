import './ProjectsPage.scss';
import {ProjectCard} from "../../components/Card/ProjectCard.tsx";
import {configData, Project} from "../../config/config.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";

export const ProjectsPage = () => {
    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));

    let columns = 1;
    if (isXl) columns = 3;
    else if (isMd || isLg) columns = 2;

    const projects: Project[] = configData.projects;
    const columnItems: Project[][] = Array.from({length: columns}, () => []);

    projects.forEach((project, i) => {
        columnItems[i % columns].push(project);
    });

    return (
        <>
            <h1>Projects</h1>
            <div className="projects-wrapper">
                {columnItems.map((col, index) => (
                    // <div className="projects-column" key={index} style={{height: col.length * 28 + 'rem'}}>
                    <div className="projects-column" key={index} style={{width: isXs ? '100%' : 'unset'}}>
                        {col.map((project, key) => (
                            <ProjectCard project={project} key={key} style={{width: isXs ? '100%' : 'unset'}}>
                                <>
                                    <p>{project.description}</p>
                                </>
                            </ProjectCard>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}