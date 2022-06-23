import React from 'react';
import ReactDOM from 'react-dom';
import './options.css';
const App = () => {
    return (React.createElement("div", null,
        React.createElement("img", { src: "icon.png" })));
};
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(React.createElement(App, null), root);
