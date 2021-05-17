var db = require('../lib/db');  

exports.demandprofilepost = function(req, res){
    console.log(req.body)
    db.query(
        `UPDATE user SET nickname = "${req.body.name}" WHERE user_id = "${req.body.user_id}";`,
        (err,rows,fields) => {
            if(err){
                res.status(300).send({
                    state: "error",
                    message: err.sqlMessage
                });
            } else {
                res.status(200).send({ state: "ok" })
            }
        }
    )
}
exports.demandprofileget = function(req, res){
    console.log(req.query)
    db.query(
        `UPDATE user SET nickname = "${req.query.name}" WHERE user_id = "${req.query.user_id}";`,
        (err,rows,fields) => {
            if(err){
                res.status(300).send({
                    state: "error",
                    message: err.sqlMessage
                });
            } else {
                res.status(200).send({ state: "ok" })
            }
        }
    )
}

exports.setprofilepost = function(req, res){
    console.log(req.body)
    db.query(
        `SELECT u.nickname, t.name FROM capstone.user as u JOIN capstone.typename as t on t.facetype = u.facetype WHERE user_id = ${req.body.user_id};`,
        (err,rows,fields) => {
            if(err){
                res.status(300).send({
                    state: "error",
                    message: err.sqlMessage
                });
            } else {
                res.json({data : rows});
            }
        }
    )
}
exports.setprofileget = function(req, res){
    console.log(req.query)
    db.query(
        `SELECT u.nickname, t.name FROM capstone.user as u JOIN capstone.typename as t on t.facetype = u.facetype WHERE user_id = ${req.query.user_id};`,
        (err,rows,fields) => {
            if(err){
                res.status(300).send({
                    state: "error",
                    message: err.sqlMessage
                });
            } else {
                res.json({data : rows});
            }
        }
    )
}