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

exports.test = function(req, res){
    console.log(req.query)
    db.query(
        `SELECT c.celebrity_id, c.celebrity_name, c.recommend, c.photo,
        if(c.celebrity_id in( select f.celebrity_id from favorite as f where user_id = ${req.query.user_id}), "true", "false") as pick
        FROM celebrity as c WHERE c.celebrity_name = "${req.query.celebrity_name}" ;`,
        (err,rows,fields) => {
            if(err){
                res.status(300).send({
                    state: "error",
                    message: err.sqlMessage
                });
            } else {
                res.send({list : rows})
            }
        }
    )
}