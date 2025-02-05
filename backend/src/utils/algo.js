const dbMan = require("./dbMan")
const utils = require("./utilFunc")

class algo{
    static async main() {
        let missions = await dbMan.getMissions()
        missions = await utils.updatePerc(missions)
        utils.checkPerc(missions)
        missions = await utils.getPeople(missions)
        console.log(missions)
    }
}

module.exports = algo