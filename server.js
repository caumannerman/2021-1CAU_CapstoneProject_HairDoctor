var express = require('express');
var server = express();
const PORT = 33300;
server.use(express.urlencoded({ limit: '50mb', extended : true })); // url-encoded bodies
server.use(express.json({ limit : '50mb' })) //parse json bodies
server.use(express.static('images')); // 서버에 저장된 정적파일인 이미지를 사용

server.get('/', (req, res)=> {
  res.send('hair doctor를 위한 express server 입니다')
})

// kakao login 파트로 라우트
server.use('/auth', require('./route/kakao'));

// 얼굴분석 파트로 라우트
server.use('/face', require('./route/face'));

// 가상체험 파트로 라우트
server.use('/simulator', require('./route/simulator'));

// 커뮤니티 파트로 라우트
server.use('/community', require('./route/community'));

// 마이페이지 파트로 라우트
server.use('/mypage', require('./route/mypage'));

// 서버 오픈
server.listen(PORT, () =>{
    console.log('express Server Start PORT:' + PORT);
})  