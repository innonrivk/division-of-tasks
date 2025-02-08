const xl = require('exceljs')
const algo = require("./algo")
const fs = require("fs")

async function excelGenerator() {
    try{
        let solidersForMission = await algo.main()
        let keys = Object.keys(solidersForMission)

        const workbook = new xl.Workbook()
        const worksheet = workbook.addWorksheet('חיילים')

        let maxRowLength = []
        let columnsSet = []
        
        for(var i = 0; i < keys.length; i++){
            maxRowLength.push(solidersForMission[keys[i]].length)

            let set = {}
            set["header"] = keys[i]
            set["key"] = keys[i]
            set["width"] = 15
            columnsSet.push(set)
        }

        worksheet.columns = columnsSet

        worksheet.findRow(1).alignment = { horizontal: 'center'}

        maxRowLength = Math.max(...maxRowLength)

        for(var i = 0; i < maxRowLength; i++) {
            let data = {}
            keys.forEach((key) => {
                data[key] = solidersForMission[key][i]?.id || ''
            })
            worksheet.addRow(data)
        }

        await workbook.xlsx.writeFile('sample.xlsx')
    } catch(e) {
        throw e
    }
}

module.exports = excelGenerator;