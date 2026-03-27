import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function DonatePage() {
    const navigate = useNavigate();
    const { projectName } = useParams<{ projectName: string }>();
  return (
    <>
      <WelcomeBand />
      <h2>Donate to {projectName}</h2>

      <div>
        <input type="number" placeholder="Enter donation amount" />
        <button className="btn btn-primary">Add to Cart</button>
      </div>
      <button onClick={() => navigate("/projects")}>Go Back</button>
    </>
  );
}

export default DonatePage;
