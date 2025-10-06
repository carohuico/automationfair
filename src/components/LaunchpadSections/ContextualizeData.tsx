import React from 'react';
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
  return (
    <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          <img src="/Contextualize.jpg" alt="Contextualize Data" className="section-image" />
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

export default ContextualizeData;