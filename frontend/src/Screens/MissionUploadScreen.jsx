import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./MissionUploadScreen.css";
import MainPanelFrag from './Fragments/MainPanelFrag';

function MissionUploadScreen() {
  const navigate = useNavigate();


  return (
    <div className="container-mission-upload">
        <button  className="go-back-btn" onClick={() => navigate(-1)}> חזור</button>
      <div className='mission-panel-container'>
        {/* <div className='create-mission-btn'>
            <button>Create Mission</button>
        </div> */}
        <div className='main-erea-fragment'>
          <MainPanelFrag></MainPanelFrag>
        </div>

        <div className='mission-cards-list-fragment'>
          
          
          </div>
        <div className='send-mission-btn'>
          <button>Send Mission</button>
          </div>
      </div>
    </div>
  );
}

export default MissionUploadScreen;