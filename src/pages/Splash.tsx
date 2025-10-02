import React from 'react';
import { useNavigate } from 'react-router-dom';
import InitialFooter from '../components/Footer/initialFooter';
import './Splash.css';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToTimeline = () => {
    navigate('/timeline');
  };

  return (
    <>
      <div className="splash-container" onClick={handleNavigateToTimeline}>
        <div className="splash-img-container">
          <img src="/splash1.png" alt="Splash" className="splash-image" />
        </div>
      </div>
      <InitialFooter />
    </>
  );
};

export default Splash;