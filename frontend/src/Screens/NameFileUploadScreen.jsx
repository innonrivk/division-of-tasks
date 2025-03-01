import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DragAndDrop from '../Assets/Components/excelFileUploadComp/DragAndDrop';
import FileUploader from '../Assets/Components/excelFileUploadComp/FileUploader';
import "./NameFileUploadScreen.css";

function NameFileUploadScreen(props) {
  const [reset, setReset] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const resetHandler = () => {
    setReset(prev => !prev);
    setFile(null);
  };

  return (
    <div className='container'>
      <div> 
          {props.isUpdateFile ? <p>העלאת קובץ אקסל מעודכן</p> : <p>העלאת קובץ שמות</p>}
      </div>
      <button className="go-back-button" onClick={() => navigate(-1)}>
        חזור
      </button>
      <div className='container-component-drag-and-drop'>
        <DragAndDrop setFile={setFile} reset={reset}></DragAndDrop>
      </div>
      <div className="container-component-upload-btn">
        <FileUploader reset={resetHandler} isUpdateFile={props.isUpdateFile} file={file}></FileUploader>
      </div>
    </div>
  );
}

export default NameFileUploadScreen;