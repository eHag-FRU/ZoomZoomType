//This will run queries from the db and return the results
const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve(__dirname, 'zoomzoomtypeDB.db'), {fileMustExist: true});

function query(sql, params) {
    return db.prepare(sql).all(params);
}

function deleteQuery(sql, params){
    db.prepare(sql).run(params);

}

//Done for all queries that do not return any data ONLY!!!
function noReturnQuery(sql, params) {
    db.prepare(sql).run(params);
}

module.exports = {
    query,
    deleteQuery,
    noReturnQuery
}