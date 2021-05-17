var db = require('../lib/db');  

exports.showcomment = function(req, res, next){
    sql = `SELECT comm.id AS idx , comm.community_id as community_id, comm.user_id AS user_id, u.nickname AS username, t.name AS userFaceshape, comm.content AS commentText
    FROM capstone.comment AS comm
    JOIN capstone.user AS u ON comm.user_id = u.user_id
    JOIN capstone.typename AS t ON u.facetype = t.facetype
    order by idx desc;`
    db.query(sql, (err, rows, fields) => {
            console.log('find')
            if(err) { throw err }
            else {
                console.log('exist')
                res.json({list : rows})
            }
        }
    )
}

exports.addcomment = function(req, res){
    console.log(req.body)
    const timenow = Date.now(0)
    db.query(
        `INSERT into comment(user_id, community_id, content) VAlUE(${req.body.user_id}, ${req.body.idx}, "${req.body.commentText}");`,
        (err, results1, fields) => {
            if(err){
                console.log('comment insert error')
                res.status(300).send({ state: "error" });
            } else {
                db.query(
                    `SELECT c.author as user_id , u.nickname as data FROM capstone.community AS c 
                    JOIN capstone.user AS u ON u.user_id = ${req.body.user_id} WHERE c.community_id=${req.body.idx};`,
                    (err,result1,fields) => {
                        if(err){
                            console.log('search error')
                            res.status(300).send({ state: "error" }) 
                        }
                        else {
                            console.log(result1)
                            db.query(
                                `INSERT INTO noti(user_id, data,created_at) VALUE(${result1[0].user_id}, "${result1[0].data}", "${timenow}");`,
                                (err,rows,fields) => {
                                    if(err){ 
                                        console.log('noti error')
                                        res.status(300).send({ state: "error" }) 
                                    }
                                    else { res.status(200).send({ state: "ok"}) }
                                }       
                            )
                        }
                    }       
                )                
            }   
        }
    )
}

exports.deletecomment = function(req, res){
    console.log(req.body)
    db.query(
        `delete from comment where id = ${req.body.idx};`,
        (err, rows, fields) => {
            if(err){
                res.status(300).send({ state: "error" });
            } else {
                res.status(200).send({ state: "ok" });
            }   
        }
    )
}
/*
exports.selectcomment = function(req, res, next){
    console.log(req.query.idx)
    sql = `SELECT comm.id AS idx , comm.community_id as community_id, comm.user_id AS user_id, u.nickname AS username, t.name AS userFaceshape, comm.content AS commentText
    FROM capstone.comment AS comm
    JOIN capstone.user AS u ON comm.user_id = u.user_id
    JOIN capstone.typename AS t ON u.facetype = t.facetype
    WHERE comm.community_id = ${req.query.idx}
    order by idx desc;`
    db.query(sql, (err, rows, fields) => {
            console.log('find')
            if(err) { throw err }
            else {
                console.log('exist')
                res.json({list : rows})
            }
        }
    )
}
*/