import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer.tsx';
import Profileinfo from './Profileinfo/Profileinfo.tsx'


const Profile = (props) => {
  
  return (
    <div className={s.content}>
      <Profileinfo messageError={props.messageError} saveProfile={props.saveProfile} resetMessageError={props.resetMessageError} savePhoto={props.savePhoto} isowner={props.isowner} autorizatedUserID={props.autorizatedUserID} fullName={props.fullName} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer />
    </div>
  )
}

export default Profile;