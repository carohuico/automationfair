import React from 'react';
import './SectionStyles.css';

const MonitorProduction: React.FC = () => {
  return (
    <div className="section-container">
      <div className="img-container">
        <img src="/monitor.png" alt="Monitor Production" className="section-image" />
      </div>
    </div>
  );
};

export default MonitorProduction;