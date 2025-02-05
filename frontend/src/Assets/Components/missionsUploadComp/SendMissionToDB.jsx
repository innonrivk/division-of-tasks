import React ,{ useEffect, useRef, useState} from 'react'
import './SendMissionToDB.css';


function SendMissionToDB(props) {

  const [message, setMessage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const API_URL = "http://localhost:3001/api/file";

  useEffect(() => {  
    setMessage(props.missionsJson);
    console.log("message", message);
  }, [props.missionsJson]);

  const uploadMessage = async () => {
    if (!message) return;

    setIsUploading(true);

    const formData = new FormData();
    
    for(var i = 0; i<message.length; i++){
      formData.append(`${i}`, message[i]);
    }

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
      alert("Failed to upload missions. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      props.reset();
    }
  };
    

 
  return (
    <div>
       <button className='send-mission-btn'  onClick={uploadMessage}>שליחה</button>
    </div>
)
}

export default SendMissionToDB
