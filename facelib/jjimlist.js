var db = require('../lib/db');

exports.addordelete = function(req, res, next){
    db.query(
        `SELECT id FROM favorite WHERE (user_id = ${req.body.user_id} and celebrity_id = ${req.body.celebrity_id});`,
        (err, result1, fields) => {
            console.log('look user database')
            if(err) { throw err }
            else {
                if(result1[0] == null){
                    console.log('no favorite')
                    db.query(`SELECT photo, celebrity_name FROM celebrity WHERE celebrity_id = ${req.body.celebrity_id};`, (err, result2, fields) => {
                        if(err) {throw err}
                        else {
                            console.log(result2)
                            db.query(`INSERT INTO favorite (user_id, celebrity_id, photo) VAlUE(${req.body.user_id}, ${req.body.celebrity_id}, '${result2[0].photo}');`,
                            (err, rows, fields) => {
                                if(err){ res.status(300).send({ state: "error" }) } 
                                else { 
                                    res.send({name :result2[0].celebrity_name})
                                }   
                            });
                        }
                    })
                }
                else {
                    console.log('yes favorite')
                    db.query(`DELETE FROM favorite WHERE user_id = ${req.body.user_id} AND celebrity_id = ${req.body.celebrity_id};`,
                        (err, rows, fields) => {
                            if(err){ res.status(300).send({ state: "error" }) } 
                            else { 
                                db.query(`SELECT celebrity_name FROM celebrity WHERE celebrity_id = ${req.body.celebrity_id};`, (err, result2, fields) => {
                                    if(err) {throw err}
                                    else { res.send( {name : result2[0].celebrity_name}) }
                                }) 
                            }  
                    })
                }
            }
        }
    )
}