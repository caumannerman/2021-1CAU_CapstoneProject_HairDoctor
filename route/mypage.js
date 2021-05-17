var express = require('express');
var router = express.Router();

var favoritelist = require('../mypagelib/favorite')
var profile = require('../mypagelib/profile')
var alarm = require('../mypagelib/alram')

router.use(function(req, res, next) {
    // 마이페이지로 들어온 것 확인하는 단계
    console.log('MY page');
    next();
});

router.get('/', (req, res)=> {
    res.send('mypage 기능을 위한 url 입니다')
})

router.post('/showjjim', (req,res) => {
    console.log('찜목록 호출')
    favoritelist.listpost(req, res)
})

router.get('/showjjim', (req,res) => {
    console.log('찜목록 호출')
    favoritelist.listget(req, res)
})

router.post('/getAlarm', (req,res) => {
    console.log('댓글 알람 호출')
    alarm.show(req, res)
})

router.get('/getAlarm', (req,res) => {
    console.log('댓글 알람 호출')
    alarm.test(req, res)
})

router.post('/readAlarm', (req,res) => {
    console.log('댓글 읽음 post')
    alarm.update(req, res)
})

router.get('/readAlarm', (req,res) => {
    console.log('댓글 읽음 get')
    alarm.updatetest(req, res)
})

router.post('/setprofile', (req,res) => {
    console.log('닉네임, 얼굴형 세팅')
    profile.setprofilepost(req, res)
})

router.get('/setprofile', (req,res) => {
    console.log('닉네임, 얼굴형 세팅')
    profile.setprofileget(req, res)
})

router.post('/changeName', (req,res) => {
    console.log('닉네임 변경')
    profile.demandprofilepost(req, res)
})

router.get('/changeName', (req,res) => {
    console.log('닉네임 변경')
    profile.demandprofileget(req, res)
})

module.exports = router;