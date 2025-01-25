const xl = require('exceljs')
const utils = require('./utilFunc')

const header = ["מסגרת", "מספר אישי", "שם פרטי", "דרגה", "סוג שירות", "עיסוק", "מספר טלפון", "יחידה ארגונית", "תאריך תום שחרור"]

async function parseExcel(file) {
    try {
        const fileName = file.originalname
        
        const workbook = new xl.Workbook()
        await workbook.xlsx.readFile(file.path)
        const worksheet = workbook.worksheets[0]

        const rows = []
        const headers = []

        worksheet.eachRow((row, rowIndex) => {
            if (rowIndex == 1) {
                headers.push(...row.values)
                header.forEach(head => {
                    if (!headers.includes(head)) {
                        throw {message: `There is no ${head} column in this file`, code: 400}
                    }
                })
            } else {
                const rowData = {};
                row.values.forEach((value, index) => {
                    if(value===null || value===undefined) {
                        throw {message: `Value is undefined`, code: 422}
                    }
                    utils.validateUserInput(headers[index], value, rowIndex)       
                    rowData[headers[index]] = value
                })
                rows.push(rowData)
            }
        })

        utils.unlinkFile(file.path)
        return [rows, fileName.substring(0, fileName.indexOf('.'))]
    } catch (error) {
        utils.unlinkFile(file.path)
        throw error
    }
}

module.exports = parseExcel;