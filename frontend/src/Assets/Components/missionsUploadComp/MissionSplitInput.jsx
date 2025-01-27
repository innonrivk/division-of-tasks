import React ,{ useEffect, useRef, useState} from 'react'
import './MissionSplitInput.css';


function MissionSplitInput(props) {
    const [splitName, setSplitName] = useState("");
    const [splitPrecentage, setSplitPrecentage] = useState("");


    useEffect(() => {  
        props.setValue(splitName, splitPrecentage);
    }, [splitName, splitPrecentage])



  return (
    <div className='mission-split-input-container'>
        <input type='number' placeholder=' אחוז התפלגות' value={splitPrecentage} onChange={(e)=>{setSplitPrecentage(e.target.value)}}>
        </input>
        <p>:</p>
        <input type='text' placeholder=' שם המחלקה' value={splitName} onChange={(e) => {setSplitName(e.target.value)}} >
        </input>

        <button  onClick={props.deleteSplit}>X</button>
    </div>
)
}

export default MissionSplitInput
