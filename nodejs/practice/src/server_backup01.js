const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

app.set('port', 3000);

app.set('view engine', 'ejs'); // 접미사
app.set('views', path.join(__dirname, '../views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('Login');
    res.end();
});

app.post('/login', (req, res) => {
    console.log(req.body.id, req.body.password);
    res.end();
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('서버 실행 중 >>> http://localhost:'+app.get('port'));
});