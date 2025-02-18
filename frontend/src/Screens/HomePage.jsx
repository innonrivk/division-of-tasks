import React from 'react';
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileSaver from 'file-saver';

function HomePage() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/api/excel";


 async function  getFiles() {
  await axios.get(API_URL, { responseType: 'arraybuffer' }).then((res) => {
    console.log("res", res);
    return res.data;
  }).then((data) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'sample.xlsx');
  }).catch((err) => {
    console.log("err", err);
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
       
      </div>
    </div>
  );
}

export default HomePage;
