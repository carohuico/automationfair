import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

interface FooterProps {
  onBackClick?: () => void;
  showBackButton?: boolean;
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
}

const Footer: React.FC<FooterProps> = ({
  onBackClick,
  showBackButton = true,
  handleSectionChange = () => {},
  currentSection = 'overview',
}) => {
  const navigate = useNavigate();

  // Orden del sidebar
  const sectionOrder = [
    'overview',
    'enable-data',
    'contextualize-data',
    'monitor-production',
    'optimize-production'
  ];

  const handleNavigateBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/');
    }
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
    <div className="timeline-bottom-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="left-section">
          <button onClick={(e) => { e.stopPropagation(); handleNavigateBack(); }} className="back-button">
            <svg className="back-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            BACK
          </button>
      </div>

      <div
        className="center-section flex flex-wrap justify-center items-center gap-4 w-full"
      >
        <button
          className="center-btn flex items-center justify-center gap-2 rounded-xl min-w-[110px] sm:min-w-[120px] md:min-w-[100px] lg:min-w-[90px] xl:min-w-[80px] 2xl:min-w-[70px] w-[clamp(70px,20vw,180px)] min-h-10 md:min-h-9 lg:min-h-8 xl:min-h-7 2xl:min-h-6 bg-white border-2 border-[#104A86] shadow-md font-medium text-[clamp(0.9rem,1.5vw,1.1rem)] 2xl:text-[clamp(0.85rem,1vw,1rem)] text-[#003366] transition-shadow px-2 py-1 hover:shadow-lg"
          aria-label="Ref Arch"
          type="button"
          onClick={(e) => {
        e.stopPropagation();
        handleSectionChange('map');
          }}
        >
          ARCHITECTURE
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#6FCF97" strokeWidth="2" strokeDasharray="4 2"/>
          </svg>
        </button>
        <button
          className="center-btn flex items-center justify-center gap-2 rounded-xl min-w-[110px] sm:min-w-[120px] md:min-w-[100px] lg:min-w-[90px] xl:min-w-[80px] 2xl:min-w-[70px] w-[clamp(70px,20vw,180px)] min-h-10 md:min-h-9 lg:min-h-8 xl:min-h-7 2xl:min-h-6 bg-white border-2 border-[#104A86] shadow-md font-medium text-[clamp(0.9rem,1.5vw,1.1rem)] 2xl:text-[clamp(0.85rem,1vw,1rem)] text-[#003366] transition-shadow px-2 py-1 hover:shadow-lg"
          aria-label="Solution Consulting"
          type="button"
          onClick={(e) => {
        e.stopPropagation();
        handleSectionChange('slides');
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
        <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="next-button">
            NEXT
            <svg className="next-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z"/>
            </svg>
          </button>
      </div>
    </div>
  );
};

export default Footer;