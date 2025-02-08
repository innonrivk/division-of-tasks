import React from 'react';
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function HomePage() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/api/excel";


 async function  getFiles() {
  await axios.get(API_URL).then((res) => {
    console.log("res", res);
  });

 }



  return (
    <div className="homepage-container">
      <div className="button-container">
        <button className="navigate-button" onClick={() => { navigate('/files') }}>
          העלאת קובץ שמות
        </button>
        <button className="navigate-button" onClick={() => { navigate('/mission') }}>
          העלאת משימות
        </button>
        <button className="navigate-button" onClick={getFiles}>
          העלאת
        </button>
      </div>
    </div>
  );
}

export default HomePage;
