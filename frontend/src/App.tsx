import './App.css';
import CategoryFilter from './CategoryFilter';
import ProjectList from './ProjectList';
import WelcomeBand from './WelcomeBand';

function App() {
  return (
    <>
      <div className="container">
        <div className="row bg-primary text-white" >
          <WelcomeBand />
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter />
          </div>
          <div className="col-md-9">
            <ProjectList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
