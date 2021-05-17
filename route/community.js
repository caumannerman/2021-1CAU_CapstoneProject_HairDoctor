var express = require('express');
var router = express.Router();

var boardlist = require('../boardlib/boardlist')
var commentlist = require('../boardlib/comment')

router.use(express.urlencoded({ limit: '50mb', extended : true }))
router.use(express.json({ limit: '50mb'}))  

router.use(function(req, res, next) {
    console.log('게시판 page');
    next();
});
router.get('/', (req, res)=> {    res.send('게시판 기능을 위한 url 입니다')})

router.get('/showAllList', function(req, res) { 
    console.log(`전체 게시글`)
    boardlist.showAll(req, res);
});
router.post('/addcontent', function(req, res){
    console.log('게시글 작성')
    boardlist.addcontent(req, res);
})
router.post('/deletecontent', function(req, res){
    console.log('게시글 삭제')
    boardlist.deletecontent(req, res);
})
router.post('/updateHeart', function(req, res){
    console.log('좋아요 누르기')
    boardlist.updateHeart(req, res);
})
router.get('/showcomment', function(req, res){
    console.log('댓글 보기')
    commentlist.showcomment(req, res);
})
router.post('/addcomment', function(req, res){
    console.log('댓글 쓰기')
    commentlist.addcomment(req, res);
})
router.post('/deletecomment', function(req, res){
    console.log('댓글 삭제')
    commentlist.deletecomment(req, res);
})

module.exports = router;