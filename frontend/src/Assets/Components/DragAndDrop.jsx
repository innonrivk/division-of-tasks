import React, { useCallback, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from 'react-dropzone'
import './DragAndDrop.css'
const fileTypes = ["xls", "xlsx"];


function DragAndDrop() {

  const onDrop = ((acceptedFiles) => {
    const file = acceptedFiles[0]
    try{
    if(file){
        console.log("file", file)
    }
}
catch(err){
    console.log(err)
}

  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

 
  return (
    <div {...getRootProps({
      className: `dropzone ${isDragActive ? "dropzone-active" : ""}`,
    })}>
      <input {...getInputProps()} />
        <p>גרור קובץ לכאן</p>
      <button>חפש</button>

    </div>
  )

}
export default DragAndDrop
