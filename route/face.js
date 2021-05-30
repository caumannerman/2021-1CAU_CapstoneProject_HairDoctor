var express = require('express');
var router = express.Router();

var celebrity = require('../facelib/celebrity');
var jjim = require('../facelib/jjimlist');
var facetype = require('../facelib/facetype');

router.use(express.urlencoded({ limit: '50mb', extended : true }))
router.use(express.json({ limit: '50mb'}))

router.use(function(req, res, next) {   // 얼굴분석 페이지로 들어온 것 확인하는 단계
    console.log('얼굴분석 page');
    next();
});

// 클라이언트로부터 사진을 받아서 서버에 저장 
router.post('/getFacetype', (req, res) => { 
    //console.log('사진받아서 저장');
    facetype.type(req, res);
})
router.post('/Facetype', (req, res) => {
    console.log('얼굴형 반환');
    facetype.face(req, res);
})

router.get('/photo', (req, res) => {
    console.log('얼굴 사진 반환');
    facetype.photo(req, res);
})

// 해당 얼굴형의 연예인 리스트 불러오기
router.get('/getCeleList', function(req, res) { 
    //console.log('연예인 리스트 불러오기')
    celebrity.CeleList(req, res);
});

// 해당 연예인 사진 불러오기
router.get('/getCelebrityOld', function(req, res) {    
    //console.log('특정 연예인 사진 불러오기')
    celebrity.Celebrity(req, res);
});

// 추천목록에서 하트를 누르면 찜에 반영하는 api
router.post('/updateFavorite',(req, res) => { 
    //console.log('찜목록에 추가 또는 제거')
    jjim.addordelete(req, res)
})

// 사용자의 찜목록 불러오기
router.get('/getFavorite', function(req, res) {    
    //console.log('찜목록 불러오기')
    jjim.search(req, res);
});

router.get('/getCelebrity', function(req, res) {
    //console.log('특정 연예인 테스트 버전')
    celebrity.test(req, res)
})

module.exports = router;