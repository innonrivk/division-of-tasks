import React from 'react';
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="button-container">
        <button className="navigate-button" onClick={() => { navigate('/files') }}>
          העלאת קובץ שמות
        </button>
        <button className="navigate-button" onClick={() => { navigate('/mission') }}>
          העלאת משימות
        </button>
      </div>
    </div>
  );
}

export default HomePage;
