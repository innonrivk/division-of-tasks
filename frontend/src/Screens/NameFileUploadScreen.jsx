import React, { useState } from 'react'
import FileBrowser from '../Assets/Components/FileBrowser'
import DragAndDrop from '../Assets/Components/DragAndDrop'
import "./NameFileUploadScreen.css"
function NameFileUploadScreen() {
  const [reset, setReset] = useState(false)
  const uploadHandler = () => {
    setReset(prev => !prev)
  }

  return (
    <div className='container'>

      <div className='container-component-drag-and-drop'>
        <DragAndDrop reset={reset}></DragAndDrop>
      </div>
      <div className='container-component-upload-btn '>
        <div className='component-upload-btn'>
          <button onClick={uploadHandler}>
            העלאה
          </button>
        </div>
      </div>
    </div>
  )
}

export default NameFileUploadScreen
