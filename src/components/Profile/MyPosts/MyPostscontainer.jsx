import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
import {addpostactioncreator, updatenewposttext} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.jsx'


const MyPostsContainer = (props) => { 
  
  let state = props.store.getState();
  
  let OnAddPost = (text) => {
    let action = addpostactioncreator(text)
    props.store.dispatch(action);
  }

  let OnPostChange = (text) => {
    let action = updatenewposttext(text);
    props.store.dispatch(action);
  }

  return (<MyPosts postData={state.Wallpage.postData}
                   newposttext={state.Wallpage.newposttext}
                   addPost={OnAddPost}
                   updateNewPost={OnPostChange}

    
    />)
}

export default MyPostsContainer;