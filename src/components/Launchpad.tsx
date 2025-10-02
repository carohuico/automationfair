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
        return <Overview handleSectionChange={handleSectionChange} currentSection={activeSection} />;
      case 'enable-data':
        return <EnableData handleSectionChange={handleSectionChange} currentSection={activeSection} />;
      case 'contextualize-data':
        return <ContextualizeData handleSectionChange={handleSectionChange} currentSection={activeSection} />;
      case 'monitor-production':
        return <MonitorProduction handleSectionChange={handleSectionChange} currentSection={activeSection} />;
      case 'optimize-production':
        return <OptimizeProduction handleSectionChange={handleSectionChange} currentSection={activeSection} />;
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
        {/* <button 
          className={`hamburger-menu ${sidebarOpen ? 'open' : 'closed'}`}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        > */}
          {/* {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
          )}
        </button> */}

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
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'enable-data' ? 'active' : ''} flex items-center`}
              onClick={() => handleSectionChange('enable-data')}
            >
              <span
                className={`text-4xl font-bold mr-4 select-none ${
                  activeSection === 'enable-data' ? 'text-white' : 'text-gray-400'
                }`}
              >
                1
              </span>
              ENABLE DATA
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'contextualize-data' ? 'active' : ''} flex items-center`}
              onClick={() => handleSectionChange('contextualize-data')}
            >
              <span
                className={`text-4xl font-bold mr-4 select-none ${
                  activeSection === 'contextualize-data' ? 'text-white' : 'text-gray-400'
                }`}
              >
                2
              </span>
              CONTEXTUALIZE DATA
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'monitor-production' ? 'active' : ''} flex items-center`}
              onClick={() => handleSectionChange('monitor-production')}
            >
              <span
                className={`text-4xl font-bold mr-4 select-none ${
                  activeSection === 'monitor-production' ? 'text-white' : 'text-gray-400'
                }`}
              >
                3
              </span>
              MONITOR PRODUCTION
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'optimize-production' ? 'active' : ''} flex items-center`}
              onClick={() => handleSectionChange('optimize-production')}
            >
              <span
                className={`text-4xl font-bold mr-4 select-none ${
                  activeSection === 'optimize-production' ? 'text-white' : 'text-gray-400'
                }`}
              >
                4
              </span>
              OPTIMIZE PRODUCTION
            </button>
            <button 
              className="sidebar-item"
              onClick={() => window.location.href = '/'}
            >
              CLOSE
            </button>
          </nav>
            <div className="sidebar-footer">
              <img
                src="/logo-lifecycle.png"
                alt="Lifecycle Services"
                className="sidebar-footer-logo lifecycle"
                onError={(e) => {
                  console.log('Error loading logo-lifecycle.png');
                  e.currentTarget.style.display = 'none';
                }}
              />
              <img
                src="/logo-create.webp"
                alt="Create what's next"
                className="sidebar-footer-logo create"
                onError={(e) => {
                  console.log('Error loading logo-create.webp');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
        </div>

        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Launchpad;