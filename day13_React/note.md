Node.js에서 네이버 뉴스 페이지를 크롤링하고 이미지를 다운로드하는 기능을 구현하기 위해 `axios`와 `cheerio` 모듈을 사용할 수 있습니다. 아래는 이 작업을 수행하기 위한 예제 코드입니다.

### 1. 프로젝트 초기화 및 필요한 모듈 설치
먼저 Node.js 프로젝트를 초기화하고 필요한 모듈을 설치합니다.

```bash
mkdir naver-news-crawler
cd naver-news-crawler
npm init -y
npm install axios cheerio fs path
```

### 2. 코드 작성

아래는 `axios`를 이용해 AJAX 요청을 보내고, `cheerio`를 이용해 HTML을 파싱하여 이미지를 다운로드하는 코드입니다.

```javascript
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// 크롤링할 URL
const url = 'https://news.naver.com/main/ranking/popularDay.naver?mid=etc&sid1=111';

// 이미지 다운로드 함수
const downloadImage = async (url, filepath) => {
  const writer = fs.createWriteStream(filepath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const crawlNaverNewsImages = async () => {
  try {
    // HTML 가져오기
    const { data } = await axios.get(url);

    // cheerio를 사용해 HTML 파싱
    const $ = cheerio.load(data);

    // 이미지 URL을 담을 배열
    const imageUrls = [];

    // 이미지 태그 찾기 (예: 'img' 태그)
    $('img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      if (imgSrc && imgSrc.startsWith('https://')) {
        imageUrls.push(imgSrc);
      }
    });

    // 이미지 다운로드 디렉토리 생성
    const dir = './images';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    // 이미지 다운로드
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const filename = path.basename(imageUrl);
      const filepath = path.join(dir, filename);
      console.log(`Downloading image ${i + 1}/${imageUrls.length}: ${filename}`);
      await downloadImage(imageUrl, filepath);
    }

    console.log('All images downloaded.');
  } catch (error) {
    console.error('Error while crawling:', error.message);
  }
};

// 크롤러 실행
crawlNaverNewsImages();
```

### 3. 코드 설명

1. **`axios`**: AJAX 요청을 보내기 위해 사용합니다. 네이버 뉴스 페이지의 HTML 데이터를 가져옵니다.
2. **`cheerio`**: 가져온 HTML 데이터를 파싱하고, DOM 구조를 탐색하기 위해 사용합니다. jQuery와 유사한 문법을 사용해 쉽게 HTML 요소를 찾을 수 있습니다.
3. **이미지 다운로드**: 이미지 URL을 `axios`를 사용해 GET 요청을 보내고, 스트림을 통해 이미지를 파일로 저장합니다.
4. **이미지 필터링**: `cheerio`를 이용해 `img` 태그를 찾고, `src` 속성이 `https://`로 시작하는 이미지를 필터링하여 다운로드합니다.

### 4. 실행

아래 명령어로 스크립트를 실행할 수 있습니다.

```bash
node index.js
```

스크립트가 실행되면 `images` 디렉토리에 네이버 뉴스 페이지에서 찾은 이미지들이 다운로드됩니다.

이 코드 예제는 교육 목적으로 기본적인 기능만을 다루고 있습니다. 실제 사용 시에는 예외 처리, URL 유효성 검사 등 추가적인 기능을 고려해야 합니다.