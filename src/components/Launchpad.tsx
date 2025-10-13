import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Launchpad.css';

import Overview from './LaunchpadSections/Overview';
import EnableData from './LaunchpadSections/EnableData';
import ContextualizeData from './LaunchpadSections/ContextualizeData';
import MonitorProduction from './LaunchpadSections/MonitorProduction';
import OptimizeProduction from './LaunchpadSections/OptimizeProduction';


const Launchpad: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['overview']);


  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    setNavigationHistory(prev => {
      const existingIndex = prev.indexOf(section);
      if (existingIndex >= 0) {
        return prev.slice(0, existingIndex + 1);
      }
      return [...prev, section];
    });
    
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const renderActiveSection = () => {
    const commonProps = {
      handleSectionChange,
      currentSection: activeSection,
      navigationHistory,
      onBackClick: handleNavigateBack
    };

    switch (activeSection) {
      case 'overview':
        return <Overview {...commonProps} />;
      case 'enable-data':
        return <EnableData {...commonProps} />;
      case 'contextualize-data':
        return <ContextualizeData {...commonProps} />;
      case 'monitor-production':
        return <MonitorProduction {...commonProps} />;
      case 'optimize-production':
        return <OptimizeProduction {...commonProps} />;
      default:
        return <Overview {...commonProps} />;
    }
  };

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    if (navigationHistory.length > 1) {
      const currentIndex = navigationHistory.indexOf(activeSection);
      if (currentIndex > 0) {
        const previousSection = navigationHistory[currentIndex - 1];
        setNavigationHistory(prev => prev.slice(0, currentIndex));
        setActiveSection(previousSection);
        return;
      }
    }
    
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
              className={`sidebar-item ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => handleSectionChange('overview')}
            >
              <span className="sidebar-number invisible">0</span>
              OVERVIEW
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'enable-data' ? 'active' : ''}`}
              onClick={() => handleSectionChange('enable-data')}
            >
              <span
                className={`sidebar-number ${
                  activeSection === 'enable-data' ? 'text-white' : 'text-gray-400'
                }`}
              >
                1
              </span>
              ENABLE DATA
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'contextualize-data' ? 'active' : ''}`}
              onClick={() => handleSectionChange('contextualize-data')}
            >
              <span
                className={`sidebar-number ${
                  activeSection === 'contextualize-data' ? 'text-white' : 'text-gray-400'
                }`}
              >
                2
              </span>
              CONTEXTUALIZE DATA
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'monitor-production' ? 'active' : ''}`}
              onClick={() => handleSectionChange('monitor-production')}
            >
              <span
                className={`sidebar-number ${
                  activeSection === 'monitor-production' ? 'text-white' : 'text-gray-400'
                }`}
              >
                3
              </span>
              MONITOR PRODUCTION
            </button>
            <button 
              className={`sidebar-item ${activeSection === 'optimize-production' ? 'active' : ''}`}
              onClick={() => handleSectionChange('optimize-production')}
            >
              <span
                className={`sidebar-number ${
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
              <span className="sidebar-number invisible">0</span>
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
                onClick={() => window.location.href = '/'}
              />
              <img
                src="/logo-create.png"
                alt="Create what's next"
                className="sidebar-footer-logo create"
                onError={(e) => {
                  console.log('Error loading logo-create.png');
                  e.currentTarget.style.display = 'none';
                }}
                onClick={() => window.location.href = '/'}
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