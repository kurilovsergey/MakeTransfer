import React from 'react';
import s from './Post.module.css';

type PropType = {
  message: string,
  likes: number 
}

const Post: React.FC<PropType> = (props) => {
  return (
    <div className={s.item}>
      <img src='https://tmssl.akamaized.net//images/portrait/header/8198-1515761767.jpg?lm=1515761786' />
          <div>
          {props.message} 
          {props.likes}
      </div>
    </div>
  )

}

export default Post;