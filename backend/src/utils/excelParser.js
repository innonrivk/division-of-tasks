const xl = require('exceljs')

async function parseExcel(file) {

    const workbook = new xl.Workbook()
    await workbook.xlsx.readFile(file)
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

    return rows
}

module.exports = parseExcel;