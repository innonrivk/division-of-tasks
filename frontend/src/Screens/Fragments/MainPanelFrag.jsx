import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MissionForm from '../../Assets/Components/missionsUploadComp/missionMainPanel/MissionForm';
import "./MainPanelFrag.css";

function MainPanelFrag(props) {
  const [isNewMission, setIsNewMission] = useState(false);


  function updateMissionJson(data) {
    props.setMissionJson(data);
    console.log("MainPanelFrag", data )
    setIsNewMission(false);

  }
  



  return (
    <div className='main-panel-frag'>
      {isNewMission ? <MissionForm closeForm={()=>{  setIsNewMission(false)}} sendJson={updateMissionJson}></MissionForm> : <> <button className='create-mission-btn' onClick={() => { setIsNewMission(prev => !prev) }}>Create Mission</button></>}
    </div>
  );
}

export default MainPanelFrag;