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
                    frame Ntext NOT NULL,
                    id INTEGER NOT NULL PRIMARY KEY,
                    full_name Ntext NOT NULL,
                    rank Ntext NOT NULL,
                    service_type Ntext NOT NULL,
                    job  Ntext NOT NULL,
                    phone_number Ntext NOT NULL,
                    unit Ntext NOT NULL,
                    end_of_service_date NTEXT NOT NULL);`, (err) => {
                        if(err) {
                            reject(error)
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
                    end_of_service_date
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
                        resolve({message: "User data inserted successfully", code : 201})
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
                    resolve({message: rows, code : 200})
                }
            })
        })
    }
}

module.exports = DatabaseManager