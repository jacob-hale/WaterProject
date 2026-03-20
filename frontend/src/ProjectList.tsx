import { useEffect, useState } from 'react';
import type { Project } from './types/Projects';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Water/AllProjects?pageHowMany=${pageSize}`
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [pageSize]);

  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Type:</strong> {p.projectType}
              </li>
              <li>
                <strong>Regional Program:</strong> {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact:</strong> {p.projectImpact} Individuals Served
              </li>
              <li>
                <strong>Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Functionality Status:</strong>{' '}
                {p.projectFunctionalityStatus}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
