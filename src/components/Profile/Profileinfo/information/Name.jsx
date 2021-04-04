import React from 'react';
import s from './Name.module.css';
import ProfileStatus from './ProfileStatus.jsx'
import ProfileStatusWithHook from './ProfileStatusWithHook'

const Name =(props) => {
  console.log('prrops ',props);
return(
  <div >
     <div >{props.fullName}</div>
     <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
  </div>   
)
}

export default Name;