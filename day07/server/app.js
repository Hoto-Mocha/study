const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('views', path.join(__dirname + 'views'));
app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(cors());

// bodyParser미들웨어 지정- POST 방식의 파라미터 사용 가능.
// parse applocation/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// parse application/json
app.use(bodyParser.json());


app.get("/", (req, res) => {
    // res.redirect('http://naver.com');
    // res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    // res.end('한글');
    // res.end('{"hello":"world"}');

    var obj = {no:120, name:"hong"};
    // res.end(JSON.stringify(obj));
    // res.writeHead()는 생략
    res.send(obj);
});

//패스파라미터 방식: localhost:3000/data/hong/love => get('/data/:user/:message')
//GET방식: localhost:3000/data?user=hong&message=love
app.get('/data', (req, res) => {
    //POST 방식에는 body, 패스파라미터방식은 params, GET 방식은 query 객체로 전달...
    //POST 방식에서는 bodyParser 미들웨어 설정 필수.
    const user = req.query.user;
    const message = req.query.message;

    const jsonData = {user, message};

    res.send(jsonData);
});

// 임시 todoList 데이터 저장
const todoList = [
    {no:101, title:'자연 보호 하기', done:true},
    {no:102, title:'엄마 생일 선물', done:false},
    {no:103, title:'아빠 집 사주기', done:true},
    {no:104, title:'취직 하기', done:false},
    {no:105, title:'여행 하기', done:false}
];

var noSeq = 106;

// AJAX를 REST 방식으로 처리(HTML폼은 GET과 POST만 가능)
// GET - 출력
// POST - 입력
// PUT - 수정
// DELETE - 삭제
// FETCH - 부분 수정
// ... 그 외

// 검색
app.get('/todo/search', (req, res) => {
    
    var keyword = req.body.keyword;
    var newTodoList = todoList.filter((todo) => {
        return todo.title.findIndex(keyword) != -1;
    });

    res.send(newTodoList);

});


// 상세보기or 전체보기
app.get('/todo', (req, res) => {
    if (req.query.no) {
        var no = req.body.no;
        var idx = todoList.findIndex((t) => {
            return t.no == todo.no;
        });
        if (idx != -1) {
            res.send(todoList[idx]);
        } else {
            res.send(null);
        }
        return;
    }

    res.send(todoList);
});

// 검색
app.post('/todo', (req, res) => {
    var title = req.body.title;
    todoList.push({no:noSeq++, title, done:false});
    res.send(todoList);
});

// 수정
app.put('/todo', (req, res) => {
    // var no = req.body.no;
    // var title = req.body.title;
    // var done = req.body.done; //문자열을 boolean으로 변경

    var todo = req.body;
    console.dir(todo);
    var idx = todoList.findIndex((t) => {
        return t.no == todo.no;
    });
    if (idx != -1) {
        todoList[idx] = todo.no;
    }

    res.send(todoList);
});

//삭제
app.delete('/todo', (req, res) => {
    var no = parseInt(req.body.no);
    var idx = todoList.findIndex((t) => {
        return t.no == no;
    });
    if (idx != -1) {
        todoList.splice(idx, 1);
    }

    res.send(todoList);
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`Node.js 서버 실행 중 >>> http://localhost:${app.get('port')}`);
});