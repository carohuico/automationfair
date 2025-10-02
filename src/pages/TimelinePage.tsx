import React from 'react';
import { useNavigate } from 'react-router-dom';
import InitialFooter from '../components/Footer/initialFooter';
import './Splash.css';

const TimelinePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigatetoLaunchpad = () => {
    navigate('/launchpad');
  };

  return (
    <>
       <div className="splash-container" onClick={handleNavigatetoLaunchpad}>
        <div className="img-container">
          <img src="/timeline.PNG" alt="Timeline" className="section-image" />
        </div>
      </div>
      <InitialFooter />
    </>
  );
};

export default TimelinePage;