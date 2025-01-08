import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './DragAndDrop.css';


function DragAndDrop(props) {
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setFileName("");
  }, [props.reset]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];

    try {
      if (newFile) {
        props.setFile(newFile);
        setFileName(newFile.name);
        console.log("file", newFile);
      }
    } catch (error) {
      console.error("Error handling file:", error);
    }
  }, [props]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  });

  return (
    <div className="drag-and-drop-container">
      <div {...getRootProps({ className: `dropzone ${isDragActive ? 'dropzone-active' : ''}` })}>
        <input {...getInputProps()} />
        {fileName !== "" ? <p>{fileName}</p> : <p>גרור קובץ לכאן</p>}
        <button onClick={open} className="search-button">
          חפש
        </button>
      </div>
    </div>
  );
}

export default DragAndDrop;