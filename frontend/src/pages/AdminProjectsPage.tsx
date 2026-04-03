import { useEffect, useState } from 'react';
import type { Project } from '../types/Projects';
import { deleteProject, fetchProjects } from '../api/ProjectsAPI';
import Pagination from '../components/Pagination';
import NewProjectForm from '../components/NewProjectForm';
import EditProjectForm from '../components/EditProjectForm';

const AdminProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(pageSize, pageNum, []); // Fetch first page with default page size and no filters
        setProjects(data.projects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum]);

  const handleDelete = async (projectId: number) => {
    // Implement delete functionality here, e.g., call deleteProject API and refresh list
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) {
        return;
    }
        try {
            // await deleteProject(projectId);
            await deleteProject(projectId);
            setProjects(projects.filter((p) => p.projectId !== projectId));
        } catch (error) {
            alert('Failed to delete project: ' + (error as Error).message);
        }
    };

  if (loading) {
    return <div>Loading projects...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error loading projects: {error}</div>;
  }

  return (
    <div>
      <h1>Admin - Projects</h1>

        {!showForm && (
          <button
          className="mb-4 btn btn-success text-white px-4 py-2 rounded"
            onClick={() => setShowForm(true)}
          >
            Add Project
          </button>
        )}

      {showForm && (
        <NewProjectForm
          onSuccess={() => {
            setShowForm(false);
            fetchProjects(pageSize, pageNum, []).then((data) =>
              setProjects(data.projects)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onSuccess={() => {
            setEditingProject(null);
            fetchProjects(pageSize, pageNum, []).then((data) =>
              setProjects(data.projects)
            );
          }}
          onCancel={() => setEditingProject(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead>
          <tr className="table-dark">
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Regional Program</th>
            <th>Impact</th>
            <th>Phase</th>
            <th>Status</th>
            <th>Actions</th>
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
              <td>
                <button
                  onClick={() => setEditingProject(p)}
                  className="btn btn-primary text-white px-2 py-1 rounded w-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.projectId)}
                  className="btn btn-danger text-white px-2 py-1 rounded w-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1); // Reset to first page when page size changes
        }}
      />
    </div>
  );
};

export default AdminProjectPage;
