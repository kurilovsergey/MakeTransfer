import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/reduxstore';
import {Provider} from "react-redux";

let rerender = (state) => {

ReactDOM.render(
                <Provider store={store}>
                <App/>
                     </Provider>
                ,document.getElementById('root'));
}

rerender(store.getState());

store.subscribe(()=>{
    let state = store.getState();
    rerender(state);
});



