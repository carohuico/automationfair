import React from 'react';
import './SectionStyles.css';
import Footer from '../Footer/Footer';

interface ContextualizeDataProps {
  handleSectionChange?: (section: string) => void;
  currentSection?: string;
}

const ContextualizeData: React.FC<ContextualizeDataProps> = ({ 
  handleSectionChange = () => {},
  currentSection = 'contextualize-data'
}) => {
  return (
    <div className="section-container">
      <div className="img-container">
        <img src="/Contextualize.jpg" alt="Contextualize Data" className="section-image" />
      </div>
      <Footer showBackButton={true} handleSectionChange={handleSectionChange} currentSection={currentSection} />
    </div>
  );
};

export default ContextualizeData;