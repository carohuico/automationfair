import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './SectionStyles.css';

interface MonitorProductionProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
  onBackClick?: () => void;
}

const MonitorProduction: React.FC<MonitorProductionProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'monitor-production',
  navigationHistory = [],
  onBackClick
}) => {
  const [currentView, setCurrentView] = useState(0);
  
  // Definir las diferentes vistas para Monitor Production
  const views = [
    {
      image: "/retool.png",
      alt: "Monitor Production - View 1"
    },
    {
      image: "/plc.webp", 
      alt: "Monitor Production - View 2"
    },
    {
      image: "/sensor.webp", 
      alt: "Monitor Production - View 3"
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

export default MonitorProduction;