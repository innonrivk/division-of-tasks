require("dotenv").config()

const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database(process.env.DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message)
})

module.exports = db