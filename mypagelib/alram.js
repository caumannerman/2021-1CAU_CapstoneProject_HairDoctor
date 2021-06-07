var db = require('../lib/db')

exports.show = function(req, res){
    db.query(
        `SELECT uuid, data AS nickname FROM noti WHERE user_id = '${req.body.user_id}' AND read_at IS NULL ORDER BY created_at`,
        (err, rows, fields) => {
            console.log('find')
            if(err) { throw err }
            else {
                console.log(rows)
                res.json({list : rows})
            }
        }
    )
}

exports.showtest = function(req, res){
    console.log(req.query)
    db.query(
        `SELECT uuid, data AS nickname FROM noti WHERE user_id = '${req.query.user_id}' AND read_at IS NULL ORDER BY created_at;`,
        (err, rows, fields) => {
            console.log('find')
            if(err) { throw err }
            else {
                console.log(rows)
                res.json({list : rows})
            }
        }
    )
}

exports.update = function(req, res) {
    console.log(req.body)
    db.query(
        `UPDATE noti set read_at = 1 where uuid =${req.body.uuid};`,
        (err, rows, fields) => {
            if(err){
                res.status(300).send({state: "error"});
            } else {
                console.log('send data')
                res.status(200).send({state: "ok"});
            }
        }      
    )
}
exports.updatetest = function(req, res) {
    console.log(req.query)
    db.query(
        `UPDATE noti set read_at = 1 where uuid =${req.query.uuid};`,
        (err, rows, fields) => {
            if(err){
                res.status(300).send({state: "error"});
            } else {
                console.log('send data')
                res.status(200).send({state: "ok"});
            }
        }      
    )
}