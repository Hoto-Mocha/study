import React, { useState } from 'react';
import "./App.css";
import Input from "./components/Input";
import Output from "./components/Output";

const App = () => {
    // useState() 훅을 이용해서 state 생성
    // Input 컴포넌트에서 데이터를 추가하고
    // Output 컴포넌트에서 데이터를 접근할 수 있다.
    const [todoListArr, setTodoList] = React.useState([
        {no:101, title:"운동하기1", done:false},
        {no:102, title:"운동하기2", done:false},
        {no:103, title:"운동하기3", done:false}
    ]);
    const [noCnt, setNoCnt] = useState(104);
    
    function appendItem(title) {
        // setTodoList 함수를 이용해서 데이터 갱신
        // 스프레드 연산자를 사용하면 편리하다.
        setNoCnt(noCnt + 1);
        const newItem = {no:noCnt, title:title, done:false};
        setTodoList([...todoListArr, newItem]);
    }

    return (<div>
        <header className="jumbotron">
            <h1>Todo List</h1>
        </header>
        {/* 입력 기능 */}
        <Input appendItem = {appendItem}/>
        {/* 목록 출력 기능 - 추가된 속성은 props로 전달 */}
        <Output todoListArr = {todoListArr} setTodoList = {setTodoList} />
    </div>);
}

export default App;