var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    // 가상체험 페이지로 들어온 것 확인하는 단계
    console.log('가상체험 page');
    next();
});

router.get('/', (req, res)=> {
    res.send('가상체험 기능을 위한 url 입니다')
})

module.exports = router;