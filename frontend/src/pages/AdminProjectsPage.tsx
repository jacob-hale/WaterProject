import { useEffect, useState } from 'react';
import type { Project } from '../types/Projects';
import { fetchProjects } from '../api/ProjectsAPI';

const AdminProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(10, 1, []); // Fetch first page with default page size and no filters
        setProjects(data.projects);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  if (loading) {
    return <div>Loading projects...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error loading projects: {error}</div>;
  }

  return (
    <div>
      <h1>Admin - Projects</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Regional Program</th>
            <th>Impact</th>
            <th>Phase</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.projectId}>
                <td>{p.projectId}</td>
                <td>{p.projectName}</td>
                <td>{p.projectType}</td>
                <td>{p.projectRegionalProgram}</td>
                <td>{p.projectImpact}</td>
                <td>{p.projectPhase}</td>
                <td>{p.projectFunctionalityStatus}</td>
                <td><button onClick={() => console.log(`Edit project ${p.projectId}`)}  className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => console.log(`Delete project ${p.projectId}`)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProjectPage;
