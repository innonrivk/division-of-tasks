import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MissionForm from '../../Assets/Components/missionsUploadComp/MissionForm';
import "./MainPanelFrag.css";

function MainPanelFrag(props) {
    const [isNewMission, setIsNewMission] = useState(false);
    const [missionJson, setMissionJson] = useState([]);
    useEffect(() => {
        console.log('isNewMission:', isNewMission);
        console.log('missionJson:', missionJson);

      }, [isNewMission])
   
   
    function updateMissionJson(data){
      setMissionJson(prev => [...prev,data]);
      setIsNewMission(false);

    }

  return (
    <div className='main-panel-frag'>
         
    {isNewMission ?  <MissionForm sendJson={updateMissionJson}></MissionForm> : <> <button className='create-mission-btn' onClick={()=> {setIsNewMission(prev => !prev)}}>Create Mission</button></>}
    </div>
  );
}

export default MainPanelFrag;