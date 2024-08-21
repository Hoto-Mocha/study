var http = require('http');
var server = http.createServer();
server.listen(3000, () => {
    console.log("http://localhost:3000");
});

const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>노드제이에스로부터의 응답 페이지</h1>
    </body>
    </html>
`;

server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    
    // res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}); // utf-8로 인코딩해야 한글이 안 깨짐
    res.write(html);
    res.end();
    // res.write()는 여러 번 호출 가능. res.end()는 한 번만 호출해야 한다.
    // res.end()는 문자열 데이터만 사용.
    // express에서 res.send(): 수식, 객체 등을 body 화면에 바로 출력.
});
