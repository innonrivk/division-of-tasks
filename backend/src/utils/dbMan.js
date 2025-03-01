const db = require("../db/connection")
const errCon = require("./errorTypes")

class DatabaseManager {
    static isValidateTableName(tableName) {
        const pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
        return pattern.test(tableName)
    }

    static createTable(users, tableName) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                //if (!tableName || !this.isValidateTableName(tableName)) {
                //    reject(new errCon.InvalidDataInput("Invalid file name", 500))
                //}

                //db.run(`DROP TABLE IF EXISTS ${tableName}`) // instead of updating we are just running over the current data

                db.run('DROP TABLE IF EXISTS soliders')

                db.run(`CREATE TABLE IF NOT EXISTS soliders (
                    frame Ntext NOT NULL,
                    id INTEGER NOT NULL PRIMARY KEY,
                    full_name Ntext NOT NULL,
                    rank Ntext NOT NULL,
                    service_type Ntext NOT NULL,
                    job Ntext NOT NULL,
                    phone_number Ntext NOT NULL,
                    unit Ntext NOT NULL,
                    end_of_service_date NTEXT NOT NULL,
                    score INTEGER DEFAULT 0,
                    is_in_mission INTEGER DEFAULT 0);`, (error) => {
                        if(error) {
                            reject(new errCon.DatabaseError(error, 500))
                        }
                })

                const stmt = db.prepare(`INSERT INTO soliders (
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
                                reject(new errCon.DatabaseError(error, 500))
                            }
                        }
                    )
                })

                stmt.finalize((error) => {
                    if (error) {
                        reject(new errCon.DatabaseError(error, 500))
                    } else {
                        resolve({message: "User data inserted successfully", code : 201})
                    }
                })
            })
        })
    }

    static updateSolidersScore(newScore, id) {
        return new Promise((resolve, reject) => {
            db.all(`UPDATE soliders
                    SET score=${newScore}, is_in_mission=1
                    WHERE id=${id};`, (error) => {
                if(error) {
                    reject(new errCon.DatabaseError(error, 500))
                } else {
                    resolve({message: "solider score updated", code: 201})
                }
            })
        })
    }

    static getSoliderScoreById(id) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT score
                    FROM soliders
                    WHERE id=${id}`, (error, score) => {
                        if(error){
                            reject(new errCon.DatabaseError(error, 500))
                        } else {
                            resolve(score)
                        }
                    })
        })
    }

    static getSoliders() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM soliders`, (error, rows) => {
                if(error){
                    reject(new errCon.DatabaseError(error, 500))
                } else {
                    resolve({message: rows, code : 200})
                }
            })
        })
    }

    static getSolidersByFrame(frame, manpower) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT id, full_name
                    FROM soliders 
                    WHERE frame='${frame}' AND is_in_mission=0 
                    ORDER BY score ASC, end_of_service_date ASC
                    LIMIT ${manpower};`, (error, rows) => {
                if(error) {
                    reject(new errCon.DatabaseError(error, 500))
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static getNumberOfSolidersInFrame(frame) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT COUNT(*)
                    FROM soliders
                    WHERE frame='${frame}';`, (error, num) => {
                        if (error) {
                            reject(new errCon.DatabaseError(error, 500))
                        } else {
                            resolve(num)
                        }
                    })
        })
    }

    static getTotalNumberOfSoliders() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT COUNT(*)
                    FROM soliders;`, (error, num) => {
                        if (error) {
                            reject(new errCon.DatabaseError(error, 500))
                        } else {
                            resolve(num)
                        }
                    })
        })
    }

    static ZeroIsInMission() {
        return new Promise((resolve, reject) => {
            db.all(`UPDATE soliders
                SET is_in_mission=0
                WHERE is_in_mission=1;`, (error) => {
                    if(error) {
                        reject(new errCon.DatabaseError(error, 500))
                    } else {
                        resolve()
                    }
                })
        })
    }

    static getFrames() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT DISTINCT frame FROM soliders;`, (error, rows) => {
                if(error) {
                    reject(new errCon.DatabaseError(error, 500))
                } else {
                    resolve(rows)
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
                    total_manpower INTEGER NOT NULL,
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
                    total_manpower,
                    percentage,
                    is_permanent
                    ) VALUES (?, ?, ?, ?, ?, ?, ?);`)
                
                missions.forEach(mission => {
                    stmt.run(
                        mission["name"],
                        mission["start_date"],
                        mission["end_date"],
                        mission["score"],
                        mission["total_manpower"],
                        JSON.stringify(mission["percentage"]),
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

    static createCurrentSolidersForMissionsTable(solidersWithMission, id) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                console.log("---------------------------------")
                db.run(`DROP TABLE IF EXISTS currentSolidersForMissions;`)

                db.run(`CREATE TABLE IF NOT EXISTS currentSolidersForMissions (
                    id INTEGER NOT NULL PRIMARY KEY,
                    full_name Ntext NOT NULL,
                    mission_name Ntext NOT NULL,
                    mission_id INTEGER NOT NULL,
                    excel_id INTEGER DEFUALT 0);`, (error) => {
                        if (error) {
                            reject(new errCon.DatabaseError(error, 500))
                        }
                })

                const stmt = db.prepare(`INSERT INTO currentSolidersForMissions (
                    id,
                    full_name,
                    mission_name,
                    mission_id,
                    excel_id) VALUES (?, ?, ?, ?, ?);`)
                
                solidersWithMission.forEach(solider => {
                    stmt.run(
                        solider["id"],
                        solider["full_name"],
                        solider["mission_name"],
                        solider["mission_id"],
                        id,
                        (error) => {
                            if (error) {
                                reject(new errCon.DatabaseError(error, 500))
                            }
                        }
                    )
                })

                stmt.finalize((error) => {
                    if (error) {
                        reject(new errCon.DatabaseError(error, 500))
                    } else {
                        resolve({message: "table created successfully"})
                    }
                })
            })
        })
    }

    static getExcelId() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT excel_id FROM currentSolidersForMissions GROUP BY excel_id HAVING COUNT(excel_id) > 1;`, (e, num) => {
                if (e) {
                    reject(new errCon.DatabaseError(e, 500))
                } else {
                    resolve(num)
                }
            })
        })
    }

    static isExist(fileName) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT COUNT(1)
                FROM currentSolidersForMissions
                WHERE name=${fileName};`, (error, num) => {
                        if (error) {
                            reject(new errCon.DatabaseError(error, 500))
                        } else {
                            resolve(num)
                        }
                    })
        })
    }

    static getTableSoliderWithMission() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM currentSolidersForMissions`, (error, rows) => {
                if (error) {
                    reject(new errCon.DatabaseError(error, 500))
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static createExcelTable(excel_file) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(`CREATE TABLE IF NOT EXISTS excelTable (
                    id INTEGER PRIMARY KEY,
                    name Ntext UNIQUE NOT NULL,
                    full_path Ntext UNIQUE NOT NULL);`, (error) => {
                        if (error) {
                            reject(new errCon.DatabaseError(error, 500))
                        }
                })

                const stmt = db.prepare(`INSERT INTO excelTable (
                    name,
                    full_path) VALUES (?, ?);`)
                
                stmt.run(
                    excel_file["name"],
                    excel_file["full_path"],
                    (error) => {
                        if (error) {
                            reject(new errCon.DatabaseError(error, 500))
                        }
                    }
                )

                stmt.finalize((error) => {
                    if (error) {
                        reject(new errCon.DatabaseError(error, 500))
                    } else {
                        resolve("done")
                    }
                })
            })
        })
    }

    static getIdByName(name) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT id FROM excelTable
                WHERE name=${name}`, (error, id) => {
                        if (error) {
                            reject(new errCon.DatabaseError(error, 500))
                        } else {
                            resolve(id)
                        }
                    })
        })
    }

    static getExcelTable() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM excelTable`, (error, rows) => {
                if (error) {
                    reject(new errCon.DatabaseError(error, 500))
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static getExcelFile(id) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM excelTable WHERE id=${id}`, (error, row) => {
                if (error) {
                    reject(new errCon.DatabaseError(error, 500))
                } else {
                    resolve(row)
                }
            })
        })
    }
}

module.exports = DatabaseManager