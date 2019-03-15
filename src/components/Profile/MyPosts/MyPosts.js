import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = () => {

  let postData = [
		{id: 1, message: "text post 1", likes: 12},
		{id: 2, message: "text post2", likes: 13}
  ]

  let postElemements=postData.map(post=> <Post message={post.message} likes={post.likes} />);
  
  return (
    <div>
      My posts
      <div>
        <textarea></textarea>
        <button oncklick={()=>alert('heyy')}>Add post</button>

      </div>
      <div className={s.posts}>
        {postElemements}
      </div>
    </div>
  )

}

export default MyPosts;