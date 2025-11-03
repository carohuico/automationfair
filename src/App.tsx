import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TimelinePage from './pages/TimelinePage';
import LaunchpadPage from './pages/LaunchpadPage';
import Splash from './pages/Splash';
import './App.css';


function App() {
  return (
    
    <Router basename="/"> 
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/launchpad" element={<LaunchpadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
