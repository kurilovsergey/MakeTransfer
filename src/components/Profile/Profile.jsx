import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts.jsx';
import Profileinfo from './Profileinfo/Profileinfo'

const Profile = (props) => {

  let postData = [
    {id: 1, message: "What is your club?", likes: 12},
    {id: 2, message: "I see your vidio?", liker: 13}
  ];

  return (
    <div className={s.content}>
      <Profileinfo />
      <MyPosts postData={props.state.postData}
               newposttext={props.state.newposttext}
               dispatch={props.dispatch}
               />
    </div>
  )
}

export default Profile;