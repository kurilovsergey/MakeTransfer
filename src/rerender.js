import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import state from './redux/state';
import {addPost, updateNewPostText} from './redux/state';
 



export let rerender = (props) => {

ReactDOM.render(<App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>, document.getElementById('root'));

}


