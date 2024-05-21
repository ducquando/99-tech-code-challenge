import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './utils/store'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

reportWebVitals();