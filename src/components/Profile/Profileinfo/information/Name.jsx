import React from 'react';
import s from './Name.module.css';
import ProfileStatus from './ProfileStatus.jsx'

const Name =(props) => {
  console.log('prrops ',props);
return(
  <div >
     <div >Cristiano Ronaldo</div>
     <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
  </div>   
)
}

export default Name;