// Promise를 사용하지 않고 콜백으로 처리

function task1(callback) {
    console.log('Task1 시작');
    setTimeout(function() {
        console.log('Task1 끝');
        callback('Task1 결과');
    }, 1000);
    console.log('2. 이 부분은 언제 실행될까?');
}

task1(function (result) { // Promise를 사용하지 않으면 코드가 지저분해진다.
    console.log('fullfiled : ', result);
});

console.log('1. 이 부분은 언제 실행될까?');