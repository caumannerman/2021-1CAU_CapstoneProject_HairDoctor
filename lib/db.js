var mysql = require('mysql');
var config = require('../config');

var db = mysql.createConnection({
    host: config.production.host,
    user: config.production.user,
    password: config.production.password,
    port: config.production.port,
    database: config.production.database,
    multipleStatements: true
});

db.connect(function(err){
    if(err){
        console.log(err);
    } else {
    console.log('connected to database');
    }
})

module.exports = db;
