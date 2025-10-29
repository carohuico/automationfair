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
  
  const views = [
    {
      embed: "https://rockwellautomation.retool.com/embedded/public/49e04285-0560-4b68-b06c-94ce72c06a55/OEE?embed=true",
      alt: "Monitor Production - Embedded View"
    },
    // {
    //   image: `${process.env.PUBLIC_URL}/plc.png`, 
    //   alt: "Monitor Production - View 2"
    // },
  ];

  const renderMedia = () => {
    const view = views[currentView];
    if (view.embed) {
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <iframe
            title={view.alt}
            src={view.embed}
            loading="eager"
            referrerPolicy="no-referrer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="section-image"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              zoom: 1
            }}
          />
        </div>
      );
    }
    // if (view.image) {
    //   return (
    //     <img 
    //       src={view.image} 
    //       alt={view.alt} 
    //       className="section-image" 
    //     />
    //   );
    // }
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

export default MonitorProduction;