// node.js 프로젝트와 mongodb 연동 테스트
// 결과를 웹 브라우저에서 출력
const http = require('http');
const express = require('express');
const app = express();
const { MongoClient }= require('mongodb');
const path = require('path');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Function to connect to the server
async function run() {
    try {
      // 클라이언트를 서버에 연결합니다(v4.7부터 선택 사항).
      await client.connect();
      // 연결 설정 및 확인
      const db = client.db("vehicle");
      const car = db.collection("car");
      const cursor = car.find({}, { projection: { _id: 0 } });
      await cursor.forEach(console.log);
      console.log("Connected successfully to server");
    } finally {
      // 완료/오류 발생 시 클라이언트가 닫힘.
      await client.close();
    }
  }
  

app.set('port', 3000);
app.set('view engine', 'ejs'); // 접미사
app.set('views', path.join(__dirname, '../views')); // 접두사: 절대 경로+상대 경로

app.get('/', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('vehicle');
        const cars = database.collection('car');

        // MongoDB에서 데이터를 조회합니다.
        const carList = await cars.find({}).toArray();
        res.render('CarList', { carList });
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
