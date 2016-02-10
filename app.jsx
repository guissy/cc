import ReactDOM from 'react-dom';
import React from 'react';
import Main from './main.jsx';
import { Provider } from 'react-redux';
import store from './store';
import css from './style.css';

ReactDOM.render(
<Provider store={store}>
    <Main />
</Provider>, document.getElementById('main'));