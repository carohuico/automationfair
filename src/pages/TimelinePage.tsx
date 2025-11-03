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
    <div className="flex flex-col h-[100vh] overflow-hidden align-center justify-center">
      <div 
        className="flex-1 cursor-pointer overflow-auto bg-white mb-8"
        onClick={handleNavigatetoLaunchpad}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={`${process.env.PUBLIC_URL}/timeline.png`} 
            alt="Timeline" 
            className="max-w-full max-h-full object-contain w-auto h-auto 2xl:w-full 2xl:h-full 2xl:object-cover"
          />
        </div>
      </div>
      <div className="flex-shrink-0">
        <InitialFooter />
      </div>
    </div>
  );
};

export default TimelinePage;