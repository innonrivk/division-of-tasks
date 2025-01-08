import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DragAndDrop from '../Assets/Components/DragAndDrop';
import FileUploader from '../Assets/Components/FileUploader';
import "./NameFileUploadScreen.css";

function NameFileUploadScreen() {
  const [reset, setReset] = useState(false);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const resetHandler = () => {
    setReset(prev => !prev);
    setFile(null);
  };

  return (
    <div className='container'>
      <button className="go-back-button" onClick={() => navigate(-1)}>
        חזור
      </button>
      <div className='container-component-drag-and-drop'>
        <DragAndDrop setFile={setFile} reset={reset}></DragAndDrop>
      </div>
      <div className="container-component-upload-btn">
        <FileUploader reset={resetHandler} file={file}></FileUploader>
      </div>
    </div>
  );
}

export default NameFileUploadScreen;