import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InitialFooter.css';

const InitialFooter: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="initial-footer">
            <div className="logo-container">
                <img
                    src="/logo-lifecycle.png"
                    alt="Lifecycle Logo"
                      className="footer-logo"
                    onClick={() => navigate('/splash')}
                />
                <img
                    src="/logo-create.png"
                    alt="Create Logo"
                    className="footer-logo"
                    onClick={() => navigate('/splash')}
                />
            </div>
        </div>
    );
};
export default InitialFooter;
