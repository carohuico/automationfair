import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TimelinePage from './pages/TimelinePage';
import LaunchpadPage from './pages/LaunchpadPage';
import Splash from './pages/Splash';
import './App.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleContainerClick = () => {
    navigate('/splash');
  };

  return (
    <>
      <div className="App-bg">
        <div className="container" onClick={handleContainerClick}>
          <p className="learn-text">
            LEARN HOW TO <br />
            <img src="/accelerate-logo.png" alt="Accelerate Logo" className="accelerate-logo" />
          </p>
        </div>  
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/launchpad" element={<LaunchpadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
