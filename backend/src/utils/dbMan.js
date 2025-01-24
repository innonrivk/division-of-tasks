const db = require("../db/connection")

class DatabaseManager {
    static isValidateTableName(tableName) {
        const pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
        return pattern.test(tableName)
    }

    static createTable(users, tableName) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                if (!tableName || !this.isValidateTableName(tableName)) {
                    reject({message : "Invalid file name", code: 500})
                }

                db.run(`DROP TABLE IF EXISTS ${tableName}`) // instead of updating we are just running over the current data

                db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (
                    frame Ntext NOT NULL,
                    id INTEGER NOT NULL PRIMARY KEY,
                    full_name Ntext NOT NULL,
                    rank Ntext NOT NULL,
                    service_type Ntext NOT NULL,
                    job Ntext NOT NULL,
                    phone_number Ntext NOT NULL,
                    unit Ntext NOT NULL,
                    end_of_service_date NTEXT NOT NULL,
                    score INTEGER DEFAULT 0);`, (err) => {
                        if(err) {
                            reject({message: err, code: 500})
                        }
                })

                const stmt = db.prepare(`INSERT INTO ${tableName} (
                    frame,
                    id,
                    full_name,
                    rank,
                    service_type,
                    job,
                    phone_number,
                    unit,
                    end_of_service_date,
                    score
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`)
                    
                users.forEach(user => {
                    stmt.run(
                        user["מסגרת"],
                        user["מספר אישי"],
                        user["שם פרטי"],
                        user["דרגה"],
                        user["סוג שירות"],
                        user["עיסוק"],
                        user["מספר טלפון"],
                        user["יחידה ארגונית"],
                        user["תאריך תום שחרור"],
                        user["ניקוד"],
                        (error) => {
                            if (error) {
                                reject({message: error, code: 500})
                            }
                        }
                    )
                })

                stmt.finalize((error) => {
                    if (error) {
                        reject({message: error, code: 500})
                    } else {
                        resolve({message: "User data inserted successfully", code : 201})
                    }
                })
            })
        })
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM soldiers`, (error, rows) => {
                if(error){
                    reject({message: error, code: 500}
                    )
                } else {
                    resolve({message: rows, code : 200})
                }
            })
        })
    }

    static createMissionTable(missions) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`DROP TABLE IF EXISTS currentMissions`)

                db.run(`CREATE TABLE IF NOT EXISTS currentMissions (
                    id INTEGER NOT NULL PRIMARY KEY,
                    name NTEXT NOT NULL,
                    start_date NTEXT NOT NULL,
                    end_date NTEXT NOT NULL,
                    score INTEGER NOT NULL,
                    percentage NTEXT NOT NULL,
                    is_permanent INTEGER NOT NULL CHECK(is_permanent IN (0, 1)));`, (err) => {
                        if (err) {
                            reject(err)
                        }
                    })
                
                const stmt = db.prepare(`INSERT INTO currentMissions (
                    name,
                    start_date,
                    end_date,
                    score,
                    percentage,
                    is_permanent
                    ) VALUES (?, ?, ?, ?, ?, ?);`)
                
                missions.forEach(mission => {
                    stmt.run(
                        mission["name"],
                        mission["start_date"],
                        mission["end_date"],
                        mission["score"],
                        mission["percentage"],
                        mission["is_permanent"],
                        (err) => {
                            if (err) {
                                reject(err)
                            }
                        }
                    )
                })

                stmt.finalize((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({message: "missions inserted successfully", code: 201})
                    }
                })
            }) 
        })
    }

    static getMissions() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM currentMissions`, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = DatabaseManager