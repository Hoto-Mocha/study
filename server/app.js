const http = require('http');
const express = require('express');
const app = express()

const port = 8000;

app.set('views', 'views');
app.set('view engine', 'ejs');


// /public/index.html을 보여주기 위한 static 폴더 지정.
app.use(express.static('public'));

// 사람 데이터 목록 선언
const saramList = [
    {no:102, name:'김길동', email:'lim@saram.com', job:'도둑', age:22},
    {no:103, name:'이길동', email:'lee@saram.com', job:'경찰', age:35},
    {no:104, name:'나길동', email:'na@saram.com', job:'검사', age:45},
    {no:105, name:'오길동', email:'oh@saram.com', job:'판사', age:38}
];

// localhost:8000/saram
app.get('/saram', function(req, res) {
    // ejs 페이지로 렌더링 
    // - views/saram.ejs 페이지의 코드를 읽어와서 res.end()에 적용한다.

    var message = "사람 정보 관리 페이지";
    req.app.render('saram', {message, saramList}, function(err, html) {
        res.end(html);
    });
});

// localhost:8000/saram/detail?no=103
app.get('/saram/detail', function(req, res) {
    console.log('GET - /saram/detail >>>> no: ' + req.query.no);
    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });
    var saram = null;
    if(idx != -1) {
        saram = saramList[idx];
    }
    req.app.render('saramDetail', {saram}, function(err, html) {
        res.end(html);
    });
})

// localhost:8000/saram/edit?no=103
app.get('/saram/edit', function(req, res) {
    console.log('GET - /saram/edit >>>> no: ' + req.query.no); //req.query.no = ?no=번호 에서 번호가 된다.
    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });
    var saram = null;
    if(idx != -1) {
        saram = saramList[idx];
    }
    req.app.render('saramEdit', {saram}, function(err, html) {
        res.end(html);
    });
})

// localhost:8000/saram/update?no=103
app.get('/saram/update', function(req, res) {
    console.log('GET - /saram/update >>>> no: ' + req.query.no);
    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });
    var saram = req.query;
    if(idx != -1) {
        saramList[idx] = saram;
    }
    res.redirect('/saram');
})

// localhost:8000/saram/delete?no=103
app.get('/saram/delete', function(req, res) {
    console.log('GET - /saram/delete >>>> no: ' + req.query.no);
    var idx = saramList.findIndex(function(saram) {
        return saram.no == req.query.no;
    });
    if(idx != -1) {
        saramList.splice(idx, 1);
    }
    res.redirect('/saram');
})

// localhost:8000/saram/delete?no=103
app.get('/saram/saramForm', function(req, res) {
    res.redirect('/saramForm.html');
})

// localhost:8000/saram/add?no=103
app.get('/saram/add', function(req, res) {
    console.log('GET - /saram/add >>>> no: ' + req.query.no); //req.query.no = ?no=번호 에서 번호가 된다.
    var saram = req.query;
    saramList.push(saram);
    res.redirect('/saram');
})

const server = http.createServer(app);
server.listen(port, function() {
    console.log("서버 실행 중 >>> http://localhost:"+port);
});

// 실제 웹 서버 구축에서는 Nodejs만 사용하지 않고 express를 더 많이 사용합니다.