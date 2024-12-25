const db = require("../db/connection")

function createTable(users) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
                unit text NOT NULL,
                frame text NOT NULL,
                service_number INTEGER PRIMARY KEY, 
                full_name text NOT NULL, 
                rank text NOT NULL, 
                service_type text NOT NULL, 
                job text NOT NULL, 
                phone_number text NOT NULL, 
                end_of_service DATE);`, (err) => {
                if(err) {
                    reject(err)
                }
            });
        });

        const stmt = db.prepare(`INSERT INTO users (
            unit, 
            frame, 
            service_number, 
            full_name,
            rank, 
            service_type, 
            job, 
            phone_number, 
            end_of_service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`)
            users.forEach(user => { 
            stmt.run(user.unit, user.frame, user.service_number, user.full_name, user.rank, user.service_type, user.job, user.phone_number, user.end_of_service, (err) => {
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