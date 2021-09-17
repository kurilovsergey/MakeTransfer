import React from 'react';
import { string } from 'yup';
import s from './Name.module.css';
import ProfileStatus from './ProfileStatus.jsx'
import ProfileStatusWithHook from './ProfileStatusWithHook'
import {ProfileType} from '../../../../types/types'

type PropsType = {
   profile: ProfileType | null
   status: string,
   updateStatus: (status: string) => void
};

const Name: React.FC<PropsType> = (props) => {
  
return(
  <div >
      <div >{props.profile?.fullName}</div> 
     <ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}/>
  </div>   
)
}

export default Name;