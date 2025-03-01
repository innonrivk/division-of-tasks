// FileUploader.jsx
import React, { useState, useEffect } from "react";
import axios, { formToJSON } from 'axios';
import "./FileUploader.css";
import HttpClient from '../../../Utils/HttpClient'
const FileUploader = (props) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {  
    setFile(props.file);
    console.log("file", props.file);
  }, [props.file]);

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    //  diffrentiating between uplaod updated file and uploading new names file  
    if(props.isUpdateFile){
      formData.append("updated", file);
    }
    else{
      formData.append("file", file);
    }
    
    console.log(formToJSON(formData))
    try {
      
      let [validation, response] = await HttpClient.postDataForm(formData)
      console.log(response)

      if (validation != "done") throw new Error(response);
      
      alert("File uploaded successfully!");
   
    } catch (error) {
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      props.reset();
    }
  };

  return (
    <div className="file-uploader">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
          {uploadProgress}%
        </div>
      </div>
      <div className="upload-button-container">
        <button onClick={uploadFile} disabled={isUploading || !file}>
          {isUploading ? "מעלה..." : "העלאה"}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
