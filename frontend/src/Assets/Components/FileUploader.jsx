// FileUploader.jsx
import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
const CHUNK_SIZE = 1024 * 1024; // 1MB
import "./FileUploader.css";

const FileUploader = (props) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {  
    setFile(props.file)
    console.log("file", props.file)
  }, [props.file])

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3001/api/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, 
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      props.reset()
    }
  };

  return (
    <div>
    <div className="progress-bar-container" >
        <div className="progress-bar"
          style={{
            width: `${uploadProgress}%`,
          }}
        ><p>{uploadProgress}%</p></div>
        
      </div>
      <div className='container-component-upload-btn '>
        <div className='component-upload-btn'>
          <button onClick={uploadFile} disabled={isUploading || !file}>  
          {isUploading ? <p>מעלה... </p>: <p>העלאה</p>}
          </button>
        </div>
     
      </div>
      </div>
  );
};


export default FileUploader;
