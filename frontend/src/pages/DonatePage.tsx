import { useNavigate } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function DonatePage() {
    const navigate = useNavigate();
  return (
    <>
      <WelcomeBand />
      <h2>Donate</h2>

      <div>
        <input type="number" placeholder="Enter donation amount" />
        <button className="btn btn-primary">Add to Cart</button>
      </div>
      <button onClick={() => navigate("/projects")}>Go Back</button>
    </>
  );
}

export default DonatePage;
