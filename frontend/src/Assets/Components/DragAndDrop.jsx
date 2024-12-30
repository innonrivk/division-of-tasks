import React, { useCallback, useEffect, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from 'react-dropzone'
import './DragAndDrop.css'
const fileTypes = ["xls", "xlsx"];


function DragAndDrop(props) {
  const [file, setFile] = useState("")

useEffect(() => {
    setFile("")

}, [props.reset]) 


  const onDrop = ((acceptedFiles) => {
    const file = acceptedFiles[0]
    setFile(file["name"])
    try {
      if (file) {
        console.log("file", file)
      }
    }
    catch (err) {
      console.log(err)
    }

  })

  const clickHandler = () => {
    console.log("click")
    setFile("")
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  return (
    <div {...getRootProps({
      className: `dropzone ${isDragActive ? "dropzone-active" : ""}`,
    })}>
      <input {...getInputProps()} />
      {file != "" ?  <p>{file}</p>:<p>גרור קובץ לכאן</p>}
      <button>חפש</button>

    </div>
  )

}
export default DragAndDrop
