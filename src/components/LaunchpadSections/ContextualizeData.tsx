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
      image: "/Contextualize.jpg",
      alt: "Contextualize Data - View 1"
    },
    {
      image: "/overview.png", 
      alt: "Contextualize Data - View 2"
    }
  ];

  const handleViewChange = (newView: number) => {
    setCurrentView(newView);
  };

  return (
    <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          <img 
            src={views[currentView].image} 
            alt={views[currentView].alt} 
            className="section-image" 
          />
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