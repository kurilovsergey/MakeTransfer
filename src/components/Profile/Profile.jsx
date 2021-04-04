import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostscontainer';
import Profileinfo from './Profileinfo/Profileinfo'


const Profile = (props) => {
  console.log('prf ',props.profile);
  return (
    <div className={s.content}>
      <Profileinfo autorizatedUserID={props.autorizatedUserID} fullName={props.fullName} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer store={props.store} />
    </div>
  )
}

export default Profile;