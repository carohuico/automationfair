import React from 'react';
import './InitialFooter.css';

const InitialFooter: React.FC = () => {
    
    return (
        <div className="initial open">
            <div className="initial-footer">
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
    );
};
export default InitialFooter;
