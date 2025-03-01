const dbMan = require("./dbMan")
const utils = require("./utilFunc")
const errCon = require("./errorTypes")

class algo{
    static async main() {
        try{
            let missions = await dbMan.getMissions()
            missions = await utils.updatePerc(missions)     // updating percentage from string to json and percentage into actual number of people needed for the job

            let solidersForMission = {}
            let solidersWithMission = []

            for(var i = 0; i < missions.length; i++){
                for(var j = 0; j < missions[i].percentage.length; j++){
                    let key = Object.keys(missions[i].percentage[j])[0]         // frame
                    let value = missions[i].percentage[j][key]                  // manpower
                    let numOfSoliders = await dbMan.getNumberOfSolidersInFrame(key)

                    if(numOfSoliders[0]['COUNT(*)'] < value) {
                        throw new errCon.InvalidDataInput("There is not enough soliders for the required number entered for this mission", 422)
                    }
                    let soliders = await dbMan.getSolidersByFrame(key, value)

                    if(!solidersForMission.hasOwnProperty(key)) {
                        solidersForMission[key] = {}
                    }

                    soliders.forEach(solider => {
                        solider["mission_id"] = missions[i].id
                        solider["mission_name"] = missions[i].name
                        solidersWithMission.push(solider)
                    })
                    
                    for(var k = 0; k < soliders.length; k++){
                        let oldScore = await dbMan.getSoliderScoreById(soliders[k]["id"])
                        oldScore = oldScore[0]["score"]
                        await dbMan.updateSolidersScore(missions[i].score + oldScore, soliders[k]["id"])
                    }
                    
                    let missionKey = missions[i].name
                    if(solidersForMission[key].hasOwnProperty(missionKey)) {
                        solidersForMission[key][missionKey] = solidersForMission[key][missionKey].concat(soliders)
                    } else {
                        solidersForMission[key][missionKey] = soliders
                    }

                    solidersForMission[key][missionKey] = solidersForMission[key][missionKey].concat({start_date: missions[i].start_date, end_date: missions[i].end_date})
                }
            }
            
            await dbMan.ZeroIsInMission()

            return [solidersForMission, solidersWithMission]
        } catch (e) {
            throw e
        }
    }
}

module.exports = algo