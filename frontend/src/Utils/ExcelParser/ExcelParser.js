// ExcelParser.js
import * as XLSX from 'xlsx';

export default class ExcelParser {
    constructor() {
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
                reject('No file provided.');
                return;
            }

            // Handle successful file read
            this.reader.onload = (evt) => {
                const arrayBuffer = evt.target.result;
                const data = new Uint8Array(arrayBuffer);
                try {
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    // Convert to array of objects
                    const headers = json[0];
                    const dataRows = json.slice(1);
                    const formattedData = dataRows.map((row) => {
                        let obj = {};
                        headers.forEach((header, index) => {
                            obj[header] = row[index] || '';
                        });
                        return obj;
                    });

                    resolve(formattedData); // Resolve with parsed data
                } catch (error) {
                    reject('Failed to parse the Excel file.'); // Reject with string
                }
            };

            // Handle file read error
            this.reader.onerror = () => {
                reject('Error reading the file.'); // Reject with string
            };

            // Start reading the file
            this.reader.readAsArrayBuffer(file);
        });
    }
}
