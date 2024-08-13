import Hello from "./Hello";

const App = () => {
    return (
    <>
        <h3>Welcome to my homepage</h3>
        <h3><Hello /></h3>
    </>
    );
};

// 컴포넌트를 모듈에 등록
// -> 프로젝트의 모든 JS 파일에서 import 가능.
export default App;