const xl = require('exceljs')

async function parseExcel(file) {
    const fileName = file.originalname
    
    const workbook = new xl.Workbook()
    await workbook.xlsx.readFile(file.path)
    const worksheet = workbook.worksheets[0]

    const rows = []
    const headers = []

    worksheet.eachRow((row, rowIndex) => {
        if (rowIndex == 1) {
            headers.push(...row.values)
        } else {
            const rowData = {};
            row.values.forEach((value, index) => {
                rowData[headers[index]] = value
            })
            rows.push(rowData)
        }
    })
    return [rows, fileName.substring(0, fileName.indexOf('.'))]
}

module.exports = parseExcel;