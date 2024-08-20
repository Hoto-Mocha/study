import { useState } from "react";

const ItemRow = ({item, onDoneFlag, onDelete, onEdit}) => {
    const [flag, setFlag] = useState(false);
    const [outputTitle, setOutputTtile] = useState(item.title);

    // 취소선 스타일 설정
    const lineThroughClass = {textDecoration:"line-through", color:"blue"} // 스타일을 미리 지정하고 조건에 따라 다른 스타일이 적용될 수 있도록 함
    
    const [titleTmp, setTitleTmp] = useState(item.title);

    return (<div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                    <input onChange={()=>{
                        onDoneFlag(item);
                    }} checked={item.done&&"checked"} type="checkbox" />
                    </div>
                </div>
                    <input style={
                        item.done?lineThroughClass:{}}
                        type="text" className="form-control"
                        readOnly={flag?"":"readOnly"}
                        value={outputTitle}
                    onChange={(e) => {
                        setOutputTtile(e.target.value);
                    }}
                    onFocus={(e) => {
                        setFlag(true);
                    }}
                    onBlur={(e) => {
                        setTimeout(() => {
                            setFlag(false);
                            setOutputTtile(item.title);
                        }, 100);
                        // console.log("blur");
                        // setFlag(false);
                        // // 수정하다 말았기 때문에 원상태로 복귀
                        // setOutputTtile(item.title);
                    }}
                    />
                    <div className="input-group-append">
                        <button onClick={()=>{
                            onEdit({no:item.no, title:outputTitle, done:item.done});
                        }} className="btn btn-primary"
                        type="button">Edit</button>  

                        <button onClick={()=>{
                            onDelete(item);
                        }}
                        className="btn btn-danger" 
                        type="button">Delete</button>  
                </div>
            </div>
            );
}

export default ItemRow;