import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Launchpad.css';

import Overview from './LaunchpadSections/Overview';
import EnableData from './LaunchpadSections/EnableData';
import ContextualizeData from './LaunchpadSections/ContextualizeData';
import MonitorProduction from './LaunchpadSections/MonitorProduction';
import OptimizeProduction from './LaunchpadSections/OptimizeProduction';
import Slides from './LaunchpadSections/Slides';
import Map from './LaunchpadSections/Map';
import Footer from './Footer/Footer';

const Launchpad: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('overview');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'enable-data':
        return <EnableData />;
      case 'contextualize-data':
        return <ContextualizeData />;
      case 'monitor-production':
        return <MonitorProduction />;
      case 'optimize-production':
        return <OptimizeProduction />;
      case 'slides':
        return <Slides />;
      case 'map':
        return <Map />;
      default:
        return <Overview />;
    }
  };

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate('/timeline');
  };

  return (
    <div className="launchpad-root">
      <div className="launchpad-container">
        <button 
          className={`hamburger-menu ${sidebarOpen ? 'open' : 'closed'}`}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </button>

        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
              <img src="/accelerate-logo.png" alt="Logo" className="sidebar-logo" />
          </div>
          <nav className="sidebar-nav">
            <button 
              className={`sidebar-item ${activeSection === 'overview' ? 'active' : ''} flex items-center justify-between w-full`}
              onClick={() => handleSectionChange('overview')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
            >
              <span style={{ flex: 1 }}>OVERVIEW</span>
              <div className="flex gap-2 ml-2" style={{ display: 'flex', marginRight: '10%', gap: '8px' }}>
              <button
                className="flex items-center justify-center rounded-full bg-[#219BD3] border-2 border-yellow-400 w-12 h-12 relative"
                aria-label="Icon 1"
                style={{ position: 'relative' }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSectionChange('map');
                }}
              >
                <span className="text-white text-xl font-bold">T</span>
                <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '20px',
                  height: '20px',
                  background: '#195C7A',
                  borderRadius: '50%',
                  border: '2px solid #FACC15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
                >
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 8L8 2M8 2V7M8 2H3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                </span>
              </button>
                <button
                className="flex items-center justify-center rounded-full bg-[#219BD3] border-2 border-yellow-400 w-12 h-12 relative"
                aria-label="Icon 2"
                style={{ position: 'relative' }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSectionChange('slides');
                }}
                >
                <span className="text-white text-lg">
                  <img src="/icono.png" alt="icon" style={{ width: '30px', height: '30px' }} />
                </span>
                <span
                  style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '20px',
                  height: '20px',
                  background: '#195C7A',
                  borderRadius: '50%',
                  border: '2px solid #FACC15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10">
                  <path d="M2 8L8 2M8 2V7M8 2H3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                </button>
              </div>
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'enable-data' ? 'active' : ''} flex items-center`}
              onClick={() => handleSectionChange('enable-data')}
            >
              <span className="text-3xl font-bold text-gray-400 mr-4 select-none">1</span>
              ENABLE DATA
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'contextualize-data' ? 'active' : ''} flex items-center`}
              onClick={() => handleSectionChange('contextualize-data')}
            >
              <span className="text-3xl font-bold text-gray-400 mr-4 select-none">2</span>
              CONTEXTUALIZE DATA
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'monitor-production' ? 'active' : ''} flex items-center`}
              onClick={() => handleSectionChange('monitor-production')}
            >
              <span className="text-3xl font-bold text-gray-400 mr-4 select-none">3</span>
              MONITOR PRODUCTION
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'optimize-production' ? 'active' : ''} flex items-center`}
              onClick={() => handleSectionChange('optimize-production')}
            >
              <span className="text-3xl font-bold text-gray-400 mr-4 select-none">4</span>
              OPTIMIZE PRODUCTION
            </button>
            <button 
              className="sidebar-item"
              onClick={() => window.location.href = '/'}
            >
              CLOSE
            </button>
          </nav>
        </div>

        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          {renderActiveSection()}
        </div>
      </div>
      <Footer onBackClick={handleNavigateBack} showBackButton={true} />
    </div>
  );
};

export default Launchpad;