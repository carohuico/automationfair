import React, { useState } from 'react';
import './SectionStyles.css';
import Footer from '../Footer/Footer';

interface ContextualizeDataProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
  onBackClick?: () => void;
}

const ContextualizeData: React.FC<ContextualizeDataProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'contextualize-data',
  navigationHistory = [],
  onBackClick
}) => {
  const [currentView, setCurrentView] = useState(0);
  
  const views = [
    {
      video: "/videoContextualize.mp4",
      alt: "Contextualize Data - View 1"
    },
    {
      image: "/Contextualize.jpg", 
      alt: "Contextualize Data - View 2"
    },
  ];

  const renderMedia = () => {
    const view = views[currentView];
    if (view.video) {
      return (
        <video
          src={view.video}
          autoPlay
          muted
          controls
          loop
          className="section-image"
          style={{ 
            width: '100%', 
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        >
          Sorry, your browser does not support embedded videos.
        </video>
      );
    }
    if (view.image) {
      return (
        <img
          src={view.image}
          alt={view.alt}
          className="section-image"
        />
      );
    }
    return null;
  };

  const handleViewChange = (newView: number) => {
    setCurrentView(newView);
  };

  return (
    <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          {renderMedia()}
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

export default ContextualizeData;