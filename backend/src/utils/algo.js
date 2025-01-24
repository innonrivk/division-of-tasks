const dbMan = require("./dbMan")
const utils = require("./utilFunc")

class algo{
    static async main() {
        try{
            let missions = await dbMan.getMissions()
            missions = await this.updatePerc(missions)
            console.log(missions)
        } catch (error) {
            return error
        }
    }

    static updatePerc(missions) {
        try{
            for(var i = 0; i < missions.length; i++) {
                missions[i].percentage = utils.translatePerc(missions[i]["percentage"])
            }
            return missions
        } catch (err) {
            return err
        }
    }
}

module.exports = algo