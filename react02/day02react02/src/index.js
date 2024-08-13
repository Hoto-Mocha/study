import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root'); // 요소 ID는 반드시 root일 필요는 없지만, 이것이 표준 관례(국룰)
const root = ReactDOM.createRoot(container);
root.render(
    <App />
);