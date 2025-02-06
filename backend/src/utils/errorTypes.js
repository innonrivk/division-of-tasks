class DatabaseError extends Error {
    constructor(message, code) {
        super(message)
        this.code = code
        this.name = "DatabaseError"
    }
}


class InvalidDataInput extends Error {
    constructor(message, code) {
        super(message)
        this.code = code
        this.name = "InvalidDataInput"
    }
}

module.exports = {
    InvalidDataInput,
    DatabaseError
}