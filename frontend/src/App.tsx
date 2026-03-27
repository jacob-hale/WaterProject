import './App.css';
import CartPage from './pages/CartPage';
import DonatePage from './pages/DonatePage';
import ProjectsPage from './pages/ProjectsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/donate/:projectName" element={<DonatePage />} />
          <Route path="/cart" element={<CartPage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
