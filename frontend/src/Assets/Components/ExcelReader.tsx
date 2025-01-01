// ExcelReader.jsx
import React, { useState, useRef } from 'react';
import ExcelParser from '../../Utils/ExcelParser/ExcelParser.js';

function ExcelReader() {
    const [jsonData, setJsonData] = useState([]);
    const [error, setError] = useState('');
    const excelParserRef = useRef(null);


    // Initialize ExcelParser once
    if (excelParserRef.current === null) {
        excelParserRef.current = new ExcelParser();
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setError('');
        setJsonData([]);

        if (file) {
            try {
                // Use the ExcelParser instance from ref
                const data = await excelParserRef.current.parseFile(file);
                setJsonData(data);

                // Send JSON data to ExpressJS API
                const response = await fetch('http://localhost:3001/api/excel-files/names', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).catch(err => console.error(err))


                const result = await response.json();
                console.log('API Response:', result);
            } catch (err) {
                console.error(err)


            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Upload and Parse Excel File</h2>
            <input
                type="file"
                accept=".xlsx, .xls" // Accept only Excel files
                onChange={handleFileUpload}
            />
            <div>
                {jsonData.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Parsed JSON Data:</h3>
                        <pre style={{ textAlign: 'left' }}>
                            {JSON.stringify(jsonData, null, 2)} {/* Display JSON data */}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExcelReader;
