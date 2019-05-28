const mongoose = require('mongoose')

module.exports = class Connector {
    constructor() {
        mongoose.connect('mongodb://@mongo/passport', { user: 'root', pass: 'root', auth: { authdb: "admin" }, useNewUrlParser: true })
        this.conn = mongoose.connection
    }

    close(){
        this.conn.close()
    }
}