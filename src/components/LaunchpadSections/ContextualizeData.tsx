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
      video: `${process.env.PUBLIC_URL}/videoContextualize.MP4`,
      alt: "Contextualize Data - View 1"
    },    
    {
      embed: "https://rockwellautomation.storylane.io/share/kjvnbv7ir4oj",
      alt: "Contextualize Data - Embedded View"
    },
  ];

  const renderMedia = () => {
    const view = views[currentView];
    
    if (view.video) {
      return (
        <div className="flex items-center justify-center w-full h-full relative" style={{ minHeight: '100%' }}>
          {isVideoLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>Loading...</p>
            </div>
          )}
          <div className="flex items-center justify-center w-full h-full">
        <video
          src={view.video}
          preload="auto"
          muted
          controls
          crossOrigin="anonymous"
          className={`section-image transition-opacity duration-300 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
              style={{
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block'
              }}
              onLoadStart={() => setIsVideoLoading(true)}
              onLoadedData={() => setIsVideoLoading(false)}
              onCanPlay={() => setIsVideoLoading(false)}  
              onError={() => setIsVideoLoading(false)}
            > 
              Sorry, your browser does not support embedded videos.
            </video>
          </div>
        </div>
      );
    }
    
    if (view.embed) {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <iframe
            title={view.alt}
            src={view.embed}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="section-image"
            style={{ width: '100%', height: '100%', minHeight: '300px', border: 0 }}
          />
        </div>
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