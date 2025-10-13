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
    <div className="flex flex-col h-screen overflow-hidden">
      <div 
        className="flex-1 cursor-pointer overflow-auto bg-white mb-24"
        onClick={handleNavigatetoLaunchpad}
      >
        <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 2xl:p-2">
          <img 
            src="/timeline.png" 
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