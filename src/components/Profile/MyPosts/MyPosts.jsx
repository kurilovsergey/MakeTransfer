import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
import {addpostactioncreator, updatenewposttext} from '../../../redux/profile-reducer';

const MyPosts = (props) => {
  
  let newpostelement = React.createRef();
  
  let addPost = () => {
    let text=newpostelement.current.value; 
    let action = addpostactioncreator(text)
    props.dispatch(action);
  }

  let OnPostChange = () => {
    let text=newpostelement.current.value;
    let action = updatenewposttext(text);
    props.dispatch(action);
  }

  let postElements = props.postData.map(post=><Post message={post.message}/>);

  return (
    <div className={s.mypost}>
      My posts
      <div>
        <textarea onChange={OnPostChange} ref={newpostelement} value={props.newposttext} />
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={s.posts}>
      {postElements}
      </div>
    </div>
  )

}

export default MyPosts;