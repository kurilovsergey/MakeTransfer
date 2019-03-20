import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src='https://tmssl.akamaized.net//images/portrait/header/8198-1515761767.jpg?lm=1515761786' />
          <div>
          {props.message} 
          <div>__</div>
          {props.likes}
      </div>
    </div>
  )

}

export default Post;