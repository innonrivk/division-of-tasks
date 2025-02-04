// FileUploader.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./FileUploader.css";

const FileUploader = (props) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const API_URL = "http://localhost:3001/api/file";

  useEffect(() => {  
    setFile(props.file);
    console.log("file", props.file);
  }, [props.file]);

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(API_URL, formData, {
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
