import "./App.css";
import {useState} from "react";
import ItemRow from "./ItemRow";

const App = ()=>{
    // 전역변수를 state로 만들어 주어야 re rendering 된다.
    // 구조분해 할당 = state변수, setter함수
    const [name, setName] = useState("Todo List");
    const [todoList, setTodoList] = useState([
        {no:101, title:"공부하기", done: false},
        {no:102, title:"자바하기", done: true},
        {no:103, title:"리액트하기", done: false},
        {no:104, title:"스프링하기", done: false}
    ]);
    const [noCnt, setNoCnt] = useState(105);

    const [inputTitle, setInputTtile] = useState("");
    // const [outputTitle, setOutputTtile] = useState("");

    const onClickEvent = () => {
        // 기존 내용에 새 내용을 추가 해서 새 배열을 생성
        setTodoList([...todoList, {no:noCnt, title:inputTitle, done: false}]);
        setNoCnt(noCnt+1);
        setInputTtile("");
    }

    const onChangeTitle = (e) => { // 입력 시 값이 바로바로 나타나게 하는 기능
        setInputTtile(e.target.value);
    }

    const onDelete = ({no, title, done}) => { // Delete 버튼 클릭 시 작동하는 기능
        const newList = todoList.filter((todo)=> { // Delete 버튼을 클릭한 위치에 있는 todo를 제외한 나머지 todo로 배열을 만들어 임시 저장
            return todo.no != no;
        });
        setTodoList(newList); // 앞서 만든 배열을 todoList에 반영하고 자동 렌더링
    };

    const onDoneFlag = ({no, title, done}) => { // 체크박스 클릭 시 작동하는 기능
        const newTodoList = [...todoList]; // todoList를 복제하여 임시로 저장
        todoList.forEach((item, idx)=> {
            if(item.no == no) {
                newTodoList[idx].done = !done; // 반복 중에, 이번에 선택된 아이템의 no와 클릭한 체크박스에 있는 todo의 no가 같으면 해당 인덱스에 있는 todo의 done을 반대 값으로 변경
            }
        });
        setTodoList(newTodoList); // todoList의 setter로 수정된 값을 반영하고, 자동 렌더링
    };

    const onEdit = ({no, title, done}) => {
        const newTodoList = [...todoList];
        todoList.forEach((item, idx)=> {
            if(item.no == no) {
                newTodoList[idx].done = !done;
                newTodoList[idx].title = title;
            }
        });
        setTodoList(newTodoList);
    };

    return (<div className="todoList">
        <div className="App-header">
            <h1>{name} App</h1>
        </div>
        <div className="input-title">
          <div className="container" style={{padding: "10px"}}>
            <div className="input-group mb-3">
                <input value={inputTitle} onChange={onChangeTitle} type="text" className="form-control"/>
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={onClickEvent}>Save</button>
                </div>
            </div>
          </div>
        </div>
        <div className="list-body">
          <div className="container">
          <table className="table table-hover">
            <thead>
                <tr style={{textAlign:"center"}}>
                    <th>Done</th>
                    <th>Title</th>
                    <th>Buttons</th>
                </tr>
                </thead>
                <tbody>
                {todoList.map((item)=> {
                    return(<tr key={item.no}>
                        <td colSpan={3} style={{padding:"0px"}}>
                            <ItemRow item={item} onDoneFlag={onDoneFlag} onDelete={onDelete} onEdit={onEdit}/>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
          </div>
        </div>
    </div>);
}

export default App;