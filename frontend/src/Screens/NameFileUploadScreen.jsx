import React ,{ useState} from 'react'
import FileBrowser from '../Assets/Components/FileBrowser'
import DragAndDrop from '../Assets/Components/DragAndDrop'
import "./NameFileUploadScreen.css"
function NameFileUploadScreen() {

  return (
    <div className='container'>
     
      <div className='container-component-drag-and-drop'>
      <DragAndDrop></DragAndDrop>
      </div>
      <div className='container-component-upload-btn '>
        <div className='component-upload-btn'>
          <button>
            העלאה
          </button>
        </div>
      </div>
    </div>
  )
}

export default NameFileUploadScreen
