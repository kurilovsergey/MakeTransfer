import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostscontainer';
import Profileinfo from './Profileinfo/Profileinfo'
import { Redirect } from 'react-router-dom';

const Profile = (props) => {
  if (!props.isAuth) return <Redirect to={"/login"}/>
  return (
    <div className={s.content}>
      <Profileinfo profile={props.profile} />
      <MyPostsContainer store={props.store} />
    </div>
  )
}

export default Profile;