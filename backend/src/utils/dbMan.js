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
                    reject({error : "Invalid file name"})
                }

                db.run(`DROP TABLE IF EXISTS ${tableName}`)

                db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (
                    מסגרת Ntext NOT NULL,
                    מספר_אישי INTEGER NOT NULL PRIMARY KEY,
                    שם_פרטי Ntext NOT NULL,
                    דרגה Ntext NOT NULL,
                    סוג_שירות Ntext NOT NULL,
                    עיסוק  Ntext NOT NULL,
                    מספר_טלפון Ntext NOT NULL,
                    יחידה_ארגונית Ntext NOT NULL,
                    תאריך_תום_שחרור NTEXT NOT NULL);`, (error) => {
                        if(error) {
                            reject(error)
                        }
                })

                const stmt = db.prepare(`INSERT INTO ${tableName} (
                    מסגרת,
                    מספר_אישי,
                    שם_פרטי,
                    דרגה,
                    סוג_שירות,
                    עיסוק,
                    מספר_טלפון,
                    יחידה_ארגונית,
                    תאריך_תום_שחרור
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`)
                    
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
                        (error) => {
                            if (error) {
                                reject(error)
                            }
                        }
                    )
                })

                stmt.finalize((error) => {
                    if (!error) {
                        resolve("User data inserted successfully")
                    }
                })
            })
        })
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM users`, (error, rows) => {
                if(error){
                    reject(error)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

module.exports = DatabaseManager