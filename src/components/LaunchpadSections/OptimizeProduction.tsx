import React, { useState } from 'react';
import './SectionStyles.css';
import Footer from '../Footer/Footer';

interface OptimizeProductionProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
  onBackClick?: () => void;
}

const OptimizeProduction: React.FC<OptimizeProductionProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'optimize-production',
  navigationHistory = [],
  onBackClick
}) => {
  const [currentView, setCurrentView] = useState(0);
  
  const views = [
    {
  image: `${process.env.PUBLIC_URL}/optimize.png`,
      alt: "Optimize Production - View 1"
    },
    {
  image: `${process.env.PUBLIC_URL}/temp.png`, 
      alt: "Optimize Production - View 3"
    },
    {
      video: `${process.env.PUBLIC_URL}/videoEnable.mp4`,
      alt: "Optimize Production - Video"
    }
  ];

  const handleViewChange = (newView: number) => {
    setCurrentView(newView);
  };

  return (
    <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          {('video' in views[currentView]) ? (
            // @ts-ignore - views item can be image or video
            <video
              src={(views as any)[currentView].video}
              className="section-image"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <img 
              src={(views as any)[currentView].image} 
              alt={(views as any)[currentView].alt} 
              className="section-image" 
            />
          )}
        </div>
      </div>
      <Footer 
        showBackButton={true} 
        handleSectionChange={handleSectionChange} 
        currentSection={currentSection} 
        navigationHistory={navigationHistory}
        onBackClick={onBackClick}
        currentView={currentView}
        onViewChange={handleViewChange}
        totalViews={views.length}
      />
    </div>
  );
};

export default OptimizeProduction;