import React, { useCallback, useEffect, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from 'react-dropzone'
import './DragAndDrop.css'
const fileTypes = ["xls", "xlsx"];


function DragAndDrop(props) {
  const [fileName, setFileName] = useState("")
useEffect(() => {
    setFileName("")

}, [props.reset]) 


  const onDrop = ((acceptedFiles) => {
    const newFile = acceptedFiles[0]
    props.setFile(newFile)
    setFileName(newFile["name"])

    try {
      if (newFile) {
        console.log("file", newFile)
      }
    }
    catch (err) {
      console.log(err)
    }

  })



  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <div {...getRootProps({
      className: `dropzone ${isDragActive ? "dropzone-active" : ""}`,
    })}>
      <input {...getInputProps()} />
      {fileName != "" ?  <p>{fileName}</p>:<p>גרור קובץ לכאן</p>}
      <button>חפש</button>

    </div>
  )

}
export default DragAndDrop
