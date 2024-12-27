const db = require("../db/connection")

function createTable(users) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
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
                    reject(err.msg)
                }
            });
        });

        const stmt = db.prepare(`INSERT INTO users (
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
}

function getUsers() {

    return new Promise((resolve, reject) => {
        db.all('SELECT * from users', (err, rows) => {
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