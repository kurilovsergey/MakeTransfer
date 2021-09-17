import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Profileinfo from './Profileinfo/Profileinfo'
import { ProfileType } from '../../types/types';

type ValueType = {
  fullname?: string,
  aboutMe?: string,
  lookingForAJob?: boolean,
  lookingForAJobDescription?: string
}

type ProfileComponentType = {
  isowner: boolean,
  profile: ProfileType | null,
  savePhoto: (e: File) => void,
  status: string,
  updateStatus: (status: string) => void,
  messageError: string
  saveProfile: (values: ValueType, userId: number) => void,
  resetMessageError: () => void,
}

const Profile: React.FC<ProfileComponentType> = (props) => {
  console.log('propsfile= ')
  return (
   
    
    <div className={s.content}>
      <Profileinfo messageError={props.messageError} saveProfile={props.saveProfile} resetMessageError={props.resetMessageError} savePhoto={props.savePhoto} isowner={props.isowner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer />
    </div>
    
  )
}

export default Profile;