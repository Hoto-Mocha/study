const PersonList = ({saramList, onDelete, setEditNo, setName, setDept, setGrade}) => {
    return(<>
        {saramList.map((saram) => {
            return(<tr key={saram.no}>
                <td><input type="checkbox" /></td>
                <td>{saram.no}</td>
                <td>{saram.name}</td>
                <td>{saram.dept}</td>
                <td>{saram.grade}</td>
                <td><button onClick={(e) => {
                    document.getElementById('addPerson').style.display='none';
                    document.getElementById('editPerson').style.display='block';
                    
                    setEditNo(saram.no);
                    setName(saram.name);
                    setDept(saram.dept);
                    setGrade(saram.grade);
                }}>수정</button></td>
                <td><button onClick={(e) => {onDelete(saram)}}>삭제</button></td>
            </tr>);
        })}
    </>);
}

export default PersonList;