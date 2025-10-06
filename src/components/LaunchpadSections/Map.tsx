import React from 'react';
import './SectionStyles.css';

const Map: React.FC = () => {
  return (
    <div className="section-container">
      <div className="img-container">
        <div className="standard-content-container">
          <img src="/map.png" alt="Map" className="section-image" />
        </div>
      </div>
    </div>
  );
};

export default Map;