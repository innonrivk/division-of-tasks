const dbMan = require("./dbMan")
const utils = require("./utilFunc")

class algo{
    static async main() {
        try{
            let missions = await dbMan.getMissions()
            missions = await utils.updatePerc(missions)
        } catch (e) {
            throw e
        }
    }
}

module.exports = algo