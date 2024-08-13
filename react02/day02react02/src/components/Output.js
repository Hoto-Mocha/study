export default (probs) => {
    let todoListArr = probs.todoListArr;
    let setTodoList = probs.setTodoList;
    // console.dir(probs.todoListArr);
    return (<div>
        <table id="todoListTbl" className="table table-hover">
            <thead>
                <tr>
                    <th>Confirm</th>
                    <th>Title</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {todoListArr.map((item, idx)=>{
                    // 중괄호가 여러 줄에 걸쳐 있으면 return을 넣어야 한다
                    return(
                        <tr key={item.no}>
                            <td>
                                <input onChange={() => {
                                    let tempArr = [...todoListArr];
                                    tempArr[idx].done = !tempArr[idx].done;
                                    setTodoList(tempArr);
                                }} type="checkbox"></input>
                            </td>
                            <td style={{textDecoration: item.done ? 'line-through' : ''}}>{item.title}</td>
                            <td>
                                <button onClick={() => {
                                    // console.log(...todoListArr);
                                    let tempArr = [...todoListArr];
                                    tempArr.splice(idx, 1);
                                    setTodoList(tempArr);
                                }} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>);
}