const http = require('http');
const express = require('express');
const app = express();

app.set('port', 3000);

app.use((req, res, next) => { // path를 지정하지 않으면 모든 요청에 대해 실행된다.
    // 전체 요청에 적용될 한글 처리 기능
    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    console.log('전체 미들웨어 호출');
    // res.end("<h1>Hello Node.js</h1>"); //end는 맨 마지막에 한번만
    // 다음 요청 실행
    next();
});

app.use("/", (req, res, next) => { // path를 지정하지 않으면 모든 요청에 대해 실행된다.
    console.log('/ 요청 미들웨어 호출');
    // res.end("<h1>Hello Node.js</h1>"); //end는 맨 마지막에 한번만
    // 다음 요청 실행
    next();
});

app.get("/", (req, res) => {
    res.end("<h1>Hello Node.js 2</h1>");
})

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`서버 실행 중 >>> http://localhost:${app.get('port')}`);
});