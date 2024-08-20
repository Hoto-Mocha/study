import "./App.css";
import {useState, useEffect} from "react";
import Input from "./Input";
import Output from "./Output";
import axios from "axios";

const App = ()=>{
    // 전역변수를 state로 만들어 주어야 re rendering 된다.
    // 구조분해 할당 = state변수, setter함수
    const [name, setName] = useState("Todo List");
    const [todoList, setTodoList] = useState([]);
    const serverURL = 'http://localhost:5000/todo';

    useEffect(()=>{
        axios.get(serverURL).then(function (response) {
            // console.log(response['data']);
            setTodoList(response['data']);
        });
    }, []);

    const onClickEvent = (inputTitle) => {
        console.log('Save 버튼 클릭');
        axios.post(serverURL, {title:inputTitle}).then(function (response) {
            // console.log(response['data']);
            setTodoList(response['data']);
        })
    };

    const onEdit = ({no, title, done})=>{
        axios.put(serverURL, {no:no, title:title, done:done}).then(function (response) {
            // console.log(response['data']);
            setTodoList(response['data']);
        })
    };

    const onDoneFlag = ({no, title, done})=>{
        axios.put(serverURL, {no:no, title:title, done:!done}).then(function (response) {
            // console.log(response['data']);
            setTodoList(response['data']);
        })
    };

    const onDelete = (todoItem) => {
        // console.log(todoItem);
        axios.delete(serverURL, {data:todoItem}).then(function (response) {
            // console.log(response['data']);
            setTodoList(response['data']);
        })
    };

    // 취소선 스타일 설정
    const lineThroughClass = {textDecoration:"line-through", color:"blue"}

    return (<div className="todoList">
        <div className="App-header">
            <h1>{name} App</h1>
        </div>
        {/* todo 타이틀 입력 콤포넌트 위치 */}
        <Input onClickEvent={onClickEvent} />

        {/* todo 목록이 출력 되는 콤포넌트 위치 */}
        <Output todoList={todoList} onDelete={onDelete} onDoneFlag={onDoneFlag} onEdit={onEdit}/>
    </div>);
}

export default App;