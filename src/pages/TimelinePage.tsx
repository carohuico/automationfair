import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import './TimelinePage.css';

const TimelinePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToLaunchpad = () => {
    navigate('/launchpad');
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  return (
    <div className="section-container" onClick={handleNavigateToLaunchpad}>
      <div className="img-container">
        <img src="/timeline.png" alt="Timeline" className="section-image" />
      </div>
      <Footer onBackClick={handleNavigateBack} showBackButton={true} />
    </div>
  );
};

export default TimelinePage;