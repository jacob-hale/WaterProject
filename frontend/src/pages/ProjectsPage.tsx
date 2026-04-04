import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProjectList from '../components/ProjectList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';
import { useNavigate } from 'react-router-dom';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand />
      <button
        onClick={() => navigate('/adminprojects')}
        className="btn btn-success"
      >
        Manage Projects
      </button>{' '}
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
