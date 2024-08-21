import "./App.css";
import {useState, useEffect} from 'react';
import PersonList from './PersonList';
import axios from "axios";
import Input from './Input';

const App = () => {
    const [saramList, setSaramList] = useState([]);
    const serverURL = "http://localhost:5000/saram";
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [grade, setGrade] = useState("");
    const [editNo, setEditNo] = useState(-1);

    const onAdd = ({name, dept, grade}) => {
        // console.log({name:name, dept:dept, grade:grade});
        axios.post(serverURL, {name:name, dept:dept, grade:grade}).then(function (response) {
            console.log(response['data']);
            setSaramList(response['data']);
        });
    };

    const onDelete = (person) => {
        axios.delete(serverURL, {data:person}).then(function (response) {
            console.log(response['data']);
            setSaramList(response['data']);
        });
    }

    const onEdit = ({no, name, dept, grade}) => {
        axios.put(serverURL, {no:no, name:name, dept:dept, grade:grade}).then(function (response) {
            console.log(response['data']);
            setSaramList(response['data']);
        });
    }

    useEffect(()=>{
        axios.get(serverURL).then(function (response) {
            // console.log(response['data']);
            setSaramList(response['data']);
        });
    }, []);

    return (<>
        <Input onAdd={onAdd} onEdit={onEdit} editNo={editNo} name={name} dept={dept} grade={grade} setEditNo={setEditNo} setName={setName} setDept={setDept} setGrade={setGrade}/>
        <hr />
        <button>선택 삭제</button> | 검색 :
        <select>
            <option>이름</option>
            <option>부서</option>
            <option>직책</option>
        </select>
        <input type="text" /><br />
        <table>
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>번호</th>
                    <th>사원명</th>
                    <th>부서</th>
                    <th>직급</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <PersonList saramList={saramList} onDelete={onDelete} onEdit={onEdit} setEditNo={setEditNo} setName={setName} setDept={setDept} setGrade={setGrade}/>
            </tbody>
        </table>
    </>);
}

export default App;