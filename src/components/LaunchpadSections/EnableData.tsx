import React, { useState } from 'react';
import './SectionStyles.css';
import Footer from '../Footer/Footer';

interface EnableDataProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
  onBackClick?: () => void;
}

const EnableData: React.FC<EnableDataProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'enable-data',
  navigationHistory = [],
  onBackClick = () => {}
}) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  return (
    <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          {isVideoLoading && (  
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 rounded-lg z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 text-lg font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>Loading...</p>
            </div>
          )}

          <video
            src={`${process.env.PUBLIC_URL}/videoEnable.mp4`}
            autoPlay
            muted
            controls
            className={`section-image transition-opacity duration-300 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{ width: '100%', height: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
            onLoadStart={() => setIsVideoLoading(true)}
            onLoadedData={() => setIsVideoLoading(false)}
            onCanPlay={() => setIsVideoLoading(false)}
            onError={() => setIsVideoLoading(false)}
          >
            Sorry, your browser does not support embedded videos.
          </video>
        </div>
      </div>
      <Footer 
        showBackButton={true} 
        handleSectionChange={handleSectionChange} 
        currentSection={currentSection} 
        navigationHistory={navigationHistory}
        onBackClick={onBackClick}
      />
    </div>
  );
};

export default EnableData;