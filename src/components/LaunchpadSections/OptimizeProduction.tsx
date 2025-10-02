import React from 'react';
import './SectionStyles.css';
import Footer from '../Footer/Footer';

interface OptimizeProductionProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
}

const OptimizeProduction: React.FC<OptimizeProductionProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'optimize-production'
}) => {
  return (
    <div className="section-container">
      <div className="img-container">
        <img src="/optimize.png" alt="Optimize Production" className="section-image" />
      </div>
      <Footer showBackButton={true} handleSectionChange={handleSectionChange} currentSection={currentSection} />
    </div>
  );
};

export default OptimizeProduction;