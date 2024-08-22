const http = require('http');
const express = require('express');
const app = express();

app.set('port', 3000);
app.set('views', 'views');
app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get('/home', (req, res) => {
    req.app.render('Home', {}, (err, html) => {
        res.end(html)
    })
})


app.get('/profile', (req, res) => {
    req.app.render('Profile', {}, (err, html) => {
        res.end(html)
    })
})


app.get('/member', (req, res) => {
    req.app.render('Member', {}, (err, html) => {
        res.end(html)
    })
})


app.get('/gallery', (req, res) => {
    req.app.render('Gallery', {}, (err, html) => {
        res.end(html)
    })
})


app.get('/shop', (req, res) => {
    req.app.render('Shop', {}, (err, html) => {
        res.end(html)
    })
})

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`서버 실행 중 >>> http://localhost:${app.get('port')}`);
});