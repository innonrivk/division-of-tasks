import axios, { formToJSON } from "axios";

class BackendCommunication {
   
        static MISSIONS_API_URL = "http://localhost:3001/api/missions";
        static FILES_API_URL = "http://localhost:3001/api/file";
        static EXCEL_API_URL = "http://localhost:3001/api/excel"

    static async postDataForm( formData  , cbFuncLoader = null) {
      var response, apiUrl;
      var jsonDataType = Object.keys(formToJSON(formData))[0] 
      
      // check which api should be used
      if (jsonDataType == "file"){
        apiUrl = this.FILES_UPDATED_API_URL;
      }
      else if (jsonDataType == "updated-file") {
        apiUrl = this.EXCEL_API_URL;
      }
      else{
          apiUrl =  this.MISSIONS_API_URL;
      }

      try {
          await axios.post(apiUrl, formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
              ...(cbFuncLoader && { onUploadProgress: (progressEvent) => cbFuncLoader(Math.round((progressEvent.loaded / progressEvent.total) * 100))})
          }).then((res) => {
            console.log(res)
              response = ["done",res];
          });
      } catch (err) {
          console.error("Error uploading file:", err);
          response = ["error" ,err];
      } finally {
          return response;
      }
  }

  static async getPairsExcel(){
    var response;
    try{
    await axios.get(this.EXCEL_API_URL,
       { responseType: 'arraybuffer' }
      ).then((res) => {
        response = ["done", res]
      });
    } catch (err){
      response = ["erro", err]
    }
    finally{
      return response
    }
  }
  
} 

export default BackendCommunication;