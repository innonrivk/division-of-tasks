import React, { useEffect, useState } from 'react';
import MissionCard from '../../Assets/Components/missionsUploadComp/missionCardPanel/MissionCard';
import "./MissionCardFragment.css";

function MissionCardFragment(props) {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    console.log("MissionCardFragment", props.missionsJson);
    if (Array.isArray(props.missionsJson)) {
      setMissions(props.missionsJson);
    }
  }, [props.missionsJson]);

  return (
    <div className='mission-cards-panel-frag'>
      {missions.map((mission, index) => (
        <MissionCard key={mission.id} index={index} mission={mission} onDelete={() => { props.handleDelete(index) }} />
      ))}
    </div>
  );
}

export default MissionCardFragment;