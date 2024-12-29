const db = require("../db/connection")

function isValidateTableName(tableName) {
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
    return pattern.test(tableName)
}

function createTable(users, tableName) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            if (!tableName || !isValidateTableName(tableName)) {
                reject({error: "Invalid table name"})
            }

            db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (
                מסגרת Ntext NOT NULL,
                מספר_אישי INTEGER NOT NULL PRIMARY KEY, 
                שם_פרטי Ntext NOT NULL, 
                דרגה Ntext NOT NULL, 
                סוג_שירות Ntext NOT NULL, 
                עיסוק Ntext NOT NULL, 
                מספר_טלפון Ntext NOT NULL,
                יחידה_ארגונית Ntext NOT NULL, 
                תאריך_תום_שחרור Ntext NOT NULL);`, (err) => {
                if(err) {
                    reject(err)
                }
            });

            const stmt = db.prepare(`INSERT INTO ${tableName} (
                מסגרת, 
                מספר_אישי, 
                שם_פרטי, 
                דרגה,
                סוג_שירות, 
                עיסוק, 
                מספר_טלפון, 
                יחידה_ארגונית, 
                תאריך_תום_שחרור) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`)
                users.forEach(user => {
                stmt.run(user["מסגרת"], user["מספר אישי"], user["שם פרטי"], user["דרגה"], user["סוג שירות"], user["עיסוק"], user["מספר טלפון"], user["יחידה ארגונית"], user["תאריך תום שחרור"], (err) => {
                    if (err) {
                        reject(err)
                    }
                })
            })

            stmt.finalize((err) => {
                if (!err) {
                    resolve('user data inserted successfully')
                }
            })
        })
    })
}

function getUsers() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM users`, (err, rows) => {
            if(err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = {
    createTable,
    getUsers
}