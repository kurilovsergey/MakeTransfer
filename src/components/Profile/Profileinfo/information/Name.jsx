import React from 'react';
import s from './Name.module.css';
import ProfileStatus from './ProfileStatus.jsx'

const Name =(props) => {
  
return(
  <div >
     <div >Cristiano Ronaldo</div>
     <ProfileStatus status={"HI"}/>
  </div>   
)
}

export default Name;