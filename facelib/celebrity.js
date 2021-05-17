var db = require('../lib/db');  

exports.Celebrity = function(req, res){
    db.query(
        `SELECT * FROM celebrity WHERE celebrity_name = "${req.query.celebrity_name}" ORDER BY recommend DESC;`,
        (err,rows,fields) => {
            if(err){
                res.status(300).send({
                    state: "error",
                    message: err.sqlMessage
                });
            } else {
                res.json(rows);
            }
        }
    )
}

exports.CeleList = function(req, res){
    db.query(
        `SELECT celebrity_name, profile_photo FROM celebrity_list WHERE facetype = "${req.query.facetype}";`,
        (err,rows,fields) => {
            if(err){
                res.status(300).send({
                    state: "error",
                    message: err.sqlMessage
                });
            } else {
                res.json(rows);
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