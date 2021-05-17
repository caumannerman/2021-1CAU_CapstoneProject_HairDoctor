var db = require('../lib/db');
const fs = require('fs')

exports.showAll = async(data, res, next) => {
    sql = `SELECT comu.community_id as idx, comu.facetype as category, comu.author as user_id, u.nickname as username,
    t.name as userFaceshape, comu.content as userCommunityText, comu.picture AS picture,
    (select count(*) FROM capstone.like WHERE community_id = comu.community_id) AS likeNum,
	(select count(*) from capstone.comment where community_id = comu.community_id) AS commentNum
       FROM capstone.community AS comu 
       JOIN capstone.typename AS t ON t.facetype = comu.facetype
       JOIN capstone.user AS u ON comu.author = u.user_id
       order by idx desc;`
    db.query(sql, (err, rows, fields) => {
            if(err) { throw err }
            else { res.json({data : rows}) }
        }
    )
}

exports.addcontent = function(req, res, next){
    const timenow = Date.now(0)
    if (req.body.photo != null){
        console.log('It has image file')
        var img = Buffer.from(req.body.photo, 'base64');
        var filename = 'https://hairdoctor.owlsogul.com/comupicture/' + req.body.user_id + '_' + timenow + '.jpg'
        var fileroute = '../serverbackup/images/comupicture/' + req.body.user_id + '_' + timenow + '.jpg'

        fs.writeFile(fileroute, img, function(error){
            if(error){ throw error} 
            else{
                console.log('File created from base64 string!');
                db.query(
                    `INSERT INTO community(facetype, author, content, picture) VAlUE('${req.body.facetype}', ${req.body.user_id}, '${req.body.content}', '${filename}');`,
                    (err, rows, fields) => {
                        if(err){
                            res.status(300).send({ state: "error" });
                            console.log('add error')
                        } else {
                            res.status(200).send({ state: "ok" });
                            console.log('add done')
                        }   
                    }
                )
            }
        })
    }
    else {
        console.log('There is no image');
        db.query(
            `INSERT INTO community(facetype, author, content) VAlUE('${req.body.facetype}', ${req.body.user_id}, '${req.body.content}');`,
            (err, rows, fields) => {
                if(err){
                    res.status(300).send({ state: "error" });
                    console.log('add error')
                } else {
                    res.status(200).send({ state: "ok" });
                    console.log('add done')
                }   
            }
        )
    }
}

exports.deletecontent = function(req, res){
    var sql =  `delete from community where community_id = ${req.body.idx};` +
               `delete from comment where community_id = ${req.body.idx};`
    db.query(sql, (err, rows, fields) => {
            if(err){
                res.status(300).send({ state: "error" });
                console.log('delete error')
            } else {
                res.status(200).send({ state: "ok" });
                console.log('delete done')
            }   
        }
    )
}

exports.updateHeart = function(req, res){
    console.log(req.body)
    db.query(
        `SELECT * FROM capstone.like WHERE user_id =${req.body.user_id} and community_id =${req.body.idx};`,
        (err, result1, fields) => {
            if(err){
                console.log('update heart error')
            } else {
                if(result1[0] == null){
                    db.query(   
                        `INSERT INTO capstone.like(user_id, community_id) VALUE(${req.body.user_id}, ${req.body.idx});`,
                        (err, rows, fields) => {
                            if(err){
                                res.status(300).send({ state: "error" });               
                                console.log(err)
                            } else {
                                res.status(200).send({ state: "ok" });
                                console.log('insert like')
                            }   
                        }
                    )
                }
                else {
                    db.query(
                        `DELETE FROM capstone.like WHERE user_id =${req.body.user_id} and community_id =${req.body.idx};`,
                        (err, rows, fields) => {
                            if(err){
                                res.status(300).send({ state: "error" });               
                                console.log(err)
                            } else {
                                res.status(200).send({ state: "ok" });
                                console.log('delete like')
                            }   
                        }
                    )
                }
            }   
        }
    )
}