import React ,{ useState} from 'react'


function FileBrowser() {

    const handleFileUpload = async (e) =>{
        const file = e.target.files[0]
        try{
        if(file){
            console.log("file", file)
        }
    }
    catch(err){
        console.log(err)
    }
    }

  return (
    <div>
    <input 
    type='file' 
    accept='.xls, .xlsx' 
    onChange={handleFileUpload}
    ></input>
    </div>
  )
}

export default FileBrowser
