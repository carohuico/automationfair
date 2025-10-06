import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Footer.css';

interface FooterProps {
  onBackClick?: () => void;
  showBackButton?: boolean;
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
  navigationHistory?: string[];
}

const Footer: React.FC<FooterProps> = ({
  onBackClick,
  showBackButton = true,
  handleSectionChange = () => {},
  currentSection = 'overview',
  navigationHistory = [],
}) => {
  const navigate = useNavigate();
  const [showArchitecturePopup, setShowArchitecturePopup] = useState(false);
  const [showApproachPopup, setShowApproachPopup] = useState(false);

  const sectionOrder = [
    'overview',
    'enable-data',
    'contextualize-data',
    'monitor-production',
    'optimize-production'
  ];

  const handleNavigateBack = () => {
    // Usar onBackClick si está disponible (lógica del componente padre)
    if (onBackClick) {
      onBackClick();
      return;
    }

    // Lógica de fallback
    if (navigationHistory.length > 1) {
      const currentIndex = navigationHistory.indexOf(currentSection);      
      if (currentIndex > 0) {
        const previousSection = navigationHistory[currentIndex - 1];
        handleSectionChange(previousSection);
        return;
      }
    }
    
    navigate('/');
  };



  const handleNext = () => {
    const currentIndex = sectionOrder.indexOf(currentSection);
    if (currentIndex >= 0 && currentIndex < sectionOrder.length - 1) {
      const nextSection = sectionOrder[currentIndex + 1];
      handleSectionChange(nextSection);
    } else if (currentIndex === sectionOrder.length - 1) {
      navigate('/timeline');
    }
  };

  return (
    <>
    <div className="timeline-bottom-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="left-section">
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (currentSection !== 'overview') {
                handleNavigateBack(); 
              }
            }} 
            className={`center-btn flex items-center justify-center gap-2 rounded-xl min-w-[110px] sm:min-w-[120px] md:min-w-[100px] lg:min-w-[90px] xl:min-w-[80px] 2xl:min-w-[70px] w-[clamp(70px,20vw,180px)] min-h-10 md:min-h-9 lg:min-h-8 xl:min-h-7 2xl:min-h-6 border-2 shadow-md font-medium text-[clamp(0.9rem,1.5vw,1.1rem)] 2xl:text-[clamp(0.85rem,1vw,1rem)] transition-shadow px-2 py-1 ${
              currentSection === 'overview' 
                ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' 
                : 'bg-white border-[#104A86] text-[#003366] hover:shadow-lg cursor-pointer'
            }`}
            disabled={currentSection === 'overview'}
          >
            <svg 
              className="back-arrow" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              style={{ fill: currentSection === 'overview' ? '#6b7280' : '#003366' }}
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            BACK
          </button>
      </div>

      <div
        className="center-section flex flex-wrap justify-center items-center gap-4 w-full"
      >
        <button
          className={`center-btn flex items-center justify-center gap-2 rounded-xl min-w-[110px] sm:min-w-[120px] md:min-w-[100px] lg:min-w-[90px] xl:min-w-[80px] 2xl:min-w-[70px] w-[clamp(70px,20vw,180px)] min-h-10 md:min-h-9 lg:min-h-8 xl:min-h-7 2xl:min-h-6 border-2 shadow-md font-medium text-[clamp(0.9rem,1.5vw,1.1rem)] 2xl:text-[clamp(0.85rem,1vw,1rem)] transition-shadow px-2 py-1 hover:shadow-lg ${
            showArchitecturePopup 
              ? 'text-white border-transparent' 
              : 'bg-white border-[#104A86] text-[#003366]'
          }`}
          style={showArchitecturePopup ? { background: 'linear-gradient(90deg, #21a1d3, #84e291)' } : {}}
          aria-label="Ref Arch"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowArchitecturePopup(true);
          }}
        >
          ARCHITECTURE
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#6FCF97" strokeWidth="2" strokeDasharray="4 2"/>
          </svg>
        </button>
        <button
          className={`center-btn flex items-center justify-center gap-2 rounded-xl min-w-[110px] sm:min-w-[120px] md:min-w-[100px] lg:min-w-[90px] xl:min-w-[80px] 2xl:min-w-[70px] w-[clamp(70px,20vw,180px)] min-h-10 md:min-h-9 lg:min-h-8 xl:min-h-7 2xl:min-h-6 border-2 shadow-md font-medium text-[clamp(0.9rem,1.5vw,1.1rem)] 2xl:text-[clamp(0.85rem,1vw,1rem)] transition-shadow px-2 py-1 hover:shadow-lg ${
            showApproachPopup 
              ? 'text-white border-transparent' 
              : 'bg-white border-[#104A86] text-[#003366]'
          }`}
          style={showApproachPopup ? { background: 'linear-gradient(90deg, #21a1d3, #84e291)' } : {}}
          aria-label="Solution Consulting"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowApproachPopup(true);
          }}
        >
          APPROACH
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="12" height="16" rx="2" stroke="#6FCF97" strokeWidth="2"/>
        <circle cx="12" cy="16" r="1" fill="#6FCF97"/>
        <rect x="9" y="7" width="6" height="2" rx="1" fill="#6FCF97"/>
          </svg>
        </button>
      </div>

      <div className="right-section">
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (currentSection !== 'optimize-production') {
              handleNext(); 
            }
          }} 
          className={`center-btn flex items-center justify-center gap-2 rounded-xl min-w-[110px] sm:min-w-[120px] md:min-w-[100px] lg:min-w-[90px] xl:min-w-[80px] 2xl:min-w-[70px] w-[clamp(70px,20vw,180px)] min-h-10 md:min-h-9 lg:min-h-8 xl:min-h-7 2xl:min-h-6 border-2 shadow-md font-medium text-[clamp(0.9rem,1.5vw,1.1rem)] 2xl:text-[clamp(0.85rem,1vw,1rem)] transition-shadow px-2 py-1 ${
            currentSection === 'optimize-production' 
              ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' 
              : 'bg-white border-[#104A86] text-[#003366] hover:shadow-lg cursor-pointer'
          }`}
          disabled={currentSection === 'optimize-production'}
        >
            NEXT
            <svg 
              className="next-arrow" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              style={{ fill: currentSection === 'optimize-production' ? '#6b7280' : '#003366' }}
            >
              <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z"/>
            </svg>
          </button>
      </div>
    </div>

      {/* Architecture Popup - Renderizado en el body usando Portal */}
      {showArchitecturePopup && createPortal(
        <div 
          className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-80 flex items-center justify-center p-2 sm:p-4"
          style={{ zIndex: 999999 }}
          onClick={() => setShowArchitecturePopup(false)}
        >
          <div 
            className="relative bg-white rounded-lg w-full h-full sm:w-[95vw] sm:h-[95vh] md:w-[90vw] md:h-[90vh] lg:w-[85vw] lg:h-[85vh] xl:w-[80vw] xl:h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30">
              <button
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 sm:p-2 transition-colors"
                onClick={() => setShowArchitecturePopup(false)}
                aria-label="Close Architecture popup"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="w-full h-full flex items-center justify-center bg-gray-50 p-2 sm:p-4">
              <img 
                src="/map.png" 
                alt="Architecture Map" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Approach Popup - Renderizado en el body usando Portal */}
      {showApproachPopup && createPortal(
        <div 
          className="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-80 flex items-center justify-center p-2 sm:p-4"
          style={{ zIndex: 999999 }}
          onClick={() => setShowApproachPopup(false)}
        >
          <div 
            className="relative bg-white rounded-lg w-full h-full sm:w-[95vw] sm:h-[95vh] md:w-[90vw] md:h-[90vh] lg:w-[85vw] lg:h-[85vh] xl:w-[80vw] xl:h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30">
              <button
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 sm:p-2 transition-colors"
                onClick={() => setShowApproachPopup(false)}
                aria-label="Close Approach popup"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="w-full h-full flex items-center justify-center bg-gray-50 p-2 sm:p-4 md:p-6">
              <div className="flex items-center justify-center w-full h-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-7xl">
                <style>
                  {`
                    .carousel .control-dots .dot {
                      width: 12px !important;
                      height: 12px !important;
                    }
                    @media (min-width: 640px) {
                      .carousel .control-dots .dot {
                        width: 16px !important;
                        height: 16px !important;
                      }
                    }
                  `}
                </style>
                <div className="w-full flex flex-col items-center justify-center">
                  <Carousel showThumbs={false} infiniteLoop>
                    <div className="flex items-center justify-center">
                      <img src="/slide1.PNG" alt="Slide 1" className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] xl:max-h-[80vh] 2xl:max-h-[85vh] object-contain" />
                    </div>
                    <div className="flex items-center justify-center">
                      <img src="/slide3.PNG" alt="Slide 3" className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[75vh] xl:max-h-[80vh] 2xl:max-h-[85vh] object-contain" />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Footer;