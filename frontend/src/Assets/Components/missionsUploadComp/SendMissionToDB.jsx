import React, { useEffect, useRef, useState } from 'react'
import './SendMissionToDB.css';
import axios from 'axios';
import HttpClient from '../../../Utils/HttpClient'

function SendMissionToDB(props) {

  const [message, setMessage] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMessageValid, setIsMessageValid] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const API_URL = "http://localhost:3001/api/missions";

  useEffect(() => {
    if (props.missionsJson.length === 0) return;
    setIsMessageValid(true)
    setMessage(props.missionsJson);
    console.log("message", message);
  }, [props.missionsJson]);


  // send the message to the server function
  const uploadMessage = async () => {
    if (!message) return;

    setIsUploading(true);

    const formData = new FormData();
    console.log("message len", message.length);
    message.forEach((mission, index) => {
      console.log("mission", mission);
      formData.append(`${JSON.stringify(index)}`, JSON.stringify(mission));
    });


    try {
      let [validation, response] = await HttpClient.postDataForm(formData)
      console.log(validation ,response)
      
      if (validation != "done") throw new Error(response);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload missions. Please try again.");
    } finally {
      setIsUploading(false);
      setIsMessageValid(false);
      setUploadProgress(0);
      props.reset();
    }
  };



  return (
    <div>
      <button className='send-mission-btn' onClick={uploadMessage} disabled={isUploading || !isMessageValid}>{isUploading ? "...שולח" : "שליחה"}</button>
    </div>
  )
}

export default SendMissionToDB
