import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TimelinePage from './pages/TimelinePage';
import LaunchpadPage from './pages/LaunchpadPage';
import './App.css';
import Footer from './components/Footer/Footer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleContainerClick = () => {
    navigate('/timeline');
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
            <Footer showBackButton={false} />
        
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/launchpad" element={<LaunchpadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
