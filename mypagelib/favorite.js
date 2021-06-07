var db = require('../lib/db');  

exports.listpost = function(req, res){
    db.query(
        `SELECT * FROM favorite WHERE user_id = "${req.body.user_id}";`,
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

exports.listget = function(req, res){
    db.query(
        `SELECT * FROM favorite WHERE user_id = "${req.query.user_id}" order by id desc;`,
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