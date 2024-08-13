import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <>
      <h3>Welcome to my homepage</h3>
      <h1>Hello World</h1>
    </>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render( <App /> );
