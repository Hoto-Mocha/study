const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.set('port', 5000);

// static 미들웨어
app.use('/', express.static('public'));
// URL 또는 포트가 다른 클라이언트 요청 허용
app.use(cors());
// post 요청 파라미터 처리
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const todoList = [
    {no:101, title:"할일 1", done:false},
    {no:102, title:"할일 2", done:true},
    {no:103, title:"할일 3", done:false},
    {no:104, title:"할일 4", done:false},
]
let noCnt = 105;

app.get('/todo', (req, res) => {
    // 목록 출력
    res.send(todoList);
});

app.post('/todo', (req, res) => {
    // 목록 입력
    const newList = {
        no:noCnt++,
        title:req.body.title,
        done:false
    }
    todoList.push(newList);
    res.send(todoList);
});

app.put('/todo', (req, res) => {
    // 목록 수정
    const idx = todoList.findIndex((todo) => {
        return req.body.no === todo.no;
    });
    if (idx != -1) {
        todoList[idx].title = req.body.title;
        todoList[idx].done = req.body.done;
    }
    res.send(todoList);
});

app.delete('/todo', (req, res) => {
    // 목록 삭제
    const idx = todoList.findIndex((todo) => {
        return req.body.no === todo.no;
    });
    if (idx != -1) {
        todoList.splice(idx, 1);
    }
    res.send(todoList);
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`서버 실행 중 >>> http://localhost:${app.get('port')}`);
})