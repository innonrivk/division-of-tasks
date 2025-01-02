const { query } = require('express');
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
                    throw new Error({message: `bad id number ${value}, at row ${rowIndex} and column ${header}`, code: 422})
                }
                break
            case "מספר טלפון":
                if (!phone_number.test(value)) {
                    throw new Error({message: `bad phone number ${value}, at row ${rowIndex} and column ${header}`, code: 422})
                }
                break
            case "תאריך תום שירות":
                if (!freedom.test(value)) {
                    throw new Error({message: `bad date ${value}, at row ${rowIndex} and column ${header}`, code: 422})
                }
                break
            case "דרגה" || "סוג שירות" || "עיסוק":
                if (!choice.includes(value)) {
                    throw new Error({message: `bad input ${value}, at row ${rowIndex} and column ${header}`, code: 422})
                }
                break
            default:
                if (forbidden.test(value)) {
                    throw new Error({message: `forbidden char at ${value}, at row ${rowIndex} and column ${header}`, code: 422})
                }
        }
    }
}


module.exports = utils