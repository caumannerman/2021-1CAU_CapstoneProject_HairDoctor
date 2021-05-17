const express = require('express');
const router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
const db = require('../lib/db');

router.use(passport.initialize())
router.use(passport.session())

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback/',passport.authenticate('kakao'), function(req,res){
    res.status(200).json({ data: req.user , success: true });
})

function socialLogin(info, done) {
    console.log('login process in ' + info.email);
    var stmt_duplicated = 'select * from `user` where `email` = ?';
   
    db.query(stmt_duplicated, info.email, function (err, result) {
      if (err) {
        console.log('mysql err');  
        return done(err);
      } else {
        if (result.length === 0) {
          // 신규 유저는 회원 가입 이후 로그인 처리
          var stmt_thridparty_signup = 'insert into `user` set `user_id`= ?, `nickname`=?, `email`= ?, `token`=?';
          db.query(stmt_thridparty_signup, [info.auth_id, info.nickname, info.email, info.refreshToken], function (err, result) {
            if(err){
              return done(err);
            }else{
              console.log('신규 사용자 로그인')
              done(null, {
                'user_id': info.auth_id,
                'email': info.email,
                'accesstoken' : info.accessToken,
                'refreshtoken' : info.refreshToken
              });
            }
          });
        } else {
          //기존유저 로그인 처리
          console.log('기존 사용자 로그인');
          done(null, {
            'user_id': result[0].user_id,
            'email': result[0].email,
            'nickname' : result[0].nickname,
            'accesstoken' : info.accessToken,
            'refreshtoken' : result[0].token
          });
        }
      }
    });
  }

passport.use(new KakaoStrategy({
    clientID: '227ec81b33dc2714d100464c04ea9cde',
    clientSecret: 'wE6qTUQOzrTw7CKdv9VgrRbv40H2ShAM',
    callbackURL: 'https://hairdoctor.owlsogul.com/auth/kakao/callback/', 
  }, async (accessToken, refreshToken, profile, done) => {
        var _profile = profile._json;
        
        socialLogin({
            'auth_id' : _profile.id,
            'email' : _profile.kakao_account.email,
            'nickname' : _profile.properties.nickname,
            'accessToken' : accessToken,
            'refreshToken' : refreshToken,
        }, done)
        
    }
));

passport.serializeUser(function (user, done) {done(null, user)})
passport.deserializeUser(function (user, done) {done(null, user)})

module.exports = router;