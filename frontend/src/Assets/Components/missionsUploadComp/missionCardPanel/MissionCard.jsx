import React, { useEffect, useRef } from 'react';
import './MissionCard.css';

function MissionCard(props) {
 
  

  return (
    <div className='mission-card-container'>
      <div className='mission-card-header'>
        <h3 >{props.mission.name}</h3>
      </div>
      <div className='mission-card-delete-btn'>
        <button onClick={props.onDelete}>X</button>
      </div>
      <div className='mission-card-dates'>
        <p>{props.mission.start_date}</p>
        <span>←</span>
        <p>{props.mission.end_date}</p>
      </div>
      <div className='mission-card-manpower'>
        <p> הקצאות: {props.mission.total_manpower} </p>
      </div>
      <div className={props.mission.is_permanent === '1' ? 'mission-card-fixed-green' : 'mission-card-fixed-grey'}>
        {props.mission.is_permanent === '1' ? 'קבועה' : 'זמנית'}
      </div>
    </div>
  );
}

export default MissionCard;