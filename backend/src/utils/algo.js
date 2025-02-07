const dbMan = require("./dbMan")
const utils = require("./utilFunc")

class algo{
    static async main() {
        try{
            let missions = await dbMan.getMissions()
            missions = await utils.updatePerc(missions)     // updating percentage from string to json and percentage into actual number of people needed for the job

            let solidersForMission = {}

            for(var i = 0; i < missions.length; i++){
                for(var j = 0; j < missions[i].percentage.length; j++){
                    let key = Object.keys(missions[i].percentage[j])[0]
                    let value = missions[i].percentage[j][key]
                    let soliders = await dbMan.getSolidersByFrame(key, value)

                    for(var k = 0; k < soliders.length; k++){
                        let oldScore = await dbMan.getSoliderScoreById(soliders[k]["id"])
                        oldScore = oldScore[0]["score"]
                        await dbMan.updateSolidersScore(missions[i].score + oldScore, soliders[k]["id"])
                    }
                    
                    let missionKey = missions[i].name
                    if(solidersForMission.hasOwnProperty(missionKey)) {
                        solidersForMission[missionKey] = solidersForMission[missionKey].concat(soliders)
                    } else {
                        solidersForMission[missionKey] = soliders
                    }
                }
            }
            
            dbMan.ZeroIsInMission()

            return solidersForMission
        } catch (e) {
            throw e
        }
    }
}

module.exports = algo