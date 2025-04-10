//This will run queries from the db and return the results
const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve(__dirname, 'zoomzoomtypeDB.db'), {fileMustExist: true});

function query(sql, params) {
    return db.prepare(sql).all(params);
}


module.exports = {
    query
}