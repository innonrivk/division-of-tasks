import React, { useCallback, useEffect, useState } from 'react'
import './MissionForm.css';
import MissionSplit from './MissionSplit';


function MissionForm(props) {
    const [missionTitle, setMissionTitle] = useState('');
    const [missionScore, setMissionScore] = useState('');
    const [missionTotalManPower, seMissionTotalManPower] = useState('');
    const [missionStartDate, setMissionStartDate] = useState('');
    const [missionEndDate, setMissionEndDate] = useState('');
    const [missionIsFixed, setMissionIsFixed] = useState(false);
    const [missionSplit, setMissionSplit] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isAllValid, setIsAllValid] = useState(false);


    function validateScore(e) {
        if (e.target.value <= 5 && e.target.value >= 1) {
            setMissionScore(e.target.value);
        }
        else {
            e.target.placeholder = '1-5';
            setMissionScore('');
        }

    }

    async function upadteMissionSplit(cbFunc) {
        const result = await cbFunc();
        setMissionSplit(prev => result);
    }
    useEffect(() => {
        checkAllValid();
    }, [missionSplit]);

    
    function checkAllValid() {
        if (missionTitle !== '' && missionScore !== '' && missionTotalManPower !== '' && missionStartDate !== '' && missionEndDate !== '' && missionSplit.length !== 0) {
            setIsAllValid(true);
        }
        else {
            setIsAllValid(false);
        }
    }

    // if all valid send json to parent
    useEffect(() => {
        if (!isAllValid) return;
        const json = {
            name: missionTitle,
            start_date: missionStartDate,
            end_date: missionEndDate,
            score: missionScore,
            total_manpower: missionTotalManPower,
            percentage: missionSplit,
            is_permanent: missionIsFixed ? 1 : 0
        };
       
        props.sendJson(json)


        setMissionTitle("")
        setMissionScore("")
        seMissionTotalManPower("")
        setMissionStartDate("")
        setMissionEndDate("")
        setMissionIsFixed(false)
        setMissionSplit([])
        setIsSubmit(false)
        setIsAllValid(false)

    }, [isAllValid])



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
                <p>: ניקודה המשימה</p>

            </div>
            <div className='mission-total-manpower-input'>
                <input
                    type='number'
                    value={missionTotalManPower}
                    onChange={(e) => seMissionTotalManPower(e.target.value)}
                    placeholder="number of soldiers" />
                <p>: כמות חיילים נדרשת</p>

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
            <div className='mission-is-fixed-input  '>
                <input type='checkbox'
                    value={missionIsFixed}
                    checked={missionIsFixed}
                    onChange={(e) => {setMissionIsFixed(e.target.checked)}}

                />
                <p>: ?משימה  קבועה</p>

            </div>
            <div className='mission-split-fragments'>
                <MissionSplit isSubmit={isSubmit} setMissionSplit={upadteMissionSplit}></MissionSplit>
            </div>

            <div className='mission-form-submit-btn'>
                <button onClick={() => { setIsSubmit(prev => !prev) }}>שמור</button>

            </div>

        </div>
    )
}

export default MissionForm
