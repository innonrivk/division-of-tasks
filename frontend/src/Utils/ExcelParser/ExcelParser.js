import * as XLSX from 'xlsx'

export default class ExcelParser {
    constructor() {
        this.jsonData = []
        this.reader = new FileReader();
    }


  /**
   * Parses an Excel file and returns JSON data.
   * @param {File} file - The Excel file to parse.
   * @returns {Promise<Array<Object>>} - A promise that resolves to the JSON data.
   */

    parseFile(file) {
        return new Promise((resolve, reject) => {
          if (!file) {
            reject('No file provided.')
            return
          }
    
          // Define the onload handler
          this.reader.onload = (evt) => this.onLoad(evt, resolve, reject)
    
          // Define the onerror handler
          this.reader.onerror = (err) => this.onError(err, reject)
    
          // Start reading the file as ArrayBuffer
          this.reader.readAsArrayBuffer(file)
        })
      }


onLoad(evt, resolve, reject){
    const binaryStr = evt.target.result;
    try {
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      console.log("workbook",workbook)
      const firstSheetName = workbook.SheetNames[0];
      console.log("firstSheetName",firstSheetName)

      const worksheet = workbook.Sheets[firstSheetName];
      console.log("worksheet",worksheet)

      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log("json",json)

      // Convert to array of objects
      const headers = json[0];
      const data = json.slice(1).map((row) => {
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
      console.log('Parsed JSON Data:', data)
      resolve(data)
    } catch (err) {
        console.error('Error parsing Excel file:', err)
        reject('Failed to parse the excel file.') 
    }
}
/**
   * Handles the file error event.
   * @param {ProgressEvent<FileReader>} err 
   * @param {Function} reject 
   */
  onError(err, reject) {
    console.error('File reading error:', err)
    reject('Error reading the file.') // Reject the promise with an error message
  }

}