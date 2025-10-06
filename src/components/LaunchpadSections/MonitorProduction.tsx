import React from 'react';
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
  return (
    <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          <img src="/monitor.png" alt="Monitor Production" className="section-image" />
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

export default MonitorProduction;