import React, { useEffect, useState } from 'react'
import './MissionForm.css';


function MissionForm() {
    const [missionTitle, setMissionTitle] = useState('');
    const [missionScore, setMissionScore] = useState('');
    const [missionStartDate, setMissionStartDate] = useState('');
    const [missionEndDate, setMissionEndDate] = useState('');

    function validateScore(e) {
        if (e.target.value <= 5 && e.target.value >= 1) {
           setMissionScore(e.target.value);
        }
        else {
            e.target.placeholder = '1-5';
            setMissionScore('');
        }
        
    }

    
    useEffect(() => {
        console.log('Title:', missionTitle);
        console.log('Score:', missionScore);
    }, [missionTitle, missionScore])

    return (
        <div className='mission-form-container'>
            <div className='mission-form-title-input'>
                <input 
                    type='text' 
                    placeholder='Mission Title' 
                    value={missionTitle}
                    onChange={(e) => setMissionTitle(e.target.value)}
                />
            </div>
            <div className='mission-form-score-input'> 
                <input 
                    type='number' 
                    onChange={validateScore}    
                    max={5} 
                    placeholder='Score' 
                    value={missionScore}
                />
            </div>
            <div className='mission-form-dates-input'>
                <div className='mission-form-starting-date-input'> 
                    <p>Start Date:</p>
                    <input 
                        type='date' 
                        value={missionStartDate} 
                        onChange={(e) => setMissionStartDate(e.target.value)} 
                        placeholder='yyyy-mm-dd' 
                    />
                </div>
                <div className='mission-form-ending-date-input'> 
                    <p>End Date:</p>
                    <input 
                        type='date' 
                        value={missionEndDate} 
                        onChange={(e) => setMissionEndDate(e.target.value)} 
                    />
                </div>
            </div>
        </div>
    )
}

export default MissionForm
