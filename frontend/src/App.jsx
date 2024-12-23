// App.jsx
import React, { useState, useRef } from 'react';
import ExcelParser from './Utils/ExcelParser/ExcelParser.js';

function App() {
    const [jsonData, setJsonData] = useState([]);
    const [error, setError] = useState('');
    const excelParser = new ExcelParser();


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setError('');
        setJsonData([]);

        if (file) {
            try {
                // Parse the Excel file
                const data = await excelParser.parseFile(file);
                setJsonData(data);

                // Send JSON data to ExpressJS API
                const response = await fetch('http://localhost:3001/api/upload', { // Replace with your API endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error(`API error: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('API Response:', result);
            } catch (errMsg) {
                setError(errMsg);
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
                {jsonData.length > 0 ? (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Parsed JSON Data:</h3>
                        <pre style={{ textAlign: 'left' }}>
                            {JSON.stringify(jsonData, null, 2)} {/* Display JSON data */}
                        </pre>
                    </div>
                ) : null}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default App;
