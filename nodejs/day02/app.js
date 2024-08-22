const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

app.set('port', 3000);
app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));
// post 방식의 파라미터를 전달 받기 위한 설정
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 쿠키 사용 미들웨어 설정 -> 쿠키를 사용할 수 있게 됨
app.use(cookieParser());
// 세션 사용 미들웨어 설정 -> 세션을 사용할 수 있게 됨
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

const memberList = [
    {no:101, id:'user01', password:'1234', name:'홍길동', email:'hong@example.com'},
    {no:102, id:'user02', password:'2345', name:'김길동', email:'kim@example.com'},
    {no:103, id:'user03', password:'3456', name:'이길동', email:'lee@example.com'},
    {no:104, id:'user04', password:'4567', name:'박길동', email:'park@example.com'}
];
let noCnt = 105;

// 요청 라우팅 사용
const router = express.Router();

router.route("/home").get((req, res) => {
    req.app.render("home/Home", {}, (err, html)=>{
        res.end(html);
    });
});



router.route("/profile").get((req, res) => {
    req.app.render("profile/Profile", {}, (err, html)=>{
        res.end(html);
    });
});



router.route("/member").get((req, res) => {
    // 로그인이 되어 있다면 member페이지를 보여 준다.
    // 쿠키는 사용자 쪽에 전달(res)
    // 세션은 서버에 요청이 들어올 때 생성된다.(req)
    if (req.session.user !== undefined) { // 세션에 정보가 있다면 멤버 페이지 출력
        const user = req.session.user;
        req.app.render("member/Member", {user}, (err, html)=>{
            res.end(html);
        });
    } else { // 세션에 정보가 없다면 로그인 페이지로 리다이렉트
        res.redirect("/login");
    }
});


router.route('/logout').get((req, res) => {
    console.log("GET - logout 호출");
    // 로그인이 된 상태라면 로그아웃
    if (!req.session.user) {
        console.log('아직 로그인이 되어 있지 않습니다.');
        res.redirect('/login');
    } else {
        // 세션의 user 정보를 제거하고 로그아웃 처리
        req.session.destroy((err) => {
            if (err) throw err;
            console.log('로그아웃되었습니다.');
            res.redirect('/login');
        });
    }
});

router.route("/login").get((req, res) => {
    req.app.render("member/Login", {}, (err, html)=>{
        // 사용자의 로컬에 쿠키가 저장된다.
        res.cookie('user', {
            id: 'testUser',
            name: '테스트 유저',
            authorized: true
        });
        res.end(html);
    });
});
router.route("/login").post((req, res) => {
    console.log(req.body.id, req.body.password);
    const idx = memberList.findIndex((member) => {return req.body.id === member.id});
    if (idx != -1) {
        if (memberList[idx].password === req.body.password) {
            console.log('로그인 성공');
            // 세션에 로그인 정보를 등록 후 멤버 페이지로 이동
            req.session.user = {
                id: req.body.id,
                name: memberList[idx].name,
                email: memberList[idx].email,
                no: memberList[idx].no
            }
            res.redirect('/member');
        } else {
            console.log('로그인 실패');
            // 다시 로그인 페이지로 이동
            res.redirect('/login');
        }
    } else {
        console.log('계정이 없습니다.');
        res.redirect('/login');
    }
});



router.route("/joinus").get((req, res) => {
    // 회원 가입 ejs 페이지 foward
    req.app.render("member/Joinus", {}, (err, html)=>{
        res.end(html);
    });
});
router.route("/joinus").post((req, res) => {
    // 회원 가입 처리 후 목록으로 리다이렉트
    res.redirect('/member');
});



router.route("/gallery").get((req, res) => {
    req.app.render("gallery/Gallery", {}, (err, html)=>{
        res.end(html);
    });
});



router.route("/shop").get((req, res) => {
    req.app.render("shop/Shop", {}, (err, html)=>{
        res.end(html);
    });
});

// router 설정 맨 아래에 미들웨어를 등록한다.
app.use('/', router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
// app.all('*', function(req, res) {
//     res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>')
// });

//오류 핸들러 모듈 사용
const expressErrorHandler = require('express-error-handler');

//모든 라우터 처리 후 404 오류 페이지 처리
const errorHandler = expressErrorHandler({
    static : {
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


// 서버 설정 및 실행
const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
    console.log(`Run on server >>> http://localhost:${app.get('port')}`);
});