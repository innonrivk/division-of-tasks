const errCon = require('./errorTypes')
const fs = require('fs');
const dbMan = require("./dbMan")

class utils{
    static unlinkFile(req) {
        fs.unlink(req, (err) => {
            if (err) console.error('Error deleting file: ', err)
        })
    }

    static validateUserInput(header, value, rowIndex) {
        const id = /[1-9][0-9]{6}/
        const phone_number = /^05[0-9]-[0-9]{7}$/
        const freedom = /\b(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}\b/
        const choice = [`רב"ט`, 'סמל', `סמ"ר`, 'נגד', 'קצין', 'חובה', 'קבע', 'מדריך',  `משק תש/שלישות`, `אפסנאי`]
        const forbidden = /[!#$%&'*,.;<=>?@[\]^_\`{|}~]/

        switch(header) {
            case "מספר אישי":
                if (!id.test(value)) {
                    throw new errCon.InvalidDataInput(`bad id number ${value}, at row ${rowIndex} and column ${header}`, 422)
                }
                break
            case "מספר טלפון":
                if (!phone_number.test(value)) {
                    throw new errCon.InvalidDataInput(`bad phone number ${value}, at row ${rowIndex} and column ${header}`,422)
                }
                break
            case "תאריך תום שירות":
                if (!freedom.test(value)) {
                    throw new errCon.InvalidDataInput(`bad date ${value}, at row ${rowIndex} and column ${header}`, 422)
                }
                break
            case "דרגה":
            case "סוג שירות":
            case "עיסוק":
                if (!choice.includes(value)) {
                    throw new errCon.InvalidDataInput(`bad input ${value}, at row ${rowIndex} and column ${header}`, 422)
                }
                break
            default:
                if (forbidden.test(value)) {
                    throw new errCon.InvalidDataInput(`forbidden char at ${value}, at row ${rowIndex} and column ${header}`, 422)
                }
        }
    }

    static updatePerc(missions) {
        try{
            for(var i = 0; i < missions.length; i++) {
                missions[i].percentage = JSON.parse(missions[i]["percentage"])
                this.checkPerc(missions[i].percentage, missions[i].name)
                missions[i].percentage = this.getPeople(missions[i].percentage, missions[i].total_manpower)
            }
            return missions
        } catch (err) {
            throw err
        }
    }

    static checkPerc(perc, name) {
        let sum = 0
        for(var i = 0; i < perc.length; i++) {
            sum += parseInt(perc[i][Object.keys(perc[i])[0]])
        }
        if (sum != 100) {
            throw new errCon.InvalidDataInput(`The percentage is not 100% at ${name}`, 422)
        }
    }

    static getPeople(perc, manpower) {
        try {
            for(var i = 0; i < perc.length; i++) {
                let key = Object.keys(perc[i])[0]
                perc[i][key] = Math.round(parseInt(perc[i][key]) * manpower * 0.01)     // json[key] = (perc * manpower) / 100
            }
            return perc
        } catch (err) {
            throw err
        }
    }

    static async saveResultsToDB(excel_file, solidersWithMission){
        try{
            const done = await dbMan.createExcelTable(excel_file)
            const id = await dbMan.getIdByName(`${excel_file["name"]}`)
            const wait = await dbMan.createCurrentSolidersForMissionsTable(solidersWithMission, id)
            console.log("_____________________נםט_____________________")
            console.log(wait)
            return
        } catch(e) {
            throw e
        }
    }
}


module.exports = utils