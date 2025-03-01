const xl = require('exceljs')
const dbMan = require('./dbMan')
const randColor = require('randomcolor')
const path = require('path')
const { stringify } = require('querystring')

async function excelGenerator(solidersForMission) {
    try{
        const workbook = new xl.Workbook()
        const worksheet = workbook.addWorksheet('חיילים')

        let rowIndex = 2

        for (const [frame, jobs] of Object.entries(solidersForMission)) {
            let color = randColor({luminosity: 'light'})

            worksheet.mergeCells(`B${rowIndex}:G${rowIndex}`)
            const headerCell = worksheet.getCell(`B${rowIndex}`)
            headerCell.value = frame
            headerCell.fill = {type: "pattern", pattern: "solid", fgColor: {argb: color}}
            headerCell.alignment = {horizontal: "center", vertical: "middle"}
            headerCell.border = {right: {style: 'medium', color: '000000'}, left: {style: 'medium', color: '000000'}, top: {style: 'medium', color: '000000'}}
            headerCell.font = {name: 'Alef', size: 14, bold: true}
            rowIndex++ // move from the header cell

            let startIndex, endIndex

            for (const [job, soliders] of Object.entries(jobs)) {
                startIndex = rowIndex
                if(startIndex == endIndex){
                    startIndex++
                }

                soliders.forEach(solider => {
                    if(!solider.hasOwnProperty('start_date')){
                        const nameCell = worksheet.getCell(`F${rowIndex}`)
                        nameCell.value = solider.full_name
                        nameCell.border = {bottom: {style: 'thin', color: '000000'}}
                        const idCell = worksheet.getCell(`G${rowIndex}`)
                        idCell.value = solider.id
                        idCell.border = {bottom: {style: 'thin', color: '000000'}}
                        rowIndex++  //new line
                    }
                })
                endIndex = rowIndex
                endIndex--

                worksheet.mergeCells(`B${startIndex}:C${endIndex}`)
                const dateCell = worksheet.getCell(`B${startIndex}`)
                dateCell.value = `${soliders[soliders.length - 1].start_date}\n${soliders[soliders.length - 1].end_date}`
                dateCell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: color}}
                dateCell.border = {
                    top: {style: 'medium', color: {argb: '000000'}},
                    left: {style: 'medium', color: {argb: '000000'}},
                    bottom: {style: 'medium', color: {argb: '000000'}},
                    right: {style: 'thin', color: {argb: '000000'}} }
                dateCell.alignment = {horizontal: 'center', vertical: 'middle'}
                dateCell.font = {name: 'Alef', size: 12, bold: true}

                worksheet.mergeCells(`D${startIndex}:E${endIndex}`)
                const jobCell = worksheet.getCell(`D${startIndex}`)
                jobCell.value = job
                jobCell.fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: color}}
                jobCell.border = {
                    top: {style: 'medium', color: {argb: '000000'}},
                    left: {style: 'thin', color: {argb: '000000'}},
                    bottom: {style: 'medium', color: {argb: '000000'}},
                    right: {style: 'thin', color: {argb: '000000'}}}
                jobCell.alignment = {horizontal: 'center', vertical: 'middle'}
                jobCell.font = {name: 'Alef', size: 14, bold: true
                }

                const createOuterBorder = (worksheet, start = {row: startIndex, col: 6}, end = {row: endIndex, col: 7}, borderWidth = 'medium') => {

                    const borderStyle = {
                        style: borderWidth
                    };
                    for (let i = start.row; i <= end.row; i++) {
                        const leftBorderCell = worksheet.getCell(i, start.col);
                        const rightBorderCell = worksheet.getCell(i, end.col);
                        leftBorderCell.border = {
                            ...leftBorderCell.border,
                            left: {style: 'thin'}
                        };
                        rightBorderCell.border = {
                            ...rightBorderCell.border,
                            right: borderStyle
                        };
                    }
                
                    for (let i = start.col; i <= end.col; i++) {
                        const topBorderCell = worksheet.getCell(start.row, i);
                        const bottomBorderCell = worksheet.getCell(end.row, i);
                        topBorderCell.border = {
                            ...topBorderCell.border,
                            top: borderStyle
                        };
                        bottomBorderCell.border = {
                            ...bottomBorderCell.border,
                            bottom: borderStyle
                        };
                    }
                };
            
                createOuterBorder(worksheet)
            }


            rowIndex++  //space between groups
        }

        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0].replaceAll('-', '_')
        let fileName = `excel_${formattedDate}.xlsx`
        await workbook.xlsx.writeFile(`./src/db/excel_results/${fileName}`)

        return {name: fileName, full_path: `../db/excel_results/${fileName}`}
    } catch(e) {
        throw e
    }
}

module.exports = excelGenerator;