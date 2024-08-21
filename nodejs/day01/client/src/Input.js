const Input = ({onAdd, onEdit, editNo, name, dept, grade, setEditNo, setName, setDept, setGrade}) => {
    return(<>
        이름 <input id='inputName' type="text" value={name} onChange={(e)=> setName(e.target.value)}/><br />
        부서 <input id='inputDept' type="text" value={dept} onChange={(e)=> setDept(e.target.value)}/><br />
        직책 <input id='inputGrade' type="text" value={grade} onChange={(e)=> setGrade(e.target.value)}/><br />
        <button id="addPerson" onClick={(e) => {
            onAdd({name:name, dept:dept, grade:grade});
            setName("");
            setDept("");
            setGrade("");
        }}>새 사원 추가</button>
        <button id="editPerson" style={{display:"none"}} onClick={(e) => {
            onEdit({no:editNo, name:name, dept:dept, grade:grade});
            setEditNo(-1);
            setName("");
            setDept("");
            setGrade("");

            document.getElementById('addPerson').style.display='block';
            document.getElementById('editPerson').style.display='none';
        }}>수정</button>
    </>);
}

export default Input;