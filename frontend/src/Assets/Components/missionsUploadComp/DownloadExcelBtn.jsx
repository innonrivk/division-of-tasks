import React, { useEffect, useRef, useState } from 'react';
import "./downloadExcelBtn.css";
import axios from 'axios';
import FileSaver from 'file-saver';
import httpClient from '../../../Utils/HttpClient'
function DownloadExcelBtn(props) {
    const API_URL = "http://localhost:3001/api/excel";
    const [refresh, setRefresh] = useState(false)
    const isFileAvailable = useRef(false)

    useEffect(() => {
        isFileAvailable.current = false
        console.log(isFileAvailable.current)
    }, [])

    useEffect(() => {
        if (!props.isMissionsSent) return;
        console.log("props.isMissionSent", props.isMissionsSent);

        const checkFileAvailability = async () => {
            try {
                let [validation, response] = await httpClient.getPairsExcel()
                if (validation != "done") throw new Error(response);

                console.log("res", response)
                if (response.status == 200) {
                    console.log("stas", response.statusText)
                    isFileAvailable.current = true
                    console.log("file", isFileAvailable)
                    setRefresh(prev => !prev)
                    clearInterval(intervalId); // Clear the interval once the file is available

                }
            } catch (err) {
                console.error("err", err);
                isFileAvailable.current = false
            }
        };

        const intervalId = setInterval(checkFileAvailability, 1000); // Check every 1 second

        return () => clearInterval(intervalId); // Clear the interval on component unmount
    }, [props.isMissionsSent]);

    async function getFiles() {
        try {
            let [validation, response] = await httpClient.getPairsExcel()
            if (validation != "done") throw new Error(response);


            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, 'sample.xlsx');
        } catch (err) {
            console.log("err", err);
        }
    }

    return (
        <div className='download-btn'>
            <button onClick={getFiles} className="" disabled={isFileAvailable.current == false}>
                הורדה
            </button>
        </div>
    );
}

export default DownloadExcelBtn;