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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 쿠키 사용 미들웨어 설정 -> 쿠키를 사용할 수 있게 됨
app.use(cookieParser());
// 세션 사용 미들웨어 설정 -> 세션을 사용할 수 있게 됨
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 파일 업로드를 위한 설정
// 파일 업로드용 미들웨어
const multer = require('multer');
app.use(express.static('uploads'));

// multer 업로드 설정
// multer 미들웨어 사용: 미들웨어 사용 순서 
// body-parser -> multer -> router 순으로 실행
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
        //callback(null, file.originalname + Date.now());
        // 파일명 중복을 방지하기 위한 처리
        // Date.now() <-- 타임스템프
        let index = file.originalname.lastIndexOf(".");
        let newFileName = file.originalname.substring(0, index);
        newFileName += Date.now();
        newFileName += file.originalname.substring(index);
        callback(null, newFileName);
    }
});
// 파일 제한: 10개, 1G 이하
var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024
    }
});

// 임시 데이터
const memberList = [
    { no: 101, id: 'user01', password: '1234', name: '홍길동', email: 'hong@example.com' },
    { no: 102, id: 'user02', password: '2345', name: '김길동', email: 'kim@example.com' },
    { no: 103, id: 'user03', password: '3456', name: '이길동', email: 'lee@example.com' },
    { no: 104, id: 'user04', password: '4567', name: '박길동', email: 'park@example.com' }
];
let noCnt = 105;

// 쇼핑 상품 목록
const carList = [
    {
        _id: 111,
        name: 'SM5',
        price: 3000,
        year: 1999,
        company: 'SAMSUNG',
        writeDate: "",
        photos: [
            {
                originalName: "sm3.jpg",
                fileName: "sm3.jpg",
                fileSize: 275500,
                mimeType: "img/jpg",
            },
        ]
    },
];
let carSeq = 112;

// 장바구니 목록
const cart = [];

// 요청 라우팅 사용
const router = express.Router();

router.route("/home").get((req, res) => {
    req.app.render("home/Home", {}, (err, html) => {
        res.end(html);
    });
});



router.route("/profile").get((req, res) => {
    req.app.render("profile/Profile", {}, (err, html) => {
        res.end(html);
    });
});



router.route("/member").get((req, res) => {
    // 로그인이 되어 있다면 member페이지를 보여 준다.
    // 쿠키는 사용자 쪽에 전달(res)
    // 세션은 서버에 요청이 들어올 때 생성된다.(req)
    if (req.session.user !== undefined) { // 세션에 정보가 있다면 멤버 페이지 출력
        const user = req.session.user;
        req.app.render("member/Member", { user }, (err, html) => {
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
    req.app.render("member/Login", {}, (err, html) => {
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
    const idx = memberList.findIndex((member) => { return req.body.id === member.id });
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
    req.app.render("member/Joinus", {}, (err, html) => {
        res.end(html);
    });
});
router.route("/joinus").post((req, res) => {
    // 회원 가입 처리 후 목록으로 리다이렉트
    res.redirect('/member');
});



router.route("/gallery").get((req, res) => {
    req.app.render("gallery/Gallery", {}, (err, html) => {
        res.end(html);
    });
});

// -------------------쇼핑몰 기능---------------------
router.route("/shop").get((req, res) => {
    req.app.render("shop/Shop", { carList }, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});
// -----------------------CART-----------------------
router.route("/shop/cart").get((req, res) => {
    const _id = parseInt(req.query._id);
    const idx = carList.findIndex((item) => {
        return _id === item._id;
    });
    if (idx !== -1 && !cart.includes(carList[idx])) {
        cart.push(carList[idx]);
    }
    req.app.render("shop/Cart", { cart }, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});
router.route("/shop/cart").post((req, res) => {
    const _id = parseInt(req.body._id);
    const idx = cart.findIndex((item) => {
        return _id === item._id;
    });
    if (idx !== -1) {
        cart.splice(idx, 1);
    }
    console.log(_id, idx, cart);
    req.app.render("shop/Cart", { cart }, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});
// ----------------------DELETE----------------------
router.route("/shop/delete").get((req, res) => {
    const _id = parseInt(req.query._id);
    // console.log(_id);
    const idx = carList.findIndex((item) => {
        return _id === item._id;
    });
    if (idx === -1) {
        console.log('상품이 존재하지 않습니다.');
        res.redirect('/shop');
        return;
    }
    req.app.render("shop/Delete", { car: carList[idx] }, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});
router.route("/shop/delete").post((req, res) => {
    const _id = parseInt(req.body._id);
    const idx = carList.findIndex((item) => {
        return _id === item._id;
    });
    if (idx !== -1) {
        carList.splice(idx, 1);
        res.redirect('/shop');
    } else {
        console.log('상품이 존재하지 않습니다.');
        return;
    }
});
// ----------------------DETAIL----------------------
router.route("/shop/detail").get((req, res) => {
    // 쿼리로 전송된 데이터는 모두 문자열이다.
    // number() 또는 parseInt() 필수 "77" <- numeric
    const _id = parseInt(req.query._id);
    // console.log(_id);
    const idx = carList.findIndex((item) => {
        return _id === item._id;
    });
    if (idx === -1) {
        console.log('상품이 존재하지 않습니다.');
        return;
    }
    req.app.render("shop/Detail", { car: carList[idx] }, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});
// ---------------------INSERT----------------------
router.route("/shop/insert").get((req, res) => {
    req.app.render("shop/Insert", { carSeq: carSeq }, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});
router.route("/shop/insert").post(upload.array('photo', 1), (req, res) => {
    var files = req.files;
    const _id = parseInt(req.body._id);
    console.dir(req.body);

    console.dir('#===== 업로드된 첫번째 파일 정보 =====#')
    console.dir(req.files);
    console.dir('#=====#');


    let originalname = '';
    let filename = '';
    let mimetype = '';
    let size = 0;
    originalname = files.originalname;
    filename = files.name;
    mimetype = files.mimetype;
    size = files.size;
    const newCar = {
        _id: _id,
        name: req.body.name,
        price: req.body.price,
        year: req.body.year,
        company: req.body.company,
        writeDate: Date.now()
    }
    carList.push(newCar);
    carSeq++;
    res.redirect('/shop');
});

// ---------------------MODIFY----------------------
router.route("/shop/modify").get((req, res) => {
    const _id = parseInt(req.query._id);
    // console.log(_id);
    const idx = carList.findIndex((item) => {
        return _id === item._id;
    });
    if (idx === -1) {
        console.log('상품이 존재하지 않습니다.');
        res.redirect('/shop');
        return;
    }
    req.app.render("shop/Modify", { car: carList[idx] }, (err, html) => {
        if (err) throw err;
        res.end(html);
    });
});
router.route("/shop/modify").post((req, res) => {
    console.log("POST - /shop/modify 호출");
    console.log(req.body._id);
    const _id = parseInt(req.body._id);
    console.dir(req.body);
    const idx = carList.findIndex((item) => {
        return _id === item._id;
    });
    if (idx !== -1) {
        carList[idx].name = req.body.name;
        carList[idx].price = req.body.price;
        carList[idx].year = req.body.year;
        carList[idx].company = req.body.company;
    }
    res.redirect('/shop');
});
// --------------------------------------------------

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
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


// 서버 설정 및 실행
const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`Run on server >>> http://localhost:${app.get('port')}`);
});