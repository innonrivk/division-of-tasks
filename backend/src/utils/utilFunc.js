const fs = require('fs');

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
        const choice = [`רב"ט`, 'סמל', `סמ"ר`, 'נגד', 'קצין', 'חובה', 'קבע', 'מדריך',  `משק תש/שלישות`]
        const forbidden = /[!#$%&'*,.;<=>?@[\]^_\`{|}~]/

        switch(header) {
            case "מספר אישי":
                if (!id.test(value)) {
                    throw {message: `bad id number ${value}, at row ${rowIndex} and column ${header}`, code: 422}
                }
                break
            case "מספר טלפון":
                if (!phone_number.test(value)) {
                    throw {message: `bad phone number ${value}, at row ${rowIndex} and column ${header}`, code: 422}
                }
                break
            case "תאריך תום שירות":
                if (!freedom.test(value)) {
                    throw {message: `bad date ${value}, at row ${rowIndex} and column ${header}`, code: 422}
                }
                break
            case "דרגה":
            case "סוג שירות":
            case "עיסוק":
                if (!choice.includes(value)) {
                    throw {message: `bad input ${value}, at row ${rowIndex} and column ${header}`, code: 422}
                }
                break
            default:
                if (forbidden.test(value)) {
                    throw {message: `forbidden char at ${value}, at row ${rowIndex} and column ${header}`, code: 422}
                }
        }
    }

    static updatePerc(missions) {
        try{
            for(var i = 0; i < missions.length; i++) {
                missions[i].percentage = JSON.parse(missions[i]["percentage"])
            }
            return missions
        } catch (err) {
            throw err
        }
    }

    static checkPerc(missions) {
        let sumArr = []
        for(var i = 0; i < missions.length - 1; i++) {
            let sum = 0
            for(var key in missions[i].percentage) {
                if (key != "חיילים") {
                    sum += missions[i].percentage[key]
                }
            }
            sumArr.push(sum)
        }

        for(var i = 0; i < sumArr.length; i++) {
            if (sumArr[i] != 100) {
                throw {message: `The percentage is not 100% at ${missions[i].name}`, code: 422}
            }
        }
    }

    static getPeople(missions) {
        try {
            for(var i = 0; i < missions.length; i++) {
                for(var key in missions[i].percentage) {
                    if(key != "חיילים") {
                        missions[i].percentage[key] = Math.round(missions[i].percentage[key] * missions[i].percentage["חיילים"] / 100)
                    }
                }
            }
            return missions
        } catch (err) {
            throw err
        }
    }
}


module.exports = utils