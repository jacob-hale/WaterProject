import type { Project } from "../types/Projects";

interface FetchProjectsResponse {
  projects: Project[];
  totalNumProjects: number;
}

export const fetchProjects = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
    try {
        const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');
        const response = await fetch(
          `https://localhost:5000/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};