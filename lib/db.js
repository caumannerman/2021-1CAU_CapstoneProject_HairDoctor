var mysql = require('mysql');

var db = mysql.createConnection({
    host: '52.78.76.160',
    user: 'backend',
    password: '111111',
    port: '3306',
    database: 'capstone',
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
