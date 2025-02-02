import React, { useEffect, useRef, useState } from 'react'
import './MissionSplit.css';
import MissionSplitInput from './MissionSplitInput';
import { use } from 'react';

function MissionSplit(props) {
    const splitPrecentage = useRef([]);
    const [addSplit, setAddSplit] = useState([]);

    useEffect(() => {
        console.log('Split:', addSplit);
    }, [addSplit])

    function deleteSplit(index) {
        console.log('delete, index:', index);
        setAddSplit(addSplit.filter((split, i) => i !== index))
    }

    function addNewSplit() {
        setAddSplit(prev => [...prev, { id: `${Date.now()}`, name: 0 }])
    }

    function updateSplit(index, name, value, id) {
        setAddSplit(prev => {
            prev[index] = { id: id, [name]: value };
            return [...prev]
        })
    }

    useEffect(() => {
        console.log('isSubmit:', props.isSubmit);
        if (props.isSubmit) {

            props.setMissionSplit( () =>  {
                var newSplitArray = [];
                for (var i = 0; i < addSplit.length; i++) {
                    var key = Object.keys(addSplit[i])[0]
                    var value = Object.values(addSplit[i])[0]
                    newSplitArray = [...newSplitArray, { [key]: value }]
                }
                return newSplitArray;
        })
        }
        else{
            setAddSplit([]);
        }

    }, [props.isSubmit])


    return (
        <div className='mission-split-container'>
            <div className='mission-split-title'>
                <button onClick={addNewSplit} >+</button>
                <p> :הוספת התפלגות</p>
            </div>
            <div className='mission-split-input-erea'>
                {Object.values(addSplit).map((split, index) => {

                    return <MissionSplitInput key={split.id} index={index} deleteSplit={() => deleteSplit(index)} setValue={(name, value) => updateSplit(index, name, value, split.id)} />
                })}
            </div>
        </div>
    )
}

export default MissionSplit
