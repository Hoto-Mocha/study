import "./App.css";
import Input from "./components/Input";
import Output from "./components/Output";

const App = () => {
    return (<div>
        <header className="jumbotron">
            <h1>Todo List</h1>
        </header>
        {/* 입력 기능 */}
        <Input />
        {/* 목록 출력 기능 */}
        <Output />
    </div>);
}

export default App;