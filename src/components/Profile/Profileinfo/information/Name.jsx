import React from 'react';
import s from './Name.module.css';
import ProfileStatus from './ProfileStatus.jsx'
import ProfileStatusWithHook from './ProfileStatusWithHook'

const Name =(props) => {
  console.log('name ',props);
return(
  <div >
     <div >{props.profile.fullName}</div>
     <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}/>
  </div>   
)
}

export default Name;