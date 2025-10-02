import React from 'react';
import Footer from '../Footer/Footer';
import './SectionStyles.css';

interface MonitorProductionProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
}

const MonitorProduction: React.FC<MonitorProductionProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'monitor-production'
}) => {
  return (
    <div className="section-container">
      <div className="img-container">
        <img src="/monitor.png" alt="Monitor Production" className="section-image" />
      </div>
      <Footer showBackButton={true} handleSectionChange={handleSectionChange} currentSection={currentSection} />
    </div>
  );
};

export default MonitorProduction;