var express = require('express');
var router = express.Router();

var celebrity = require('../facelib/celebrity');
var jjim = require('../facelib/jjimlist');
var facetype = require('../facelib/facetype');

// 사용자가 보내는 사진의 크기가 클 수 있으므로 받는 데이터의 한계를 50mb로 설정
router.use(express.urlencoded({ limit: '50mb', extended : true }))
router.use(express.json({ limit: '50mb'}))

router.use(function(req, res, next) {   // 얼굴분석 페이지로 들어온 것 확인하는 단계
    console.log('얼굴분석 page');
    next();
});

// 클라이언트로부터 사진을 받아서 서버에 저장 
router.post('/getFacetype', (req, res) => { 
    facetype.type(req, res);
})

// 딥러닝으로 분석한 사용자의 얼굴형 반환
router.post('/Facetype', (req, res) => {

    facetype.face(req, res);
})

// 사용자의 분석된 얼굴 사진 반환
router.get('/photo', (req, res) => {
    facetype.photo(req, res);
})

// 해당 얼굴형의 연예인 리스트 불러오기
router.get('/getCeleList', function(req, res) { 
    celebrity.CeleList(req, res);
});

// 사용자의 얼굴형과 같은 연예인중 특정 연예인에 대한 사진 불러오기
router.get('/getCelebrity', function(req, res) {
    celebrity.returnCele(req, res)
})

// 추천목록에서 하트를 누르면 찜에 반영하는 api
router.post('/updateFavorite',(req, res) => { 
    jjim.addordelete(req, res)
})

// 사용자의 찜목록 불러오기
router.get('/getFavorite', function(req, res) { 
    jjim.search(req, res);
});

// 해당 연예인 사진 불러오기(구버젼으로 로그인 모듈X)
router.get('/getCelebrityOld', function(req, res) {
    celebrity.Celebrity(req, res);
});

module.exports = router;