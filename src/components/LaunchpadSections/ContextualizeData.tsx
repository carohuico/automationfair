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
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  
  const views = [
    {
      video: "/videoContextualize.MP4",
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
        <div className="relative w-full h-full">
          {isVideoLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 text-lg font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>Loading...</p>
            </div>
          )}
          <video
            src={view.video}
            autoPlay
            muted
            controls
            loop
            className={`section-image transition-opacity duration-300 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
              width: '100%', 
              height: 'auto',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            onLoadStart={() => setIsVideoLoading(true)}
            onLoadedData={() => setIsVideoLoading(false)}
            onCanPlay={() => setIsVideoLoading(false)}
            onError={() => setIsVideoLoading(false)}
          >
            Sorry, your browser does not support embedded videos.
          </video>
        </div>
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
    if (views[newView].video) {
      setIsVideoLoading(true);
    }
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