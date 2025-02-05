import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./MissionUploadScreen.css";
import MainPanelFrag from './Fragments/MainPanelFrag';
import MissionCardFragment from './Fragments/MissionCardFragment';
import SendMissionToDB from '../Assets/Components/missionsUploadComp/SendMissionToDB';

function MissionUploadScreen() {
  const navigate = useNavigate();
  const [missionJson, setMissionJson] = useState([]);
  const [refresh, setRefresh] = useState(false)

  function updateMissionJson(data) {
    setMissionJson(prev => prev.concat(data));
    setRefresh(prev => !prev)
    console.log("pload page", missionJson)

  }
  function handleDelete(index) {
    console.log("delete", index)
    const newMissions = missionJson.filter((mission, i) => i !== index);
    setMissionJson(prev => newMissions);
    setRefresh(prev => !prev)
  }


  return (
    <div className="container-mission-upload">
      <button className="go-back-btn" onClick={() => navigate(-1)}> חזור</button>
      <div className='mission-panel-container'>
        {/* <div className='create-mission-btn'>
            <button>Create Mission</button>
        </div> */}
        <div className='main-erea-fragment'>
          <MainPanelFrag setMissionJson={updateMissionJson}></MainPanelFrag>
        </div>

        <div className='mission-cards-list-fragment'>
          <MissionCardFragment missionsJson={missionJson} handleDelete={handleDelete}></MissionCardFragment>

        </div>
        <div className='send-mission-btn-container'>
          <SendMissionToDB missionsJson={missionJson}></SendMissionToDB>
        </div>
      </div>
    </div>
  );
}

export default MissionUploadScreen;