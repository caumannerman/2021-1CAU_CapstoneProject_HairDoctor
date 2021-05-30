const db = require('../lib/db')
const fs = require('fs')
var py_Shell = require('python-shell');

var options = {
    mode: 'text',               // python 파일을 열 모드 text 나 json중에서 선택
    pythonPath: "/usr/bin/python3",    //ubuntu path
    pythonOptions: ['-u'],
    scriptPath:'../serverbackup/facelib/'
};

exports.type = function(req, res) {
    console.log('사진 저장')
    fs.unlink(`../serverbackup/images/uploads/test.jpg`)
    var img = Buffer.from(req.body.imgsource, 'base64');
    setTimeout(() => {
        fs.writeFile('../serverbackup/facelib/test.jpg', img, function(error){
            if(error){
                throw error;
            } else{
                console.log('File created from base64 string!');
                py_Shell.PythonShell.run("Mid_Demo.py", options, function(err,results){  
                    if(err) {
                        console.log('err msg : error in running python');
                    } 
                    else {
                        console.log(results)
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
            }
        })
    }, 2000)
}

exports.face = function(req, res) {
    db.query(
        `select facetype FROM user where user_id =${req.body.user_id};`,
        (err, rows, fields) => {
            //console.log(rows)
            res.send(rows[0])
        }      
    )
}

exports.photo = function(req, res) {
    console.log(`ML result img return to client`)
    fs.readdir('../serverbackup/images/uploads', function(err, filelist){
        console.log('filelist:', filelist)
        if(filelist[0] == null){
            console.log('no file')
            res.send( {uri :`https://hairdoctor.owlsogul.com/component/noimage.png`});
        }
        else {
            res.send( {uri :`https://hairdoctor.owlsogul.com/uploads/test.jpg`});
        }
    })
}