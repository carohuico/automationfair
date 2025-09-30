import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

interface FooterProps {
  onBackClick?: () => void;
  showBackButton?: boolean;
  handleSectionChange?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({
  onBackClick,
  showBackButton = true,
  handleSectionChange = () => {},
}) => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="timeline-bottom-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

      <div className="center-section" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <button
          className="center-btn"
          aria-label="Ref Arch"
          type="button"
          style={{
            borderRadius: '12px',
            minWidth: '220px',
            minHeight: '64px',
            background: 'linear-gradient(90deg, #fff 0%, #e3e3e3 100%)',
            border: '2px solid #bfe6fa',
            boxShadow: '0 2px 8px 0 rgba(33,155,211,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#8c8c8c',
            letterSpacing: '0.1em',
            transition: 'box-shadow 0.2s',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSectionChange('map');
          }}
        >
          REF ARCH
        </button>
        <button
          className="center-btn"
          aria-label="Solution Consulting"
          type="button"
          style={{
            borderRadius: '12px',
            minWidth: '220px',
            minHeight: '64px',
            background: 'linear-gradient(90deg, #fff 0%, #e3e3e3 100%)',
            border: '2px solid #bfe6fa',
            boxShadow: '0 2px 8px 0 rgba(33,155,211,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.5rem',
            color: '#8c8c8c',
            letterSpacing: '0.1em',
            transition: 'box-shadow 0.2s',
            paddingLeft: '30px',
            paddingRight: '30px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleSectionChange('slides');
          }}
        >
          SOLUTION CONSULTING
        </button>
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