import { useState } from 'react';
import type { Project } from '../types/Projects';

const NewProjectForm = () => {
  const [formData, setFormData] = useState<Project>({
    projectId: 0,
    projectName: '',
    projectType: '',
    projectRegionalProgram: '',
    projectImpact: 0,
    projectPhase: '',
    projectFunctionalityStatus: '',
  });

  return (
    <form>
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
        <label>Project Name:<input type="text" /></label>
        <label>Project Type:<input type="text" /></label>
        <label>Project Regional Program:<input type="text" /></label>
        <label>Project Impact:<input type="number" /></label>
        <label>Project Phase:<input type="text" /></label>
        <label>Project Functionality Status:<input type="text" /></label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">Add Project</button>
        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2">Cancel</button>
    </form>);
};



export default NewProjectForm;
