import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { PopupWithUrl } from './popup-with-url';
import './popup.css';
const App = () => {
    const [url, setUrl] = useState(null);
    const fetchUrl = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs[0].url) {
                const { hostname, pathname } = new URL(tabs[0].url);
                setUrl(hostname + pathname);
            }
        });
    };
    useEffect(() => fetchUrl(), []);
    if (!url) {
        return null;
    }
    return React.createElement(PopupWithUrl, { url: url });
};
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(React.createElement(App, null), root);
