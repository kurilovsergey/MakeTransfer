import React from 'react';
import s from './Avatar.module.css';
import Preloader from '../../../common/Preloader/Preloader'

const Avatar =(props) => {
  if (!props.profile) {
    return <Preloader/>
  }
return (
        <div className={s.avatar} >
          <img src={props.profile.photos.large} />
          <button>Написать игроку</button>
        </div>
      
)
}

export default Avatar;