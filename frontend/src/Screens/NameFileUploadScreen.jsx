import React, { useState } from 'react'
import DragAndDrop from '../Assets/Components/DragAndDrop'
import FileUploader from '../Assets/Components/FileUploader'
import "./NameFileUploadScreen.css"
function NameFileUploadScreen() {
  const [reset, setReset] = useState(false)
  const [file, setFile] = useState()

  const resetHandler = () => {
    setReset(prev => !prev)
    setFile(null)
  }

  return (
    <div className='container'>

      <div className='container-component-drag-and-drop'>
        <DragAndDrop setFile={setFile} reset={reset}></DragAndDrop>
      </div>
      <div className="container-component-upload-btn">
        <FileUploader reset={resetHandler} file={file}></FileUploader>
      </div>
    </div>
  )
}

export default NameFileUploadScreen
