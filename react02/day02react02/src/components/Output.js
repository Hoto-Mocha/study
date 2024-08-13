export default () => {
    return (<div>
        <table id="todoListTbl" class="table table-hover">
            <thead>
                <tr>
                    <th>Confirm</th>
                    <th>Title</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input type="checkbox"></input>
                    </td>
                    <td>미니프로젝트 만들기</td>
                    <td>
                        <button class="btn btn-danger" type="button">삭제</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>);
}