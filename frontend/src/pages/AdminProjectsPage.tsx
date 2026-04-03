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
}, []);

};

export default AdminProjectPage;
