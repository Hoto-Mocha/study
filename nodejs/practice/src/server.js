const http = require('http');
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Function to connect to the server
async function run() {
    try {
        // 클라이언트를 서버에 연결합니다(v4.7부터 선택 사항).
        await client.connect();
        // 연결 설정 및 확인
        const db = client.db("members");
        const members = db.collection("members");
        const cursor = members.find({}, { projection: { _id: 0 } });
        await cursor.forEach(console.log);
        console.log("Connected successfully to server");
    } finally {
        // 완료/오류 발생 시 클라이언트가 닫힘.
        await client.close();
    }
}


app.set('port', 3000);

app.set('view engine', 'ejs'); // 접미사
app.set('views', path.join(__dirname, '../views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('Login');
    res.end();
});

app.post('/login', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("members");
        const members = database.collection("members");

        // MongoDB에서 데이터를 조회합니다.
        const memberList = await members.find({}).toArray();
        let idx = memberList.findIndex((member) => {
            return member.id === req.body.id;
        });
        if (idx !== -1) {
            if (req.body.password === memberList[idx].password) {
                let user = memberList[idx];
                res.render('ProFile', { memberList, user });
            } else {
                res.send('pw가 틀립니다.');
            }
        } else {
            res.send('id가 없습니다.');
        }
    } catch (e) {
        console.error(e);
        res.send("Error fetching cars");
    } finally {
        await client.close();
    }
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log('서버 실행 중 >>> http://localhost:' + app.get('port'));
    run().catch(console.dir);
});