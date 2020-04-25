import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './style/styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { Provider } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);

serviceWorker.unregister();