import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostscontainer';
import Profileinfo from './Profileinfo/Profileinfo'


const Profile = (props) => {
  
  return (
    <div className={s.content}>
      <Profileinfo profile={props.profile} />
      <MyPostsContainer store={props.store} />
    </div>
  )
}

export default Profile;