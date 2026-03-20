import { useEffect, useState } from 'react';
import type { Project } from './types/Projects';

function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
    const fetchProjects = async () => {
        try {
            const response = await fetch('https://localhost:5000/Water/AllProjects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    fetchProjects();
}, []);

  return (
    <>
      <h1>Water Projects</h1>
      <br/>
      {projects.map((p) => 
    <div id="projectCard">
        <h3>{p.projectName}</h3>
        <ul>
            <li>Type: {p.projectType}</li>
            <li>Regional Program: {p.projectRegionalProgram}</li>
            <li>Impact: {p.projectImpact} Individuals Served</li>
            <li>Phase: {p.projectPhase}</li>
            <li>Functionality Status: {p.projectFunctionalityStatus}</li>
        </ul>
    </div>)}
    </>
  );
}

export default ProjectList;
