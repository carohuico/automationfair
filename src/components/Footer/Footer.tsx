import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

interface FooterProps {
  onBackClick?: () => void;
}

interface FooterProps {
  onBackClick?: () => void;
  showBackButton?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onBackClick, showBackButton = true }) => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="timeline-bottom-section">
      <div className="left-section">
        <div className="logo-left">
          <img src="/logo-lifecycle.png" alt="Create Logo" className="create-logo" onClick={() => navigate('/')} />
        </div>
        {showBackButton && (
          <button onClick={(e) => { e.stopPropagation(); handleNavigateBack(); }} className="back-button">
            <svg className="back-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            BACK
          </button>
        )}
      </div>
      <div className="right-section">
        <div className="logo-right">
          <img src="/logo-create.webp" alt="Lifecycle Logo" className="lifecycle-logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;