const db = require('../lib/db')
const fs = require('fs')
const sharp = require('sharp')
var py_Shell = require('python-shell');

var options = {
    mode: 'text',
    pythonPath: "/usr/bin/python3",
    pythonOptions: ['-u'],
    scriptPath:'../serverbackup/facelib/'
};

const imagePath = '../serverbackup/facelib'

exports.type = function(req, res) {
    console.log('사진 저장')
    fs.unlink(`../serverbackup/facelib/test.jpg`, (err) => {})
    var img = Buffer.from(req.body.imgsource, 'base64');   
    const imageTime = Date.now()
    const original = imagePath + String(imageTime) + '.jpg'
    fs.writeFile(original, img, (err) => {
        if(err) console.log(err)
        sharp(original).resize({width: 400}).toFile('../serverbackup/facelib/test.jpg',(err) => {
            if(err) console.log(err)
            fs.unlink('../serverbackup/facelib/original.jpg', err => {})
        })
    })
    
    setTimeout(() => {
        console.log('python start')
        py_Shell.PythonShell.run("final_test_min.py", options, function(err,results){  
            if(err) {
                console.log(err);
                db.query(
                    `UPDATE user set facetype = 'error' where user_id =${req.body.user_id};`,
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
            else {
                console.log('results msg :', results)
                db.query(
                    `UPDATE user set facetype = '${results}' where user_id =${req.body.user_id};`,
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
        })
    }, 2000)
}

exports.face = function(req, res) {
    db.query(
        `select facetype FROM user where user_id =${req.body.user_id};`,
        (err, rows, fields) => {
            console.log('user facetype =', rows[0])
            res.send(rows[0])
        }      
    )
}

exports.photo = function(req, res) {
    console.log(`ML result img return to client`)
    res.send( {uri :`https://hairdoctor.owlsogul.com/uploads/test.jpg`});
    setTimeout(() => {
        fs.unlink(`../serverbackup/images/uploads/test.jpg`, err => {})
    },20000)
}