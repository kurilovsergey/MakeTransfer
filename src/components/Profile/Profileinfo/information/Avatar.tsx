import React from 'react';
import s from './Avatar.module.css';
import Preloader from '../../../common/Preloader/Preloader'
import userPhoto from '../../../../assets/images/userPhoto.png'
import {ProfileType} from '../../../../types/types'

type PropsType = {
  profile: ProfileType,
  savePhoto: (e: File) => void,
  isowner: boolean
}

const Avatar: React.FC<PropsType> = (props) => {
  

  if (!props.profile) {
    return <Preloader/>
  }

  const onMainPhotoSelect = (e: React.ChangeEvent<HTMLInputElement> ): void => {
    if (e.target.files!.length) {
      props.savePhoto(e.target.files![0])
    }
  }

return (
        <div className={s.avatar} >
          {props.isowner || <input type="file" onChange={onMainPhotoSelect}/>}
          <img src={props.profile.photos.large || userPhoto} />
          <button>Написать игроку</button>
        </div>
      
)
}

export default Avatar;